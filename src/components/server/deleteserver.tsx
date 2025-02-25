"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SavedServers } from "@/lib/savedservers";

export default function DeleteServer(props: { 
  open: boolean, 
  onOpenChange: (open?: boolean) => void, 
  serverId: string, 
  serverName: string, 
}) {
  const { toast } = useToast();


  function deleteServer(): void {
    let savedServers: SavedServers = JSON.parse(localStorage.getItem("servers")!);
    let serverIdx = savedServers.servers.findIndex((server) => server.id === props.serverId);

    if (serverIdx === -1) {
      toast({
        title: "Uh oh...",
        description: "The server you're trying to delete appears to be already deleted."
      })
      // refresh with a smaller delay in case of a desync
      setTimeout(() => { window.location.reload(); }, 1500);
      return;
    }

    savedServers.servers.splice(serverIdx, 1);
    localStorage.setItem("servers", JSON.stringify(savedServers));
    toast({
      title: "Success!",
      description: `${props.serverName} has been deleted.`
    });
    setTimeout(() => { window.location.reload(); }, 3000);
  }

  return (
    <Dialog key={props.serverName} open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wait a minute!</DialogTitle>
          <DialogDescription>Are you sure you want to <b>delete</b> {props.serverName} from your servers list? This action is irreversible.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex w-full mt-4 justify-end gap-3">
            <Button variant="ghost" className="bottom-4 right-4" onClick={() => { props.onOpenChange(false); }}>
              <FontAwesomeIcon icon={faX} width={16} height={16} />
            </Button>
            <Button variant="ghost" className="bottom-4 right-4" onClick={deleteServer}>
              <FontAwesomeIcon icon={faCheck} width={16} height={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}