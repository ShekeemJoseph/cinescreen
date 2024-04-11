import { Link } from "react-router-dom";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useState } from "react";
import { media } from "../../styles/breakpoints";

const Modal = styled.ul`
  position: absolute;
  padding: 1.2rem 0;
  width: 50rem;
  ${media.md`
  width: 40rem;
  `};
  ${media.sm`
  width: 35rem;
  `};
  max-height: 80rem;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  color: var(--color-grey-50);
  background-color: var(--color-grey-750);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s;
  transform: translateX(-50%);
  top: 120%;
  left: 50%;

  ${media.sm`
    top: 150%;
    left: 50%;
  `}
  ${media.xs`
  top: 150%;
  left: 50%;
  transform: translateX(-50%);
  `};
  z-index: 100;
  & li:hover,
  & li:active {
    background-color: var(--color-grey-725);
  }
`;
const TitleBox = styled.li`
  width: 100%;
  height: 10rem;
  padding: 1.2rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-600);
  & img {
    height: 100%;
  }

  & div {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;
const ErrorMessage = styled.span`
  display: flex;
  justify-content: center;
`;

function SearchModal({ error, handler, open, titles, setQuery }) {
  const [isClosed, setIsClosed] = useState(false);
  function handleClick() {
    setIsClosed(true);
    setQuery("");
  }
  const ref = useOutsideClick(handler);
  if (!open || isClosed) return null;
  return (
    <Modal ref={ref}>
      {!error ? (
        titles.map((title) => (
          <Link
            to={
              title.media_type === "movie"
                ? `/movie/${title.id}`
                : title.media_type === "series" || title.media_type === "tv"
                ? `/tv/${title.id}`
                : "/"
            }
            key={title.id}
            onClick={handleClick}
          >
            <TitleBox>
              <img
                src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                alt={`${title.title ? title.title : title.name} Poster`}
              />
              <div>
                <span>{title.title ? title.title : title.name}</span>
                <span>
                  {title.release_date || title.first_air_date || "N/A"}
                </span>
              </div>
            </TitleBox>
          </Link>
        ))
      ) : (
        <ErrorMessage>{error}</ErrorMessage>
      )}
    </Modal>
  );
}

export default SearchModal;
