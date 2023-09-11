import { useEffect, useState } from "react";

type AddProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export default function AddModal({
    isOpen,
    setIsOpen
}: AddProps) {
    const [serverName, setServerName] = useState("");
    const [serverLogo, setServerLogo] = useState("");
    const [serverUrl, setServerUrl] = useState("");

    let modal: HTMLDialogElement;
    let serverNameEl: HTMLInputElement;
    let serverIconEl: HTMLInputElement;
    let serverUrlEl: HTMLInputElement;

    useEffect(() => isOpen ? modal.showModal() : modal.close());

    const saveAdd = () => {
        let servers: { id: number; name: string; logo: string; url: string }[] =
            JSON.parse(localStorage.getItem("servers")!);
    
        if (serverName == "" || serverUrl == "") return;
    
        let error = false;
        servers.forEach(
          (srv: { id: number; name: string; logo: string; url: string }) => {
            if (
              srv.name === serverName ||
              srv.name === serverUrl ||
              serverName.length < 3
            ) {
              serverNameEl.classList.add("input-error");
              error = true;
            }
    
            if (serverLogo !== "") {
              if (
                serverLogo.length < 4 ||
                !serverLogo.startsWith("http") ||
                !serverLogo.includes(".")
              ) {
                serverIconEl.classList.add("input-error");
                error = true;
              }
            }
    
            if (
              srv.url === serverUrl ||
              srv.url === serverName ||
              serverUrl.length < 4
            ) {
              serverUrlEl.classList.add("input-error");
              error = true;
            }
          }
        );
    
        if (error) return;
    
        let newServer = {
          id: servers.length > 0 ? servers.length + 1 : 0,
          name: serverName,
          logo: serverLogo ?? "",
          url: serverUrl,
        };
    
        servers.push(newServer);
        localStorage.setItem("servers", JSON.stringify(servers));
        setIsOpen(false);
        window.location.reload();
      };

    return (
        <dialog className="modal" ref={ (mdl) => modal = mdl as HTMLDialogElement }>
        <div className="modal-box">
          <p className="text-lg font-bold">Add Server</p>
          <div className="pt-3" />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Server Name"
              ref={ (el) => serverNameEl = el as HTMLInputElement }
              className="input input-bordered"
              onInput={ (e) => setServerName(e.currentTarget.value) }
            />
            <label className="label">
              <span className="label-text">Logo URL (optional)</span>
            </label>
            <input
              type="text"
              placeholder="Logo URL"
              ref={ (el) => serverIconEl = el as HTMLInputElement }
              className="input input-bordered"
              onInput={ (e) => setServerLogo(e.currentTarget.value) }
            />
            <label className="label">
              <span className="label-text">Server URL (ex. ppy.sh)</span>
            </label>
            <input
              type="text"
              placeholder="Server URL"
              ref={ (el) => serverUrlEl = el as HTMLInputElement }
              className="input input-bordered"
              onInput={ (e) => setServerUrl(e.currentTarget.value) }
            />
            <div className="pt-3" />
            <div className="flex flex-row">
              <button
                className="btn btn-primary"
                type="button"
                onClick={saveAdd}
              >
                Save
              </button>
              <div className="w-2" />
              <button className="btn" type="button" onClick={ () => setIsOpen(false) }>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    )
}