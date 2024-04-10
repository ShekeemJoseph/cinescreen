import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import GlobalStyles from "../styles/GlobalStyles";
import ErrorMessage from "./ErrorMessage";
import { media } from "../styles/breakpoints";

const ErrorSection = styled.section`
  max-width: 128rem;
  height: 50rem;
  margin: 0 auto;
`;
const ErrorHeader = styled.header`
  display: flex;
  align-items: center;
  margin: 0 2.4rem;
  gap: 4.8rem;
  ${media.xs`
    gap: 1.8rem;
  `}
  padding: 2.4rem 0;
`;

const StyledLinkLogo = styled(Link)`
  &:link svg,
  &:visited svg {
    height: 4.8rem;
    ${media.xs`
      height: 3.8rem;
    `}
    width: auto;
  }
`;
const ErrorNavButton = styled(NavLink)`
  &:link,
  &:visited {
    color: var(--color-grey-700);
    font-size: 1.8rem;
    ${media.xs`
    font-size: 1.8rem;
    `}
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
      <ErrorSection>
        <ErrorHeader>
          <StyledLinkLogo to="/">
            <Logo primaryColor="#fff" secondaryColor="#fbc117" />
          </StyledLinkLogo>
          <ErrorNavButton to="/movie">Movies</ErrorNavButton>
          <ErrorNavButton to="/tv">TV Shows</ErrorNavButton>
        </ErrorHeader>
        <ErrorMessage />
      </ErrorSection>
    </>
  );
}

export default Error;
