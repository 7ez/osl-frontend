"use client";

import { useEffect, useState } from "react";
import Server from "./models/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import SettingsModal from "./models/settingsModal";
import AddModal from "./models/addModal";

export default function Home() {
  const [servers, _setServers] = useState<
    { name: string; logo: string; url: string }[]
  >([]);
  const [settingsOpen, _setSettingsOpen] = useState(false);
  const [addOpen, _setAddOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("hasVisited") !== "true") {
      localStorage.setItem("hasVisited", "true");
      window.location.href = "/setup";
    }

    if (servers.length === 0) {
      let servers_str = localStorage.getItem("servers");

      if (servers_str === null) {
        localStorage.setItem("servers", JSON.stringify([]));
      } else {
        _setServers(JSON.parse(servers_str));
      }
    }
  }, []);

  const setServers = (servers: { name: string; logo: string; url: string }[]) => {
    _setServers(servers);
  };

  const setSettingsOpen = (isOpen: boolean) => {
    _setSettingsOpen(isOpen);
  };

  const setAddOpen = (isOpen: boolean) => {
    _setAddOpen(isOpen);
  };

  return (
    <main className="flex h-screen flex-col">
      <nav className="static navbar navbar-center h-20 bg-base-200">
        <div className="flex-1 items-center justify-center">
          <a href="#" className="text-4xl font-bold">
            osu! Server Launcher
          </a>
        </div>

        <div className="flex-none">
          <div className="flex items-center justify-center">
            <button 
              className="btn btn-circle btn-ghost h-8"
              onClick={ () => setSettingsOpen(true) }
            >
              <FontAwesomeIcon 
                icon={faCog}
                height="16"
                width="16"
                className="text-white"
              />
            </button>
          </div>
        </div>
      </nav>

      <li
        className="bg-base-200 h-full pt-2 pl-3 flex flex-row flex-wrap"
        style={{ alignContent: "flex-start" }}
      >
        {servers.map(
          (srv) => {
            return (
              // why does this work and how
              <>
                <Server
                  name={srv.name}
                  logo_url={srv.logo}
                  url={srv.url}
                  setServers={setServers}
                />
                <div className="w-3"></div>
              </>
            );
          }
        )}
      </li>

      <button
        className="btn btn-circle btn-primary fixed bottom-5 right-5 text-white text-center"
        onClick={ () => setAddOpen(true) }
      >
        +
      </button>

      <AddModal
        isOpen={addOpen}
        setIsOpen={setAddOpen}
        setServers={setServers}
      />

      <SettingsModal
        isOpen={settingsOpen}
        setIsOpen={setSettingsOpen}
      />
    </main>
  );
}
