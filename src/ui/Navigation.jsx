import styled from "styled-components";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
import SearchTitle from "../features/search/SearchTitle";
import Register from "../features/authentication/Register";
import { useUser } from "../features/authentication/useUser";
import UserMenu from "./UserMenu";
import { media } from "../styles/breakpoints";
import HeaderLogo from "./HeaderLogo";
import MobileNavgation from "./MobileNavgation";
import MobileSearchBar from "../features/search/MobileSearchBar";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

const StyledNavigation = styled.nav`
  position: relative;
  padding: 1.5rem 2rem;
  background-color: var(--color-brand-900);
`;
const HeaderContainer = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${media.sm`
  position: relative;
  `}
`;

const StyledLinkLogo = styled(Link)`
  &:link svg,
  &:visited svg {
    height: 3.8rem;
    width: auto;
    ${media.md`
      height: 5.4rem;
    `}
  }
`;
const FakeHeaderEl = styled.div`
  height: 5rem;
  width: 5rem;
  opacity: 0;
  display: none;
  ${media.md`
    display: block;
  `}
`;
const FakeNavContainer = styled.div`
  display: flex;
  gap: 2.8rem;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${media.lg`
  justify-content: flex-end;
  `}
  gap: 1.8rem;
`;
const UserRegisteredBtnMenu = styled.div`
  position: relative;
`;
function Header() {
  const { isAuthenticated } = useUser();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMagnifyClick, setIsMagnifyClicked] = useState(false);

  return (
    <StyledNavigation>
      <HeaderContainer>
        <MobileNavgation />
        <FakeNavContainer>
          <FakeHeaderEl />
          <StyledLinkLogo to="/">
            <HeaderLogo secondaryColor="var(--color-grey-0)" />
          </StyledLinkLogo>
        </FakeNavContainer>

        <NavButton to="/movie">Movies</NavButton>
        <NavButton to="/tv">TV Shows</NavButton>
        <Container>
          <SearchTitle
            query={query}
            setQuery={setQuery}
            error={error}
            setError={setError}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isMagnifyClick={isMagnifyClick}
            setIsMagnifyClicked={setIsMagnifyClicked}
          />
          <UserRegisteredBtnMenu>
            {!isAuthenticated ? <Register /> : <UserMenu />}
          </UserRegisteredBtnMenu>
        </Container>
        <DarkModeToggle />
      </HeaderContainer>
      {isMagnifyClick || isModalOpen ? (
        <MobileSearchBar
          error={error}
          query={query}
          setQuery={setQuery}
          setIsModalOpen={setIsModalOpen}
          setIsMagnifyClicked={setIsMagnifyClicked}
        />
      ) : null}
    </StyledNavigation>
  );
}

export default Header;
