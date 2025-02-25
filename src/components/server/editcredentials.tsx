import {
  faEye,
  faEyeSlash,
  faLock,
  faPencil,
  faTrash,
  faUnlock,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Credentials } from "@/lib/credentials";
import { useToast } from "@/components/ui/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function EditCredentials(props: { 
  onOpenChange: (open?: boolean) => void, 
  serverId: string, 
  username: string, 
  password: string 
}) {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  function editCredentials(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    let username = usernameInput.current?.value;
    let password = passwordInput.current?.value;

    if (username === undefined || password === undefined || username.length < 2 || password.length < 2) {
      toast({
        title: "Uh oh!",
        description: "Some fields are too short. Make sure they are over 2 characters long.",
      });
      return;
    }

    let credentials: Credentials[] = JSON.parse(localStorage.getItem("credentials") || "[]");

    // delete old credentials just in case.
    let oldCredentials = credentials.find((cred) => cred.serverId === props.serverId);
    if (oldCredentials !== undefined) {
      let oldIdx = credentials.indexOf(oldCredentials);

      credentials = credentials.splice(oldIdx, 1);
    }

    credentials.push({
      serverId: props.serverId,
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

  function deleteCredentials(): void {
    let credentials: Credentials[] = JSON.parse(localStorage.getItem("credentials") || "[]");
    let credentialsIdx = credentials.findIndex((cred) => cred.serverId === props.serverId);

    credentials.splice(credentialsIdx, 1);

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
          <Input placeholder="Username" defaultValue={props.username} ref={usernameInput} />
          <div className="mt-3"></div>
          <div className="flex-row">
            <FontAwesomeIcon icon={faUnlock} width={16} height={16} />
            <Label className="ml-2 font-bold w-full">Password</Label>
          </div>
          <div className="mt-3"></div>
          <div className="flex flex-row gap-3">
            <Input placeholder="Password" type={passwordShown ? "text" : "password"} defaultValue={props.password} ref={passwordInput} />
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