"use client";

import Server from "@/components/server";
import { useEffect, useState } from "react";

export default function ServerList() {
  const [loaded, setLoaded] = useState(false);
  const [servers, setServers] = useState<{ name: string, icon: string, url: string }[]>([]);
  
  useEffect(() => {
    setServers(JSON.parse(localStorage.getItem('servers') || '[]'));
    setLoaded(true);
  }, [loaded]);

  return (
    <div className="mt-12 h-fit flex flex-row flex-wrap gap-3">
      {servers.map((server) => (
        <Server key={server.name} serverName={server.name} serverLogo={server.icon} serverUrl={server.url} />
      ))}
    </div>
  );
}