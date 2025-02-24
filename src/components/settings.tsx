"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { SAVED_SERVERS_INTERFACE_VERSION, SavedServers } from "@/lib/savedservers";
import { generateId } from "@/lib/helpers";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Settings() {
  const { toast } = useToast();
  const acknowledgedDeleteWarning = useRef<boolean>(false);
  const serverDataInput = useRef<HTMLInputElement>(null);
  const deleteServersButton = useRef<HTMLButtonElement>(null);

  function exportServers(): void {
    const savedServers = localStorage.getItem("servers");

    if (savedServers === null) {
      toast({
        title: "No servers found...",
        description: "You don't have any servers to export.",
      });
      return;
    }

    let serversEncoded = window.btoa(savedServers);
    navigator.clipboard.writeText(serversEncoded);

    toast({
      title: "Servers exported!",
      description: "Your servers have been exported to your clipboard.",
    });
  }

  function importServers(): void {
    if (serverDataInput.current?.value === "") {
      toast({
        title: "No data found...",
        description: "You didn't provide any data to import.",
      });
      return;
    }

    let decodedData = window.atob(serverDataInput.current!.value);
    let isOslV1 = decodedData.startsWith("[") && decodedData.endsWith("]");
    let isOslV2 = decodedData.startsWith("{") && decodedData.endsWith("}");

    if (!isOslV1 && !isOslV2) {
      toast({
        title: "Invalid data...",
        description: "This doesn't appear to be valid server data.",
      });
      return;
    }

    let parsedData = JSON.parse(decodedData);

    if (isOslV1) {
      let servers = parsedData as {
        name: string;
        logo: string;
        url: string;
      }[];

      let savedServers: SavedServers = {
        version: SAVED_SERVERS_INTERFACE_VERSION,
        servers: servers.map((server) => {
          return {
            id: generateId(),
            name: server.name,
            icon: server.logo,
            url: server.url,
          };
        }),
      }

      localStorage.setItem("servers", JSON.stringify(savedServers));
      // remove credentials because we rely on the server id anyway
      localStorage.removeItem("credentials");
      toast({
        title: "Servers imported!",
        description: "Your OSL v1 servers have been imported.",
      });
      setTimeout(() => { window.location.reload(); }, 3000);
      return;
    }

    if (isOslV2) {
      let savedServers: SavedServers = parsedData;

      // TODO: migrations if this ever changes.
      if (savedServers.version !== SAVED_SERVERS_INTERFACE_VERSION) {
        toast({
          title: "Invalid data...",
          description: "This doesn't appear to be valid server data.",
        });
        return;
      }

      localStorage.setItem("servers", JSON.stringify(savedServers));
      toast({
        title: "Servers imported!",
        description: "Your servers have been imported.",
      });
      setTimeout(() => { window.location.reload(); }, 3000);
      return;
    }
  }

  function deleteServers(): void {
    if (localStorage.getItem("servers") === null) {
      toast({
        title: "No servers found...",
        description: "You don't have any servers to delete.",
      });
      return;
    }

    if (!acknowledgedDeleteWarning.current) {
      toast({
        title: "Wait a minute!",
        description: "Are you sure you want to delete ALL of your saved servers and credentials? This cannot be undone.",
      });
      acknowledgedDeleteWarning.current = true;
      deleteServersButton.current!.disabled = true;
      setTimeout(() => {
        if (deleteServersButton.current !== null) // fixes an error where the modal is long closed and it tries to set disabled
          deleteServersButton.current.disabled = false; 
      }, 5000);
      return;
    }

    localStorage.removeItem("servers");
    localStorage.removeItem("credentials");
    toast({
      title: "Servers deleted!",
      description: "Your servers have been deleted.",
    });
    setTimeout(() => { window.location.reload(); }, 3000);
  }

  return (
    <Dialog onOpenChange={(open) => { if (!open) { acknowledgedDeleteWarning.current = false; } }}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-white h-8">
          <FontAwesomeIcon icon={faCog} width={17} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="mt-2"></div>

        <ScrollArea className="flex h-96">
          <div className="flex flex-col">
            <DialogTitle>Export servers</DialogTitle>
            <Separator className="mt-2 mb-2" />
            <DialogDescription>
              This option allows you to export your servers and share it to your friends. (or move PCs/browsers/etc.)
              <br />
              Your credentials are not included.
            </DialogDescription>
            <div className="mt-6"></div>

            <Button onClick={exportServers}>Export</Button>
          </div>
          
          <Separator className="mt-6 mb-6" />

          <div className="flex flex-col">
            <DialogTitle>Import servers</DialogTitle>
            <Separator className="mt-2 mb-2" />
            <DialogDescription>
              This option allows you to import servers from previously exported data.
              <br />
              <b className="text-red-500">
                WARNING: {" "}
              </b>
              THIS WILL OVERWRITE YOUR CURRENT SERVERS.
            </DialogDescription>
            <div className="mt-6"></div>
            <Input ref={serverDataInput} placeholder="Paste your server data here" />
            <div className="mt-3"></div>
            
            <Button onClick={importServers}>Import</Button>
          </div>

          <Separator className="mt-6 mb-6" />

          <div className="flex flex-col">
            <DialogTitle>Delete servers</DialogTitle>
            <Separator className="mt-2 mb-2" />
            <DialogDescription>
              This option allows you to delete all saved servers and credentials. 
              <br />
              <b className="text-red-500">
                WARNING: {" "}
              </b>
              THIS CANNOT BE UNDONE.
            </DialogDescription>
            <div className="mt-6"></div>

            <Button onClick={deleteServers} ref={deleteServersButton} variant="destructive">Delete</Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}