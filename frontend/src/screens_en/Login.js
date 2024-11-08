import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components_en/Footer";
import { ExternalLink } from "react-external-link";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { login } from "../redux/userInfo";
import i18next from "i18next";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [backdrop, setBackdrop] = useState(false);
  const [isloaded, setIsloaded] = useState(false);

  const googleUrlAddress =
    process.env.REACT_APP_BACKEND_URL + `auth/google?dd=${location.pathname}`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vanishemail, setVanishemail] = useState(false);
  const [vanishpwd, setVanishpwd] = useState(false);
  const [show, setShow] = useState(false);

  // ========== ERROR MESSAGE ===============

  const [updateNote, setUpdateNote] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function outPutErrorMessagesInQuestionCard(errorMessage) {
    setUpdateNote(true);
    setErrorMsg(errorMessage);
  }

  // ========== POST ================
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloaded(true);
    fetch(process.env.REACT_APP_BACKEND_URL + "api/intl/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid === "系統查詢到您是在愛課網中文版做註冊的.") {
          setBackdrop(true);
        }
        if (data.invalid) {
          outPutErrorMessagesInQuestionCard(data.invalid);
          setIsloaded(false);
        }
        if (
          data.user.survey === "" ||
          data.user.phone === "" ||
          data.user.nationalId === "" ||
          data.user.birth === "" ||
          data.user.street === "" ||
          data.user.gender === ""
        ) {
          localStorage.setItem("userId", data.user._id);
          setIsloaded(false);
          dispatch(
            login({
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              isLoggedIn: true,
              email: data.user.email,
              filename: data.user.filename,
              isTeacher: data.user.isTeacher,
              nanoId: data.user.nanoId,
              isActive: data.user.isActive,
              isAdmin: data.user.isAdmin,
              completeAccess: false,
            })
          );

          navigate("/personal-details/en");
        } else {
          localStorage.setItem("userId", data.user._id);
          setIsloaded(false);
          dispatch(
            login({
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              isLoggedIn: true,
              email: data.user.email,
              filename: data.user.filename,
              isTeacher: data.user.isTeacher,
              nanoId: data.user.nanoId,
              isActive: data.user.isActive,
              isAdmin: data.user.isAdmin,
              completeAccess: true,
            })
          );
          navigate("/en");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Acabook | Login</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>

        <div className="wrap">
          <div className="wrapposter">
            <section className="questionCard container">
              <figure>
                <Link to="/en">
                  <img
                    src="/images/mainLogo.png"
                    alt="LOGO"
                    className="img-fluid"
                  />
                </Link>
              </figure>

              <h2>Login</h2>
              <div className="container regCon">
                <div className="errorMessageHereInQuestionCard">
                  {updateNote ? (
                    <div className="updateNote">
                      <img
                        onClick={() => {
                          setUpdateNote(false);
                        }}
                        src="/images/cross-black.png"
                        alt=""
                        style={{ width: "12px", cursor: "pointer" }}
                      />{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: errorMsg }}
                      ></span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <form id="loginForm" onSubmit={onSubmit}>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        onBlur={() => {
                          setVanishemail(true);
                        }}
                        className={
                          vanishemail && email !== "" ? "springbok" : ""
                        }
                        autoComplete="off"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type={show ? "text" : "password"}
                        id="password"
                        autoComplete="none"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        onBlur={() => {
                          setVanishpwd(true);
                        }}
                        className={
                          vanishpwd && password !== "" ? "springbok" : ""
                        }
                      />
                      <label htmlFor="password">Password</label>
                      <span
                        onClick={() => {
                          setShow(!show);
                        }}
                        style={{
                          position: "absolute",
                          top: "9px",
                          right: "12px",
                        }}
                      >
                        {show ? (
                          <FiEye style={{ color: "#888", fontSize: "20px" }} />
                        ) : (
                          <FiEyeOff
                            style={{ color: "#888", fontSize: "20px" }}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "0" }}>
                    <p>
                      <Link to="/forgotpassword/en">Forgot Password?</Link>
                    </p>
                  </div>
                  {password.length >= 6 && email ? (
                    !isloaded ? (
                      <input
                        type="submit"
                        className="btn-login"
                        value="Login"
                      />
                    ) : (
                      <button className="btn-login">
                        <ThreeDots
                          type="ThreeDots"
                          height={40}
                          width={80}
                          color={"white"}
                        />
                      </button>
                    )
                  ) : (
                    <input
                      type="submit"
                      className="btn-login"
                      value="Login"
                      disabled
                    />
                  )}

                  <hr />

                  <p>or</p>
                  <button id="google-login">
                    <ExternalLink href={googleUrlAddress} target="_self">
                      <img
                        src="/images/googlelogin.png"
                        alt=""
                        width="20px"
                        style={{ marginRight: "6px", marginTop: "-4px" }}
                      />
                      Google Login
                    </ExternalLink>
                  </button>
                </form>
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup/en">Sign up here</Link>
                </p>
              </div>
            </section>
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
                <p>系統查詢到您是在愛課網中文版做註冊的.</p>

                <p>現在前往中文網站.</p>
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
          <Footer />
        </div>

        <style jsx="true">{`
          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
          }

          .wrap button {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #a5ce0f;
          }
          .wrapposter {
            background-image: url("./../../images/languages.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            padding-bottom: 60px;
            padding-top: 60px;
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

          /* ============ QUESTION CARD ========== */
          .wrap .questionCard {
            width: 400px;
            min-height: 80vh;
            padding: 20px 10px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 0px;
            background: #fff;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          .wrap .questionCard > figure {
            width: 200px;
            margin: 0px auto 16px;
          }
          .wrap .questionCard > figure > a {
            display: block;
          }

          .wrap .questionCard h2 {
            font-family: Arial;
            text-align: center;
            font-weight: 800;
            font-size: 22px;
            width: 100%;
            margin: 10px auto;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }
          .regCon {
            margin: 0px auto;
            width: 90%;
          }
          .updateNote {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
          }
          .questionCard p {
            margin: 10px auto;
            text-align: center;
            color: #777;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: Arial;
          }
          .questionCard a {
            margin-bottom: 0;
            width: 100%;
            font-size: 15px;
            font-weight: 700;
            font-family: Arial;
            color: #008489;
          }

          @media screen and (max-width: 768px) {
            .regCon {
              width: 100%;
            }
          }
          .input-group {
            display: block;
            margin-right: 20px;
            position: relative;
          }

          .input-group label {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            left: 0%;
            font-family: Arial;
            font-size: 14px;
            color: #777;
            font-weight: 500;
            padding: 0px 0px;
            pointer-events: none;
            transition: all 300ms ease-in-out 0ms;
          }
          #email {
            background-image: url("/images/mail.png");
            background-repeat: no-repeat;
            background-size: 16px;
            background-position: 320px;
          }

          .input-group input:focus + label {
            transform: translate(-8px, -32px) scale(0.9);
            font-size: 14px;
            opacity: 1;
          }
          .input-group input.springbok + label {
            transform: translate(-8px, -32px) scale(0.9);
            font-size: 14px;
            opacity: 0;
          }
          label {
            display: inline-block;
            font-size: 16px;
            margin-bottom: 10px;
            color: #1d1d1d;
            width: 150px;
            text-align: left;
          }
          .questionCard .btn-login,
          #google-login {
            height: 48px;
            border-radius: 4px;
            width: 100%;
            font-weight: 800;
            font-size: 20px;
            background-color: rgb(165, 206, 15);
            text-align: center;
            box-sizing: border-box;
            margin-top: 0px;
            cursor: pointer;
            padding: 1px auto;
          }
          .questionCard .btn-login {
            line-height: 32px;
            color: #fff;
            border: none;
          }
          .questionCard .btn-login:disabled {
            color: #888;
            background-color: #ddd;
          }
          .questionCard .btn-login:disabled:hover {
            cursor: default;
            color: #888;
            background-color: #ddd;
          }

          #google-login {
            background-color: #fff;
            border: 1px solid #333;
            position: relative;
            cursor: pointer;
          }
          #google-login a {
            font-weight: 800;
            font-size: 20px;
            color: #333;
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 44px;
          }
          .form-group {
            height: 52px;
          }
          input[type="text"],
          input[type="password"],
          input[type="email"] {
            height: 42px;
            text-decoration: none;
            outline: none;
            background: none;
            border: none;
            border-bottom: 2px solid #dadada;
            font-weight: 500;
            width: 100%;
            font-size: 14px;
            color: #2b2b2b;
            font-family: Arial;
          }

          .form-check-input {
            position: absolute;
            margin-top: 0.3rem;
            margin-left: 0.5rem;
          }
          .form-check-label {
            margin-bottom: 10px;
            color: #777;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: Arial;
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 468px;
              padding: 30px 0px;
            }
            .form-check-input {
              margin-left: -1.25rem;
            }
            .form-check-label {
              margin-left: 0px;
              font-size: 16px;
            }
            .input-group input:focus + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
            .input-group input.springbok + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
            #email {
              background-position: 360px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Login;
