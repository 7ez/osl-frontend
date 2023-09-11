import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Credentials } from "./credentials";

type CredentialProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    oldUsername: string | null;
    oldPassword: string | null;
    isActive: boolean | null;
    serverUrl: string;
};

export default function CredentialsModal({
    isOpen,
    setIsOpen,
    oldUsername,
    oldPassword,
    isActive,
    serverUrl,
}: CredentialProps) {
    const [username, setUsername] = useState(oldUsername ?? "");
    const [password, setPassword] = useState(oldPassword ?? "");
    const [active, setActive] = useState(isActive ?? true);
    let passwordInput: HTMLInputElement;
    let modal: HTMLDialogElement;

    const closeModal = () => {
      setIsOpen(false);
    };

    useEffect(() => isOpen ? modal.showModal() : modal.close());
    
    const handleShowPassword = () => {
      const eye = passwordInput
          .parentElement?.getElementsByTagName("button")[0]
          .children[0] as HTMLElement;
      const eyeSlash = passwordInput
          .parentElement?.getElementsByTagName("button")[0]
          .children[1] as HTMLElement;
    
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
      let credentials: Credentials[] = JSON.parse(localStorage.getItem("credentials")!);

      if (credentials == null) credentials = [];
    
      let cred = credentials.find(
        (cred: Credentials) =>
          cred.url === serverUrl
      );
    
      if (cred == null)
        cred = {
          username: username,
          password: password,
          url: serverUrl,
          active: active
        };
      else {
        credentials = credentials.filter((cr) => cr.url !== serverUrl);
        cred.username = username;
        cred.password = password;
        cred.active = active;
      }
    
      credentials.push(cred);
      localStorage.setItem("credentials", JSON.stringify(credentials));
      closeModal();
    };

    return (
        <dialog className="modal" ref={ (mdl) => modal = mdl as HTMLDialogElement }>
          <div className="modal-box">
            <p className="text-lg font-bold">Server Credentials</p>
            <div className="pt-3" />
            <div className="form-control">
              <label className="label cursor-pointer flex flex-row w-36">
                <input 
                  className="checkbox checkbox-primary" 
                  type="checkbox" 
                  checked={active} 
                  onChange={ (e) => setActive(e.currentTarget.checked) } 
                />
                <span className="label-text">Use Credentials</span>
              </label>

              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                id="server-username"
                className="input input-bordered"
                onInput={ (e) => setUsername(e.currentTarget.value) }
                defaultValue={username}
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
                  ref={ (pw) => passwordInput = pw! }
                  onInput={ (e) => setPassword(e.currentTarget.value) }
                  defaultValue={password}
                />
                <button
                  className="btn btn-ghost btn-sm h-12"
                  id="show-password"
                  onClick={handleShowPassword}
                  type="button"
                >
                  <FontAwesomeIcon id="eye" icon={faEye} />
                  <FontAwesomeIcon
                    id="eyeSlash"
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
