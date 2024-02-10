import styled, { css } from "styled-components";
import RatingModal from "./RatingModal";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useState } from "react";
import { useUser } from "../authentication/useUser";
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
  const [rating, setRating] = useState(0);
  const { isAuthenticated } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <RatingModal>
      <RatingModal.Open opens="ratings-form" setIsModalOpen={setIsModalOpen}>
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
        titleName={titleName}
        rating={rating}
        setRating={setRating}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </RatingModal>
  );
}

export default Rating;
