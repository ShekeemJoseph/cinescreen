import styled from "styled-components";
import Logo from "./Logo";
import ButtonIcon from "./ButtonIcon";
import { HiBookmark, HiMoon } from "react-icons/hi2";
import ButtonText from "./ButtonText";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
const StyledHeader = styled.header`
  padding: 1.5rem 6rem;
  background-color: var(--color-brand-900);
  align-items: center;
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

const StyledForm = styled.form`
  & input {
    border: none;
    padding: 1.1rem 1.6rem;
    border-radius: var(--border-radius-md);
    width: 40rem;
    transition: all 0.3s;

    &::placeholder {
      color: var(--color-grey-400);
    }
    &:focus {
      outline: none;
      box-shadow: 0 2.4rem 2.4rem rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
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
        <StyledForm>
          <input type="text" placeholder="Search movies / tvshows" />
        </StyledForm>
        <NavButton to="/watchlist">
          <HiBookmark /> WatchList
        </NavButton>
        <ButtonText>Register</ButtonText>
        <ButtonIcon>
          <HiMoon />
        </ButtonIcon>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
