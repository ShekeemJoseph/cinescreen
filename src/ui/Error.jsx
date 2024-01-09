import { Link, NavLink, useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import ButtonText from "./ButtonText";
import Logo from "./Logo";
import GlobalStyles from "../styles/GlobalStyles";

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
const ErrorMessage = styled.div`
  height: 80%;
  width: 85%;
  margin: 2.4rem auto 0;
  padding: 2.4rem;
  background-image: linear-gradient(
      39deg,
      rgba(96, 34, 195, 0.9) 0%,
      rgba(253, 187, 45, 0.698) 100%
    ),
    url("../png/film-projector.jpg");
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius-lg);
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: var(--color-grey-50);
`;
function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <>
      <GlobalStyles />
      <StyledError>
        <ErrorHeader>
          <StyledLinkLogo to="/">
            <Logo primaryColor="#fff" secondaryColor="#fbc117" />
          </StyledLinkLogo>
          <ErrorNavButton to="/titles/movies">Movies</ErrorNavButton>
          <ErrorNavButton to="/titles/series">TV Shows</ErrorNavButton>
        </ErrorHeader>
        <ErrorMessage>
          <h1>Something went wrong 😥</h1>
          <p>{error.data || error.message}</p>
          <ButtonText variation="standard" onClick={() => navigate(-1)}>
            &larr; Go back
          </ButtonText>
        </ErrorMessage>
      </StyledError>
    </>
  );
}

export default Error;
