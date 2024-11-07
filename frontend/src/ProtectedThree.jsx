import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionThree = () => {
  ReactSession.setStoreType("sessionStorage");
  const contractType = ReactSession.get("contractType");
  const level = ReactSession.get("level");


  if (
    contractType === "語言" ||
    contractType === "一般課程" ||
    contractType === "樂器"
  ) {
    const user = { accessThree: contractType };
    return user && user.accessThree;
  }

  if (contractType === "大學" || contractType === "學校") {
    const user = { accessThree: level };
    return user && user.accessThree;
  }
};

const ProtectedThree = () => {
  const isAuth = questionThree();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedThree;
