import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiMoon, HiXMark } from "react-icons/hi2";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
import SearchTitle from "../features/search/SearchTitle";
import Register from "../features/authentication/Register";
import { useUser } from "../features/authentication/useUser";
import UserMenu from "./UserMenu";
import { media, mobileMedia } from "../styles/breakpoints";
import HeaderLogo from "./HeaderLogo";
import { useState } from "react";
import SearchIconBtn from "../features/search/SearchIconBtn";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledHeader = styled.header`
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
`;

const StyledLinkLogo = styled(Link)`
  &:link svg,
  &:visited svg {
    height: 3.8rem;
    width: auto;
    ${media.md`
      height: 4.8rem;
    `}
  }
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
const MobileStyledForm = styled.form`
  width: 100%;

  & input {
    width: 100%;
    background-color: var(--color-grey-100);
    border: none;
    &::placeholder {
      font-size: 1.8rem;
      color: var(--color-grey-400);
    }
    &:focus {
      outline: none;
    }
  }
`;
const MobileSearchBar = styled.div`
  width: 100%;
  top: 50%;
  left: 50%;
  height: 8rem;
  z-index: 100;
  display: flex;
  gap: 1.2rem;
  ${mobileMedia.xs`
    display: none;
  `}
  position: absolute;
  align-items: center;
  padding: 1.5rem 2rem;
  justify-content: space-between;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-100);
`;
const UserRegisteredBtnMenu = styled.div`
  position: relative;
`;

function Header() {
  const { isAuthenticated } = useUser();
  const [query, setQuery] = useState("");
  const [isMagnifyClick, setIsMagnifyClicked] = useState(false);

  function handleCloseSrchBar() {
    setIsMagnifyClicked(false);
  }
  const ref = useOutsideClick(handleCloseSrchBar);
  return (
    <StyledHeader>
      <HeaderContainer>
        <StyledLinkLogo to="/">
          <HeaderLogo />
        </StyledLinkLogo>
        <NavButton to="/movie">Movies</NavButton>
        <NavButton to="/tv">TV Shows</NavButton>
        <Container>
          <SearchTitle
            query={query}
            setQuery={setQuery}
            setIsMagnifyClicked={setIsMagnifyClicked}
          />
          <UserRegisteredBtnMenu>
            {!isAuthenticated ? <Register /> : <UserMenu />}
          </UserRegisteredBtnMenu>
        </Container>
        <ButtonIcon>
          <HiMoon />
        </ButtonIcon>
      </HeaderContainer>
      {isMagnifyClick && (
        <MobileSearchBar ref={ref}>
          <MobileStyledForm>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search movies / tvshows"
            />
          </MobileStyledForm>
          <SearchIconBtn handler={handleCloseSrchBar}>
            <HiXMark />
          </SearchIconBtn>
        </MobileSearchBar>
      )}
    </StyledHeader>
  );
}

export default Header;
