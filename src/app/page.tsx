"use client";

import AddServerDialog from "@/components/dialog/addserver";
import Navbar from "@/components/navbar";
import ServerList from "@/components/serverlist";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem("hasVisited") !== "true") {
      localStorage.setItem("hasVisited", "true");
      window.location.href = "/setup";
    }
  });

  return (
    <main className="h-screen">
      <Navbar />
      <ServerList />

      <AddServerDialog />
      <Toaster />
    </main>
  );
}
