import { HiPlus, HiStar } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { reduceLongTitle } from "../utils/helper";
import ButtonWatchList from "./ButtonWatchList";

const StyledTitleCard = styled.div`
  background: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-0);
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: start;
  height: 42rem;
`;
const TitleBox = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  gap: 0.6rem;
  padding: 2.4rem 2.4rem 0;

  & p:hover,
  & p:active {
    text-decoration: underline;
  }

  & img {
    max-height: 25rem;
  }
`;
const RatingsText = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  & svg {
    max-width: 1.8rem;
    height: 1.8rem;
    color: var(--color-brand-900);
  }
`;
function TitleCard({ title }) {
  return (
    <StyledTitleCard>
      <TitleBox>
        <Link
          to={
            title.titleType?.id === "movie"
              ? `/movie/${title.id}`
              : title.titleType?.id === "tvSeries" ||
                title.titleType?.id === "tvMiniSeries"
              ? `/tv/${title.id}`
              : "/"
          }
        >
          <img
            src={title.primaryImage?.url}
            alt={`${title.originalTitleText?.text} Poster`}
          />
          {title.ratingsSummary.aggregateRating && (
            <RatingsText>
              <span>{title.ratingsSummary.aggregateRating}</span>
              <HiStar />
              <span>Rating</span>
            </RatingsText>
          )}
          <p>{reduceLongTitle(title.originalTitleText?.text)}</p>
        </Link>
      </TitleBox>
      <ButtonWatchList variation="standard">
        <HiPlus /> Watchlist
      </ButtonWatchList>
    </StyledTitleCard>
  );
}

export default TitleCard;
