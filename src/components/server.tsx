"use client";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Credentials } from "@/lib/credentials";
import { ServerImage } from "@/components/server/serverimage";
import AddCredentials from "@/components/server/addcredentials";
import EditCredentials from "@/components/server/editcredentials";
import EditServer from "@/components/server/editserver";
import DeleteServer from "@/components/server/deleteserver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlay, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Server(props: { serverId: string, serverName: string, serverLogo: string, serverUrl: string }) {
  const [contextMenuDisabled, setContextMenuDisabled] = useState(false);
  const [editServer, setEditServer] = useState<boolean>(false);
  const [deleteServer, setDeleteServer] = useState<boolean>(false);

  function getCredentials(): Credentials | null {
    let credentials: Credentials[] = JSON.parse(localStorage.getItem('credentials') || '[]');
    return credentials.find((credential) => credential.serverId === props.serverId) || null;
  }

  function launchServer(credentials: Credentials | null) {
    if (credentials) {
      window.open(`osl://launch-credentials/${credentials.username}:${credentials.password}/${props.serverUrl}`);
      return;
    }

    window.open(`osl://launch/${props.serverUrl}`);
  }

  function toggleContextMenu(disableContextMenu?: boolean) {
    setContextMenuDisabled(disableContextMenu || false);
  }

  function toggleEditServer(open?: boolean) {
    setEditServer(open || false);

    if (open) {
      toggleContextMenu(true);
    } else {
      toggleContextMenu(false);
    }
  }

  function toggleDeleteServer(open?: boolean) {
    setDeleteServer(open || false);

    if (open) {
      toggleContextMenu(true);
    } else {
      toggleContextMenu(false);
    }
  }

  let savedCredentials = getCredentials();

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={contextMenuDisabled}>
        <EditServer open={editServer} onOpenChange={toggleEditServer} serverName={props.serverName} serverLogo={props.serverLogo} serverUrl={props.serverUrl} />
        <DeleteServer open={deleteServer} onOpenChange={toggleDeleteServer} serverName={props.serverName} serverLogo={props.serverLogo} serverUrl={props.serverUrl} />
        <Card className="w-[360px] h-40 ml-3">
          <CardHeader className="flex-row">

            <div className="inline">
              {savedCredentials == null ? 
                <AddCredentials onOpenChange={toggleContextMenu} serverId={props.serverId} /> :
                <EditCredentials 
                  onOpenChange={toggleContextMenu} 
                  serverId={props.serverId} 
                  username={savedCredentials!.username}
                  password={savedCredentials!.password} 
                />
              }
              <ServerImage serverLogo={props.serverLogo} serverUrl={props.serverUrl} alt={`${props.serverName}'s Logo`} width={32} height={32} />
            </div>
            <div className="mr-3" />
            <CardTitle className="flex text-center">{props.serverName}</CardTitle>
          </CardHeader>
          <CardFooter className="mt-6">
            <Button className="w-full" onClick={() => { launchServer(savedCredentials) }}>Launch</Button>
          </CardFooter>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <div className="flex items-center h-6 min-w-full">
          <Label className="font-bold w-full text-center">{props.serverName}</Label>
        </div>
        <Separator />
        <ContextMenuItem onClick={() => { launchServer(savedCredentials) }}>
          <FontAwesomeIcon icon={faPlay} />
          <div className="mr-2"></div>
          Launch
        </ContextMenuItem>
        <ContextMenuItem onClick={() => { toggleEditServer(true); }}>
          <FontAwesomeIcon icon={faEdit} />
          <div className="mr-2"></div>
          Edit
        </ContextMenuItem>
        <ContextMenuItem onClick={() => { toggleDeleteServer(true); }}>
          <FontAwesomeIcon icon={faX} />
          <div className="mr-2"></div>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>

  );
}