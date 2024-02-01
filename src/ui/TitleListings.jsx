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

function TitleListings({ initialTitles, titleType }) {
  const [searchParams] = useSearchParams(defaultYear);
  const [isLoading, setIsLoading] = useState(false);
  const [titlesByYear, setTitlesByYear] = useState();

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
    <StyledTitleListings>
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
    </StyledTitleListings>
  );
}

export default TitleListings;
