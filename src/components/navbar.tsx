import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="h-12 flex">
      <h1 className="flex-1 font-bold text-4xl text-center mt-2">osu! Server Launcher</h1>
      
      <div className="flex-none mr-6 mt-6">
        <Button variant="ghost" className="text-white h-8">
          <FontAwesomeIcon icon={faCog} width={17} height={16} />
        </Button>
      </div>
    </nav>
  );
}