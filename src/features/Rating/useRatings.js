import { useQuery } from "@tanstack/react-query";
import { getRatings } from "../../services/apiRatings";

export function useRatings(userId) {
  const { isLoading, data: ratings } = useQuery({
    queryKey: ["ratings"],
    queryFn: () => getRatings(userId),
  });
  return { isLoading, ratings };
}
