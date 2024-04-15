import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { media, mobileMedia } from "../styles/breakpoints";

const StyledToggle = styled.button`
  width: max-content;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: none;
  border: none;
  padding: 0.6rem 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;

  ${mobileMedia.lg`
   &:active,
    &:hover {
    background-color: var(--color-grey-100);
    }
  `}
  &:focus {
    outline: none;
  }
  & span {
    font-weight: 600;
    ${media.sm`
      font-size: 1.8rem;
    `}
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
  width: 18rem;
  z-index: 100;
  top: 114%;
  right: 48.5%;
  transform: translateX(50%);
`;
const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  ${media.sm`
  width: 4.2rem;
  `}
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
  const ref = useOutsideClick(close);

  function handleMenuToggle() {
    setOpenMenu((openMenu) => !openMenu);
  }

  return (
    <MenusContext.Provider value={{ close, openMenu, handleMenuToggle, user }}>
      <div ref={ref}>{children}</div>
    </MenusContext.Provider>
  );
}
function Toggle() {
  const { handleMenuToggle, user } = useContext(MenusContext);
  const { fullName, avatar } = user?.user_metadata;
  return (
    <StyledToggle onClick={handleMenuToggle}>
      <Avatar
        src={avatar || "/png/default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName ? fullName : "User"}</span>
    </StyledToggle>
  );
}
function List({ children }) {
  const { openMenu } = useContext(MenusContext);
  if (!openMenu) return null;
  return <StyledList>{children}</StyledList>;
}
function Button({ children }) {
  const { close } = useContext(MenusContext);
  return <li onClick={close}>{children}</li>;
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
