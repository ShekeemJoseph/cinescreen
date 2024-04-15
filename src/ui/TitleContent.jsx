import { HiBookmarkSlash, HiStar } from "react-icons/hi2";
import styled, { css } from "styled-components";
import {
  TITLE_MOVIE_GENRES,
  TITLE_TV_GENRES,
  checkMetascore,
  splitGenre,
} from "../utils/helper";
import ButtonWatchList from "./ButtonWatchList";
import Rating from "../features/Rating/Rating";
import "array.prototype.move";
import TitleGenreLinks from "./TitleGenreLinks";
import { useUser } from "../features/authentication/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark, deleteTmdbBookmark } from "../services/apiWatchlist";
import { useParams } from "react-router-dom";
import { BsBookmarkPlus } from "react-icons/bs";
import Register from "../features/authentication/Register";
import { useWatchlist } from "../features/Watchlist/useWatchlist";
import { useRatings } from "../features/Rating/useRatings";
import { media } from "../styles/breakpoints";

const StyledTitle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, max-content));
  ${media.sm`
    display: flex;
    flex-direction: column;
  `}
  padding: 3.6rem;
  row-gap: 2.4rem;
  column-gap: 1.8rem;
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
  & img {
    grid-row: 2 / 3;
    width: 100%;
  }
`;
const TitleName = styled.p`
  font-size: 3.2rem;
`;
const TitleRatings = styled.div`
  grid-column: 4/6;
  align-self: start;
  ${media.lg`
  grid-row: 3 /4;
  grid-column: -11/-9;
  `}
  display: flex;
  gap: 2.4rem;
  justify-content: flex-end;
  ${media.lg`
  gap: 0;
  justify-content: space-between;
  `}
  ${media.sm`
  gap: 2.4rem;
  `}
  z-index: 5;
`;
const TitleRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.6rem;
  & svg {
    width: auto;
    height: 2.2rem;
  }
  & span:first-child {
    font-size: 1.2rem;
    ${media.sm`
      font-size: 1.4rem;
    `}
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
    color: var(--color-grey-300);
  }
  & span:nth-child(2) {
    font-size: 1.8rem;
    ${media.sm`
      font-size: 2.2rem;
    `}
  }
`;
const CenterRatingText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  & svg {
    color: var(--color-brand-800);
  }
`;
const TitleDetails = styled.div`
  grid-column: span 3;
  grid-row: 2/3;
  display: flex;
  z-index: 5;
  flex-direction: column;
  gap: 1.4rem;
  ${media.sm`
    font-size: 1.8rem;
  `}
  & div {
    display: flex;
    flex-wrap: wrap;
    gap: 1.8rem;
  }
  & p {
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--color-grey-350);
  }
