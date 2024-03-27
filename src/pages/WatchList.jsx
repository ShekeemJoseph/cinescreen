import styled from "styled-components";
import { HiBookmarkSlash, HiStar } from "react-icons/hi2";
import { useWatchlist } from "../features/Watchlist/useWatchlist";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getCurrentUser } from "../services/apiAuth";
import { getCurrentYear, getDuration } from "../utils/helper";
import { deleteImdbBookmark } from "../services/apiWatchlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";

const WatchlistHeader = styled.section`
  max-width: 128rem;
  margin: 0 auto;
`;
const WatchListContent = styled.section`
  max-width: 128rem;
  margin: 0 auto;
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

  & div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    & svg {
      color: var(--color-brand-800);
    }
  }
  & span {
    font-size: 1.4rem;
  }
  & p {
    font-size: 1.4rem;
  }
  & button {
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

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "06be5c5da4msh57da3ae22a9b43bp127c9fjsnd45a69425767",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};
function WatchList() {
  const user = useLoaderData();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedTitles, setBookmarkedTitles] = useState([]);
  const { isLoading: isWatchlistLoading, watchlist } = useWatchlist(user.id);

  useEffect(() => {
    async function getWatchlistData() {
      setIsLoading(true);
      if (!isWatchlistLoading && watchlist && user.id) {
        try {
          const res = await fetch(
            `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${watchlist
              .map((items) => items.titleImdbId)
              .join(",")}&info=base_info`,
            options
          );
          const resData = await res.json();
          setBookmarkedTitles(resData.results);
        } catch (error) {
          console.error(error);
        }
      }
      setIsLoading(false);
    }
    getWatchlistData();
  }, [isWatchlistLoading, watchlist, user.id]);

  const { mutate: removeBookmark } = useMutation({
    mutationFn: deleteImdbBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
  });
  function handleRemoveBookmark(titleImdbId) {
    removeBookmark(titleImdbId);
    setBookmarkedTitles((data) =>
      data.filter((item) => item.id !== titleImdbId)
    );
  }
  console.log(bookmarkedTitles);
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
      <WatchListContent>
        {isLoading && (
          <NoContentContainer>
            <Spinner />
          </NoContentContainer>
        )}
        {!isLoading && bookmarkedTitles ? (
          <WatchlistContainer>
            {bookmarkedTitles.map((item, index) => (
              <WatchListItem key={item.id}>
                <img src={item.primaryImage?.url} alt={item.titleText.text} />
                <WatchListItemDetails>
                  <div>
                    <StyledLink
                      to={
                        item.titleType.id === "movie"
                          ? `/movie/${
                              watchlist.find(
                                (watchlistItem) =>
                                  watchlistItem.titleImdbId === item.id
                              ).titleTmdbId
                            }`
                          : item.titleType.id === "tvSeries" ||
                            item.titleType.id === "tvMiniSeries"
                          ? `/tv/${
                              watchlist.find(
                                (watchlistItem) =>
                                  watchlistItem.titleImdbId === item.id
                              ).titleTmdbId
                            }`
                          : "/"
                      }
                    >
                      <h4>
                        {`${++index}. `}
                        {item.originalTitleText
                          ? item.originalTitleText.text
                          : item.titleText.text}
                      </h4>
                    </StyledLink>
                  </div>
                  <div>
                    <span>
                      {`${item.releaseYear ? item.releaseYear?.year : "N/A"}
                  ${
                    !item.endYear &&
                    item.releaseYear.year !== getCurrentYear() &&
                    item.titleType.isSeries
                      ? `- ${getCurrentYear()}`
                      : item.endYear
                      ? item.endYear
                      : ""
                  }`}
                    </span>
                    {item.episodes && item.titleType.isSeries && (
                      <span>{item.episodes.episodes.total} eps</span>
                    )}
                    {item.runtime !== null &&
                      item.titleType.text === "Movie" && (
                        <span>{getDuration(item.runtime.seconds)}</span>
                      )}
                  </div>
                  <div>
                    <HiStar />
                    <span>{item.ratingsSummary.aggregateRating}</span>
                    <span>{item.titleType.text}</span>
                  </div>
                  <p>{item.plot.plotText.plainText}</p>
                  <button onClick={() => handleRemoveBookmark(item.id)}>
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
