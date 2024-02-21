import styled from "styled-components";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const StyledAppLayout = styled.main`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

function AppLayout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ScrollRestoration />
      <StyledAppLayout>
        <Header />
        <Outlet />
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
