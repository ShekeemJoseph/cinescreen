import styled from "styled-components";

const ButtonText = styled.button`
  color: var(--color-grey-50);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  padding: 0.5rem 1rem;

  background: none;
  border: none;

  &:hover,
  &:active {
    color: var(--color-grey-800);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-50);
  }
`;

export default ButtonText;
