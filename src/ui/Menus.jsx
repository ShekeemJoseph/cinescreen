import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useUser } from "../features/authentication/useUser";

const StyledToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
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
  right: 48.5%;
  transform: translateX(50%);
`;
const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  /* outline: 2px solid var(--color-grey-100); */
`;

const MenusContext = createContext();

function Menus({ children }) {
  const { user } = useUser();
  const [openMenu, setOpenMenu] = useState(false);
  const close = () => setOpenMenu(false);
  const open = setOpenMenu;
  return (
    <MenusContext.Provider value={{ openMenu, open, close, user }}>
      {children}
    </MenusContext.Provider>
  );
}
function Toggle() {
  const { close, open, openMenu, user } = useContext(MenusContext);
  const { fullName, avatar } = user?.user_metadata;
  return (
    <StyledToggle onClick={!openMenu ? open : openMenu ? close : null}>
      {avatar ? (
        <Avatar
          src={avatar || "/png/default-user.jpg"}
          alt={`Avatar of ${fullName}`}
        />
      ) : null}
      <span>{fullName ? fullName : "User"}</span>
    </StyledToggle>
  );
}
function List({ children }) {
  const { openMenu, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);
  if (!openMenu) return null;
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
