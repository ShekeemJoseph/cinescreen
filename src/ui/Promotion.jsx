import styled from "styled-components";
import Logo from "./Logo";
import PromotionCard from "./PromotionCard";

const StyledPromotion = styled.div`
  background-image: linear-gradient(
      39deg,
      rgba(96, 34, 195, 0.9) 0%,
      rgba(253, 187, 45, 0.698) 100%
    ),
    url("/png/movie-collage-min.jpg");
  background-size: cover;
  border-radius: var(--border-radius-lg);
`;
const PromotionContent = styled.div`
  display: grid;
  justify-items: center;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  position: relative;
`;
const PromotionHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2.8rem;
  gap: 1.2rem;
  & h2 {
    font-weight: 700;
    color: var(--color-grey-0);
    font-size: 3.6rem;
  }
`;
const PromotionCardContainer = styled.div`
  &:hover div:nth-child(1) {
    transform: rotateY(-180deg);
  }
  &:hover div:nth-child(2) {
    transform: rotateY(0);
  }
`;

const PromotionDecoration = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 1rem;
  justify-content: center;
  & div {
    width: calc(33.33333333333333% - 0.3em);
    border-radius: 0.25rem;
    height: 0.4rem;
  }
  & div:nth-child(1) {
    background-color: #6022c3;
  }
  & div:nth-child(2) {
    background-color: #fdbb2d;
  }
  & div:nth-child(3) {
    background-color: #e64980;
  }
`;

function Promotion() {
  return (
    <StyledPromotion>
      <PromotionContent>
        <PromotionHeading>
          <Logo imgSrc="/png/logo-no-background.png" />
          <h2>Guiding you to your next experience</h2>
        </PromotionHeading>
        <PromotionCardContainer>
          <PromotionCard variation="front">
            <h3>The Cinescreen Standard</h3>
            <PromotionDecoration>
              <div></div>
              <div></div>
              <div></div>
            </PromotionDecoration>
            <ul>
              <li>We show the latest Movies & TV Shows coming out</li>
              <li>
                Users can peruse in-depth info on their favourite entertainment
              </li>
              <li>Easy user navigation and content sorting</li>
            </ul>
          </PromotionCard>
          <PromotionCard variation="back">
            <h3>
              Sign up to Cinescreen in order to bookmark shows you want to watch
            </h3>
          </PromotionCard>
        </PromotionCardContainer>
      </PromotionContent>
    </StyledPromotion>
  );
}

export default Promotion;
