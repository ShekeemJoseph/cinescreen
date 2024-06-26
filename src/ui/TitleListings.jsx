import styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import {
  getCurrentYear,
  reduceLongTitle,
  reduceTitlePlot,
} from "../utils/helper";
import SpinnerMini from "./SpinnerMini";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { HiStar } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { getPageMovies, getPageSeries } from "../services/apiGetTitleData";
import Pagination from "./Pagination";
import { media } from "../styles/breakpoints";

const TitleContentLinks = styled.div`
  display: flex;
  gap: 1.4rem;
  padding: 1.2rem;
  margin-left: 2.4rem;
`;
const StyledTitleListings = styled.div`
  border-top: 1px solid var(--color-grey-700);
`;
const Listings = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  ${media.md`
  grid-template-columns: repeat(2, minmax(0, 1fr));
  `}
  ${media.sm`
  grid-template-columns: 1fr;
  `}
  grid-template-rows: ${(props) =>
    `repeat(${Math.ceil(props.titleLength / 3)}, minmax(0, 1fr))`};
  margin: 2.4rem;
  row-gap: 2.4rem;
  column-gap: 2.4rem;
`;
const Listing = styled(Link)`
  width: 100%;
  height: 95%;
  padding: 1.8rem;
  display: flex;
  justify-content: center;
  box-shadow: var(--shadow-ml);
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;
  background-color: var(--color-grey-50);
  &:hover,
  &:active {
    box-shadow: var(--shadow-lg);
    transform: translateY(-5px);
    ${media.md`
    box-shadow: var(--shadow-ml);
    transform: translateY(0);
    `}
  }
`;
const ListingContent = styled.li`
  display: flex;
  gap: 1.2rem;
  & img {
    width: 35%;
    ${media.md`
    width: 25%;
    `}
    ${media.sm`
    width: 15%;
    `}
    ${media.xs`
    width: 25%;
    `}
    height: auto;
    border-radius: var(--border-radius-sm);
  }
`;
const ListingDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  font-size: 1.4rem;
  ${media.md`
  font-size: 1.6rem;
  `}
  ${media.sm`
  font-size: 1.8rem;
  `}
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
    ${media.md`
      font-size: 2.2rem;
    `}
    &::after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 3.4rem;
      ${media.md`
      bottom: 4.3rem;
      `}
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

const ListingYear = styled.div`
  font-size: 1.4rem;
  ${media.md`
  font-size: 1.6rem;
  `}
  ${media.sm`
  font-size: 1.8rem;
  `}
`;
const EmptyListings = styled.div`
  height: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EmptyListingsMessage = styled.div`
  text-align: center;
  & h3 {
    margin-bottom: 0.8rem;
  }
`;
const FilterModalBtn = styled.button`
  display: none;
  background: none;
  position: relative;
  margin-right: 2.4rem;
  border: 1px solid var(--color-grey-700);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-700);
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 2rem;
  ${media.md`
  display: flex;
  `}
  & svg {
    color: var(--color-grey-700);
    height: 2rem;
    width: auto;
  }
  & span {
    font-size: 2rem;
    font-weight: 500;
  }
  &:focus {
    outline: none;
  }
`;
function TitleListings({
  initialTitles,
  initialTotalResults,
  mediaType,
  modalHandler,
}) {
  const [searchParams] = useSearchParams(getCurrentYear());
  const [isLoading, setIsLoading] = useState(false);
  const [titlesByYear, setTitlesByYear] = useState();
  const [sortedPages, setSortedPages] = useState();

  useEffect(() => {
    async function getByReleaseYear() {
      setIsLoading(true);
      const {
        results: getMovieTitlesByYear,
        total_results: getMoviesTitleResults,
      } = await getPageMovies(
        +searchParams.get("year"),
        +searchParams.get("genre"),
        +searchParams.get("page")
      );
      const {
        results: getSeriesTitlesByYear,
        total_results: getSeriesTitleResults,
      } = await getPageSeries(
        +searchParams.get("year"),
        +searchParams.get("genre"),
        +searchParams.get("page")
      );
      setTitlesByYear(
        mediaType === "movie"
          ? getMovieTitlesByYear
          : mediaType === "series"
          ? getSeriesTitlesByYear
          : null
      );
      setSortedPages(
        mediaType === "movie"
          ? getMoviesTitleResults
          : mediaType === "series"
          ? getSeriesTitleResults
          : null
      );
      setIsLoading(false);
    }
    getByReleaseYear();
  }, [mediaType, searchParams]);

  const titles = titlesByYear || initialTitles;
  const totalResults = sortedPages || initialTotalResults;
  const filteredTitles = titles.filter((title) =>
    title.vote_average && title.vote_average !== 0 ? true : false
  );
  return (
    <StyledTitleListings>
      <TitleContentLinks>
        <StyledNavLink to="/movie">Movies</StyledNavLink>
        <StyledNavLink to="/tv">TV Shows</StyledNavLink>
      </TitleContentLinks>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <FilterModalBtn onClick={modalHandler}>
          <FaFilter />
          <span>Filter</span>
        </FilterModalBtn>
      </div>
      {filteredTitles.length >= 1 ? (
        <Listings titleLength={filteredTitles.length}>
          {filteredTitles.map((title) => (
            <Listing
              key={title.id}
              to={
                mediaType === "movie"
                  ? `/movie/${title.id}`
                  : mediaType === "series"
                  ? `/tv/${title.id}`
                  : "/"
              }
            >
              {isLoading ? (
                <div style={{ width: "29.7rem", textAlign: "center" }}>
                  <SpinnerMini />
                </div>
              ) : (
                <ListingContent>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                    alt={`${title.title ? title.title : title.name} Poster`}
                  />
                  <ListingDetails>
                    <h3>
                      {reduceLongTitle(title.title ? title.title : title.name)}
                    </h3>
                    <ListingYear>
                      {title.release_date || title.first_air_date || "N/A"}
                    </ListingYear>
                    {title.vote_average && (
                      <RatingsText>
                        <span>{Math.floor(title.vote_average)}</span>
                        <HiStar />
                        <span>Rating</span>
                      </RatingsText>
                    )}
                    <p>{reduceTitlePlot(title.overview)}</p>
                  </ListingDetails>
                </ListingContent>
              )}
            </Listing>
          ))}
        </Listings>
      ) : (
        <EmptyListings>
          <EmptyListingsMessage>
            <h3>No Results Found</h3>
            <p>Seems like we dont have results for that.</p>
            <p>Try adding or removing different filter</p>
          </EmptyListingsMessage>
        </EmptyListings>
      )}
      <Pagination totalResults={totalResults} />
    </StyledTitleListings>
  );
}

export default TitleListings;
