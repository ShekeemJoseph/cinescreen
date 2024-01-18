import styled from "styled-components";
import Logo from "./Logo";
import PromotionCard from "./PromotionCard";
import { Link } from "react-router-dom";
import Register from "../features/authentication/Register";

const StyledPromotion = styled.div`
  background-image: linear-gradient(
      39deg,
      rgba(96, 34, 195, 0.9) 0%,
      rgba(253, 187, 45, 0.698) 100%
    ),
    url("/png/movie-collage-min.png");
  background-size: cover;
  border-radius: var(--border-radius-lg);
`;
const PromotionContent = styled.div`
  display: grid;
  justify-items: center;
  height: 100%;
  position: relative;
  grid-template-columns: 1fr 1fr;
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  align-content: center;
  top: 15%;
  right: 6%;
  perspective: 150rem;
  width: 34rem;
  height: 34rem;
  padding: 1.5rem 2rem;
  &:hover div:nth-child(1) {
    transform: rotateY(-180deg);
  }
  &:hover div:nth-child(2) {
    transform: rotateY(0);
  }
`;

const StyledLinkLogo = styled(Link)`
  &:link svg,
  &:visited svg {
    height: 4.8rem;
    width: auto;
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
          <StyledLinkLogo>
            <Logo />
          </StyledLinkLogo>
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
            <h3>Sign up to bookmark shows that interest you today!</h3>
            <Register btnLabel="Register Now" />
          </PromotionCard>
        </PromotionCardContainer>
      </PromotionContent>
    </StyledPromotion>
  );
}

export default Promotion;
