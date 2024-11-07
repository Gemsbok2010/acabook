import { Outlet, Navigate } from "react-router";
import { Cookies } from "react-cookie";

// set up cookies
const cookies = new Cookies();

const useAuth = () => {
  const cookie = cookies.get("i18next");

  const admin = { token: cookie };
  return admin && admin.token;
};

const ProtectedTaal = () => {
  const isAuth = useAuth();
  return isAuth === "en" ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedTaal;
