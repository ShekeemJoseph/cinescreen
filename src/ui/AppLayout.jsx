import styled from "styled-components";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";
import Loader from "./Loader";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow-x: hidden;
  height: 100vh;
`;
const Container = styled.div`
  max-width: 128rem;
  margin: 0 auto;
`;
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <GlobalStyles />
      <StyledAppLayout>
        <Header />
        {!isLoading ? (
          <Container>
            <Outlet />
          </Container>
        ) : (
          <Loader />
        )}
        <Footer />
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
