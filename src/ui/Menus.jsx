import { createContext, useContext, useState } from "react";
import { HiUserCircle } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  padding: 0.6rem 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
  }
  &:focus {
    outline: none;
  }
  & span {
    font-weight: 600;
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  width: 15rem;
  z-index: 100;
  top: 114%;
  right: 44%;
  transform: translateX(50%);
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <MenusContext.Provider value={{ openName, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}
function Toggle({ name }) {
  const { openName, close, open } = useContext(MenusContext);
  function handleClick() {
    openName === "" || openName !== name ? open(name) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiUserCircle />
      <span>Shekeem</span>
    </StyledToggle>
  );
}
function List({ name, children }) {
  const { openName, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);
  if (openName !== name) return null;
  return <StyledList ref={ref}>{children}</StyledList>;
}
function Button({ children }) {
  const { close } = useContext(MenusContext);
  return <li onClick={close}>{children}</li>;
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
