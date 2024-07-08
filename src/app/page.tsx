import AddServerDialog from "@/components/dialog/addserver";
import Navbar from "@/components/navbar";
import ServerList from "@/components/serverlist";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />
      <ServerList />

      <AddServerDialog />
      <Toaster />
    </main>
  );
}
