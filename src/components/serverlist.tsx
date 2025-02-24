"use client";

import Server from "@/components/server";
import { SavedServers, SAVED_SERVERS_INTERFACE_VERSION } from "@/lib/savedservers";
import { useEffect, useState } from "react";

export default function ServerList() {
  const [loaded, setLoaded] = useState(false);
  const [savedServers, setServers] = useState<SavedServers>({ version: SAVED_SERVERS_INTERFACE_VERSION, servers: [] });
  
  useEffect(() => {
    let storedServers = localStorage.getItem('servers');
    
    if (storedServers !== null) // use default value if no key was found
      setServers(JSON.parse(storedServers));

    setLoaded(true);
  }, [loaded]);

  return (
    <div className="mt-12 h-fit flex flex-row flex-wrap gap-3">
      {savedServers.servers.map((server) => (
        <Server key={server.id} serverId={server.id} serverName={server.name} serverLogo={server.icon} serverUrl={server.url} />
      ))}
    </div>
  );
}