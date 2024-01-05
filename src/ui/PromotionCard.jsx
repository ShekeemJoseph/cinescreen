import styled, { css } from "styled-components";

const PromotionCard = styled.div`
  ${(props) => variations[props.variation]}
  perspective: 150rem;
  padding: 1.5rem 2rem;
  transition: all 0.8s ease;
  position: absolute;
  top: 15%;
  left: 65%;
  backface-visibility: hidden;
  width: 34rem;
  height: 34rem;
  border-radius: var(--border-radius-lg);
`;
const variations = {
  front: css`
    display: grid;
    grid-template-rows: repeat(3, auto);
    background-color: var(--color-grey-50);
    row-gap: 2rem;
    & h3 {
      font-size: 2.2rem;
      font-weight: 700;
      justify-self: center;
      align-self: center;
    }
    & ul {
      list-style: disc;
      & li {
        margin-left: 3.5rem;
        margin-bottom: 1.2rem;
      }
    }
  `,
  back: css`
    transform: rotateY(180deg);
    background: linear-gradient(
      39deg,
      rgba(96, 34, 195) 0%,
      rgba(253, 187, 45) 100%
    );
  `,
};

export default PromotionCard;
