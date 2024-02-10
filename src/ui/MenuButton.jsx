import styled from "styled-components";

const MenuButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  transition: all 0.2s;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-md);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-brand-800);
    transition: all 0.3s;
  }
`;
export default MenuButton;
