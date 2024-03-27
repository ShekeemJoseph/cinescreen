import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWatchlist } from "../features/Watchlist/useWatchlist";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import { BsBookmarkPlus } from "react-icons/bs";
import { createBookmark, deleteTmdbBookmark } from "../services/apiWatchlist";
import { HiBookmarkSlash } from "react-icons/hi2";
import ButtonWatchList from "./ButtonWatchList";
import Register from "../features/authentication/Register";
import { getImdbId } from "../services/apiSearchTitleData";

const TitleCardBtnContainer = styled.div`
  height: 100%;
  padding-bottom: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: end;
`;

function CarouselBookmarkBtn({ titleId, mediaType, apiMediaType }) {
  const queryClient = useQueryClient();
  const { isLoading: isAuthLoading, isAuthenticated, user } = useUser();
  const userId = !isAuthLoading && user ? user.id : null;
  const { isLoading: isWatchlistLoading, watchlist } = useWatchlist(userId);
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
  const isTitleBookmarked =
    !isWatchlistLoading &&
    watchlist
      .map((curBookmarks) => curBookmarks.titleTmdbId)
      .includes(titleId.toString());

  return (
    <TitleCardBtnContainer>
      {!isAuthenticated ? (
        <Register>
          <ButtonWatchList variation="standard">
            <BsBookmarkPlus /> Watchlist
          </ButtonWatchList>
        </Register>
      ) : isTitleBookmarked ? (
        <ButtonWatchList
          onClick={() => handleRemoveBookmark(titleId)}
          variation="standard"
        >
          <HiBookmarkSlash /> Watchlist
        </ButtonWatchList>
      ) : !isTitleBookmarked ? (
        <ButtonWatchList
          onClick={async () => {
            const { imdb_id } = await getImdbId(
              titleId,
              mediaType === "movie" || apiMediaType === "movie" ? "movie" : "tv"
            );
            handleAddBookmark(userId, titleId, imdb_id);
          }}
          variation="standard"
        >
          <BsBookmarkPlus /> Watchlist
        </ButtonWatchList>
      ) : null}
    </TitleCardBtnContainer>
  );
}
export default CarouselBookmarkBtn;
