import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionSix = () => {
  ReactSession.setStoreType("sessionStorage");
  const duration = ReactSession.get("duration");

  const user = { accessSix: duration };
  return user && user.accessSix;
};

const ProtectedSix = () => {
  const isAuth = questionSix();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedSix;
