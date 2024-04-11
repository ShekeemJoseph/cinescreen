import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { cloneElement, createContext, useContext, useState } from "react";
import StarRating from "./StarRating";
import { IoIosStar } from "react-icons/io";
import { useUser } from "../authentication/useUser";
import Register from "../authentication/Register";
import Overlay from "../../ui/Overlay";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRating,
  deleteRating,
  updateRating,
} from "../../services/apiRatings";
import { useParams } from "react-router-dom";
import { media } from "../../styles/breakpoints";

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
  &:focus {
    outline: none;
  }
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
    ${media.sm`
    font-size: 2.2rem;
    `}
  }
  & span:nth-child(2) {
    font-size: 1.6rem;
    ${media.sm`
    font-size: 2rem;
    `}
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
  ${media.sm`
    font-size: 2rem;
  `}
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
const RatingModalContext = createContext();

function RatingModal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => {
    setOpenName("");
    document.body.style.overflow = "auto";
  };
  const open = setOpenName;
  return (
    <RatingModalContext.Provider value={{ openName, close, open }}>
      {children}
    </RatingModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { isAuthenticated } = useUser();
  const { open } = useContext(RatingModalContext);
  if (!isAuthenticated) return <Register>{children}</Register>;
  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
      document.body.style.overflow = "hidden";
    },
  });
}
function Window({ name, titleName, rating, setRating, storedRatings, userId }) {
  const queryClient = useQueryClient();
  const { titleId: urlTitleId } = useParams();
  const { openName, close } = useContext(RatingModalContext);

  const { mutate: removeRating } = useMutation({
    mutationFn: deleteRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
    },
  });
  const { mutate: addRating } = useMutation({
    mutationFn: createRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
    },
  });
  const { mutate: editRating } = useMutation({
    mutationFn: updateRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
    },
  });
  function updateStarSize() {
    return 1 + rating / 20;
  }

  function handleSetRate(starNum) {
    setRating(starNum);
  }

  function handleClose() {
    if (storedRatings.current?.titleId !== urlTitleId && rating !== 0) {
      setRating(0);
    }
    close();
  }
  function handleRateSuccess() {
    const ratedTitle = {
      userId: userId,
      titleId: urlTitleId,
      rating: rating,
    };
    addRating(ratedTitle);
    close();
  }
  function handleRateUpdate() {
    const updatedRate = {
      id: storedRatings.current?.id,
      rating: rating,
    };
    editRating(updatedRate);
    close();
  }
  function handleRateRemove() {
    removeRating(storedRatings.current?.id);
    storedRatings.current = null;
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
              onClick={
                storedRatings.current?.titleId !== urlTitleId
                  ? handleRateSuccess
                  : handleRateUpdate
              }
              disabled={!rating}
              variation={rating ? "active" : "inactive"}
            >
              Rate
            </RatingButton>
            {storedRatings.current?.titleId === urlTitleId ? (
              <RatingButton onClick={handleRateRemove} variation="removeRating">
                Remove Rating
              </RatingButton>
            ) : null}
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
