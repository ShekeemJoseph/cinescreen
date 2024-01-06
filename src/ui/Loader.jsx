import styled from "styled-components";
import Spinner from "./Spinner";
const StyledLoaderContainer = styled.div`
  max-width: 128rem;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
function Loader() {
  return (
    <StyledLoaderContainer>
      <Spinner />
    </StyledLoaderContainer>
  );
}

export default Loader;
