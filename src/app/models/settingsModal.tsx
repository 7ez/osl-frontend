import { useEffect } from "react";
import { Credentials } from "./credentials";

type DeleteProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export default function SettingsModal({
    isOpen,
    setIsOpen,
}: DeleteProps) {
    let modal: HTMLDialogElement;

    const closeModal = () => {
        setIsOpen(false);
    };

    // A hack for ::backdrop pseudo-element not working
    useEffect(() => isOpen ? modal.showModal() : modal.close());

    return (
        <dialog className="modal" ref={ (mdl) => modal = mdl as HTMLDialogElement }>
            <div className="modal-box">
                <p className="text-lg font-bold">Settings</p>
                <div className="pt-3" />
                <div className="form-control">
                    <p>
                        <a className="text-red-500">Clear</a> all servers and credentials?
                    </p>
                    <p>This action is irreversible.</p>
                    <div className="pt-6" />
                    <div className="flex flex-row">
                        <button
                            className="btn bg-red-600"
                            type="button"
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                        >
                            Clear
                        </button>
                        <div className="px-2" />
                        <button
                            className="btn"
                            type="button"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
      </dialog>
    );
};
