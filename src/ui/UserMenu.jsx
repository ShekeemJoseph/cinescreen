import Menus from "./Menus";
import MenuButton from "./MenuButton";
import { HiArrowRightOnRectangle, HiBookmark, HiUser } from "react-icons/hi2";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import { useLogout } from "../features/authentication/useLogout";
import { useNavigate } from "react-router-dom";
import { media } from "../styles/breakpoints";

const NavMenuBtn = styled.button`
  width: 100%;
  background: none;
  border: none;
  ${media.sm`
    height: 35px;
    font-size: 1.6rem;
  `}
  padding: 1.2rem 2.4rem;
  transition: all 0.2s;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: space-around;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-md);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    ${media.sm`
    width: 2.5rem;
    height: 2.5rem;
  `}
    color: var(--color-brand-800);
    transition: all 0.3s;
  }
`;
function UserMenu() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();
  function handleLogout() {
    logout();
  }
  return (
    <Menus>
      <Menus.Toggle />
      <Menus.List>
        <Menus.Button>
          <NavMenuBtn onClick={() => navigate(`/user/${user?.id}`)}>
            <HiUser />
            <span>Account</span>
          </NavMenuBtn>
        </Menus.Button>
        <Menus.Button>
          <NavMenuBtn onClick={() => navigate(`/user/${user?.id}/watchlist`)}>
            <HiBookmark />
            <span>Watchlist</span>
          </NavMenuBtn>
        </Menus.Button>
        <Menus.Button>
          <MenuButton disabled={isLoading} onClick={handleLogout}>
            <HiArrowRightOnRectangle />
            <span>Logout</span>
          </MenuButton>
        </Menus.Button>
      </Menus.List>
    </Menus>
  );
}

export default UserMenu;
