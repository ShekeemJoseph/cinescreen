import styled from "styled-components";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";
import Loader from "./Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const StyledAppLayout = styled.main`
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow-x: hidden;
  height: 100vh;
`;

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <StyledAppLayout>
        <Header />
        {!isLoading ? <Outlet /> : <Loader />}
        <Footer />
      </StyledAppLayout>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default AppLayout;
