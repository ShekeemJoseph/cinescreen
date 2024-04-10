import styled, { css } from "styled-components";
import { media } from "../styles/breakpoints";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;

  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "24rem 1fr 1.2fr"};
  ${media.lg`
  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "18rem 1fr 1fr"};
  `}
  ${media.md`
  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "15rem 1fr 0.4fr"};
  `}
  ${media.smd`
  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "15rem 1fr"};
  `}
  ${media.xs`
  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "40rem"};
  `}
  gap: ${(props) => (props.orientation === "vertical" ? "0.8rem" : "2.4rem")};

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: ${(props) =>
      props.orientation === "vertical"
        ? "none"
        : "1px solid var(--color-grey-200)"};
  }

  /* Special treatment if the row contains buttons, and if it's NOT a vertical row */
  ${(props) =>
    props.orientation !== "vertical" &&
    css`
      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, orientation }) {
  return (
    <StyledFormRow orientation={orientation}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
