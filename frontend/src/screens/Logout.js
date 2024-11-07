import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userInfo";

// set up cookies
const cookies = new Cookies();
const Logout = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  const dispatch = useDispatch();

  useEffect(() => {
    cookies.remove("authToken", { path: "/" });
    cookies.remove("adminToken", { path: "/" });
    cookies.remove("connect.sid", { path: "/" });
    localStorage.setItem("userId", "");
    localStorage.setItem("isAdmin", "");
    localStorage.setItem("token", "");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    sessionStorage.clear();
    dispatch(logout());
    navigate("/");
  }, [navigate]);

  return <div></div>;
};

export default Logout;
