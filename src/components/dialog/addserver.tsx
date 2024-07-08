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

export default function AddServerDialog() {
  const [selectedTab, setSelectedTab] = useState<number>(1);

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
          <Button className="w-[50%]" variant={selectedTab == 1 ? "outline" : "ghost"} onClick={() => { setSelectedTab(1); }}>Verified Servers</Button>
          <Button className="w-[50%]" variant={selectedTab == 2 ? "outline" : "ghost"} onClick={() => { setSelectedTab(2); }}>Add your own</Button>
        </div>

        {selectedTab == 1 ? <VerifiedServers /> : null}
        {selectedTab == 2 ? <OwnServer /> : null}
      </DialogContent>
    </Dialog>
  );
}