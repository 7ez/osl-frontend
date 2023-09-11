import { useEffect } from "react";
import { Credentials } from "./credentials";

type DeleteProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    serverName: string;
    serverUrl: string;
};

export default function DeleteModal({
    isOpen,
    setIsOpen,
    serverName,
    serverUrl
}: DeleteProps) {
    let modal: HTMLDialogElement;
    const closeModal = () => {
      setIsOpen(false);
    };

    useEffect(() => isOpen ? modal.showModal() : modal.close());

    const deleteServer = () => {
      let servers: { id: number; name: string; logo: string; url: string }[] =
        JSON.parse(localStorage.getItem("servers")!);
      let credentials: Credentials[] =
        JSON.parse(localStorage.getItem("credentials")!);
    
      servers = servers.filter((srv) => srv.url !== serverUrl);
      credentials = credentials.filter((cred) => cred.url !== serverUrl);
    
      localStorage.setItem("servers", JSON.stringify(servers));
      localStorage.setItem("credentials", JSON.stringify(credentials));
      window.location.reload();
    };

    return (
        <dialog className="modal" ref={ (mdl) => modal = mdl as HTMLDialogElement }>
            <div className="modal-box">
            <p className="text-lg font-bold">Delete Server</p>
            <div className="pt-3" />
            <div className="form-control">
                <p>
                Are you <b>sure</b> you want to{" "}
                <a className="text-red-500">delete</a> {serverName} from your
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
                    onClick={closeModal}
                >
                    Get me out of here!
                </button>
                </div>
            </div>
            </div>
      </dialog>
    );
};
