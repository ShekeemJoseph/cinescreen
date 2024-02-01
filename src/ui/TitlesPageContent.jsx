import styled, { css } from "styled-components";
import { getCurrentYear, reduceLongTitle } from "../utils/helper";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { HiStar } from "react-icons/hi2";
import ReactSlider from "react-slider";
import { useEffect, useState } from "react";
import { getPageMovies, getPageSeries } from "../services/apiGetTitleData";
import SpinnerMini from "./SpinnerMini";

const titleGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

const StyledHeading = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0.8rem;
  width: 128rem;
  margin: 2.4rem 0;

  & p:first-child {
    font-weight: 600;
    font-size: 3.6rem;
  }
`;
const TitlesPageLayout = styled.div`
  display: grid;
  width: 128rem;
  margin-bottom: 3.6rem;
  grid-template-columns: 0.25fr 1fr;
`;
const TitleSorting = styled.aside`
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
const TitleContentLinks = styled.div`
  display: flex;
  gap: 1.4rem;
  padding: 1.2rem;
  margin-left: 2.4rem;
`;
const TitleListings = styled.div`
  border-top: 1px solid var(--color-grey-700);
`;
const Listings = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  margin: 2.4rem;
  row-gap: 2.4rem;
  column-gap: 2.4rem;
`;
const Listing = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 1.8rem;
  display: flex;
  justify-content: center;
  box-shadow: var(--shadow-ml);
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;

  &:hover,
  &:active {
    box-shadow: var(--shadow-lg);
    transform: translateY(-5px);
  }
`;
const ListingContent = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  & img {
    width: 30%;
    height: auto;
    border-radius: var(--border-radius-sm);
  }
`;
const RatingsText = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;

  & svg {
    max-width: 1.8rem;
    height: 1.8rem;
    color: var(--color-brand-900);
  }
`;
const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    font-weight: 600;
    position: relative;

    &::after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 3.4rem;
      height: 2px;
      z-index: 100;
      background-color: var(--color-grey-700);
      transform: scaleX(0);
      content: "";
    }

    &.active::after {
      transform: scaleX(1);
    }

    &:hover,
    &:active {
      color: var(--color-grey-300);
      transform: scaleX(1);
    }
  }
`;
const ListingDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: start;
`;
const ListingYear = styled.div`
  font-size: 1.4rem;
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

const GenreListings = styled.div`
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
const Genre = styled.div`
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
const defaultYear = getCurrentYear() - 1;
function TitlesContent({ initialTitles, titleType }) {
  const [searchParams, setSearchParams] = useSearchParams(defaultYear);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedGenre, setCheckedGenre] = useState(
    searchParams.get("genre") || ""
  );
  const [titlesByYear, setTitlesByYear] = useState();
  const [releaseYear, setReleaseYear] = useState(
    +searchParams.get("year") || defaultYear
  );
  useEffect(() => {
    async function getByReleaseYear() {
      setIsLoading(true);
      const getMovieTitlesByYear = await getPageMovies(
        24,
        +searchParams.get("year"),
        searchParams.get("genre")
      );
      const getSeriesTitlesByYear = await getPageSeries(
        24,
        +searchParams.get("year"),
        searchParams.get("genre")
      );
      setTitlesByYear(
        titleType === "Movies"
          ? getMovieTitlesByYear
          : titleType === "Series"
          ? getSeriesTitlesByYear
          : null
      );
      setIsLoading(false);
    }
    getByReleaseYear();
  }, [titleType, searchParams]);
  const titles = titlesByYear || initialTitles;
  return (
    <>
      <StyledHeading>
        <p>
          Top {titleType === "Movies" ? "Movies" : "TV Shows"} to Watch Right
          Now
        </p>
        <p>
          Find your next {titleType === "Movies" ? "movie" : "TV show"} to
          watch. Filter by genre or release year.
        </p>
      </StyledHeading>
      <TitlesPageLayout>
        <TitleSorting>
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
              {titleGenres.map((genre) => (
                <Genre
                  key={genre}
                  variation={genre === checkedGenre ? "active" : ""}
                >
                  <input
                    type="checkbox"
                    value={genre}
                    checked={genre === checkedGenre ? true : false}
                    onChange={(e) => {
                      if (genre !== checkedGenre) {
                        setCheckedGenre(e.target.value);
                        setSearchParams({
                          genre: e.target.value,
                          year: releaseYear,
                        });
                      } else if (genre === checkedGenre) {
                        setCheckedGenre("");
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
        </TitleSorting>
        <TitleListings>
          <TitleContentLinks>
            <StyledNavLink to="/movie">Movies</StyledNavLink>
            <StyledNavLink to="/tv">TV Shows</StyledNavLink>
          </TitleContentLinks>
          <Listings>
            {titles.map((title) => (
              <Listing
                key={title.id}
                to={
                  title.titleType?.id === "movie"
                    ? `/movie/${title.id}`
                    : title.titleType?.id === "tvSeries" ||
                      title.titleType?.id === "tvMiniSeries"
                    ? `/tv/${title.id}`
                    : "/"
                }
              >
                {isLoading ? (
                  <SpinnerMini />
                ) : (
                  <ListingContent>
                    <img
                      src={title.primaryImage?.url}
                      alt={`${title.originalTitleText?.text} Poster`}
                    />
                    <ListingDetails>
                      <h4>{reduceLongTitle(title.originalTitleText?.text)}</h4>
                      <ListingYear>
                        {title.releaseDate.year} &bull;{" "}
                        {title.releaseDate.month || "N/A"} &bull;{" "}
                        {title.releaseDate.day || "N/A"}
                      </ListingYear>
                      <p>{reduceLongTitle(title.plot.plotText.plainText)}</p>
                      {title.ratingsSummary.aggregateRating && (
                        <RatingsText>
                          <span>{title.ratingsSummary.aggregateRating}</span>
                          <HiStar />
                          <span>Rating</span>
                        </RatingsText>
                      )}
                    </ListingDetails>
                  </ListingContent>
                )}
              </Listing>
            ))}
          </Listings>
        </TitleListings>
      </TitlesPageLayout>
    </>
  );
}

export default TitlesContent;
