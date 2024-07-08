"use client";

import Server from "./server";

export default function ServerList() {
  let servers = JSON.parse(localStorage.getItem('servers') || '[]');

  return (
    <div className="mt-12 h-fit flex flex-row flex-wrap gap-3">
      {servers.map((server: { name: string, icon: string, url: string }) => (
        <Server key={server.name} serverName={server.name} serverLogo={server.icon} serverUrl={server.url} />
      ))}
    </div>
  );
}