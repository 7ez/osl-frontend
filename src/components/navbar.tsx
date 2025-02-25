import Settings from "@/components/dialog/settings";

export default function Navbar() {
  return (
    <nav className="h-12 flex">
      <h1 className="flex-1 font-bold text-4xl text-center mt-2">osu! Server Launcher</h1>
      
      <div className="flex-none mr-6 mt-6">
        <Settings />
      </div>
    </nav>
  );
}