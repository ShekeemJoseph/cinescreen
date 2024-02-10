import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Logo from "../../ui/Logo";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  /* padding: 3.2rem 4rem; */
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const RegisterContainer = styled.div`
  width: 50rem;
  height: auto;
  display: grid;
  padding: 2.4rem;
  row-gap: 2.4rem;
  grid-template-rows: auto auto 1fr;
  & span {
    justify-self: center;
  }
`;
const RegisterHeader = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 3.6rem;
  & svg {
    width: auto;
    height: 4.6rem;
    justify-self: center;
  }
`;
const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1.5px solid var(--color-grey-400);
`;
const TabButton = styled.button`
  border: none;
  background: none;
  position: relative;
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-grey-400);
  transition: all 0.1s ease;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    z-index: 100;
    background-color: var(--color-grey-700);
    transition: transform 0.25s ease;
    transform: scaleX(0);
    content: "";
  }
  &:hover,
  &:active {
    color: var(--color-grey-700);
  }
  &:hover::after,
  &:active::after {
    transform: scaleX(1);
  }
  &:focus {
    outline: none;
  }
`;
function RegisterModalContent({ onCheckLogin, handler }) {
  const [openTab, setOpenTab] = useState("Sign in");
  const ref = useOutsideClick(handler);

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={handler}>
          <HiXMark />
        </Button>
        <RegisterContainer>
          <RegisterHeader>
            <Logo secondaryColor="#fbc117" primaryColor="#fff" />
            <TabContainer>
              <TabButton
                className={openTab === "Register" && "activeTab"}
                onClick={() => setOpenTab("Register")}
              >
                Register
              </TabButton>
              <TabButton
                className={openTab === "Sign in" && "activeTab"}
                onClick={() => setOpenTab("Sign in")}
              >
                Sign in
              </TabButton>
            </TabContainer>
          </RegisterHeader>
          <span>
            {openTab === "Sign in"
              ? "Welcome back"
              : "Get started with a free Cinescreen account to rate and bookmark your favourite movies, TV shows and more!"}
          </span>
          {openTab === "Sign in" && (
            <LoginForm onCheckLogin={onCheckLogin} closeModal={handler} />
          )}
          {openTab === "Register" && <SignupForm closeModal={handler} />}
        </RegisterContainer>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default RegisterModalContent;
