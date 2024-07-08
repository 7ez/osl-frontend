"use client";

import { Button } from "@/components/ui/button";
import { faIcons, faPenToSquare, faPlus, faSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useToast } from "../ui/use-toast";


export default function OwnServer() {
  const [serverName, setServerName] = useState<string>('');
  const [serverIcon, setServerIcon] = useState<string>('');
  const [serverUrl, setServerUrl] = useState<string>('');
  const [acknowledgedMultiaccountWarning, setAcknowledgedMultiaccountWarning] = useState<boolean>(false);
  const { toast } = useToast();

  function updateServerName(event: React.ChangeEvent<HTMLInputElement>) { 
    setServerName(event.target.value);
  }

  function updateServerIcon(event: React.ChangeEvent<HTMLInputElement>) { 
    setServerIcon(event.target.value);
  }

  function updateServerUrl(event: React.ChangeEvent<HTMLInputElement>) { 
    setServerUrl(event.target.value);
  }

  function addServer() {
    if (serverName.length < 2 || serverIcon.length < 2 || serverUrl.length < 2) {
      toast({
        title: "Uh oh!",
        description: "Some fields are too short. Make sure they are over 2 characters long.",
      })
      return;
    }

    let servers = JSON.parse(localStorage.getItem('servers') || '[]');
    if (!acknowledgedMultiaccountWarning) {
      if (servers.find((server: any) => server.url === serverUrl)) {
        toast({
          title: "Hey, wait a minute!",
          description: "This server is already in your list. Multiaccounting is banned on most if not all servers.\nIf you are sure you want to add this server, click plus icon again.",
        });
        setAcknowledgedMultiaccountWarning(true);
        return;
      }
    }
    
    if (servers.find((server: any) => server.name === serverName)) {
      toast({
        title: "Uh oh!",
        description: "This server name is already in your list. Please choose a different name.",
      });
      return;
    }


    servers.push({ name: serverName, icon: serverIcon, url: serverUrl });
    localStorage.setItem('servers', JSON.stringify(servers));
    toast({
      title: "Success!",
      description: "Server added successfully.",
    });
    setTimeout(() => { window.location.reload() }, 1500);
  }

  return (
    <div className="flex flex-col">
      <div className="mt-6"></div>
      <div className="flex-row">
        <FontAwesomeIcon icon={faSignature} width={16} height={16} />
        <Label className="ml-2 font-bold w-full">Server Name</Label>
      </div>
      <div className="mt-3"></div>
      <Input placeholder="ex. Bancho" onChange={updateServerName} />
      <div className="mt-6"></div>
      <div className="flex-row">
        <FontAwesomeIcon icon={faIcons} width={16} height={16} />
        <Label className="ml-2 font-bold w-full">Server Icon</Label>
      </div>
      <div className="mt-3"></div>
      <Input placeholder="ex. https://osu.ppy.sh/favicon.ico" onChange={updateServerIcon} />
      <div className="mt-6"></div>
      <div className="flex-row">
        <FontAwesomeIcon icon={faPenToSquare} width={16} height={16} />
        <Label className="ml-2 font-bold w-full">Server URL</Label>
      </div>
      <div className="mt-3"></div>
      <Input placeholder="ex. ppy.sh. do not include http(s)!" onChange={updateServerUrl} />
      <div className="mt-6"></div>
      <div className="flex w-full mt-4 justify-end">
        <Button variant="ghost" className="bottom-4 right-4" onClick={addServer}>
          <FontAwesomeIcon icon={faPlus} width={16} height={16} />
        </Button>
      </div>
    </div>
  );
}