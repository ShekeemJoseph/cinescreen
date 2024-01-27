import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home, { loader as homeLoader } from "./pages/Home";
import Movies, { loader as moviesLoader } from "./pages/Movies";
import Series, { loader as seriesLoader } from "./pages/Series";
import Titles, { loader as titlesLoader } from "./pages/Titles";
import WatchList from "./pages/WatchList";
import Title, { loader as titleLoader } from "./pages/Title";
import Error from "./ui/Error";
import ErrorMessage from "./ui/ErrorMessage";

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
      { path: "/watchlist", element: <WatchList /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
