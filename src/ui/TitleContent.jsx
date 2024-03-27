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
      <TitleHeader>
        <div>
          <TitleName>{title.Title}</TitleName>
          <span>
            {`${title.Year} ${
              title.Rated && title.Rated !== "N/A"
                ? `| Rated ${title.Rated}`
                : ""
            } ${
              title.Runtime && title.Runtime !== "N/A"
                ? `| ${title.Runtime}`
                : ""
            }`}
          </span>
        </div>
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
              <span style={{ fontSize: "1.8rem" }}>
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
      </TitleHeader>
      <TitleBody>
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
      </TitleBody>
    </StyledTitle>
  );
}

export default TitleContent;
