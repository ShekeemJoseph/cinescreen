import styled from "styled-components";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Outlet } from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: scroll;
  overflow-x: hidden;
  height: 100vh;
`;
const Container = styled.div`
  max-width: 128rem;
  margin: 0 auto;
`;
function AppLayout() {
  return (
    <>
      <GlobalStyles />
      <StyledAppLayout>
        <Header />
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
