import styled from "styled-components";
import RatingModal from "./RatingModal";
import { IoIosStarOutline } from "react-icons/io";

const RateButton = styled.button`
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
  return (
    <RatingModal>
      <RatingModal.Open opens="ratings-form">
        <RateButton>
          <IoIosStarOutline />
          <span>Rate</span>
        </RateButton>
      </RatingModal.Open>
      <RatingModal.Window name="ratings-form" titleName={titleName} />
    </RatingModal>
  );
}

export default Rating;
