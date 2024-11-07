import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionThree = () => {
  ReactSession.setStoreType("sessionStorage");
  const contractType = ReactSession.get("contractType");
  const level = ReactSession.get("level");

  if (
    contractType === "Languages" ||
    contractType === "Other" ||
    contractType === "Musical"
  ) {
    const user = { accessThree: contractType };
    return user && user.accessThree;
  }

  if (contractType === "University" || contractType === "School") {
    const user = { accessThree: level };
    return user && user.accessThree;
  }
};

const ProtectedThreeEn = () => {
  const isAuth = questionThree();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedThreeEn;
