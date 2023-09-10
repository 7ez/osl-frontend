"use client";

import { useEffect, useState } from "react";
import Server from "./models/server";

export default function Home() {
  const [servers, setServers] = useState<{ id: number, name: string, logo: string, url: string }[]>([]);

  useEffect(() => {
    if (localStorage.getItem("hasVisited") !== "true") {
      localStorage.setItem("hasVisited", "true");
      window.location.href = "/setup";
    }

    var servers_str = localStorage.getItem("servers");

    if (servers_str == null) {
      localStorage.setItem("servers", JSON.stringify([]));
    } else {
      setServers(JSON.parse(servers_str));
    }

  }, []);

  const showAddModal = () => {
    const addModal = document.getElementById("addModal") as HTMLDialogElement;
    if (!addModal.open)
      addModal.showModal();
    else
      addModal.close();
  }

  const saveAdd = () => {
    const addModal = document.getElementById("addModal") as HTMLDialogElement;
    const serverName = addModal.getElementsByTagName("input")[0];
    const serverIcon = addModal.getElementsByTagName("input")[1];
    const serverURL = addModal.getElementsByTagName("input")[2];

    if (serverName.value == "" || serverIcon.value == "" || serverURL.value == "")
      return;

    var error = false;
    servers.forEach((srv: { id: number; name: string; logo: string; url: string; }) => {
      if (srv.name == serverName.value || srv.name == serverIcon.value || srv.name == serverURL.value || serverName.value.length < 3) {
        serverName.classList.add("input-error");
        error = true;
      }

      if (serverIcon.value.length < 4 || !serverIcon.value.startsWith("http") || !serverIcon.value.includes(".")) {
        serverIcon.classList.add("input-error");
        error = true;
      }

      if (srv.url == serverURL.value || srv.url == serverIcon.value || srv.url == serverName.value || serverURL.value.length < 4) {
        serverURL.classList.add("input-error");
        error = true;
      }
    });

    if (error) return;

    var newServer = {
      id: servers.length > 0 ? servers.length + 1 : 0,
      name: serverName.value,
      logo: serverIcon.value,
      url: serverURL.value
    };

    servers.push(newServer);
    localStorage.setItem("servers", JSON.stringify(servers));
    addModal.close();
    setServers(servers); // NOTE: this somehow doesn't re-render the page
    window.location.reload();
  };

  return (
    // TODO: fix scrollbar popping up for no reason
    <main className="flex min-h-screen flex-col">
      <nav className="static navbar navbar-center h-20 bg-base-200">
        <div className="flex-1 items-center justify-center">
            <a href="#" className="text-4xl font-bold">osu! Server Launcher</a>
        </div>
      </nav>

      <div className="bg-base-200 h-screen pt-2 pl-3 flex flex-row flex-wrap" style={{alignContent: "flex-start"}}>
        {servers.map((srv: { id: number; name: string; logo: string; url: string; }) => {
            return (
              // why does this work and how
              <><Server id={srv.id} name={srv.name} logo_url={srv.logo} url={srv.url} /><div className="w-3"></div></>
            )
          })
        }
      </div>

      <dialog id="addModal" className="modal">
        <div className="modal-box">
          <p className="text-lg font-bold">Add Server</p>
          <div className="pt-3" />
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Server Name" id="server-name" className="input input-bordered"/>
                <label className="label">
                  <span className="label-text">Logo URL</span>
                </label>
                <input type="text" placeholder="Logo URL" id="server-logo" className="input input-bordered" />
                <label className="label">
                  <span className="label-text">Server URL</span>
                </label>
                <input type="text" placeholder="Server URL" id="server-url" className="input input-bordered" />
                <div className="pt-3" />
                <div className="flex flex-row">
                <button className="btn btn-primary" type="button" onClick={saveAdd}>Save</button>
                <div className="w-2" />
                <button className="btn" type="button" onClick={showAddModal}>Cancel</button>
            </div>
          </div>
        </div>
      </dialog>

      <div className="justify-end">
        <button className="btn btn-circle btn-ghost" onClick={showAddModal}>+</button>

      </div>
    </main>
  )
}
