import { 
  faEye, 
  faEyeSlash, 
  faPlus, 
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

export default function AddCredentials(props: { onOpenChange: (open?: boolean) => void, serverId: string }) {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const { toast } = useToast();


  function setCredentials(): void {
    let username = usernameInput.current?.value;
    let password = passwordInput.current?.value;
    let credentials: Credentials[] = JSON.parse(localStorage.getItem("credentials") || "[]");

    if (username === undefined || password === undefined || username.length < 2 || password.length < 2) {
      toast({
        title: "Uh oh!",
        description: "Some fields are too short. Make sure they are over 2 characters long.",
      });
      return;
    }

    // delete old credentials just in case.
    let oldCredentialsIdx = credentials.findIndex((cred) => cred.serverId === props.serverId);
    if (oldCredentialsIdx !== -1)
      credentials.splice(oldCredentialsIdx, 1);

    credentials.push({
      serverId: props.serverId,
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
          icon={faUnlock}
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
          <Input placeholder="Username" ref={usernameInput} />
          <div className="mt-3"></div>
          <div className="flex-row">
            <FontAwesomeIcon icon={faUnlock} width={16} height={16} />
            <Label className="ml-2 font-bold w-full">Password</Label>
          </div>
          <div className="mt-3"></div>
          <div className="flex flex-row gap-3">
            <Input placeholder="Password" type={passwordShown ? "text" : "password"} ref={passwordInput} />
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