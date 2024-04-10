import styled, { css } from "styled-components";
import { media } from "../styles/breakpoints";

const Form = styled.form`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;
      ${media.xs`
    padding: 1.2rem 2rem;
    `}
      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-300);
      border-radius: var(--border-radius-md);
      margin-bottom: 3.6rem;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.5rem;
`;

export default Form;
