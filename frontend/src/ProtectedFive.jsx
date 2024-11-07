import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionFive = () => {
  ReactSession.setStoreType("sessionStorage");
  const frequency = ReactSession.get("frequency");
  const user = { accessFive: frequency };
  return user && user.accessFive;
};

const ProtectedFive = () => {
  const isAuth = questionFive();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedFive;
