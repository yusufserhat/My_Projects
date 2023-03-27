import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRouter() {
  const { currentUser } = useContext(AuthContext);
  let location = useLocation();

  //* Redirect them to the /login page, but save the current location they were
  //* trying to go to when they were redirected. This allows us to send them
  //* along to that page after they login, which is a nicer user experience
  //* than dropping them off on the home page.
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}
export default PrivateRouter;
