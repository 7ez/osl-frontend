import { faEye, faEyeSlash, faLock, faPlus, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { Credentials } from "@/lib/credentials";
import { useToast } from "../ui/use-toast";

export default function AddCredentials(props: { onOpenChange: (open?: boolean) => void, serverUrl: string }) {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();

  function updateUsername(event: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function updatePassword(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function setCredentials(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
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
      description: "Your credentials have been added."
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
          <DialogTitle>Add credentials</DialogTitle>
          <DialogDescription>Add your credentials for easier access.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex-row">
            <FontAwesomeIcon icon={faUser} width={16} height={16} />
            <Label className="ml-2 font-bold w-full">Username</Label>
          </div>
          <div className="mt-3"></div>
          <Input placeholder="Username" onChange={updateUsername} />
          <div className="mt-3"></div>
          <div className="flex-row">
            <FontAwesomeIcon icon={faUnlock} width={16} height={16} />
            <Label className="ml-2 font-bold w-full">Password</Label>
          </div>
          <div className="mt-3"></div>
          <div className="flex flex-row gap-3">
            <Input placeholder="Password" type={passwordShown ? "text" : "password"} onChange={updatePassword} />
            <Button variant="ghost" onClick={() => { setPasswordShown(!passwordShown) }}>
              <FontAwesomeIcon
                icon={passwordShown ? faEye : faEyeSlash}
                width={32}
                height={32}
              />
            </Button>
          </div>

          <div className="flex w-full mt-4 justify-end">
            <Button variant="ghost" className="bottom-4 right-4" onClick={setCredentials}>
              <FontAwesomeIcon icon={faPlus} width={16} height={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

  );
}