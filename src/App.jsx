import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home, { loader as homeLoader } from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Titles from "./pages/Titles";
import WatchList from "./pages/WatchList";
import Title from "./pages/Titles";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home />, loader: homeLoader },
      { path: "/titles", element: <Titles /> },
      { path: "/titles/:titleId", element: <Title /> },
      { path: "/titles/movies", element: <Movies /> },
      { path: "/titles/series", element: <Series /> },
      { path: "/watchlist", element: <WatchList /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
