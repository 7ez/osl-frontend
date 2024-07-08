import { faEye, faEyeSlash, faLock, faPencil, faPlus, faTrash, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { Credentials } from "@/lib/credentials";
import { useToast } from "../ui/use-toast";

export default function EditCredentials(props: { onOpenChange: (open?: boolean) => void, serverUrl: string, username: string, password: string }) {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(props.username);
  const [password, setPassword] = useState<string>(props.password);
  const { toast } = useToast();

  function updateUsername(event: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function updatePassword(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function editCredentials(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    let credentials: Credentials[] = JSON.parse(localStorage.getItem("credentials") || "[]");

    // delete old credentials just in case.
    let oldCredentials = credentials.find((cred) => cred.url === props.serverUrl);
    if (oldCredentials !== undefined) {
      let oldIdx = credentials.indexOf(oldCredentials);

      credentials = credentials.splice(oldIdx, 1);
    }

    credentials.push({
      url: props.serverUrl,
      username: username,
      password: password
    });
    localStorage.setItem("credentials", JSON.stringify(credentials));
    toast({
      title: "Success!",
      description: "Your credentials have been changed."
    });
    setTimeout(() => { window.location.reload(); }, 1500);
  }

  function deleteCredentials(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    let credentials: Credentials[] = JSON.parse(localStorage.getItem("credentials") || "[]");

    let cred = credentials.find((cred) => cred.username === username && cred.password === password && cred.url === props.serverUrl)!;
    credentials.splice(credentials.indexOf(cred), 1);

    localStorage.setItem("credentials", JSON.stringify(credentials));
    toast({
      title: "Success!",
      description: "Your credentials have been deleted."
    });
    setTimeout(() => { window.location.reload(); }, 1500);
  }

  return (
    <Dialog onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>
        <FontAwesomeIcon
          icon={faLock}
          height="16"
          width="16"
          className="text-yellow-500 text-2xl absolute pl-5 pt-3"
          style={{ cursor: "pointer" }}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit credentials</DialogTitle>
          <DialogDescription>Edit your current credentials.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex-row">
            <FontAwesomeIcon icon={faUser} width={16} height={16} />
            <Label className="ml-2 font-bold w-full">Username</Label>
          </div>
          <div className="mt-3"></div>
          <Input placeholder="Username" defaultValue={username} onChange={updateUsername} />
          <div className="mt-3"></div>
          <div className="flex-row">
            <FontAwesomeIcon icon={faUnlock} width={16} height={16} />
            <Label className="ml-2 font-bold w-full">Password</Label>
          </div>
          <div className="mt-3"></div>
          <div className="flex flex-row gap-3">
            <Input placeholder="Password" type={passwordShown ? "text" : "password"} defaultValue={password} onChange={updatePassword} />
            <Button variant="ghost" onClick={() => { setPasswordShown(!passwordShown) }}>
              <FontAwesomeIcon
                icon={passwordShown ? faEye : faEyeSlash}
                width={32}
                height={32}
              />
            </Button>
          </div>

          <div className="flex w-full mt-4 justify-end gap-3">
            <Button variant="ghost" className="bottom-4 right-4" onClick={deleteCredentials}>
              <FontAwesomeIcon icon={faTrash} width={16} height={16} />
            </Button>
            <Button variant="ghost" className="bottom-4 right-4" onClick={editCredentials}>
              <FontAwesomeIcon icon={faPencil} width={16} height={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

  );
}