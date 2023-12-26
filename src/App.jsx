import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const StyledApp = styled.main`
  background-color: var(--color-grey-0);
  padding: 20px;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>Cinescreen</StyledApp>
    </>
  );
}

export default App;
