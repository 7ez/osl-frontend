"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import VerifiedServers from "@/components/dialog/verifiedservers";
import OwnServer from "@/components/dialog/ownserver";

const VERIFIED_SERVERS_TAB: number = 1;
const OWN_SERVER_TAB: number = 2;

export default function AddServerDialog() {
  const [selectedTab, setSelectedTab] = useState<number>(OWN_SERVER_TAB);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="fixed bottom-4 right-4">
          <FontAwesomeIcon icon={faPlus} width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Server</DialogTitle>
          <DialogDescription>
            Add a new server to the list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row">
          {/* unused for now
            <Button className="w-[50%]" variant={selectedTab == VERIFIED_SERVERS_TAB ? "outline" : "ghost"} onClick={() => { setSelectedTab(1); }}>Verified Servers</Button> 
          */}
          <Button className={`w-[100%]`} variant={selectedTab == OWN_SERVER_TAB ? "outline" : "ghost"} onClick={() => { setSelectedTab(OWN_SERVER_TAB); }}>Add your own</Button>
        </div>

        {/* {selectedTab == VERIFIED_SERVERS_TAB ? <VerifiedServers /> : null} */}
        {selectedTab == OWN_SERVER_TAB ? <OwnServer /> : null}
      </DialogContent>
    </Dialog>
  );
}