import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1) Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  // 2) If there is No authenticated user, display login modal
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/", { replace: true });
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 3) While loading, show a spinner
  if (isLoading) return <Loader />;
  // 4) If there Is a user, render the page
  if (isAuthenticated) {
    return children;
  } else if (!isAuthenticated) {
    return <Loader />;
  }
}

export default ProtectedRoute;
