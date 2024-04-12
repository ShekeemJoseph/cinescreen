import styled from "styled-components";
import { HiBookmarkSlash, HiStar } from "react-icons/hi2";
import { useWatchlist } from "../features/Watchlist/useWatchlist";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getCurrentUser } from "../services/apiAuth";
import { deleteTmdbBookmark } from "../services/apiWatchlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import { options } from "../services/apiGetTitleData";
import { reduceLongPlot, reduceLongTitle } from "../utils/helper";
import { media } from "../styles/breakpoints";

const WatchlistHeader = styled.section`
  max-width: 128rem;
  margin: 0 auto;
  padding: 0 2.4rem;
`;
const WatchListContent = styled.section`
  max-width: 128rem;
  margin: 0 auto;
  padding: 0 2.4rem;

  height: ${(props) => props.heigthAdjust};
`;
const Container = styled.div`
  background-color: #1f1f1f;
`;
const Heading = styled.div`
  height: 18rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: center;
  & h1 {
    color: var(--color-grey-0);
    font-size: 4.5rem;
  }
  & p {
    color: var(--color-grey-350);
  }
`;
const WatchlistContainer = styled.ul`
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
  padding: 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
`;
const WatchListItem = styled.li`
  ${media.smd`
position: relative;
`}
  height: 15rem;
  display: flex;
  gap: 1.2rem;
  &:not(:last-child) {
    padding-bottom: 1.2rem;
    border-bottom: 1px solid var(--color-grey-300);
    margin-bottom: 1.8rem;
  }
  & img {
    width: 9rem;
    height: 100%;
  }
`;
const NoContentContainer = styled.div`
  height: 46.5rem;
  width: 128rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledLink = styled(Link)`
  &:hover,
  &:active {
    text-decoration: underline;
  }
`;
const WatchListItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    & svg {
      color: var(--color-brand-800);
    }
  }
  & span {
    font-size: 1.5rem;
  }
  & p {
    font-size: 1.4rem;
  }
  & button {
    ${media.smd`
    position: absolute;
    top: 2%;
    right: 2%;
    `}
    color: var(--color-grey-0);
    display: flex;
    padding: 1.2rem;
    align-items: center;
    gap: 0.8rem;
    height: 3rem;
    width: 12rem;
    background: none;
    border: none;
    background-color: var(--color-brand-700);
    padding: 0.8rem;
    border-radius: var(--border-radius-sm);
    &:hover,
    &:active {
      background-color: var(--color-brand-900);
    }
    &:focus {
      outline: none;
    }
    & svg {
      width: auto;
      height: 1.8rem;
    }
  }
`;

function WatchList() {
  const user = useLoaderData();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedTitles, setBookmarkedTitles] = useState([]);
  const { isLoading: isWatchlistLoading, watchlist } = useWatchlist(user.id);

  useEffect(() => {
    async function getWatchlistData() {
      setIsLoading(true);
      let fetchBookmarkedList = [];
      if (!isWatchlistLoading && watchlist && user.id) {
        try {
          for (const watchtitle of watchlist) {
            if (watchtitle.userId === user.id) {
              const res = await fetch(
                `https://api.themoviedb.org/3/find/${watchtitle.titleImdbId}?external_source=imdb_id`,
                options
              );
              const { movie_results: movieResult, tv_results: tvResult } =
                await res.json();
              fetchBookmarkedList.push(movieResult, tvResult);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
      setBookmarkedTitles(fetchBookmarkedList);
      setIsLoading(false);
    }
    getWatchlistData();
  }, [isWatchlistLoading, watchlist, user.id]);

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
    setBookmarkedTitles((data) =>
      data.flat().filter((item) => item.id !== titleTmdbId)
    );
  }
  return (
    <>
      <Container>
        <WatchlistHeader>
          <Heading>
            <h1>Your Watchlist</h1>
            <p>
              Your watchlist is the place to track the movies and tv shows you
              want to watch.
            </p>
          </Heading>
        </WatchlistHeader>
      </Container>
      <WatchListContent
        heigthAdjust={
          bookmarkedTitles.flat().length <= 2 &&
          bookmarkedTitles.flat().length !== 0
            ? "46.5rem"
            : ""
        }
      >
        {isLoading && (
          <NoContentContainer>
            <Spinner />
          </NoContentContainer>
        )}
        {!isLoading &&
        bookmarkedTitles.flat() !== undefined &&
        bookmarkedTitles.flat().length >= 1 ? (
          <WatchlistContainer>
            {bookmarkedTitles.flat().map((title, index) => (
              <WatchListItem key={title.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                  alt={`${
                    title.title ||
                    title.original_title ||
                    title.name ||
                    title.original_name
                  } Poster`}
                />
                <WatchListItemDetails>
                  <div>
                    <StyledLink
                      to={
                        title.media_type === "movie"
                          ? `/movie/${title.id}`
                          : title.media_type === "tv"
                          ? `/tv/${title.id}`
                          : "/"
                      }
                    >
                      <h4>
                        {`${++index}. `}
                        {reduceLongTitle(title.title) ||
                          reduceLongTitle(title.original_title) ||
                          reduceLongTitle(title.name) ||
                          reduceLongTitle(title.original_name)}
                      </h4>
                    </StyledLink>
                  </div>
                  <div>
                    <span>{title.release_date || title.first_air_date}</span>
                  </div>
                  <div>
                    <HiStar />
                    <span>{Math.ceil(title.vote_average)}</span>
                    <span>{title.media_type.toUpperCase()}</span>
                  </div>
                  <p>{reduceLongPlot(title.overview)}</p>
                  <button onClick={() => handleRemoveBookmark(title.id)}>
                    <HiBookmarkSlash /> watchlist
                  </button>
                </WatchListItemDetails>
              </WatchListItem>
            ))}
          </WatchlistContainer>
        ) : (
          <NoContentContainer>
            <p>There are currently no bookmarked titles</p>
          </NoContentContainer>
        )}
      </WatchListContent>
    </>
  );
}
export async function loader() {
  const user = await getCurrentUser();
  return user;
}
export default WatchList;
