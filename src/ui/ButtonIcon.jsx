import styled from "styled-components";
import { media } from "../styles/breakpoints";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  transition: all 0.2s;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  ${media.lg`
   display: none;
  `}
  &:focus {
    outline: none;
  }
  &:hover {
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-50);
    color: var(--color-brand-800);

    & svg {
      color: var(--color-brand-600);
    }
  }
  & span {
    text-align: center;
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-0);
  }
  & svg:hover {
    color: var(--color-brand-600);
  }
`;

export default ButtonIcon;
