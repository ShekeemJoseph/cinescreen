import styled, { css } from "styled-components";

const variations = {
  inActive: css`
    background: var(--color-grey-300) !important;
    border-radius: var(--border-radius-sm) !important;
    pointer-events: none;
    & svg {
      color: var(--color-grey-0) !important;
    }
  `,
};
const CarouselButton = styled.button`
  ${(props) => variations[props.variation]}
  background: none;
  border: none;
  padding: 0.6rem;
  transition: all 0.2s;
  padding: 0.5rem 1rem;

  &:focus {
    outline: none;
  }
  &:hover {
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-300);
  }
  &:active {
    background-color: var(--color-grey-400);
  }
  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-grey-900);
  }
`;

export default CarouselButton;
