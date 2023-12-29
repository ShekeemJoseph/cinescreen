import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  transition: all 0.2s;
  padding: 0.5rem 1rem;

  &:hover {
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-50);
    color: var(--color-brand-800);

    & svg {
      color: var(--color-brand-600);
    }
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-0);
  }
  & svg:hover {
    color: var(--color-brand-600);
  }
`;

export default ButtonIcon;
