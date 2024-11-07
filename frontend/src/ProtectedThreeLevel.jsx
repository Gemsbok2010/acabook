import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionThreeLevel = () => {
  ReactSession.setStoreType("sessionStorage");
  const subjects = ReactSession.get("subjects");
  const user = { accessThree: subjects };
  return user && user.accessThree;
};

const ProtectedThreeLevel = () => {
  const isAuth = questionThreeLevel();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedThreeLevel;
