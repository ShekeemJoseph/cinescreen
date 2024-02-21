import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home, { loader as homeLoader } from "./pages/Home";
import Movies, { loader as moviesLoader } from "./pages/Movies";
import Series, { loader as seriesLoader } from "./pages/Series";
import Titles, { loader as titlesLoader } from "./pages/Titles";
import Account, { loader as accountLoader } from "./pages/Account";
import WatchList from "./pages/WatchList";
import Title, { loader as titleLoader } from "./pages/Title";
import Error from "./ui/Error";
import ErrorMessage from "./ui/ErrorMessage";
import ProtectedRoute from "./ui/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/movie",
        element: <Movies />,
        loader: moviesLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/movie/:titleId",
        element: <Title />,
        loader: titleLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/tv",
        element: <Series />,
        loader: seriesLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/tv/:titleId",
        element: <Title />,
        loader: titleLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/search/:titleStr",
        element: <Titles />,
        loader: titlesLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/user/:userId",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
        loader: accountLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/user/:userId/watchlist",
        element: (
          <ProtectedRoute>
            <WatchList />
          </ProtectedRoute>
        ),
        errorElement: <ErrorMessage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
