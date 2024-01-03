import styled from "styled-components";
import Logo from "./Logo";

const StyledPromotion = styled.div`
  background-image: linear-gradient(
      39deg,
      rgba(96, 34, 195, 0.9) 0%,
      rgba(253, 187, 45, 0.7) 100%
    ),
    url("src/assets/png/movie-collage-min.jpg");
  background-size: cover;
  border-radius: var(--border-radius-lg);
`;
const PromotionContent = styled.div`
  display: grid;
  justify-items: center;

  grid-template-columns: 1fr 1fr;
`;
const PromotionHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
function Promotion() {
  return (
    <StyledPromotion>
      <PromotionContent>
        <PromotionHeading>
          <Logo imgSrc="src\assets\png\logo-no-background.png" />
          <h2>Guiding you to your next experience</h2>
        </PromotionHeading>
      </PromotionContent>
    </StyledPromotion>
  );
}

export default Promotion;
