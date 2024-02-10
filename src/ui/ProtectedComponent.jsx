import styled from "styled-components";
import RegisterModalContent from "../features/authentication/RegisterModalContent";
import { useUser } from "../features/authentication/useUser";
import Overlay from "./Overlay";
import Spinner from "./Spinner";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
function ProtectedComponent({ children, isModalOpen, setIsModalOpen }) {
  const onCloseModal = () => setIsModalOpen(false);
  const { isLoading, isAuthenticated } = useUser();
  if (isLoading)
    return (
      <Overlay>
        <StyledModal>
          <Spinner />
        </StyledModal>
      </Overlay>
    );
  if (!isAuthenticated && isModalOpen) {
    return <RegisterModalContent handler={onCloseModal} />;
  } else if (isAuthenticated) {
    return children;
  }
}

export default ProtectedComponent;
