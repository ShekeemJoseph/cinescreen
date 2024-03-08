import styled, { css } from "styled-components";
import RatingModal from "./RatingModal";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useUser } from "../authentication/useUser";
import { useRatings } from "./useRatings";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const variations = {
  rated: css`
    span {
      color: var(--color-grey-0);
    }
  `,
};
const RateButton = styled.button`
  ${(props) => variations[props.variation]}
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #1c7ed6;
  font-size: 2rem;
  background: none;
  outline: none;
  border: none;
  font-weight: 600;
  padding: 0.3rem;
  & svg {
    width: auto;
    height: 2rem;
  }
  &:focus {
    outline: none;
  }
  &:hover::after,
  &:active::after {
    opacity: 1;
    border-radius: var(--border-radius-sm);
    background-color: rgba(134, 142, 150, 0.274);
  }
  &::after {
    content: "";
    margin: 0 auto;
    width: 100%;
    height: 100%;
    padding: 2rem 0.5rem;
    border-radius: var(--border-radius-sm);
    position: absolute;
  }
`;

function Rating({ titleName }) {
  const storedRatings = useRef();
  const { titleId: urlTitleId } = useParams();
  const [rating, setRating] = useState(0);
  const { isLoading: isAuthLoading, isAuthenticated, user } = useUser();
  const { isLoading, ratings } = useRatings(
    !isAuthLoading && user ? user.id : null
  );

  useEffect(() => {
    if (!isLoading && ratings) {
      const result = ratings.find((ratedTitle) => {
        if (ratedTitle.titleId === urlTitleId) {
          storedRatings.current = ratedTitle;
          return ratedTitle;
        }
        return null;
      });
      setRating(result?.rating);
    }
  }, [isLoading, ratings, urlTitleId, user?.id]);

  return (
    <RatingModal>
      <RatingModal.Open opens="ratings-form">
        {!rating || !isAuthenticated ? (
          <RateButton>
            <IoIosStarOutline />
            <span>Rate</span>
          </RateButton>
        ) : (
          <RateButton variation="rated">
            <IoIosStar />
            <span>{rating}/10</span>
          </RateButton>
        )}
      </RatingModal.Open>
      <RatingModal.Window
        name="ratings-form"
        userId={!isAuthLoading && user ? user.id : null}
        titleName={titleName}
        rating={rating}
        storedRatings={storedRatings ? storedRatings : null}
        setRating={setRating}
      />
    </RatingModal>
  );
}

export default Rating;
