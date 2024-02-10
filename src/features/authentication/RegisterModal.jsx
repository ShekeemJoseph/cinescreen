import { cloneElement, createContext, useContext, useState } from "react";
import RegisterModalContent from "./RegisterModalContent";
export const RegisterModalContext = createContext();

function RegisterModal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <RegisterModalContext.Provider value={{ openName, close, open }}>
      {children}
    </RegisterModalContext.Provider>
  );
}
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(RegisterModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}
function Window({ onCheckLogin, name }) {
  const { openName, close } = useContext(RegisterModalContext);
  if (name !== openName) return null;
  return <RegisterModalContent onCheckLogin={onCheckLogin} handler={close} />;
}
RegisterModal.Open = Open;
RegisterModal.Window = Window;
export default RegisterModal;
