import styled from "styled-components";
import { media } from "../styles/breakpoints";

const MenuButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  transition: all 0.2s;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
  ${media.sm`
    font-size: 1.6rem;
  `}
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-md);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-brand-800);
    transition: all 0.3s;
    ${media.sm`
    width: 2.5rem;
    height: 2.5rem;
    `}
  }
`;
export default MenuButton;
