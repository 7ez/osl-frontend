"use client";

import { 
  faIcons, 
  faPenToSquare, 
  faPlus, 
  faSignature 
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SAVED_SERVERS_INTERFACE_VERSION, SavedServers } from "@/lib/savedservers";
import { generateId } from "@/lib/helpers";


export default function OwnServer(): JSX.Element {
  const serverNameInput = useRef<HTMLInputElement>(null);
  const serverIconInput = useRef<HTMLInputElement>(null);
  const serverUrlInput = useRef<HTMLInputElement>(null);
  const acknowledgedMultiaccountWarning = useRef<boolean>(false);
  const [canAddServer, setCanAddServer] = useState<boolean>(false);
  const formErrors = useRef<string[]>([]);
  const { toast } = useToast();

  function removeFormError(formError: string): void {
    let formErrorIdx = formErrors.current.indexOf(formError);
    
    if (formErrorIdx === -1)
      return;
    
    // THIS LANGUAGE SUCKS HOLY SHIT
    formErrors.current.splice(formErrorIdx, 1);
  }

  function disableIfInvalidInput(): void {
    if ((serverNameInput.current?.value.length ?? 0) < 2) {
      serverNameInput.current?.classList.add("border-red-500");
      setCanAddServer(false);
      
      if (!formErrors.current.includes("name"))
        formErrors.current.push("name");

    } else {
      serverNameInput.current?.classList.remove("border-red-500");
      removeFormError("name");
    }

    if ((serverUrlInput.current?.value.length ?? 0) < 2 || serverIconInput.current?.value.toLowerCase().includes("http")) {
      serverUrlInput.current?.classList.add("border-red-500");
      setCanAddServer(false);
      
      if (!formErrors.current.includes("url"))
        formErrors.current.push("url");

    } else {
      serverUrlInput.current?.classList.remove("border-red-500");
      removeFormError("url");
    }

    console.log(formErrors.current);
    if (formErrors.current.length === 0) {
      setCanAddServer(true);
    }
  }

  function addServer(): void {
    if (!canAddServer) {
      return;
    }

    let serverName = serverNameInput.current?.value;
    let serverUrl = serverUrlInput.current?.value;
    let serverIcon = serverIconInput.current?.value;

    if (serverName === undefined || serverUrl === undefined || serverIcon === undefined) {
      toast({
        title: "Uh oh...",
        description: "Failed to grab server information. Please try again.",
      });
      return;
    }

    let savedServers: SavedServers = JSON.parse(localStorage.getItem('servers') ?? `{"version":${SAVED_SERVERS_INTERFACE_VERSION},"servers":[]}`);
    if (!acknowledgedMultiaccountWarning.current) {
      if (savedServers.servers.find((server) => server.url === serverUrl)) {
        toast({
          title: "Hey, wait a minute!",
          description: "This server is already in your list. Multiaccounting is banned on most if not all servers.\nIf you are sure you want to add this server, click plus icon again.",
        });
        setCanAddServer(false);
        setTimeout(() => { setCanAddServer(true); }, 3000);
        acknowledgedMultiaccountWarning.current = true;
        return;
      }
    }
    
    if (savedServers.servers.find((server) => server.name === serverName)) {
      toast({
        title: "Uh oh!",
        description: "This server name is already in your list. Please choose a different name.",
      });
      return;
    }


    savedServers.servers.push({ id: generateId(), name: serverName, icon: serverIcon, url: serverUrl });
    localStorage.setItem('servers', JSON.stringify(savedServers));
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
      <Input placeholder="ex. Bancho" ref={serverNameInput} onChange={disableIfInvalidInput} />
      <div className="mt-6"></div>
      <div className="flex-row">
        <FontAwesomeIcon icon={faIcons} width={16} height={16} />
        <Label className="ml-2 font-bold w-full">Server Icon</Label>
      </div>
      <div className="mt-3"></div>
      <Input placeholder="ex. https://osu.ppy.sh/favicon.ico" ref={serverIconInput} />
      <div className="mt-6"></div>
      <div className="flex-row">
        <FontAwesomeIcon icon={faPenToSquare} width={16} height={16} />
        <Label className="ml-2 font-bold w-full">Server URL</Label>
      </div>
      <div className="mt-3"></div>
      <Input placeholder="ex. ppy.sh. do not include http(s)!" ref={serverUrlInput} onChange={disableIfInvalidInput} />
      <div className="mt-6"></div>
      <div className="flex w-full mt-4 justify-end">
        <Button variant="ghost" className="bottom-4 right-4" disabled={!canAddServer} onClick={addServer}>
          <FontAwesomeIcon icon={faPlus} width={16} height={16} />
        </Button>
      </div>
    </div>
  );
}