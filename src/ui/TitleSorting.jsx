import { useEffect, useState } from "react";
import { useNavigation, useSearchParams } from "react-router-dom";
import { TITLE_GENRES, defaultYear } from "../utils/helper";
import styled, { css } from "styled-components";
import ReactSlider from "react-slider";
import "array.prototype.move";

const StyledTitleSorting = styled.aside`
  display: grid;
  grid-template-rows: auto auto 1fr;
  border-top: 1px solid var(--color-grey-700);

  & h4 {
    padding: 1.2rem 0;
    border-bottom: 1px solid var(--color-grey-300);
  }
  & h5 {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.2rem;
    margin: 1.8rem 0;
  }
`;

const RangeSlider = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
const RangeInput = styled(ReactSlider).attrs({ type: "range" })`
  width: 50%;
  height: 0.8rem;
  border-radius: 4rem;
  background: ${(props) =>
    `linear-gradient(to right,#e64980 0%,#e64980 ${props.value}%,#fff ${props.value}%,#fff 100%);`};
  & .thumb-0 {
    position: relative;
    cursor: pointer;
    top: -95%;
    width: 2.4rem;
    height: 2.4rem;
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

  &:hover,
  &:active {
    background-color: var(--color-grey-300);
    border-radius: var(--border-radius-sm);
  }
  input[type="checkbox"] {
    accent-color: black;
    &:focus {
      outline: none;
    }
  }
`;
function TitleSorting() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  const [genreList, setGenreList] = useState(TITLE_GENRES);
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedGenre, setCheckedGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState(
    +searchParams.get("year") || defaultYear
  );

  useEffect(() => {
    function handleLoad() {
      if (!isLoading && searchParams.get("genre") !== null) {
        setCheckedGenre(searchParams.get("genre"));
        setGenreList(TITLE_GENRES.sort());
        setGenreList(
          TITLE_GENRES.move(TITLE_GENRES.indexOf(searchParams.get("genre")), 0)
        );
      } else if (!isLoading && searchParams.get("genre") === null) {
        setCheckedGenre("");
        setGenreList(TITLE_GENRES.sort());
      }
    }
    handleLoad();
  }, [isLoading, searchParams]);

  return (
    <StyledTitleSorting>
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
            max={defaultYear}
            step={1}
            value={+searchParams.get("year") || defaultYear}
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
          {genreList.map((genre) => (
            <Genre
              key={genre}
              variation={genre === checkedGenre ? "active" : ""}
            >
              <input
                type="checkbox"
                value={genre}
                checked={genre === checkedGenre ? true : false}
                onChange={(e) => {
                  if (
                    e.target.value === genre ||
                    e.target.value !== checkedGenre
                  ) {
                    setSearchParams({
                      genre: e.target.value,
                      year: releaseYear,
                    });
                  }
                  if (e.target.value === checkedGenre) {
                    searchParams.delete("genre");
                    setSearchParams(searchParams);
                  }
                }}
                id={genre}
                name={genre}
              />
              <label for={genre}>{genre}</label>
            </Genre>
          ))}
        </GenreListings>
      </div>
    </StyledTitleSorting>
  );
}

export default TitleSorting;
