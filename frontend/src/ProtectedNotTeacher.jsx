import { Outlet, Navigate } from "react-router";
// useSelector is accessing value of states
import { useSelector } from "react-redux";

const useAuth = () => {
  const redu = useSelector((state) => state.userInfo.value);
  const user = { isTeacher: redu.isTeacher };

  return user && user.isTeacher;
};

const ProtectedNotTeacher = () => {
  const isAuth = useAuth();
  return isAuth === false ? <Navigate to={-1} /> : <Outlet />;
};

export default ProtectedNotTeacher;
