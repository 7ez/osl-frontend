"use client";

import { faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ImageWithFallback } from "./imageWithFallback";

export default function Server(props: {
  id: number;
  name: string;
  logo_url: string;
  url: string;
}) {
  const [seed, setSeed] = useState(1);
  const reloadComponent = () => {
    setSeed(Math.random());
  };

  const handleEditClick = () => {
    const editModal = document.getElementById(
      `editModal${props.id}`
    ) as HTMLDialogElement;
    if (!editModal.open) editModal.showModal();
    else editModal.close();
  };

  const handleCredentialsClick = () => {
    const editModal = document.getElementById(
      `editModal${props.id}`
    ) as HTMLDialogElement;
    const credentialsModal = document.getElementById(
      `credentialsModal${props.id}`
    ) as HTMLDialogElement;

    if (!credentialsModal.open) {
      editModal.close();
      credentialsModal.showModal();
    } else {
      credentialsModal.close();
      editModal.show();
    }
  };

  const saveEdit = () => {
    const editModal = document.getElementById(
      `editModal${props.id}`
    ) as HTMLDialogElement;
    const serverName = editModal.getElementsByTagName("input")[0];
    const serverIcon = editModal.getElementsByTagName("input")[1];
    const serverURL = editModal.getElementsByTagName("input")[2];

    var servers: { id: number; name: string; logo: string; url: string }[] =
      JSON.parse(localStorage.getItem("servers")!);

    servers.forEach((srv) => {
      if (srv.id == props.id) {
        srv.name = serverName.value;
        srv.logo = serverIcon.value;
        srv.url = serverURL.value;
      }
    });

    localStorage.setItem("servers", JSON.stringify(servers));
    editModal.close();
    reloadComponent();
  };

  const openServer = () => {
    var credentials = getCredentials();

    if (credentials == null) window.location.href = `osl://launch/${props.url}`;
    else
      window.location.href = `osl://launch-credentials/${credentials.username}:${credentials.password}/${props.url}`;
  };

  const deleteServer = () => {
    const editModal = document.getElementById(
      `editModal${props.id}`
    ) as HTMLDialogElement;
    var servers: { id: number; name: string; logo: string; url: string }[] =
      JSON.parse(localStorage.getItem("servers")!);
    var credentials: { username: string; password: string; url: string }[] =
      JSON.parse(localStorage.getItem("credentials")!);
    const sIdx = servers.indexOf(servers.find((srv) => srv.id == props.id)!);
    const cIdx = credentials.indexOf(
      credentials.find((cred) => cred.url == props.url)!
    );
    servers.splice(sIdx, 1);
    credentials.splice(cIdx, 1);

    // refresh ids
    servers.forEach(
      (
        srv: { id: number; name: string; logo: string; url: string },
        idx: number
      ) => {
        srv.id = idx;
      }
    );

    localStorage.setItem("servers", JSON.stringify(servers));
    editModal.close();

    window.location.reload();
  };

  const getCredentials = () => {
    var credentials = localStorage.getItem("credentials");

    if (credentials == null) {
      localStorage.setItem("credentials", JSON.stringify([]));
      return null;
    }

    return JSON.parse(credentials).find(
      (cred: { username: string; password: string; url: string }) =>
        cred.url == props.url
    );
  };

  const handleShowPassword = () => {
    const credentialsModal = document.getElementById(
      `credentialsModal${props.id}`
    ) as HTMLDialogElement;
    const passwordInput = credentialsModal.getElementsByTagName(
      "input"
    )[1] as HTMLInputElement;
    const eye = document.getElementById(`${props.id}eye`) as HTMLElement;
    const eyeSlash = document.getElementById(
      `${props.id}eyeSlash`
    ) as HTMLElement;

    if (passwordInput.type == "password") {
      passwordInput.type = "text";
      eyeSlash.classList.remove("hidden");
      eye.classList.add("hidden");
    } else {
      passwordInput.type = "password";
      eye.classList.remove("hidden");
      eyeSlash.classList.add("hidden");
    }
  };

  const saveCredentials = () => {
    const credentialsModal = document.getElementById(
      `credentialsModal${props.id}`
    ) as HTMLDialogElement;
    const usernameInput = credentialsModal.getElementsByTagName(
      "input"
    )[0] as HTMLInputElement;
    const passwordInput = credentialsModal.getElementsByTagName(
      "input"
    )[1] as HTMLInputElement;
    var credentials = JSON.parse(localStorage.getItem("credentials")!);

    if (credentials == null) credentials = [];

    var cred = credentials.find(
      (cred: { username: string; password: string; url: string }) =>
        cred.url == props.url
    );

    if (cred == null)
      cred = {
        username: usernameInput.value,
        password: passwordInput.value,
        url: props.url,
      };
    else {
      cred.username = usernameInput.value;
      cred.password = passwordInput.value;
    }

    credentials.push(cred);
    localStorage.setItem("credentials", JSON.stringify(credentials));
    credentialsModal.close();
    reloadComponent();
  };

  const handleConfirmDelete = () => {
    const deleteModal = document.getElementById(
      `deleteModal${props.id}`
    ) as HTMLDialogElement;
    const editModal = document.getElementById(
      `editModal${props.id}`
    ) as HTMLDialogElement;

    if (!deleteModal.open) {
      editModal.close();
      deleteModal.showModal();
    } else {
      deleteModal.close();
      editModal.show();
    }
  };

  return (
    <div className="card w-64 h-40 bg-neutral shadow-xl mt-3">
      <div className="card-body">
        <div className="flex flex-row">
          <div className="inline">
            {/* banger */}
            {getCredentials() != null && getCredentials().username != "" ? (
              <FontAwesomeIcon
                icon={faLock}
                height="16"
                width="16"
                className="text-yellow-500 text-2xl absolute pl-5 pt-3"
              />
            ) : (
              <div />
            )}
            <ImageWithFallback
              src={props.logo_url}
              fallbackSrc="/fallback.png"
              alt={`${props.name} Logo`}
              height="32"
              width="32"
            ></ImageWithFallback>
          </div>
          <p className="pl-2 card-title">{props.name}</p>
        </div>
        <div className="pb-3" />
        <div className="card-actions">
          <button className="btn" type="button" onClick={openServer}>
            Connect
          </button>
          <button className="btn" type="button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </div>
      <dialog id={`editModal${props.id}`} className="modal">
        <div className="modal-box">
          <p className="text-lg font-bold">Edit Server</p>
          <div className="pt-3" />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Server Name"
              id="server-name"
              className="input input-bordered"
              defaultValue={props.name}
            />
            <label className="label">
              <span className="label-text">Logo URL</span>
            </label>
            <input
              type="text"
              placeholder="Logo URL"
              id="server-logo"
              className="input input-bordered"
              defaultValue={props.logo_url}
            />
            <label className="label">
              <span className="label-text">Server URL</span>
            </label>
            <input
              type="text"
              placeholder="Server URL"
              id="server-url"
              className="input input-bordered"
              defaultValue={props.url}
            />
            <div className="pt-3" />
            <div className="flex flex-row">
              <button
                className="btn btn-primary"
                type="button"
                onClick={saveEdit}
              >
                Save
              </button>
              <div className="w-2" />
              <button
                className="btn bg-red-600 text-white"
                type="button"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <div className="w-2" />
              <button className="btn" type="button" onClick={handleEditClick}>
                Cancel
              </button>
              <div className="w-2" />
              <button
                className="btn"
                type="button"
                onClick={handleCredentialsClick}
              >
                Add credentials
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id={`credentialsModal${props.id}`} className="modal">
        <div className="modal-box">
          <p className="text-lg font-bold">Server Credentials</p>
          <div className="pt-3" />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              id="server-username"
              className="input input-bordered"
              defaultValue={getCredentials()?.username}
            />
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="flex flex-row w-full">
              <input
                type="password"
                placeholder="Password"
                id="server-password"
                className="input input-bordered w-full"
                defaultValue={getCredentials()?.password}
              />
              <button
                className="btn btn-ghost btn-sm h-12"
                id="show-password"
                onClick={handleShowPassword}
                type="button"
              >
                <FontAwesomeIcon id={`${props.id}eye`} icon={faEye} />
                <FontAwesomeIcon
                  id={`${props.id}eyeSlash`}
                  className="hidden"
                  icon={faEyeSlash}
                />
              </button>
            </div>
            <div className="pt-6" />
            <div className="flex flex-row">
              <button
                className="btn btn-primary"
                type="button"
                onClick={saveCredentials}
              >
                Save
              </button>
              <div className="w-2" />
              <button
                className="btn"
                type="button"
                onClick={handleCredentialsClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id={`deleteModal${props.id}`} className="modal">
        <div className="modal-box">
          <p className="text-lg font-bold">Delete Server</p>
          <div className="pt-3" />
          <div className="form-control">
            <p>
              Are you <b>sure</b> you want to{" "}
              <a className="text-red-500">delete</a> {props.name} from your
              server list?
            </p>
            <p>This action is irreversible.</p>
            <div className="pt-6" />
            <div className="flex flex-row">
              <button
                className="btn bg-red-600"
                type="button"
                onClick={deleteServer}
              >
                Delete
              </button>
              <div className="w-2" />
              <button
                className="btn"
                type="button"
                onClick={handleConfirmDelete}
              >
                Get me out of here!
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
