import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "../ui/separator";

const VERIFIED_SERVERS = [ // TODO: Please, unhardcode this.
  {
    name: "Akatsuki",
    type: "ripple",
    client: "stable",
    logo: "https://raw.githubusercontent.com/osuAkatsuki/hanayo/master/web/static/images/logos/logo_256x.png",
    description: "Akatsuki is a private osu! server that provides a stable and reliable experience for players.",
    url: "akatsuki.gg"
  },
  {
    name: "Fuquila",
    type: "ripple",
    client: "stable",
    logo: "https://fuquila.net/static/femcat.png",
    description: "Fuquila is a private osu! server that provides a stable and reliable experience for players.",
    url: "fuquila.net"
  }
]

export default function VerifiedServers() {
  return (
    <ScrollArea className="flex h-72 flex-row flex-wrap gap-3 items-center justify-center">
      {VERIFIED_SERVERS.map((server) => (
        <>
          <Card id={server.url} className="w-[360px] h-42 ml-3 mt-3">
            <CardHeader className="flex-row">
              <Image src={server.logo} className="object-scale-down" alt={`${server.name}'s Logo`} width={24} height={24} />
              <div className="mr-3" />
              <CardTitle className="flex text-center text-lg">{server.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">{server.description}</p>

              <div className="flex w-full mt-4 justify-end">
                <Button variant="ghost" className="bottom-4 right-4">
                  <FontAwesomeIcon icon={faPlus} width={16} height={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
          {server !== VERIFIED_SERVERS[VERIFIED_SERVERS.length - 1] ? 
            <div className="flex ml-3">
              <Separator className="mt-3 w-[360px]" />
            </div>
            : null
          }
          </>
      ))}
    </ScrollArea>
  );
}