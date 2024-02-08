import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useContext } from "react";
import { RegisterModalContext } from "./RegisterModal";

export function useLogin() {
  const queryClient = useQueryClient();
  const { close } = useContext(RegisterModalContext);
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      close();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isLoading };
}
