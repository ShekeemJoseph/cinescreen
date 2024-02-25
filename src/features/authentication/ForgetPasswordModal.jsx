import { useState } from "react";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import { usePasswordReset } from "./useResetPassword";

const Container = styled.div`
  width: 70rem;
  height: auto;
  display: grid;
  padding: 2.4rem;
  row-gap: 2.4rem;
  grid-template-rows: auto auto 1fr;

  & h2,
  & span {
    justify-self: center;
  }

  & form {
    width: 50rem;
    margin: 0 auto 3.6rem;
  }
`;

function ForgetPasswordModal({ onClose }) {
  const [email, setEmail] = useState();
  const { passwordReset, isLoading } = usePasswordReset();
  function handleSubmit(e) {
    e.preventDefault();
    passwordReset(email);
    onClose();
  }
  return (
    <Container>
      <h2>Forgot Password?</h2>
      <span>
        Enter your registered email address to receive password reset
        instructions
      </span>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large">
            {!isLoading ? "Send Reset Password Link" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
    </Container>
  );
}

export default ForgetPasswordModal;
