import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionSeven = () => {
  ReactSession.setStoreType("sessionStorage");
  const normal_rate = ReactSession.get("normal_rate");

  const user = { accessSeven: normal_rate };
  return user && user.accessSeven;
};

const ProtectedSeven = () => {
  const isAuth = questionSeven();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedSeven;
