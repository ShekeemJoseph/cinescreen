import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  TITLE_MOVIE_GENRES,
  TITLE_TV_GENRES,
  getTitleGenreId,
  sortGenres,
} from "../utils/helper";

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
function TitleGenreLinks({ title, genre }) {
  return (
    <TitleLinks
      onClick={() => {
        if (title.Type === "movie") {
          sortGenres(TITLE_MOVIE_GENRES);
          TITLE_MOVIE_GENRES.move(
            TITLE_MOVIE_GENRES.findIndex((apiGenre) => apiGenre.name === genre),
            0
          );
        } else if (title.Type === "series") {
          sortGenres(TITLE_TV_GENRES);
          TITLE_TV_GENRES.move(
            TITLE_TV_GENRES.findIndex((apiGenre) => apiGenre.name === genre),
            0
          );
        }
      }}
      to={
        title.Type === "movie"
          ? `/movie?genre=${getTitleGenreId(genre, TITLE_MOVIE_GENRES)}`
          : title.Type === "series"
          ? `/tv?genre=${getTitleGenreId(genre, TITLE_TV_GENRES)}`
          : "/"
      }
    >
      {genre}
    </TitleLinks>
  );
}

export default TitleGenreLinks;
