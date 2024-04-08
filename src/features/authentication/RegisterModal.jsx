import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Logo from "../../ui/Logo";
import { HiXMark } from "react-icons/hi2";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Overlay from "../../ui/Overlay";
import ForgetPasswordModal from "./ForgetPasswordModal";
import { media } from "../../styles/breakpoints";

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
    width: 2.8rem;
    height: 2.8rem;
    /* ${media.sm`
    width: 2.4rem;
    height: 2.6rem;
    `} */
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
    text-align: center;
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
const RecoverPassBtn = styled.button`
  border: none;
  background: none;
  font-size: 1.4rem;
  font-weight: 500;
  text-decoration: underline;
  margin: 0 auto;
  &:hover,
  &:active {
    color: var(--color-grey-400);
    text-decoration: none;
  }
  &:focus {
    outline: none;
  }
`;
const RegisterModalContext = createContext();

function RegisterModal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => {
    setOpenName("");
    document.body.style.overflow = "auto";
  };
  const open = setOpenName;
  return (
    <RegisterModalContext.Provider value={{ openName, close, open }}>
      {children}
    </RegisterModalContext.Provider>
  );
}
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(RegisterModalContext);
  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
      document.body.style.overflow = "hidden";
    },
  });
}
function Window({ name }) {
  const [openTab, setOpenTab] = useState("Sign in");
  const [isPassRecover, setIsPassRecover] = useState(false);
  const { openName, close } = useContext(RegisterModalContext);
  function handleClose() {
    close();
    setIsPassRecover(false);
  }
  const ref = useOutsideClick(handleClose);
  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={handleClose}>
          <HiXMark />
        </Button>
        {!isPassRecover ? (
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
            {openTab === "Sign in" && <LoginForm closeModal={close} />}
            {openTab === "Register" && <SignupForm closeModal={close} />}
            {openTab === "Sign in" && (
              <RecoverPassBtn onClick={() => setIsPassRecover(true)}>
                Forgot Password?
              </RecoverPassBtn>
            )}
          </RegisterContainer>
        ) : (
          <ForgetPasswordModal ref={ref} onClose={handleClose} />
        )}
      </StyledModal>
    </Overlay>,
    document.body
  );
}
RegisterModal.Open = Open;
RegisterModal.Window = Window;
export default RegisterModal;
