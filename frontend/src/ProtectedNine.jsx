import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionNine = () => {
  ReactSession.setStoreType("sessionStorage");
  const finishDate = ReactSession.get("finishDate");

  const user = { accessNine: finishDate };
  return user && user.accessNine;
};

const ProtectedNine = () => {
  const isAuth = questionNine();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedNine;
