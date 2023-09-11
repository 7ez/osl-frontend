"use client";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ServerImage } from "./serverImage";
import CredentialsModal from "./credentialsModal";
import DeleteModal from "./deleteModal";
import EditModal from "./editModal";
import { Credentials } from "./credentials";

export default function Server(props: {
  name: string;
  logo_url: string;
  url: string;
  setServers: (servers: { name: string; logo: string; url: string }[]) => void;
}) {
  const [credentialsOpen, _setCredentialsOpen ] = useState(false);
  const [deleteOpen, _setDeleteOpen ] = useState(false);
  const [editOpen, _setEditOpen] = useState(false);

  const setCredentialsOpen = (isOpen: boolean) => {
    _setCredentialsOpen(isOpen);

    if (!isOpen) setEditOpen(false);
  };

  const setDeleteOpen = (isOpen: boolean) => {
    _setDeleteOpen(isOpen);
  };

  const setEditOpen = (isOpen: boolean) => {
    _setEditOpen(isOpen);

    if (!isOpen) {
      const servers: { name: string; logo: string; url: string }[] = JSON.parse(localStorage.getItem("servers")!);
      props.setServers(servers);
    }
  };

  const openEdit = () => {
    setEditOpen(true);
  };

  const openServer = () => {
    let credentials = getCredentials();

    if (credentials == null) window.location.href = `osl://launch/${props.url}`;
    else
      window.location.href = `osl://launch-credentials/${credentials.username}:${credentials.password}/${props.url}`;
  };

  const getCredentials = (): Credentials | null => {
    let credentials = localStorage.getItem("credentials");

    if (credentials == null) {
      localStorage.setItem("credentials", JSON.stringify([]));
      return null;
    }

    return JSON.parse(credentials).find(
      (cred: Credentials) =>
        cred.url == props.url
    );
  };

  return (
    <ul className="card w-64 h-40 bg-neutral shadow-xl mt-3">
      <div className="card-body">
        <div className="flex flex-row">
          <div className="inline">
            {getCredentials()?.username && getCredentials()?.active ? (
              <FontAwesomeIcon
                icon={faLock}
                height="16"
                width="16"
                className="text-yellow-500 text-2xl absolute pl-5 pt-3"
              />
            ) : getCredentials()?.username && !(getCredentials()?.active) ? (
              <FontAwesomeIcon
                icon={faLock}
                height="16"
                width="16"
                className="text-gray-600 text-2xl absolute pl-5 pt-3"
              />
            ) : (
              <div />
            )}
            <ServerImage
              serverLogo={props.logo_url}
              serverUrl={props.url}
              alt={`${props.name} Logo`}
              height="32"
              width="32"
            ></ServerImage>
          </div>
          <p className="pl-2 card-title">{props.name}</p>
        </div>
        <div className="pb-3" />
        <div className="card-actions">
          <button className="btn" type="button" onClick={openServer}>
            Connect
          </button>
          <button className="btn" type="button" onClick={openEdit}>
            Edit
          </button>
        </div>
      </div>

      <EditModal
        isOpen={editOpen}
        deleteOpen={deleteOpen}
        credentialsOpen={credentialsOpen}
        setIsOpen={setEditOpen}
        setDeleteOpen={setDeleteOpen}
        setCredentialsOpen={setCredentialsOpen}
        oldServerName={props.name}
        oldServerLogo={props.logo_url}
        oldServerUrl={props.url}
      />

      <CredentialsModal 
        isOpen={credentialsOpen} 
        setIsOpen={setCredentialsOpen} 
        oldUsername={getCredentials()?.username as string}
        oldPassword={getCredentials()?.password as string}
        isActive={getCredentials()?.active as boolean}
        serverUrl={props.url}
      />

      <DeleteModal
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
        serverName={props.name}
        serverUrl={props.url}
        setServers={props.setServers}
      />
    </ul>
  );
}
