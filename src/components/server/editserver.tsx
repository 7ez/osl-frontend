"use client";

import { 
  faIcons, 
  faPencil, 
  faPenToSquare,
  faSignature 
} from "@fortawesome/free-solid-svg-icons";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function EditServer(props: { open: boolean, onOpenChange: (open?: boolean) => void, serverUrl: string, serverName: string, serverLogo: string }) {
  const [serverName, setServerName] = useState<string>(props.serverName);
  const [serverLogo, setServerLogo] = useState<string>(props.serverLogo);
  const [serverUrl, setServerUrl] = useState<string>(props.serverUrl);
  const { toast } = useToast();

  function updateServerName(event: React.ChangeEvent<HTMLInputElement>): void {
    setServerName(event.target.value);
  }

  function updateServerLogo(event: React.ChangeEvent<HTMLInputElement>): void {
    setServerLogo(event.target.value);
  }

  function updateServerUrl(event: React.ChangeEvent<HTMLInputElement>): void {
    setServerUrl(event.target.value);
  }

  function editServer(): void {
    if (
      (serverName !== props.serverName && serverName.length < 2) || 
      (serverLogo !== props.serverLogo && serverLogo.length < 2) || 
      (serverUrl !== props.serverUrl && serverUrl.length < 2)
    ) {
      toast({
        title: "Uh oh!",
        description: "Some fields are too short. Make sure they are over 2 characters long.",
      })
      return;
    }


    let servers: { name: string, icon: string, url: string }[] = JSON.parse(localStorage.getItem('servers') || '[]');
    let oldServer = servers.find((server: any) => server.url === serverUrl);

    if (oldServer === undefined) {
      toast({
        title: "Uh oh!",
        description: "That server doesn't exist. Please try again."
      });
      return;
    }

    let oldIdx = servers.indexOf(oldServer);

    if (serverName !== props.serverName)
      servers[oldIdx].name = serverName;
    if (serverLogo !== props.serverLogo)
      servers[oldIdx].icon = serverLogo;
    if (serverUrl !== props.serverUrl)
      servers[oldIdx].url = serverUrl;

    localStorage.setItem("servers", JSON.stringify(servers));
    toast({
      title: "Success!",
      description: `${props.serverName} has been edited.`
    });
    setTimeout(() => { window.location.reload(); }, 1500);
  }

  return (
    <Dialog key={props.serverName} open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit server</DialogTitle>
          <DialogDescription>Edit the server{"'"}s details.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="mt-6"></div>
          <div className="flex-row">
            <FontAwesomeIcon icon={faSignature} width={16} height={16} />
            <Label className="ml-2 font-bold w-full">Server Name</Label>
          </div>
          <div className="mt-3"></div>
          <Input placeholder="ex. Bancho" defaultValue={props.serverName} onChange={updateServerName} />
          <div className="mt-6"></div>
          <div className="flex-row">
            <FontAwesomeIcon icon={faIcons} width={16} height={16} />
            <Label className="ml-2 font-bold w-full">Server Icon</Label>
          </div>
          <div className="mt-3"></div>
          <Input placeholder="ex. https://osu.ppy.sh/favicon.ico" defaultValue={props.serverLogo} onChange={updateServerLogo} />
          <div className="mt-6"></div>
          <div className="flex-row">
            <FontAwesomeIcon icon={faPenToSquare} width={16} height={16} />
            <Label className="ml-2 font-bold w-full">Server URL</Label>
          </div>
          <div className="mt-3"></div>
          <Input placeholder="ex. ppy.sh. do not include http(s)!" defaultValue={props.serverUrl} onChange={updateServerUrl} />
          <div className="mt-6"></div>
          <div className="flex w-full mt-4 justify-end">
            <Button variant="ghost" className="bottom-4 right-4" onClick={editServer}>
              <FontAwesomeIcon icon={faPencil} width={16} height={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}