import { useQuery } from "@tanstack/react-query";
import { getWatchList } from "../../services/apiWatchlist";

export function useWatchlist(userId) {
  const { isLoading, data: watchlist } = useQuery({
    queryKey: ["watchlist"],
    queryFn: () => getWatchList(userId),
  });
  return { isLoading, watchlist };
}
