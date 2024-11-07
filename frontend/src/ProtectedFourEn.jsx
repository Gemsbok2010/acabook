import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionFour = () => {
  ReactSession.setStoreType("sessionStorage");
  const contractType = ReactSession.get("contractType");
  const level = ReactSession.get("level");
  const subjects = ReactSession.get("subjects");
  if (
    contractType === "Languages" ||
    contractType === "Other" ||
    contractType === "Musical"
  ) {
    const user = { accessFour: level };
    return user && user.accessFour;
  }

  if (contractType === "University" || contractType === "School") {
    const user = { accessFour: subjects };
    return user && user.accessFour;
  }
};

const ProtectedFourEn = () => {
  const isAuth = questionFour();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedFourEn;
