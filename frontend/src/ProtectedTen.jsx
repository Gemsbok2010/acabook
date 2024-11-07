import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionTen = () => {
  ReactSession.setStoreType("sessionStorage");
  const street = ReactSession.get("street");

  const user = { accessTen: street };
  return user && user.accessTen;
};

const ProtectedTen = () => {
  const isAuth = questionTen();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedTen;
