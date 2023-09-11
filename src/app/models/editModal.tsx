import { useEffect, useState } from "react";

type EditProps = {
    isOpen: boolean;
    deleteOpen: boolean;
    credentialsOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setDeleteOpen: (isOpen: boolean) => void;
    setCredentialsOpen: (isOpen: boolean) => void;
    oldServerName: string;
    oldServerLogo: string;
    oldServerUrl: string;
    id: number;
};

export default function EditModal({
    isOpen,
    deleteOpen,
    credentialsOpen,
    setIsOpen,
    setDeleteOpen,
    setCredentialsOpen,
    oldServerName,
    oldServerLogo,
    oldServerUrl,
    id,
}: EditProps) {
    const [serverName, setServerName] = useState(oldServerName);
    const [serverLogo, setServerLogo] = useState(oldServerLogo);
    const [serverUrl, setServerUrl] = useState(oldServerUrl);
    let modal: HTMLDialogElement;

    const closeModal = () => {
      setIsOpen(false);
    };

    const openCredentials = () => {
        setCredentialsOpen(true);
    };

    const openDelete = () => {
        setDeleteOpen(true);
    };

    useEffect(() => {
        if (isOpen && !(deleteOpen || credentialsOpen)) {
            modal.showModal();
        } else {
            modal.close();
        }
    });

    const saveEdit = () => {
        let servers: { id: number; name: string; logo: string; url: string }[] =
          JSON.parse(localStorage.getItem("servers")!);
    
        servers.forEach((srv) => {
          if (srv.id == id) {
            srv.name = serverName;
            srv.logo = serverLogo;
            srv.url = serverUrl;
          }
        });
    
        localStorage.setItem("servers", JSON.stringify(servers));
        closeModal();
      };

    return (
        <dialog className="modal" ref={ (mdl) => modal = mdl as HTMLDialogElement }>
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
              defaultValue={serverName}
              onInput={(e) => setServerName((e.target as HTMLInputElement).value)}
            />
            <label className="label">
              <span className="label-text">Logo URL (optional, ex. https://osu.server/favicon.ico)</span>
            </label>
            <input
              type="text"
              placeholder="Logo URL"
              id="server-logo"
              className="input input-bordered"
              defaultValue={serverLogo}
              onInput={(e) => setServerLogo((e.target as HTMLInputElement).value)}
            />
            <label className="label">
              <span className="label-text">Server URL (ex. ppy.sh)</span>
            </label>
            <input
              type="text"
              placeholder="Server URL"
              id="server-url"
              className="input input-bordered"
              defaultValue={serverUrl}
              onInput={(e) => setServerUrl((e.target as HTMLInputElement).value)}
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
                onClick={openDelete}
              >
                Delete
              </button>
              <div className="w-2" />
              <button className="btn" type="button" onClick={closeModal}>
                Cancel
              </button>
              <div className="w-2" />
              <button
                className="btn"
                type="button"
                onClick={openCredentials}
              >
                Add credentials
              </button>
            </div>
          </div>
        </div>
      </dialog>
    );
};
