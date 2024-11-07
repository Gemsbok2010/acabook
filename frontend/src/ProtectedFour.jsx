import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionFour = () => {
  ReactSession.setStoreType("sessionStorage");
  const contractType = ReactSession.get("contractType");
  const level = ReactSession.get("level");
  const subjects = ReactSession.get("subjects");
  if (
    contractType === "語言" ||
    contractType === "一般課程" ||
    contractType === "樂器"
  ) {
    const user = { accessFour: level };
    return user && user.accessFour;
  }

  if (contractType === "大學" || contractType === "學校") {
    const user = { accessFour: subjects };
    return user && user.accessFour;
  }
};

const ProtectedFour = () => {
  const isAuth = questionFour();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedFour;
