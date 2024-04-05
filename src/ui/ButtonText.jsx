import styled, { css } from "styled-components";
import { media } from "../styles/breakpoints";

const variations = {
  standard: css`
    &:hover,
    &:active {
      color: var(--color-grey-800);
      border-radius: var(--border-radius-sm);
      background-color: var(--color-grey-50);
    }
    &:focus {
      outline: none;
    }
  `,
};
const ButtonText = styled.button`
  ${media.md`
    font-size: 2.2rem;
  `}
  color: var(--color-grey-50);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  ${(props) => variations[props.variation]}
`;

export default ButtonText;
