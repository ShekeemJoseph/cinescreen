import { useState } from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import styled from "styled-components";

const StarContainerStyled = styled.div`
  display: flex;
`;
const StarStyle = styled.span`
  display: block;
  & svg {
    width: 2.6rem;
    height: 2.6rem;
    cursor: pointer;
    color: var(--color-brand-800);
    margin-left: 0.4rem;
  }
`;
function StarRating({ maxRating = 5, rating, onSetRating }) {
  const [tempRating, setTempRating] = useState(0);

  return (
    <StarContainerStyled>
      {Array.from({ length: maxRating }, (_, i) => (
        <StarStyle
          key={i}
          role="button"
          onClick={() => onSetRating(i + 1)}
          onMouseEnter={() => setTempRating(i + 1)}
          onMouseLeave={() => setTempRating(0)}
        >
          {tempRating >= i + 1 || rating >= i + 1 ? (
            <IoIosStar />
          ) : (
            <IoIosStarOutline />
          )}
        </StarStyle>
      ))}
    </StarContainerStyled>
  );
}

export default StarRating;
