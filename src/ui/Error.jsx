import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import GlobalStyles from "../styles/GlobalStyles";
import ErrorMessage from "./ErrorMessage";

const StyledError = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  height: 100vh;
`;
const ErrorHeader = styled.header`
  display: flex;
  margin: 0 3.6rem;
  align-items: center;
  gap: 4.8rem;
  padding: 2.4rem 0;
  & button {
    font-size: 1.8rem;
    color: var(--color-grey-700);
  }
`;

const StyledLinkLogo = styled(Link)`
  &:link svg,
  &:visited svg {
    height: 4.8rem;
    width: auto;
  }
`;
const ErrorNavButton = styled(NavLink)`
  &:link,
  &:visited {
    color: var(--color-grey-700);
    font-size: 1.8rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    transition: all 0.3s;
  }
  &:hover,
  &:active {
    color: var(--color-grey-400);
  }
`;
function Error() {
  return (
    <>
      <GlobalStyles />
      <StyledError>
        <ErrorHeader>
          <StyledLinkLogo to="/">
            <Logo primaryColor="#fff" secondaryColor="#fbc117" />
          </StyledLinkLogo>
          <ErrorNavButton to="/movie">Movies</ErrorNavButton>
          <ErrorNavButton to="/tv">TV Shows</ErrorNavButton>
        </ErrorHeader>
        <ErrorMessage />
      </StyledError>
    </>
  );
}

export default Error;
