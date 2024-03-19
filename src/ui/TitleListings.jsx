import styled from "styled-components";
import { defaultYear, reduceLongTitle } from "../utils/helper";
import SpinnerMini from "./SpinnerMini";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { HiStar } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { getPageMovies, getPageSeries } from "../services/apiGetTitleData";

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
function TitleListings({ initialTitles, mediaType }) {
  const [searchParams] = useSearchParams(defaultYear);
  const [isLoading, setIsLoading] = useState(false);
  const [titlesByYear, setTitlesByYear] = useState();

  useEffect(() => {
    async function getByReleaseYear() {
      setIsLoading(true);
      const getMovieTitlesByYear = await getPageMovies(
        +searchParams.get("year"),
        +searchParams.get("genre")
      );
      const getSeriesTitlesByYear = await getPageSeries(
        +searchParams.get("year"),
        +searchParams.get("genre")
      );
      setTitlesByYear(
        mediaType === "movie"
          ? getMovieTitlesByYear
          : mediaType === "series"
          ? getSeriesTitlesByYear
          : null
      );
      setIsLoading(false);
    }
    getByReleaseYear();
  }, [mediaType, searchParams]);
  const titles = titlesByYear || initialTitles;

  return (
    <StyledTitleListings>
      <TitleContentLinks>
        <StyledNavLink to="/movie">Movies</StyledNavLink>
        <StyledNavLink to="/tv">TV Shows</StyledNavLink>
      </TitleContentLinks>
      {titles.length >= 1 ? (
        <Listings>
          {titles
            .filter((title) =>
              title.vote_average && title.vote_average !== 0 ? true : false
            )
            .map((title) => (
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
                  <SpinnerMini />
                ) : (
                  <ListingContent>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                      alt={`${title.title ? title.title : title.name} Poster`}
                    />
                    <ListingDetails>
                      <h4>
                        {reduceLongTitle(
                          title.title ? title.title : title.name
                        )}
                      </h4>
                      <ListingYear>
                        {title.release_date || title.first_air_date || "N/A"}
                      </ListingYear>
                      <p>{reduceLongTitle(title.overview)}</p>
                      {title.vote_average && (
                        <RatingsText>
                          <span>{Math.floor(title.vote_average)}</span>
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
      ) : (
        <EmptyListings>
          <EmptyListingsMessage>
            <h3>No Results Found</h3>
            <p>Seems like we dont have results for that.</p>
            <p>Try adding or removing different filter</p>
          </EmptyListingsMessage>
        </EmptyListings>
      )}
    </StyledTitleListings>
  );
}

export default TitleListings;
