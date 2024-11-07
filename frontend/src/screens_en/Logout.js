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
    cookies.remove("authToken");
    cookies.remove("adminToken");
    cookies.remove("connect.sid");
    localStorage.setItem("access", "");
    localStorage.setItem("firstName", "");
    localStorage.setItem("nanoId", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("username", "");
    localStorage.setItem("isTeacher", "");
    localStorage.setItem("isAdmin", "");
    localStorage.setItem("token", "");
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("nanoId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("isTeacher");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    sessionStorage.clear();
    dispatch(logout());
    navigate("/en");
  }, [navigate]);

  return <div></div>;
};

export default Logout;
