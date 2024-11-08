import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ReactSession } from "react-client-session";
import { StyledDropdown } from "../components/Styles";
import { useDispatch } from "react-redux";
import axios from "axios";
import i18next from "i18next";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { HiOutlineXCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { login } from "../redux/userInfo";

// Three dots
import { ThreeDots } from "react-loader-spinner";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [backdrop, setBackdrop] = useState(false);
  const user = useSelector((state) => state.userInfo.value);
  ReactSession.setStoreType("localStorage");

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");
  let token = params.get("token");
  let access = params.get("access");
  access = access === "true";
  const [show, setShow] = useState(false);

  // ========= GOOGLE LOGIN DATA ===========
  useEffect(() => {
    i18next.changeLanguage("en");
    if (id) {
      localStorage.setItem("userId", id);
      localStorage.setItem("token", token);
      window.history.pushState({}, document.title, +"/en");
    }

    // ============ PROFILE DATA ===========
    if (id) {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL +
            "api/intlusers/allusers/" +
            localStorage.getItem("userId")
        )
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("userId", response.data._id);
            dispatch(
              login({
                firstName: response.data.firstName,
                isLoggedIn: true,
                lastName: response.data.lastName,
                email: response.data.email,
                filename: response.data.filename,
                isTeacher: response.data.isTeacher,
                isActive: response.data.isActive,
                nanoId: response.data.nanoId,
                isAdmin: response.data.isAdmin,
                completeAccess: access,
              })
            );
          }
        });
    }
  }, [id]);

  const urlAddress =
    process.env.REACT_APP_BACKEND_URL + `auth/google?dd=${location.pathname}`;

  const [openDropDown, setOpenDropDown] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);

  const [, setFirstName] = useState("");
  const [, setLastName] = useState("");
  const [, setCity] = useState("");
  const [, setState] = useState("");

  // ========== POST ================

  const onSubmit = (values, { setSubmitting }) => {
    ReactSession.set("remember", rememberMe);
    if (ReactSession.get("remember") === true) {
      ReactSession.set("email", email);
    } else {
      ReactSession.set("email", "");
      ReactSession.remove("email");
    }
    setTimeout(() => {
      fetch(process.env.REACT_APP_BACKEND_URL + "api/intl/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email, password: values.password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.invalid === "系統查詢到您是在愛課網中文版做註冊的.") {
            setBackdrop(true);
            setOpenDropDown(false);
          }
          if (data.invalid) {
            outPutErrorMessages(data.invalid);
          }
          if (
            data.user.survey === "" ||
            data.user.phone === "" ||
            data.user.nationalId === "" ||
            data.user.birth === "" ||
            data.user.street === "" ||
            data.user.gender === ""
          ) {
            ReactSession.set("displayName", data.user.firstName);
            localStorage.setItem("userId", data.user._id);

            setCity(data.user.city);
            setState(data.user.state);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
            dispatch(
              login({
                firstName: data.user.firstName,
                isLoggedIn: true,
                lastName: data.user.lastName,
                email: data.user.email,
                filename: data.user.filename,
                isTeacher: data.user.isTeacher,
                isActive: data.user.isActive,
                nanoId: data.user.nanoId,
                isAdmin: data.user.isAdmin,
                completeAccess: false,
              })
            );
            navigate("/personal-details/en");
          } else {
            ReactSession.set("displayName", data.user.firstName);
            localStorage.setItem("userId", data.user._id);

            setCity(data.user.city);
            setState(data.user.state);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
            dispatch(
              login({
                firstName: data.user.firstName,
                isLoggedIn: true,
                lastName: data.user.lastName,
                email: data.user.email,
                filename: data.user.filename,
                isTeacher: data.user.isTeacher,
                isActive: data.user.isActive,
                nanoId: data.user.nanoId,
                isAdmin: data.user.isAdmin,
                completeAccess: true,
              })
            );
            navigate(location.pathname);
          }
        })
        .catch((err) => {
          if (err) {
            console.error(err);
            setSubmitting(false);
          }
        });
    }, 300);
  };

  // ========== ERROR MESSAGE ===============

  const [updateNote, setUpdateNote] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function outPutErrorMessages(errorMessage) {
    setUpdateNote(true);
    setErrorMsg(errorMessage);
  }

  // ========= DISPLAY NAME in NAV DROPDOWN BUTTON =======
  const [displayName, setDisplayName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");

  // =========== POPULATE LOCAL STORAGE DATA =============
  useEffect(() => {
    setRememberMe(ReactSession.get("remember"));
    if (ReactSession.get("remember") === true) {
      setEmail(ReactSession.get("email"));
      setDisplayName(ReactSession.get("displayName"));
    } else {
      ReactSession.set("displayName", "");
      ReactSession.remove("displayName");
    }
  }, []);

  return (
    <>
      <nav id="navbar">
        <figure>
          <Link to="/en">
            <img src="/images/mainLogo.png" alt="LOGO" className="img-fluid" />
          </Link>
        </figure>
        <div className="navbar-nav">
          <ul>
            {user.isLoggedIn ? (
              ""
            ) : (
              <li>
                <span
                  onClick={() => {
                    i18next.changeLanguage("en");
                  }}
                >
                  <Link to="/en"> EN </Link>
                </span>
                |
                <span
                  onClick={() => {
                    i18next.changeLanguage("zh-Hant-TW");
                  }}
                >
                  <Link to="/tw"> 中文 </Link>
                </span>
              </li>
            )}

            <li>
              <Link to="/searchlist/en">Job Cases</Link>
            </li>
            <li>
              <Link to="/countdown">Find a Tutor</Link>
            </li>
            <li>
              <Link to="/countdown">Become a Tutor</Link>
            </li>
            <li>
              <Link to="/contact/en">Contact us</Link>
            </li>

            {user.isLoggedIn ? (
              <>
                <li>
                  <ExternalLink target="_self" href="/logout_en">
                    Logout
                  </ExternalLink>
                </li>
                <li>
                  <Link to="/dashboard/en">
                    <figure className="smallPhoto">
                      <img src={user.filename} alt="" />
                    </figure>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup/en">Sign up</Link>
                </li>
                <div>
                  <li
                    className="nav-item"
                    style={
                      openDropDown
                        ? {
                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                          }
                        : {
                            borderBottomLeftRadius: "6px",
                            borderBottomRightRadius: "6px",
                          }
                    }
                  >
                    <div
                      id="target"
                      className={openDropDown ? "cross" : "arrow"}
                      onClick={() => {
                        setOpenDropDown(!openDropDown);
                        setUpdateNote(false);
                      }}
                    >
                      <StyledDropdown
                        key={1}
                        className={openDropDown ? "" : "human"}
                        style={
                          openDropDown
                            ? {
                                animation:
                                  "mailframe 1000ms ease-in-out 5000ms forwards",
                              }
                            : {}
                        }
                      >
                        {openDropDown ? (
                          <i
                            className="nonselect"
                            id="show-more"
                            style={{
                              animation:
                                "mailframe 100ms ease-in-out 500ms forwards",
                            }}
                          >
                            {openDropDown ? "Close" : "Login"}
                          </i>
                        ) : (
                          <i
                            className="nonselect"
                            id="show-more"
                            style={{
                              animation:
                                "mailframe 100ms ease-in-out 500ms forwards",
                            }}
                          >
                            {displayName === ""
                              ? "Login"
                              : `Hello, ${displayName}`}
                          </i>
                        )}
                      </StyledDropdown>
                    </div>
                    <div id="dropItem" className={openDropDown ? "open" : ""}>
                      {/* FORMIK IS HERE */}
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={onSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form id="loginForm">
                            <h2 className="nonselect">Login</h2>
                            <div className="container-fluid errorMessageHere">
                              {updateNote ? (
                                <div className="updateNote">
                                  <img
                                    onClick={() => {
                                      setUpdateNote(false);
                                    }}
                                    src="/images/cross-black.png"
                                    style={{ width: "12px", cursor: "pointer" }}
                                    alt=""
                                  />{" "}
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: errorMsg,
                                    }}
                                  ></span>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="input-group">
                              <button className="nonselect" id="google-login">
                                <img
                                  src="/images/googlelogin.png"
                                  alt=""
                                  width="20px"
                                />
                                <ExternalLink href={urlAddress} target="_self">
                                  Google Login
                                </ExternalLink>
                              </button>
                              <p className="nonselect">or</p>
                            </div>
                            <div className="form-group row">
                              <div className="input-group">
                                <label className="nonselect" htmlFor="email">
                                  Email
                                </label>
                                <Field
                                  type="email"
                                  name="email"
                                  id="email"
                                  autoComplete="off"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.currentTarget.value);
                                  }}
                                />
                                <ErrorMessage name="email" component="div" />
                                <span
                                  onClick={() => {
                                    setEmail("");
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "26px",
                                    right: "12px",
                                  }}
                                >
                                  <HiOutlineXCircle
                                    style={{
                                      color: "#888",
                                      fontSize: "21px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </span>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="input-group">
                                <label className="nonselect" htmlFor="password">
                                  Password
                                </label>
                                <Field
                                  type={show ? "text" : "password"}
                                  name="password"
                                  id="password"
                                  autoComplete="off"
                                />
                                <ErrorMessage name="password" component="div" />
                                <span
                                  onClick={() => {
                                    setShow(!show);
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "25px",
                                    right: "12px",
                                  }}
                                >
                                  {show ? (
                                    <FiEye
                                      style={{
                                        color: "#888",
                                        fontSize: "20px",
                                      }}
                                    />
                                  ) : (
                                    <FiEyeOff
                                      style={{
                                        color: "#888",
                                        fontSize: "20px",
                                      }}
                                    />
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="form-group row">
                              {rememberMe ? (
                                <input
                                  type="checkbox"
                                  id="remember"
                                  name="remember"
                                  checked={rememberMe}
                                  onChange={(e) => {
                                    setRememberMe(e.target.checked);
                                  }}
                                />
                              ) : (
                                <input
                                  type="checkbox"
                                  id="remember"
                                  name="remember"
                                  checked={rememberMe}
                                  onChange={(e) => {
                                    setRememberMe(e.target.checked);
                                  }}
                                />
                              )}

                              <label htmlFor="remember" className="nonselect">
                                Remember details
                              </label>
                            </div>

                            <div
                              className="form-group"
                              style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              <p className="nonselect">
                                <Link
                                  to="/forgotpassword/en"
                                  style={{ fontSize: "14px" }}
                                >
                                  Forgot Password?
                                </Link>
                              </p>
                            </div>

                            <div className="form-group row">
                              <div className="input-group">
                                {!isSubmitting && (
                                  <button
                                    type="submit"
                                    id="login"
                                    disabled={isSubmitting}
                                  >
                                    Login
                                  </button>
                                )}
                                {isSubmitting && (
                                  <button
                                    id="login"
                                    style={{
                                      justifyContent: "space-around",
                                      display: "flex",
                                    }}
                                  >
                                    <ThreeDots
                                      type="ThreeDots"
                                      height={40}
                                      width={80}
                                      color={"#fff"}
                                    />
                                  </button>
                                )}
                              </div>
                            </div>

                            <p
                              style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                fontSize: "14px",
                              }}
                              className="nonselect"
                            >
                              Don't have an account?{" "}
                              <Link
                                to="/signup/en"
                                style={{ fontSize: "14px" }}
                              >
                                Sign up
                              </Link>
                            </p>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
        <form style={{ display: "none" }} className="loginForm">
          <input type="email" style={{ display: "none" }} />
          <input type="checkbox" name="remember" />
        </form>
        <i className="nonselect" style={{ display: "none" }} id="show-more"></i>
        <div
          id="hamburger"
          onClick={() => {
            setOpenHamburger(!openHamburger);
          }}
        ></div>
      </nav>

      <div id="ham-menu">
        {openHamburger && (
          <ul>
            {user.isLoggedIn ? (
              <>
                <li>
                  <Link to="/dashboard/en">Dashboard</Link>
                </li>
                <li>
                  <Link to="/searchlist/en">Job Cases</Link>
                </li>
                <li>
                  <Link to="/question1">Create a Listing</Link>
                </li>
                <li>
                  <Link to="/listingmanager">Manage my Listings</Link>
                </li>
                <li>
                  <Link to="/securitySettings/en">Security Settings</Link>
                </li>
                <li>
                  <ExternalLink target="_self" href="/logout_en">
                    Log out
                  </ExternalLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/searchlist/en">Job Cases</Link>
                </li>
                <li>
                  <Link to="/countdown">Find a Tutor</Link>
                </li>
                <li>
                  <Link to="/countdown">Become a Tutor</Link>
                </li>
                <li>
                  <Link to="/contact/en">Contact us</Link>
                </li>
                <li>
                  <Link to="/signup/en">Sign up</Link>
                </li>
                <li>
                  <Link to="/login/en">Login</Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
      {backdrop ? (
        <>
          <div className="backdrop"></div>
          <div className="alertCard">
            <img
              onClick={() => {
                setBackdrop(false);
              }}
              src="/images/cross-black.png"
              alt=""
            />
            <div>
              <img
                src="/images/twflag.png"
                alt=""
                style={{
                  width: "40px",
                  transform: "translateX(50%)",
                  marginBottom: "8px",
                }}
              />
            </div>
            <p>系統查詢到您是在愛課網中文版做註冊的</p>

            <p>現在前往中文網站</p>
            <button
              onClick={() => {
                i18next.changeLanguage("zh-Hant-TW");
              }}
            >
              <Link to="/login">前往</Link>
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      <style jsx="true">{`
        nav {
          background-color: #fff;
          width: 100%;
          height: 75px;
          margin: 0 auto;
          padding: 0;
          z-index: 2002;
          position: relative;
        }
        nav > figure > a {
          display: block;
        }
        nav h2 {
          font-weight: bold;
        }
        nav > figure {
          width: 200px;
          position: absolute;
          transform: translate(-50%, -50%);
          left: 10%;
          top: 50%;
        }
        nav .arrow {
          background-image: url("/images/arrow-down-white.png");
          background-repeat: no-repeat;
          background-position: 222px 22px;
          background-size: 15px;
          height: 100%;
        }
        nav .cross {
          background-image: url("/images/cross-white.png");
          background-repeat: no-repeat;
          background-position: 222px 22px;
          background-size: 15px;
          height: 100%;
        }

        nav .human {
          background-image: url("/images/login-human-white.png");
          background-repeat: no-repeat;
          background-position: 48px 16px;
          background-size: 23px;
          height: 100%;
        }

        .navbar-nav {
          float: right;
          position: absolute;
          width: 100%;
          top: 50%;
          left: 35%;
          height: 100%;
          transform: translate(0%, -50%);
          display: none;
        }

        .navbar-nav ul {
          padding: 0;
          margin: 0;
        }

        .navbar-nav ul li {
          float: left;
          text-align: center;
          text-decoration: none;
          list-style: none;
          padding: 8px 12px 0px;
          display: block;
          line-height: 56px;
        }

        .navbar-nav ul li a {
          font-weight: 800;
          font-size: 14px;
          color: #2b2b2b;
        }

        .nav-item {
          background-color: #a5ce0f;
          color: white;
          width: 320px;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          z-index: 1;
          height: 80px;
          cursor: pointer;
          position: relative;
        }

        .nav-item p {
          height: 23px;
          line-height: 23px;
          font-size: 13px;
          font-weight: 600;
          margin: 3px 0 0px;
        }

        .navbar-nav ul .nav-item a {
          color: white;
        }

        .navbar-nav ul .nav-item i {
          color: white;
          font-weight: 700;
          font-style: normal;
        }

        .navbar-nav ul .nav-item {
          padding-left: 0px;
          padding-right: 0px;
        }

        nav .img-fluid {
          transform: translateX(36%);
        }
        .mainTitle .img-fluid {
          transform: translateX(0%);
        }
        @media screen and (min-width: 768px) {
          .navbar-nav {
            display: block;
          }
          #navbar figure .img-fluid {
            transform: translateX(0%);
          }
        }

        @media screen and (max-width: 668px) {
          nav .navbar-nav ul li:nth-child(3) {
            display: none;
          }
        }

        @media screen and (max-width: 868px) {
          nav .navbar-nav ul li:nth-child(3) {
            display: none;
          }
          nav .navbar-nav ul li:nth-child(4) {
            display: none;
          }
        }

        @media screen and (max-width: 1048px) {
          nav .navbar-nav ul li:nth-child(5) {
            display: block;
          }
          nav .nav-item {
            width: 220px;
          }
        }

        @media screen and (max-width: 1268px) {
          nav .navbar-nav ul li {
            padding: 8px 18px;
          }

          nav .navbar-nav ul li:nth-child(6) {
            display: block;
          }

          nav .nav-item {
            width: 250px;
          }
        }

        @media screen and (max-width: 1568px) {
          nav .nav-item {
            width: 280px;
          }
          nav #dropItem {
            width: 280px;
          }
        }
        /* ============ CHANGE LANGUAGE ALERT CARD ========== */
        .backdrop {
          display: block;
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: #3f3f3f;
          z-index: 2005;
          opacity: 0.6;
        }

        .alertCard {
          position: fixed;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          width: 1140px;
          padding: 28px 30px;
          display: -webkit-box;
          display: -ms-flexbox;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-radius: 0px;
          background: rgba(255, 255, 255);
          z-index: 3000;
          border-radius: 4px;
        }
        .alertCard div img {
          margin-left: -50%;
          width: 25px;
          left: 0px;
          position: relative;
          cursor: default;
        }
        .alertCard img {
          width: 25px;
          cursor: pointer;
          left: 20px;
          text-align: left;
          position: absolute;
        }

        .alertCard button {
          color: white;
          border: 1px solid #a5ce0f;
          background-color: #a5ce0f;
          width: 200px;
          height: 50px;
          line-height: 48px;
          font-size: 20px;
          border-radius: 4px;
        }

        .alertCard button a {
          color: white;
          display: block;
          height: 100%;
          width: 100%;
        }

        .alertCard p {
          color: #333;
          font-size: 22px;
          font-family: "Noto Sans TC", sans-serif;
        }

        @media screen and (max-width: 768px) {
          .alertCard {
            width: 470px;
            margin: 0 auto;
          }
        }

        #hamburger {
          background: url("/images/menu-black.png");
          background-repeat: no-repeat;
          background-size: 45%;
          background-position: center;
          cursor: pointer;
          position: absolute;
          height: 85px;
          width: 80px;
          display: block;
          transform: translate(-50%, -50%);
          top: 55%;
          left: 90%;
        }
        #ham-menu ul li a {
          color: white;
          position: relative;
          display: block;
          width: 100%;
        }
        #ham-menu ul {
          padding: 0px 0px 0px 0px;
          margin: 0px 1em 1em;
        }
        #ham-menu ul li {
          list-style: none;
          color: white;
          background-color: #2b2b2b;
          opacity: 0.8;
          height: 50px;
          line-height: 50px;
          width: 100%;
          padding-left: 30px;
          border-bottom: 1px solid #777;
          border-left: 3px solid transparent;
        }

        #ham-menu ul li:hover {
          border-left: 3px solid #a5ce0f;
          cursor: pointer;
        }
        #ham-menu ul li {
          display: block;
        }
        @media screen and (min-width: 768px) {
          #hamburger {
            display: none;
          }
          #ham-menu {
            display: none;
          }
        }

        #dropItem {
          width: 320px;
          background-color: #f4f5f6;
          color: #2b2b2b;
          border: 1px solid #ebebeb;
          border-top: none;
          display: none;
          padding: 8px 12px;
          z-index: 2500;
          cursor: default;
        }
        #dropItem.open {
          display: block;
        }

        #dropItem p {
          margin: 6px auto;
          font-size: 12px;
          text-align: left;
        }

        #dropItem .nonselect {
          line-height: 24px;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
										supported by Chrome, Edge, Opera and Firefox */
        }
        #dropItem h2,
        #dropItem label {
          text-align: left;
        }

        .smallPhoto {
          overflow: hidden;
          position: relative;
          border-radius: 50%;
          width: 39px;
          height: 39px;
          margin: 8px auto 0px;
          background: #eee;
          border: 2px solid white;
          cursor: pointer;
          margin: 8px auto 0px;
        }
        .smallPhoto img {
          position: absolute;
          max-width: 48px;
          height: auto;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
        }

        .smallPhoto .blankImage {
          position: relative;
          height: 40px;
          width: 40px;
          background-color: red;
        }

        #loginForm input[type="email"] {
          border: 2px solid rgb(218, 218, 218);
          width: 100%;
          height: 46px;
          outline: none;
          display: block;
          padding: 5px 15px;
          margin-bottom: 16px;
          font-size: 13px;
          font-weight: 500;
        }
        #loginForm input[type="password"],
        #loginForm input[type="text"] {
          border: 2px solid rgb(218, 218, 218);
          width: 100%;
          height: 46px;
          outline: none;
          display: block;
          padding: 5px 15px;
          font-size: 13px;
          font-weight: 500;
        }

        .updateNote {
          background-color: #fcebcd;
          margin: 5px auto 12px;
          padding: 7px;
        }

        .navbar-nav ul li .updateNote {
          font-size: 12px;
          line-height: 22px;
        }

        #dropItem #login,
        #dropItem #google-login {
          border: 2px solid #a5ce0f;
          color: #fff;
          background-color: #a5ce0f;
          width: 100%;
          height: 46px;
          line-height: 40px;
          outline: none;
          display: block;
          font-weight: 800;
          border-radius: 4px;
        }
        #dropItem #login:hover {
          cursor: pointer;
        }

        #dropItem #google-login {
          background-color: #fff;
          color: #333;
          border: 1px solid #333;
          position: relative;
        }
        #dropItem #google-login a {
          font-size: 14px;
          font-weight: 700;
          color: #333;
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 42px;
        }
        #dropItem #google-login:hover {
          cursor: pointer;
        }
        #dropItem #google-login img {
          float: left;
          margin-right: 10px;
          position: absolute;
          transform: translate(-85px, 11px);
        }

        input[type="password"]:active,
        input[type="password"]:focus,
        input[type="email"]:focus,
        input[type="email"]:active {
          outline: 3px solid #a5ce0f;
        }
        #loginForm .input-group label {
          display: block;
          line-height: 24px;
        }
        form .row {
          margin: 0px;
        }
        form h2 {
          font-family: "Noto Sans TC", sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin: 20px auto;
        }
        #dropItem form a {
          color: #008489;
          text-decoration: none;
          font-weight: 700;
        }
        form p {
          font-weight: 500;
          color: #484848;
          margin: 13px auto;
        }
        form a:hover {
          color: #008489;
        }
        input[type="checkbox"] {
          display: none;
        }
        input[type="checkbox"] label {
          color: red;
        }
        #dropItem input[type="checkbox"] + label {
          position: relative;
          cursor: pointer;
          font-size: 14px;
          font-family: "Noto Sans TC", sans-serif;
          font-weight: 500;
          margin: 2px 0px 8px 35px;
          width: 100%;
          display: block;
          color: #2b2b2b;
        }
        #dropItem input[type="checkbox"] + label::before {
          content: " ";
          position: relative;
          left: -33px;
          top: 21px;
          width: 24px;
          height: 24px;
          display: block;
          background: white;
          border-radius: 0px;
          border: 2px solid rgb(218, 218, 218);
        }
        #dropItem input[type="checkbox"] + label::after {
          content: " ";
          position: absolute;
          left: -31px;
          top: 24px;
          width: 19px;
          height: 19px;
          display: block;
          z-index: 1;
          background: url("/images/tick.png");
          background-repeat: no-repeat;
          background-size: 15px;
          background-position: center;
          -webkit-transform: scale(0);
          transform: scale(0);
          opacity: 0;
          outline: 3px solid #a5ce0f;
          border: none;
        }
        #dropItem input[type="checkbox"]:checked + label::after {
          -webkit-transform: scale(1);
          transform: scale(1);
          opacity: 1;
        }

        @keyframes mailframe {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
