import styled from "styled-components";
import ButtonText from "../../ui/ButtonText";
import RegisterModal from "./RegisterModal";
import Logo from "../../ui/Logo";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const RegisterContainer = styled.div`
  width: 50rem;
  height: auto;
  display: grid;
  padding: 2.4rem;
  row-gap: 2.4rem;
  grid-template-rows: auto 1fr;
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
function Register({ btnLabel }) {
  return (
    <RegisterModal>
      <RegisterModal.Open opens="register-forms">
        <ButtonText variation="standard">{btnLabel}</ButtonText>
      </RegisterModal.Open>
      <RegisterModal.Window name="register-forms">
        <RegisterContainer>
          <RegisterHeader>
            <Logo secondaryColor="#fbc117" primaryColor="#fff" />
            <TabContainer>
              <TabButton>Register</TabButton>
              <TabButton>Sign in</TabButton>
            </TabContainer>
          </RegisterHeader>
          {/* <LoginForm /> */}
          <SignupForm />
        </RegisterContainer>
      </RegisterModal.Window>
    </RegisterModal>
  );
}

// function Register() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <ButtonText
//         variation="standard"
//         onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
//       >
//         Register
//       </ButtonText>
//       {isModalOpen && <RegisterModal onClose={() => setIsModalOpen(false)} />}
//     </div>
//   );
// }

export default Register;
