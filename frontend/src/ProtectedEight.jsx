import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionEight = () => {
  ReactSession.setStoreType("sessionStorage");
  const about = ReactSession.get("about");

  const user = { accessEight: about };
  return user && user.accessEight;
};

const ProtectedEight = () => {
  const isAuth = questionEight();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedEight;
