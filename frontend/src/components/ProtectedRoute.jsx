import { Navigate } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {

  //  GET USER FROM REDUX
  const user = useSelector(
    (state) => state.auth.user
  );

  //  IF NOT LOGGED IN
  if (!user) {

    return <Navigate to="/login" />;

  }

  //  IF LOGGED IN
  return children;
}

export default ProtectedRoute;