import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonText from "./ButtonText";
import { media } from "../styles/breakpoints";

export const StyledErrorMessage = styled.div`
  height: 80vh;
  max-width: 128rem;
  width: 100%;
  margin: 2.4rem auto;
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
  color: #f9fafb;
  & h1,
  & p,
  & button {
    margin-left: 3.6rem;
  }
  & h1 {
    ${media.xs`
      font-size: 2.8rem;
    `}
  }
`;
function ErrorMessage() {
  const navigate = useNavigate();
  return (
    <StyledErrorMessage>
      <h1>Something went wrong 😥</h1>
      <p>This is probably not the page you're look for. Sorry about that.</p>
      <ButtonText
        style={{ color: "#f9fafb" }}
        variation="standard"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </ButtonText>
    </StyledErrorMessage>
  );
}

export default ErrorMessage;
