import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import ButtonText from "./ButtonText";
const ErrorMessageContainer = styled.div`
  max-width: 128rem;
  margin: 2.4rem auto;
`;
export const StyledErrorMessage = styled.div`
  height: 80vh;
  width: 100%;
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
function ErrorMessage() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <ErrorMessageContainer>
      <StyledErrorMessage>
        <h1>Something went wrong 😥</h1>
        <p>{error.data || error.message}</p>
        <ButtonText variation="standard" onClick={() => navigate(-1)}>
          &larr; Go back
        </ButtonText>
      </StyledErrorMessage>
    </ErrorMessageContainer>
  );
}

export default ErrorMessage;
