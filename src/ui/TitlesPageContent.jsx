import styled from "styled-components";
import { getCurrentYear, reduceLongTitle } from "../utils/helper";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiStar } from "react-icons/hi2";

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
  padding: 2.4rem;
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
    &.active::after,
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
const StyledYearRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const GenreListings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;
const Genre = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
function TitlesContent({ titles, titleType }) {
  const [year, setYear] = useState(getCurrentYear() - 1);
  console.log(titles);
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
            <StyledYearRange>
              <label for="titleReleaseYear">1980</label>
              <input
                type="range"
                id="titleReleaseYear"
                name="titleReleaseYear"
                min="1980"
                max={getCurrentYear() - 1}
                step="1"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
              <label for="titleReleaseYear">{year}</label>
            </StyledYearRange>
            <h5>Genres</h5>
            <GenreListings>
              {titleGenres.map((genre) => (
                <Genre key={genre}>
                  <input type="checkbox" id={genre} name={genre} />
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
              </Listing>
            ))}
          </Listings>
        </TitleListings>
      </TitlesPageLayout>
    </>
  );
}

export default TitlesContent;
