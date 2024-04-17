import styled, { css } from "styled-components";
import { media, mobileMedia } from "../styles/breakpoints";

const variations = {
  standard: css`
    background: none;
    border-radius: var(--border-radius-sm);

    ${mobileMedia.lg`
    &:hover,
    &:active {
      
      border-radius: var(--border-radius-sm);
      color: #4b3a07;
      background-color: #f9fafb;
      
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
  color:  #f9fafb;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  height: 4.2rem;
  transition: all 0.3s;
  padding: 0.5rem 1rem;
  border: none;
  ${media.sm`
    font-size: 1.8rem;
  `}
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

export default ButtonWatchList;
