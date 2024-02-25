import { useMutation } from "@tanstack/react-query";
import { passwordReset as passwordResetApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function usePasswordReset() {
  const { mutate: passwordReset, isLoading } = useMutation({
    mutationFn: passwordResetApi,
    onSuccess: () => {
      toast.success("Please check your email to reset your password");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { passwordReset, isLoading };
}
