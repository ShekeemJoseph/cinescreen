import styled, { css } from "styled-components";
import { mobileMedia } from "../styles/breakpoints";

const variations = {
  standard: css`
    background: none;
    border-radius: var(--border-radius-sm);

    ${mobileMedia.lg`
    &:hover,
    &:active {
      
      border-radius: var(--border-radius-sm);
      color: var(--color-grey-800);
      background-color: var(--color-grey-50);
      
      & svg {
        color: var(--color-brand-600);
      }
      & svg:hover {
        color: var(--color-brand-600);
      }

    }
      `}
  `,
  titleStyle: css`
    background: var(--color-brand-700);
    border-radius: var(--border-radius-sm);
    &:hover,
    &:active {
      background-color: var(--color-brand-900);
    }
  `,
};
const ButtonWatchList = styled.button`
  ${(props) => variations[props.variation]}
  color: var(--color-grey-50);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  height: 4.2rem;
  transition: all 0.3s;
  padding: 0.5rem 1rem;
  border: none;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-0);
  }

  &:focus {
    outline: none;
  }
`;

export default ButtonWatchList;
