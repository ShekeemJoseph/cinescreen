import { HiPlus, HiStar } from "react-icons/hi2";
import styled, { css } from "styled-components";
import {
  TITLE_MOVIE_GENRES,
  TITLE_TV_GENRES,
  checkMetascore,
  sortGenres,
  splitGenre,
} from "../utils/helper";
import ButtonWatchList from "./ButtonWatchList";
import { Link } from "react-router-dom";
import Rating from "../features/Rating/Rating";
import "array.prototype.move";

const StyledTitle = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 3.6rem;
  row-gap: 2.4rem;
  color: var(--color-grey-0);
  height: 100%;
  background: linear-gradient(
    90deg,
    rgb(31, 31, 31),
    20%,
    rgba(31, 31, 31, 0.6),
    80%,
    rgb(31, 31, 31)
  );
`;
const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
`;
const TitleName = styled.p`
  font-size: 3.2rem;
`;
const TitleRatings = styled.div`
  display: flex;
  gap: 2.4rem;
`;
const TitleRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.6rem;

  & svg {
    width: auto;
    height: 2rem;
  }
  & span:first-child {
    font-size: 1.3rem;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
    color: var(--color-grey-300);
  }
`;
const CenterRatingText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  & span {
    font-size: 1.8rem;
  }
  & svg {
    color: var(--color-brand-800);
  }
`;
const TitleBody = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 1.8rem;
`;
const TitleLinks = styled(Link)`
  &:link,
  &:visited {
    border-radius: 100px;
    border: 1px solid var(--color-grey-500);
    padding: 0.4rem 0.6rem;
  }
  &:hover,
  &:active {
    background-color: rgba(75, 85, 99, 0.679);
  }
`;
const TitleDetails = styled.div`
  display: flex;
  z-index: 5;
  flex-direction: column;
  gap: 1.4rem;
  & div {
    display: flex;
    gap: 1.8rem;
  }
  & p {
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--color-grey-350);
  }
`;
const TitleExtra = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  & div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;
const variations = {
  green: css`
    background-color: var(--color-green-0);
  `,
  yellow: css`
    background-color: var(--color-yellow-0);
  `,
  red: css`
    background-color: var(--color-red-0);
  `,
};
const Metascore = styled.span`
  ${(props) => variations[props.variation]}
  padding: 0.4rem 0.6rem;
`;
function TitleContent({ title }) {
  return (
    <StyledTitle>
      <TitleHeader>
        <div>
          <TitleName>{title.Title}</TitleName>
          <span>{`${title.Year} | Rated ${title.Rated} | ${title.Runtime}`}</span>
        </div>
        <TitleRatings>
          <TitleRating>
            <span>IMDb Rating</span>
            <CenterRatingText>
              <HiStar />
              <span>
                <strong>{title.imdbRating}</strong> / 10
              </span>
            </CenterRatingText>
          </TitleRating>
          {title.Ratings[1] && (
            <TitleRating>
              <span>{title.Ratings[1] && title.Ratings[1].Source}</span>
              <span style={{ fontSize: "1.8rem" }}>
                <strong>{title.Ratings[1] && title.Ratings[1].Value}</strong>
              </span>
            </TitleRating>
          )}
          <TitleRating>
            <span>Your Rating</span>
            <Rating titleName={title.Title} />
          </TitleRating>
        </TitleRatings>
      </TitleHeader>
      <TitleBody>
        <img src={title.Poster} alt={`${title.Title} Poster`} />
        <TitleDetails>
          <div>
            {splitGenre(title.Genre).map((genre, index) => (
              <TitleLinks
                key={index}
                onClick={() => {
                  if (title.Type === "movie") {
                    sortGenres(TITLE_MOVIE_GENRES);
                    TITLE_MOVIE_GENRES.move(
                      TITLE_MOVIE_GENRES.findIndex(
                        (apiGenre) => apiGenre.name === genre.trim()
                      ),
                      0
                    );
                  } else if (title.Type === "series") {
                    sortGenres(TITLE_TV_GENRES);
                    TITLE_TV_GENRES.move(
                      TITLE_TV_GENRES.findIndex(
                        (apiGenre) => apiGenre.name === genre.trim()
                      ),
                      0
                    );
                  }
                }}
                to={
                  title.Type === "movie"
                    ? `/movie?genre=${
                        TITLE_MOVIE_GENRES.find(
                          ({ name }) => name === genre.trim()
                        ).id
                      }`
                    : title.Type === "series"
                    ? `/tv?genre=${
                        TITLE_TV_GENRES.find((apiGenre) => {
                          let validGenreName;
                          if (apiGenre.name === genre.trim()) {
                            validGenreName = true;
                          } else if (apiGenre.firstAltName) {
                            validGenreName =
                              apiGenre.firstAltName === genre.trim();
                          } else if (apiGenre.secAltName) {
                            validGenreName =
                              apiGenre.secAltName === genre.trim();
                          } else {
                            validGenreName = false;
                          }
                          return validGenreName;
                        })?.id
                      }`
                    : "/"
                }
              >
                {genre}
              </TitleLinks>
            ))}
          </div>
          <p>{title.Plot}</p>
          <p>
            <strong>Director</strong>&nbsp;&nbsp;
            {title.Director ? title.Director : "N/A"}
          </p>
          <p>
            <strong>Writers</strong>&nbsp;&nbsp;{title.Writer}
          </p>
          <p>
            <strong>Stars</strong>&nbsp;&nbsp;{title.Actors}
          </p>
          <p>
            <strong>Box Office</strong>&nbsp;&nbsp;
            {title.BoxOffice ? title.BoxOffice : "N/A"}
          </p>
          <p>
            <strong>Awards</strong>&nbsp;&nbsp;{title.Awards}
          </p>
        </TitleDetails>
        <TitleExtra>
          <ButtonWatchList variation="titleStyle">
            <HiPlus /> Watchlist
          </ButtonWatchList>
          {title.Metascore !== "N/A" && (
            <div>
              <Metascore variation={checkMetascore(title.Metascore)}>
                {title.Metascore}
              </Metascore>
              <span>Metascore</span>
            </div>
          )}
        </TitleExtra>
      </TitleBody>
    </StyledTitle>
  );
}

export default TitleContent;
