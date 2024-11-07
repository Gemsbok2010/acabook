import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../redux/userInfo";

// set up cookies
const cookies = new Cookies();
const Alogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    cookies.remove("authToken", { path: "/" });
    cookies.remove("adminToken", { path: "/" });
    cookies.remove("connect.sid", { path: "/" });
    localStorage.setItem("firstName", "");
    localStorage.setItem("nanoId", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("username", "");
    localStorage.setItem("isTeacher", "");
    localStorage.setItem("isAdmin", "");
    localStorage.setItem("access", "");
    localStorage.setItem("token", "");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("nanoId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("isTeacher");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("access");
    localStorage.removeItem("token");
    sessionStorage.clear();
    dispatch(logout());
    navigate("/admin");
  }, [navigate]);

  return <div></div>;
};

export default Alogout;
