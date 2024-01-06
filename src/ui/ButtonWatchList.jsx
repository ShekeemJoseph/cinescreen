import styled from "styled-components";

const ButtonWatchList = styled.button`
  color: var(--color-grey-50);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  height: 4.2rem;
  transition: all 0.3s;
  padding: 0.5rem 1rem;
  background: none;
  border: none;

  &:hover,
  &:active {
    border-top-right-radius: none;
    border-top-left-radius: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);

    & svg {
      color: var(--color-brand-600);
    }
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-0);
  }
  & svg:hover {
    color: var(--color-brand-600);
  }

  &:focus {
    outline: none;
  }
`;

export default ButtonWatchList;
