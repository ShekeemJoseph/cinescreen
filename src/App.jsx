import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home, { loader as homeLoader } from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Titles from "./pages/Titles";
import WatchList from "./pages/WatchList";
import Title from "./pages/Titles";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home />, loader: homeLoader },
      { path: "/titles/:titleStr", element: <Title /> },
      { path: "/titles", element: <Titles /> },
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
