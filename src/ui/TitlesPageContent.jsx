import styled from "styled-components";
import { getCurrentYear, reduceLongTitle } from "../utils/helper";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
`;
const TitleListings = styled.div`
  border-top: 1px solid var(--color-grey-700);
`;
const Listings = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
`;
const Listing = styled.li`
  width: 8rem;
  height: 8rem;
  & img {
    width: 100%;
  }
`;
function TitlesContent({ titles, titleType }) {
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
  const [year, setYear] = useState(getCurrentYear() - 1);

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
            <h5>Releaser Year</h5>
            <div>
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
            </div>
            <div>
              <h5>Genre</h5>
              {titleGenres.map((genre) => (
                <div key={genre}>
                  <input type="checkbox" id={genre} name={genre} />
                  <label for={genre}>{genre}</label>
                </div>
              ))}
            </div>
          </div>
        </TitleSorting>
        <TitleListings>
          <div>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/tv">TV Shows</NavLink>
          </div>
          <Listings>
            {titles.map((title) => (
              <Link
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
                <Listing>
                  <img
                    src={title.primaryImage?.url}
                    alt={`${title.originalTitleText?.text} Poster`}
                  />
                  <p>{reduceLongTitle(title.originalTitleText?.text)}</p>
                </Listing>
              </Link>
            ))}
          </Listings>
        </TitleListings>
      </TitlesPageLayout>
    </>
  );
}

export default TitlesContent;
