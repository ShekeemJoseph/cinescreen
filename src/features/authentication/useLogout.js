import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      window.location.reload();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { logout, isLoading };
}
