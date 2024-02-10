import styled from "styled-components";
import Logo from "./Logo";
import ButtonIcon from "./ButtonIcon";
import {
  HiArrowRightOnRectangle,
  HiBookmark,
  HiMoon,
  HiUser,
} from "react-icons/hi2";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
import SearchTitle from "../features/search/SearchTitle";
import Register from "../features/authentication/Register";
import { useUser } from "../features/authentication/useUser";
import Menus from "./Menus";
import MenuButton from "./MenuButton";
import { useLogout } from "../features/authentication/useLogout";
import { useState } from "react";

const StyledHeader = styled.header`
  padding: 1.5rem 6rem;
  background-color: var(--color-brand-900);
`;
const HeaderContainer = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:link svg,
  &:visited svg {
    height: 3.4rem;
    width: auto;
  }
`;

const StyledLinkLogo = styled(Link)`
  &:link svg,
  &:visited svg {
    height: 3.4rem;
    width: auto;
  }
`;
const NavMenuBtn = styled(Link)`
  width: 100%;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  transition: all 0.2s;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-md);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-brand-800);
    transition: all 0.3s;
  }
`;
const UserRegisterBtnMenu = styled.div`
  position: relative;
`;
function Header() {
  const { user, isAuthenticated } = useUser();
  const [hasAccess, setHasAccess] = useState(false);
  const { logout, isLoading } = useLogout();
  console.log(user, hasAccess, isAuthenticated);
  function handleLogout() {
    setHasAccess(false);
    logout();
  }
  function handleExtraLogReqs() {
    setHasAccess(true);
  }
  return (
    <StyledHeader>
      <HeaderContainer>
        <StyledLinkLogo to="/">
          <Logo />
        </StyledLinkLogo>
        <NavButton to="/movie">Movies</NavButton>
        <NavButton to="/tv">TV Shows</NavButton>
        <SearchTitle />
        <UserRegisterBtnMenu>
          {!isAuthenticated && !hasAccess ? (
            <Register onCheckLogin={handleExtraLogReqs} btnLabel="Register" />
          ) : isAuthenticated && hasAccess ? (
            <Menus>
              <Menus.Toggle name="registered-user" />
              <Menus.List name="registered-user">
                <Menus.Button>
                  <MenuButton disabled={isLoading} onClick={handleLogout}>
                    <HiArrowRightOnRectangle />
                    <span>Logout</span>
                  </MenuButton>
                </Menus.Button>
                <Menus.Button>
                  <NavMenuBtn to={`/user/${user?.id}`}>
                    <HiUser />
                    <span>Account</span>
                  </NavMenuBtn>
                </Menus.Button>
                <Menus.Button>
                  <NavMenuBtn to={`/user/${user?.id}/watchlist`}>
                    <HiBookmark />
                    <span>WatchList</span>
                  </NavMenuBtn>
                </Menus.Button>
              </Menus.List>
            </Menus>
          ) : (
            <Register onCheckLogin={handleExtraLogReqs} btnLabel="Register" />
          )}
        </UserRegisterBtnMenu>

        <ButtonIcon>
          <HiMoon />
        </ButtonIcon>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