`;
const TitleExtra = styled.div`
  grid-column: 5/6;
  ${media.lg`
    grid-column: -9/-8;
  `}
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  & div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  & button {
    ${media.sm`
      font-size: 2.2rem;
      padding: 2.4rem;
    `}
    & svg {
      ${media.sm`
      height: 4rem;
    `}
    }
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
const TitleHeading = styled.div`
  z-index: 5;
  grid-column: span 3;
  ${media.lg`
  grid-column: span 3;
  `}
  ${media.md`
  grid-column: span 4;
  `}
  & span {
    ${media.sm`
    font-size: 2rem;
  `}
  }
`;
const Metascore = styled.span`
  ${(props) => variations[props.variation]}
  padding: 0.4rem 0.6rem;
`;
function TitleContent({ title }) {
  const { titleId } = useParams();
  const queryClient = useQueryClient();
  const { isLoading: isAuthenticating, isAuthenticated, user } = useUser();
  const userId = !isAuthenticating && user ? user.id : null;
  const { isLoading: isWatchlistLoading, watchlist } = useWatchlist(userId);
  const { isRatingLoading, ratings } = useRatings(userId);

  const { mutate: addBookmark } = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
  });
  function handleAddBookmark(userAuthId, tmdbId, imdbId) {
    const bookmarkedTitle = {
      userId: userAuthId,
      titleImdbId: imdbId,
      titleTmdbId: tmdbId,
    };
    addBookmark(bookmarkedTitle);
  }
  const { mutate: removeBookmark } = useMutation({
    mutationFn: deleteTmdbBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
  });
  function handleRemoveBookmark(titleTmdbId) {
    removeBookmark(titleTmdbId);
  }
  const isTitleBookmarked =
    !isWatchlistLoading &&
    watchlist
      .map((curBookmarks) => curBookmarks.titleTmdbId)
      .includes(titleId.toString());
  return (
    <StyledTitle>
      <TitleHeading>
        <TitleName>{title.Title}</TitleName>
        <span>
          {`${title.Year} ${
            title.Rated && title.Rated !== "N/A" ? `| Rated ${title.Rated}` : ""
          } ${
            title.Runtime && title.Runtime !== "N/A" ? `| ${title.Runtime}` : ""
          }`}
        </span>
      </TitleHeading>
      <TitleRatings>
        {title.imdbRating && title.imdbRating !== "N/A" && (
          <TitleRating>
            <span>IMDb Rating</span>
            <CenterRatingText>
              <HiStar />
              <span>
                <strong>{title.imdbRating}</strong> / 10
              </span>
            </CenterRatingText>
          </TitleRating>
        )}
        {title.Ratings[1] && (
          <TitleRating>
            <span>{title.Ratings[1] && title.Ratings[1].Source}</span>
            <span>
              <strong>{title.Ratings[1] && title.Ratings[1].Value}</strong>
            </span>
          </TitleRating>
        )}
        <TitleRating>
          <span>Your Rating</span>
          <Rating
            userId={userId}
            ratings={ratings}
            titleName={title.Title}
            isRatingLoading={isRatingLoading}
            isAuthenticating={isAuthenticating}
          />
        </TitleRating>
      </TitleRatings>

      <img src={title.Poster} alt={`${title.Title} Poster`} />
      <TitleDetails>
        <div>
          {splitGenre(title.Genre).map((genre, index) => {
            if (
              TITLE_MOVIE_GENRES.some(({ name }) => name === genre.trim()) &&
              title.Type === "movie"
            ) {
              return (
                <TitleGenreLinks key={index} title={title} genre={genre} />
              );
            }
            if (
              TITLE_TV_GENRES.some(
                ({ name, firstAltName, secAltName }) =>
                  name === genre.trim() ||
                  firstAltName === genre.trim() ||
                  secAltName === genre.trim()
              ) &&
              title.Type === "series"
            ) {
              return (
                <TitleGenreLinks key={index} title={title} genre={genre} />
              );
            }
            return null;
          })}
        </div>
        <p>{title.Plot}</p>
        {title.Director && title.Director !== "N/A" && (
          <p>
            <strong>Director</strong>&nbsp;&nbsp;
            {title.Director}
          </p>
        )}
        <p>
          <strong>Writers</strong>&nbsp;&nbsp;{title.Writer}
        </p>
        <p>
          <strong>Stars</strong>&nbsp;&nbsp;{title.Actors}
        </p>
        {title.BoxOffice && title.BoxOffice !== "N/A" && (
          <p>
            <strong>Box Office</strong>&nbsp;&nbsp;
            {title.BoxOffice}
          </p>
        )}
        {title.Awards && title.Awards !== "N/A" && (
          <p>
            <strong>Awards</strong>&nbsp;&nbsp;{title.Awards}
          </p>
        )}
      </TitleDetails>
      <TitleExtra>
        {!isAuthenticated ? (
          <Register>
            <ButtonWatchList variation="titleStyle">
              <BsBookmarkPlus /> Watchlist
            </ButtonWatchList>
          </Register>
        ) : !isTitleBookmarked ? (
          <ButtonWatchList
            onClick={() => handleAddBookmark(user.id, titleId, title.imdbID)}
            variation="titleStyle"
          >
            <BsBookmarkPlus /> Watchlist
          </ButtonWatchList>
        ) : isTitleBookmarked ? (
          <ButtonWatchList
            onClick={() => handleRemoveBookmark(titleId)}
            variation="titleStyle"
          >
            <HiBookmarkSlash /> Watchlist
          </ButtonWatchList>
        ) : null}
        {title.Metascore !== "N/A" && (
          <div>
            <Metascore variation={checkMetascore(title.Metascore)}>
              {title.Metascore}
            </Metascore>
            <span>Metascore</span>
          </div>
        )}
      </TitleExtra>
    </StyledTitle>
  );
}

export default TitleContent;
