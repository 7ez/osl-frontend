"use client";

import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function DeleteServer(props: { open: boolean, onOpenChange: (open?: boolean) => void, serverUrl: string, serverName: string, serverLogo: string }) {
  const { toast } = useToast();


  function deleteServer(): void {
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