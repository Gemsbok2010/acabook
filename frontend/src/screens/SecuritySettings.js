import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { FiEyeOff, FiEye } from "react-icons/fi";

const SecuritySettings = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [show2nd, setShow2nd] = useState(false);

  // ================= PUT ===================
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/secure/securitySettings/" +
          localStorage.getItem("userId"),
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            password: password,
            confirmPassword: confirmPassword,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.invalid) {
            outPutErrorMessagesInSecuritySettings(data.invalid);
          }
          if (data.user) {
            outPutSuccessMessageInSecuritySettings(data.user);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInSecuritySettings(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(function () {
      setAlert(false);
      setUpdateNote(false);
    }, 5000);
    setAlertMsg(errorMessage);
  }

  function outPutSuccessMessageInSecuritySettings(errorMessage) {
    setUpdateNote(true);
    setPassword("");
    setConfirmPassword("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(function () {
      setUpdateNote(false);
    }, 5000);
    setAlertMsg("");
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>
        <LoggedInNavbar />
        <div className="wrap">
          <section className="questionCard container">
            <div className="container regCon">
              <div className="errorMessageHere">
                {alert ? (
                  <div className="alert">
                    <img
                      src="/images/cross-black.png"
                      style={{ width: "12px" }}
                      alt=""
                    />
                    <span dangerouslySetInnerHTML={{ __html: alertMsg }}></span>
                  </div>
                ) : null}
                {updateNote ? (
                  <section className="updateNote container-fluid">
                    <div className="container-fluid ">
                      <img
                        src="/images/tick.png"
                        style={{ width: "12px" }}
                        alt=""
                      />
                      <span>儲存完畢</span>
                    </div>
                  </section>
                ) : null}
              </div>
              <h2 className="mt-5 mb-4">安全設定</h2>
              <form id="passwordChange" onSubmit={onSubmit}>
                <div className="contain">
                  <div className="container1">
                    <label htmlFor="password">請輸入新密碼</label>
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      value={password}
                      autoComplete="off"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <span
                      onClick={() => {
                        setShow(!show);
                      }}
                      className="eye"
                    >
                      {show ? (
                        <FiEye
                          style={{
                            color: "#777",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <FiEyeOff
                          style={{
                            color: "#777",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </span>
                  </div>
                  <div className="container2">
                    <label htmlFor="passwordConfirmation">再次輸入新密碼</label>
                    <input
                      type={show2nd ? "text" : "password"}
                      id="passwordConfirmation"
                      autoComplete="off"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <span
                      onClick={() => {
                        setShow2nd(!show2nd);
                      }}
                      className="eye"
                    >
                      {show2nd ? (
                        <FiEye
                          style={{
                            color: "#777",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <FiEyeOff
                          style={{
                            color: "#777",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </span>
                  </div>
                  <div className="container1"></div>
                  <div className="container2">
                    {password === confirmPassword ? (
                      password && confirmPassword ? (
                        <input type="submit" value="更新密碼" />
                      ) : (
                        <input
                          type="button"
                          value="更新密碼"
                          disabled="disabled"
                        />
                      )
                    ) : (
                      <input
                        type="button"
                        value="更新密碼"
                        disabled="disabled"
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </section>
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

          .wrap .updateSuccess {
            width: 100%;
            background-color: #bff4f2;
            margin-bottom: 8px;
            height: 40px;
            line-height: 40px;
            padding: 0px 15px 0px 28px;
            display: block;
          }
          .wrap .updateSuccess span {
            margin-left: 5px;
          }
          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100vh;
            padding-top: 60px;

            background-color: #f4f5f6;
          }
          .wrap .questionCard {
            width: 380px;
            min-height: 48vh;
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
            margin-bottom: 60px;
            border: 1px solid #ebebeb;
            background: #fff;
          }
          .wrap .questionCard > figure {
            width: 200px;
            margin-bottom: 40px;
          }
          .wrap .questionCard > figure > a {
            display: block;
          }

          .wrap .questionCard h2 {
            font-family: sans-serif;
            text-align: left;
            font-weight: 800;
            font-size: 28px;
            width: 100%;
            margin: 0px auto 24px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          label {
            display: block;
            font-size: 14px;
            margin-bottom: 10px;
            color: #1d1d1d;
            width: 250px;
            text-align: left;
            position: relative;
            transform: translateY(20%);
            width: 260px;
          }

          .contain {
            position: relative;
            width: 100%;
            left: 0%;
          }

          .container1,
          .container2 {
            display: inline-block;
            position: relative;
            width: 100%;
          }
          .container1 .eye,
          .container2 .eye {
            position: absolute;
            top: 41px;
            right: 20px;
          }

          input[type="text"],
          input[type="password"] {
            height: 42px;
            text-decoration: none;
            outline: none;
            background: none;
            border: 2px solid #dadada;
            padding: 12px 20px;
            font-weight: 500;
            width: 100%;
            font-size: 14px;
            color: #777;
            font-family: sans-serif;
            display: inline-block;
          }
          input[type="button"] {
            height: 48px;
            width: 100%;
            border-radius: 4px;
            color: #888;
            background-color: #dddddd;
            cursor: default;
            text-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
            margin-top: 20px;
            border: none;
            outline: none;
          }

          input[type="submit"] {
            height: 48px;
            width: 100%;
            border-radius: 4px;
            background-color: #a5ce0f;
            color: white;
            cursor: pointer;
            text-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
            margin-top: 20px;
            border: none;
            outline: none;
          }

          .questionCard p {
            margin: 10px auto;
            text-align: center;
            color: #777;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
          }
          .questionCard a {
            margin-bottom: 0;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
          }
          .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
          }
          .wrap .updateNote {
            width: 100%;
            background-color: #bff4f2;
            margin-bottom: 8px;
            height: 40px;
            line-height: 40px;
            padding: 0px 15px 0px 28px;
            display: block;
          }
          .wrap .updateNote span {
            margin-left: 5px;
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .nav-box {
              left: 96%;
            }

            .container1 .eye,
            .container2 .eye {
              top: 41px;
              right: 58px;
            }
            input[type="text"],
            input[type="password"] {
              width: 260px;
            }
            input[type="button"],
            input[type="submit"] {
              width: 260px;
            }
            .container1,
            .container2 {
              width: 305px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default SecuritySettings;
