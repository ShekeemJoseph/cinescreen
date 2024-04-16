import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  TITLE_MOVIE_GENRES,
  TITLE_TV_GENRES,
  getCurrentYear,
  sortGenres,
} from "../utils/helper";
import styled, { css } from "styled-components";
import ReactSlider from "react-slider";
import "array.prototype.move";
import { media } from "../styles/breakpoints";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 3000;
  transition: all 0.5s;
  display: none;
  ${media.md`
    display: block;
  `}
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: none;
  ${media.md`
    display: block;
  `}
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  /* padding: 3.2rem 4rem; */
  transition: all 0.5s;
  z-index: 2500;
  //////////////////////////////
  padding: 2.4rem 4rem;
  max-width: 95rem;
  width: 80%;
  /* height: 100vh; */
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
  & svg {
    width: 3.6rem;
    height: 3.6rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-700);
  }
  &:focus {
    outline: none;
  }
`;
const TitleSortingForm = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;

  & h4 {
    padding: 1.2rem 0;
    border-bottom: 1px solid var(--color-grey-300);
    font-size: 2rem;
  }
  & h5 {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.6rem;
    margin: 1.8rem 0;
  }
`;

const RangeSlider = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  & label {
    font-size: 2rem;
  }
`;
const RangeInput = styled(ReactSlider).attrs({ type: "range" })`
  width: 100%;
  height: 1.2rem;
  border-radius: 4rem;
  background: ${(props) =>
    `linear-gradient(to right,#e64980 0%,#e64980 ${props.value}%,#fff ${props.value}%,#fff 100%);`};
  & .thumb-0 {
    position: relative;
    cursor: pointer;
    top: -85%;
    width: 3rem;
    height: 3rem;
    background-image: radial-gradient(circle, #f7f7fc 40%, #e64980 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.5);
    &:focus {
      outline: none;
    }
  }
`;
const GenreListings = styled.ul`
  ${(props) => variations[props.variation]}
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;
const variations = {
  active: css`
    background-color: var(--color-grey-300);
  `,
};
const Genre = styled.li`
  ${(props) => variations[props.variation]}
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  gap: 1.2rem;

  &:active {
    background-color: var(--color-grey-300);
    border-radius: var(--border-radius-sm);
  }
  &:hover {
    background-color: var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    ${media.md`
    background: none;
    `}
  }
  input[type="checkbox"] {
    accent-color: black;
    &:focus {
      outline: none;
    }
  }
  & label {
    font-size: 2rem;
  }
`;
const FilterContainer = styled.div`
  ${media.md`
  max-width: 80rem;
  max-height: 50rem;
  `}
  ${media.sm`
  max-width: 80rem;
  max-height: 60rem;
  `}
  width: 100%;

  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
function ListingsFilterModal({ mediaType, handler }) {
  const titleGenres =
    mediaType === "movie" ? TITLE_MOVIE_GENRES : TITLE_TV_GENRES;
  const [genreList, setGenreList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedGenre, setCheckedGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState(
    +searchParams.get("year") || getCurrentYear()
  );

  useEffect(() => {
    function handleLoad() {
      if (searchParams.get("genre") !== null) {
        setCheckedGenre(+searchParams.get("genre"));
        setGenreList(sortGenres(titleGenres));
        setGenreList(
          titleGenres.move(
            titleGenres.findIndex(
              (genre) => genre.id === +searchParams.get("genre")
            ),
            0
          )
        );
      } else if (searchParams.get("genre") === null) {
        setCheckedGenre("");
        setGenreList(sortGenres(titleGenres));
      }
    }
    handleLoad();
  }, [searchParams, titleGenres]);
  const ref = useOutsideClick(handler);
  return (
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={handler}>
          <HiXMark />
        </Button>
        <FilterContainer>
          <TitleSortingForm>
            <h4>Filters</h4>
            <div>
              <h5>Release Year</h5>
              <RangeSlider>
                <label for="titleReleaseYear">1980</label>
                <RangeInput
                  type="range"
                  id="titleReleaseYear"
                  name="titleReleaseYear"
                  min={1980}
                  max={getCurrentYear()}
                  step={1}
                  value={
                    releaseYear || +searchParams.get("year") || getCurrentYear()
                  }
                  onChange={setReleaseYear}
                  onAfterChange={(value) => {
                    searchParams.set("year", value);
                    setSearchParams(searchParams);
                  }}
                />
                <label for="titleReleaseYear">{releaseYear}</label>
              </RangeSlider>
              <h5>Genres</h5>
              <GenreListings>
                {genreList.map((genre, index) => (
                  <Genre
                    key={index}
                    variation={genre.id === checkedGenre ? "active" : ""}
                  >
                    <input
                      id={genre.name}
                      name={genre.name}
                      type="checkbox"
                      value={genre.id}
                      checked={genre.id === checkedGenre ? true : false}
                      onChange={(e) => {
                        if (
                          +e.target.value === genre.id ||
                          +e.target.value !== checkedGenre
                        ) {
                          setSearchParams({
                            genre: +e.target.value,
                            year: releaseYear,
                          });
                        }
                        if (+e.target.value === checkedGenre) {
                          searchParams.delete("genre");
                          setSearchParams(searchParams);
                        }
                      }}
                    />
                    <label for={genre.name}>{genre.name}</label>
                  </Genre>
                ))}
              </GenreListings>
            </div>
          </TitleSortingForm>
        </FilterContainer>
      </StyledModal>
    </Overlay>
  );
}

export default ListingsFilterModal;
