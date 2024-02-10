import styled, { css } from "styled-components";

const PromotionCard = styled.div`
  ${(props) => variations[props.variation]}
  position: absolute;
  width: 34rem;
  height: 34rem;
  padding: 1.5rem 2rem;
  perspective: 150rem;
  transition: all 1.2s ease;
  backface-visibility: hidden;
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
      list-style-type: disc;
      & li {
        margin-left: 3.5rem;
        margin-bottom: 1.2rem;
      }
    }
  `,
  back: css`
    display: flex;
    text-align: center;
    letter-spacing: 1.5px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.8rem;
    color: var(--color-grey-0);
    transform: rotateY(180deg);
    background: linear-gradient(
      39deg,
      rgba(96, 34, 195) 0%,
      rgba(253, 187, 45) 100%
    );
    & div {
      backface-visibility: hidden;
    }
  `,
};

export default PromotionCard;
