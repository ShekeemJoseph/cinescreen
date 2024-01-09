import styled from "styled-components";
import Logo from "./Logo";
import ButtonIcon from "./ButtonIcon";
import { HiBookmark, HiMoon } from "react-icons/hi2";
import ButtonText from "./ButtonText";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
import SearchTitle from "./SearchTitle";
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

function Header() {
  return (
    <StyledHeader>
      <HeaderContainer>
        <StyledLinkLogo to="/">
          <Logo />
        </StyledLinkLogo>
        <NavButton to="/titles/movies">Movies</NavButton>
        <NavButton to="/titles/series">TV Shows</NavButton>
        <SearchTitle />
        <NavButton to="/watchlist">
          <HiBookmark /> WatchList
        </NavButton>
        <ButtonText variation="standard">Register</ButtonText>
        <ButtonIcon>
          <HiMoon />
        </ButtonIcon>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
