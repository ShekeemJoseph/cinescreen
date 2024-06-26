import styled from "styled-components";
import Logo from "./Logo";
import PromotionCard from "./PromotionCard";
import { Link } from "react-router-dom";
import Register from "../features/authentication/Register";
import { useUser } from "../features/authentication/useUser";
import { media } from "../styles/breakpoints";

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
  width: 100%;
  height: 100%;
  position: relative;
  grid-template-columns: 1fr 1fr;
  ${media.md`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
const PromotionHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2.8rem;
  gap: 1.2rem;
  & h2 {
    font-weight: 700;
    color: #fff;
    font-size: 3.6rem;
  }
  ${media.md`
    gap: 2.4rem;
    margin: 0 1.8rem;
    flex-direction: unset;
    justify-content: space-between;
    align-items: center;
    h2{
      font-size: 2.8rem;
      text-align: center;
    }
  `}
  ${media.sm`
    h2{
      font-size: 2.4rem;
    }
  `}
  ${media.xs`
    h2{
      font-size: 2rem;
    }
  `}
`;
const PromotionCardContainer = styled.div`
  display: flex;
  ${media.md`
    display: none;
  `}
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
    ${media.md`
    height: 4.2rem;
    `}
    ${media.xs`
    height: 3.2rem;
    `}
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
  const { isAuthenticated } = useUser();
  return (
    <StyledPromotion>
      <PromotionContent>
        <PromotionHeading>
          <div>
            <StyledLinkLogo to="/">
              <Logo />
            </StyledLinkLogo>
          </div>
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
            {!isAuthenticated ? (
              <>
                <h3>Sign up to bookmark shows that interest you today!</h3>
                <Register btnLabel="Register Now" />
              </>
            ) : (
              <h3>
                Thanks for signing up, feel free to rate and bookmark the shows
                that interest you ;)
              </h3>
            )}
          </PromotionCard>
        </PromotionCardContainer>
      </PromotionContent>
    </StyledPromotion>
  );
}

export default Promotion;
