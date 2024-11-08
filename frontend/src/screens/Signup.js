import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components/Footer";
import {
  StyledFormSubmit,
  StyledFormButton,
  StyledFormSubmitting,
} from "../components/Styles";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { login } from "../redux/userInfo";
import { ExternalLink } from "react-external-link";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isloaded, setIsloaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleUrlAddress =
    process.env.REACT_APP_BACKEND_URL + `auth/google?dd=${location.pathname}`;

  const [tickBox, setTickBox] = useState(false);
  const [vanishfirst, setVanishfirst] = useState(false);
  const [vanishlast, setVanishlast] = useState(false);
  const [vanishemail, setVanishemail] = useState(false);
  const [vanishpwd, setVanishpwd] = useState(false);
  const [show, setShow] = useState(false);

  // ========== PASSWORD STRENGTH ===============

  const updateStrengthMeter = (password) => {
    const weaknesses = calculatePasswordStrength(password);
    weaknesses.forEach((weakness) => {
      if (weakness == null) {
        return;
      }

      const reasonsContainerA = document.getElementById("aa");
      reasonsContainerA.checked = weaknesses[0].checked;
      const reasonsContainerB = document.getElementById("bb");
      reasonsContainerB.checked = weaknesses[1].checked;
      const reasonsContainerC = document.getElementById("cc");
      reasonsContainerC.checked = weaknesses[2].checked;
      const reasonsContainerD = document.getElementById("dd");
      reasonsContainerD.checked = weaknesses[3].checked;
      return weaknesses;
    });
  };

  function calculatePasswordStrength(password) {
    const weaknesses = [];
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowerCaseWeakness(password));
    weaknesses.push(upperCaseWeakness(password));
    weaknesses.push(numberWeakness(password));
    return weaknesses;
  }

  function lowerCaseWeakness(password) {
    return characterTypeWeakness(password, /[a-z]/g, false);
  }

  function upperCaseWeakness(password) {
    return characterTypeWeakness(password, /[A-Z]/g, false);
  }

  function numberWeakness(password) {
    return characterTypeWeakness(password, /[0-9]/g, false);
  }

  function lengthWeakness(password) {
    const length = password.length;
    if (length <= 5) {
      return {
        checked: false,
      };
    } else {
      return {
        checked: true,
      };
    }
  }

  function characterTypeWeakness(password, regex, bool) {
    const matches = password.match(regex) || [];
    if (matches.length === 0) {
      return {
        checked: bool,
      };
    } else {
      return {
        checked: !bool,
      };
    }
  }

  // ========== ERROR MESSAGE ===============

  const [updateNote, setUpdateNote] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function outPutErrorMessagesInSignUp(errorMessage) {
    setUpdateNote(true);
    setErrorMsg(errorMessage);
  }
  // ========== POST ================
  const onSubmit = async (e) => {
    e.preventDefault();
    const createdAt = new Date();
    setIsloaded(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/auth/signup?createdAt=" +
          createdAt,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        }
      );
      const data = await res.json();

      if (data.prompt) {
        outPutErrorMessagesInSignUp(data.prompt);
        setIsloaded(false);
      }
      if (data.invalid) {
        outPutErrorMessagesInSignUp(data.invalid);
        setIsloaded(false);
      }
      if (data.user) {
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
        navigate("/allusers");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網 | 註冊</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>
        <div className="wrap">
          <div className="wrapposter">
            <section className="passwordCard container">
              <h4>密碼強度指標 </h4>
              <p>請確認您的設置密碼包含以下的組合：</p>
              <div id="reasons" className="reasons">
                <input type="checkbox" readOnly id="aa" />
                <label>密碼必須包含至少 6 位字符</label>
                <input type="checkbox" readOnly id="bb" />
                <label>密碼必須含有至少 1 個英文小寫字母</label>
                <input type="checkbox" readOnly id="cc" />
                <label>密碼必須含有至少 1 個英文大寫字母</label>
                <input type="checkbox" readOnly id="dd" />
                <label>密碼必須含有至少 1 個數字</label>
              </div>
            </section>
            <section className="questionCard container">
              <figure>
                <Link to="/">
                  <img
                    src="/images/mainLogo.png"
                    alt="LOGO"
                    className="img-fluid"
                  />
                </Link>
              </figure>

              <div className="container regCon">
                <h2>註冊帳號 </h2>
                <form id="signupForm" onSubmit={onSubmit}>
                  <div className="errorMessageHereInQuestionCard">
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
                          dangerouslySetInnerHTML={{ __html: errorMsg }}
                        ></span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        id="lastname"
                        maxLength="2"
                        autoComplete="nope"
                        onBlur={() => {
                          setVanishlast(true);
                        }}
                        className={
                          vanishlast && lastName !== "" ? "springbok" : ""
                        }
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                      <label htmlFor="lastname">姓氏</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        id="firstname"
                        maxLength="2"
                        autoComplete="nope"
                        value={firstName}
                        onBlur={() => {
                          setVanishfirst(true);
                        }}
                        className={
                          vanishfirst && firstName !== "" ? "springbok" : ""
                        }
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                      <label htmlFor="firstname">名字</label>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        onBlur={() => {
                          setVanishemail(true);
                        }}
                        className={
                          vanishemail && email !== "" ? "springbok" : ""
                        }
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type={show ? "text" : "password"}
                        id="password"
                        maxLength="22"
                        value={password}
                        onBlur={() => {
                          setVanishpwd(true);
                        }}
                        className={
                          vanishpwd && password !== "" ? "springbok" : ""
                        }
                        onChange={(e) => {
                          setPassword(e.target.value);
                          updateStrengthMeter(e.target.value);
                        }}
                      />

                      <label htmlFor="password">密碼</label>
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

                  <div className="form-group">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      <input
                        type="checkbox"
                        id="gridCheck"
                        checked={tickBox}
                        onChange={(e) => {
                          setTickBox(e.currentTarget.checked);
                        }}
                      />
                      <label htmlFor="gridCheck">
                        我同意愛課網的
                        <Link to="/termsAndconditions">使用條款</Link>
                      </label>
                    </div>
                  </div>
                  {lastName &&
                  firstName &&
                  email &&
                  password.length >= 6 &&
                  tickBox ? (
                    !isloaded ? (
                      <StyledFormSubmit
                        type="submit"
                        value="註冊"
                      ></StyledFormSubmit>
                    ) : (
                      <StyledFormSubmitting>
                        <ThreeDots
                          type="ThreeDots"
                          height={40}
                          width={80}
                          color={"white"}
                        />
                      </StyledFormSubmitting>
                    )
                  ) : (
                    <StyledFormButton
                      disabled
                      type="button"
                      value="註冊"
                    ></StyledFormButton>
                  )}
                  <hr />

                  <p>或</p>
                  <button id="google-login">
                    <ExternalLink href={googleUrlAddress} target="_self">
                      <img
                        src="/images/googlelogin.png"
                        alt=""
                        width="20px"
                        style={{ marginRight: "6px", marginTop: "-4px" }}
                      />
                      Google 註冊
                    </ExternalLink>
                  </button>
                </form>
              </div>
              <p>
                已經有愛課網帳號了?
                <Link to="/login"> 登入</Link>
              </p>
            </section>
          </div>
          <Footer />
        </div>

        <style jsx="true">{`
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
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
            margin-top: 32px;
          }

          .wrapposter {
            background-image: url("./../../images/languages.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            padding-bottom: 60px;
            padding-top: 60px;
            display: flex; 
            justify-content: space-evenly;
          }

          @media screen and (max-width: 768px) {
            .wrapposter {
            display: block; 
         
            }
          }

          /* ============ PASSWORD CHECKER ========== */
          .wrap .passwordCard {
            display: block;
            margin-bottom:20px;
            background: #fcebcd;
            height: 280px;
            padding: 20px 10px;
            width:400px;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
              box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
              display: block;
          }

          .wrap .passwordCard h4 {
            font-size: 22px;
            font-weight: 800;
            text-align: center;
          }

          .wrap .passwordCard p {
            color: #777;
            text-align: center;
            margin-bottom:0px
          }

          .wrap .reasons {
            width: 100%;
          }

          .wrap .passwordCard input[type="checkbox"] {
            display: none;
            float: left;
          }
          .wrap .passwordCard input[type="checkbox"] + label {
            position: relative;
            cursor: default;
            font-size: 15px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 500;
            margin: 0px 0px 0px 50px;
            width: 360px;
            display: block;
            color: #2b2b2b;
          }
          .wrap .passwordCard input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -35px;
            top: 16px;
            width: 20px;
            height: 20px;
            display: block;
            background: white;
            border-radius: 4px;
            background: #fcebcd;

          }
          .wrap .passwordCard input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -30px;
            top: 15px;
            width: 30px;
            height: 30px;
            display: block;
            z-index: 1;
            background: url("/images/check.png")
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: center;
            -webkit-transition: all 0.2s ease;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
          }
          .wrap .passwordCard input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }

          /* ============ QUESTION CARD ========== */

          .wrap .questionCard {
            width: 400px;
            min-height: 80vh;
            padding: 20px 10px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            margin: 0 auto;
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
          }

          .wrap .questionCard > figure > a {
            display: block;
          }
    

          .wrap .questionCard h2 {
            font-family: "Noto Sans TC", sans-serif;
            text-align: center;
            font-weight: 800;
            font-size: 22px;
            width: 100%;
            margin: 15px auto;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .wrap #signupForm .form-group button:disabled {
            cursor: default;
            color: #888;
            background-color: #ddd;
          }

          .wrap #signupForm .form-group button:disabled:hover {
            cursor: default;
            color: #888;
            background-color: #ddd;
          }

          .regCon {
            margin: 0px auto;
            width: 90%;
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
            font-family: "Noto Sans TC", sans-serif;
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
          #firstname,
          #lastname {
            background-image: url("/images/human.png");
            background-repeat: no-repeat;
            background-size: 17px;
            background-position: 320px;
          }

          .input-group input:focus + label {
            transform: translate(-8px, -32px) scale(0.9);
            font-size: 17px;
            opacity: 1;
          }
          .input-group input.springbok + label {
            transform: translate(-8px, -32px) scale(0.9);
            font-size: 17px;
            opacity: 0;
          }
          label {
            display: inline-block;
            font-size: 17px;
            margin-bottom: 10px;
            color: #1d1d1d;
            width: 150px;
            text-align: left;
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
            font-family: "Noto Sans TC", sans-serif;
          }

          .questionCard a {
            margin-bottom: 0;
            width: 100%;
            font-size: 17px;
            font-weight: 700;
            font-family: "Noto Sans TC", sans-serif;
            color: #008489;
          }
          input[type="checkbox"] {
            display: none;
            float: left;
          }
          input[type="checkbox"] + label {
            position: relative;
            cursor: pointer;
            font-size: 17px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 500;
            margin: 0px 0px 0px 50px;
            width: 100%;
            display: block;
            color: #2b2b2b;
          }
          .questionCard input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -55px;
            top: 16px;
            width: 20px;
            height: 20px;
            display: block;
            background: white;
            border-radius: 4px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -60px;
            top: 13px;
            width: 30px;
            height: 30px;
            display: block;
            z-index: 1;
            background: url("/images/check.png");
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: center;
            -webkit-transition: all 0.2s ease;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
          }
          input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }

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
          .questionCard p {
            margin: 10px auto;
            text-align: center;
            color: #777;
            width: 100%;
            font-size: 17px;
            font-weight: 500;
            font-family: "Noto Sans TC", sans-serif;
          }
          .updateNote {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
          }

          /* ============ MEDIA QUERIES FOR TABLET =========*/

          @media screen and (min-width: 1024px) {
            .wrap .passwordCard {
              width: 420px;
              height: 280px;
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
              background: #fcebcd;
              -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
              box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
              display: block;
            }
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 468px;
              padding: 30px 0px;
            }
            .wrap .questionCard h2 {
              font-size: 22px;
            }
            .input-group input:focus + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
            .input-group input.springbok + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
            #firstname,
            #lastname {
              background-position: 360px;
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

export default Signup;
