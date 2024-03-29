import Button from "../../ui/Button";
import Form from "../../ui/ModalForm";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

const TermsOfUseText = styled.span`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 0.4rem;
`;
// Email regex: /\S+@\S+\.\S+/
function SignupForm({ closeModal }) {
  const { signup, isLoading } = useSignup();
  const queryClient = useQueryClient();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
        onSuccess: () => {
          closeModal();
          queryClient.invalidateQueries({ queryKey: ["user"] });
          queryClient.invalidateQueries({ queryKey: ["ratings"] });
          queryClient.invalidateQueries({ queryKey: ["watchlist"] });
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Username" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRowVertical>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Register" : <SpinnerMini />}
        </Button>
        <TermsOfUseText>
          By joining Cinescreen, you agree to Cinescreen's Terms of Use and
          Privacy Policy.
        </TermsOfUseText>
      </FormRowVertical>
    </Form>
  );
}

export default SignupForm;
