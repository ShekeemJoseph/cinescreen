import styled from "styled-components";
import Logo from "./Logo";
import ButtonIcon from "./ButtonIcon";
import { HiMoon } from "react-icons/hi2";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
import SearchTitle from "../features/search/SearchTitle";
import Register from "../features/authentication/Register";
import { useUser } from "../features/authentication/useUser";
import UserMenu from "./UserMenu";

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

const UserRegisteredBtnMenu = styled.div`
  position: relative;
`;
function Header() {
  const { isAuthenticated } = useUser();
  return (
    <StyledHeader>
      <HeaderContainer>
        <StyledLinkLogo to="/">
          <Logo />
        </StyledLinkLogo>
        <NavButton to="/movie">Movies</NavButton>
        <NavButton to="/tv">TV Shows</NavButton>
        <SearchTitle />
        <UserRegisteredBtnMenu>
          {!isAuthenticated ? <Register /> : <UserMenu />}
        </UserRegisteredBtnMenu>
        <ButtonIcon>
          <HiMoon />
        </ButtonIcon>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
