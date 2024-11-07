import { Outlet, Navigate } from "react-router";
// useSelector is accessing value of states
import { useSelector } from "react-redux";

const useAuth = () => {
  const redu = useSelector((state) => state.userInfo.value);
  const user = { isTeacher: redu.isTeacher };

  return user && user.isTeacher;
};

const ProtectedTeacher = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to={-1} /> : <Outlet />;
};

export default ProtectedTeacher;
