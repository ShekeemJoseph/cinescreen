import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { cloneElement, createContext, useContext, useState } from "react";
import StarRating from "./StarRating";
import { IoIosStar } from "react-icons/io";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-700);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  /* padding: 3.2rem 4rem; */
  transition: all 0.5s;
`;
const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: #1c7ed6;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-0);
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;
const RatingContainer = styled.div`
  padding: 3.2rem;
  width: 52rem;
  height: 30rem;
`;
const RatingsContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 1.9rem;
  & span {
    color: var(--color-grey-0);
  }
  & span:first-child {
    color: var(--color-brand-800);
    font-size: 1.6rem;
  }
`;
const variations = {
  active: css`
    background-color: var(--color-brand-700);

    &:hover,
    &:active {
      background-color: var(--color-brand-900);
    }
    &:focus {
      outline: none;
    }
  `,
  inactive: css`
    background-color: #495057;
    &:focus {
      outline: none;
    }
  `,
  removeRating: css`
    background-color: #495057;
    &:focus {
      outline: none;
    }
  `,
};
const RatingButton = styled.button`
  ${(props) => variations[props.variation]}
  outline: none;
  border: none;
  width: 60%;
  padding: 0.8rem 0.6rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-grey-0);
`;
const StarSvgContainer = styled.div`
  position: absolute;
  bottom: 70%;
  left: 40%;
  transition: all 0.3s;
  & svg {
    width: auto;
    height: 10rem;
    color: #1c7ed6;
  }
  & div {
    color: var(--color-grey-0);
    text-align: center;
    font-size: 2.6rem;
    transform: translateY(-186%);
  }
`;
function RatingModal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <RatingModalContext.Provider value={{ openName, close, open }}>
      {children}
    </RatingModalContext.Provider>
  );
}

export const RatingModalContext = createContext();
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(RatingModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}
function Window({ name, titleName }) {
  const [rating, setRating] = useState(0);
  const [hasClickRate, setHasClickRate] = useState(false);
  const { openName, close } = useContext(RatingModalContext);

  function updateStarSize() {
    return 1 + rating / 20;
  }

  function handleSetRate(starNum) {
    setRating(starNum);
  }
  function handleClose() {
    if (!hasClickRate) setRating(0);
    close();
  }
  function handleRateSuccess() {
    setHasClickRate(true);
    close();
  }
  function handleRateRemove() {
    setHasClickRate(false);
    setRating(0);
    close();
  }
  const ref = useOutsideClick(handleClose);
  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={handleClose}>
          <HiXMark />
        </Button>
        <RatingContainer>
          <StarSvgContainer style={{ transform: `scale(${updateStarSize()})` }}>
            <IoIosStar />
            <div>{rating ? rating : "?"}</div>
          </StarSvgContainer>
          <RatingsContent>
            <span>Rate This</span>
            <span>{titleName}</span>
            <StarRating
              maxRating={10}
              rating={rating}
              onSetRating={handleSetRate}
            />
            <RatingButton
              onClick={handleRateSuccess}
              disabled={!rating}
              variation={rating ? "active" : "inactive"}
            >
              Rate
            </RatingButton>
            {hasClickRate && (
              <RatingButton onClick={handleRateRemove} variation="removeRating">
                Remove Rating
              </RatingButton>
            )}
          </RatingsContent>
        </RatingContainer>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
RatingModal.Open = Open;
RatingModal.Window = Window;
export default RatingModal;
