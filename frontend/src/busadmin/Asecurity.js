import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";

const Asecurity = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dropdown, setDropdown] = useState(false);

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
        <nav>
          <div className="dashboard">
            <div className="logo"></div>

            <div className="profile-area">
              <div className="nav-box">
                <figure
                  className="smallPhoto"
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                >
                  <img src={"/images/pencilmarker.png"} alt="" />
                </figure>
                {dropdown ? (
                  <div id="dropItem">
                    <div className="dropwrap">
                      <Link to="/admin/dashboard">
                        <h4>控制台</h4>
                      </Link>
                      <Link to="/admin/users">
                        <h4>會員管理</h4>
                      </Link>
                      <Link to="/admin/teachers">
                        <h4>老師管理</h4>
                      </Link>
                      <Link to="/admin/listings">
                        <h4>Case 管理</h4>
                      </Link>
                      <Link to="/admin/subjects">
                        <h4>科目管理</h4>
                      </Link>
                      <Link to="/admin/security">
                        <h4>安全設定</h4>
                      </Link>
                      <Link to="/admin/logout">
                        <h4>登出</h4>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </nav>
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
                      type="password"
                      id="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="container2">
                    <label htmlFor="passwordConfirmation">再次輸入新密碼</label>
                    <input
                      type="password"
                      id="passwordConfirmation"
                      autoComplete="off"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
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
        </div>

        <style jsx="true">{`
          body {
            background: #fff;
          }
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          /* ============== NAV BAR ============= */

          nav {
            width: 100%;
            background-color: var(--color-white);
            padding: 1rem 0;
          }

          nav .dashboard {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            width: 96%;
            margin: 0 auto;
          }

          nav {
            height: 65px;
          }

          nav img.logo {
            width: 10rem;
            display: block;
          }

          nav .logo.active {
            display: block;
          }

          nav .profile-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4rem;
          }

          nav .profile-area .theme-btn .active {
            background: var(--color-dark);
            border-radius: var(--border-radius-2);
            color: var(--color-white);
          }

          nav .profile-area .profile {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .nav-box {
            width: 35px;
            height: 35px;
            left: 90%;
            top: 50%;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
          }
          nav > figure {
            width: 200px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 10%;
            top: 50%;
          }
          .nav-box .smallPhoto {
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: transparent;
            border: none;
            cursor: pointer;
          }
          .nav-box .smallPhoto img {
            position: absolute;
            width: 29px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }

          .nav-box #dropItem {
            width: 280px;
            background: white;
            position: absolute;
            border: 1px solid #ebebeb;
            border-top: none;
            transform: translateX(-84%);
            display: block;
          }

          .nav-box #dropItem.open {
            display: block;
          }

          .nav-box .dropwrap {
            padding-bottom: 0px;
            width: 88%;
            background: var(--color-white);
            margin-top: 3%;
            margin-left: 6%;
          }

          .nav-box .dropwrap a {
            color: #777;
            font-weight: 500;
            font-size: 13px;
            font-family: "Noto Sans TC", sans-serif;
            height: 45px;
            line-height: 45px;
            width: 100%;
            position: relative;
            display: block;
          }

          .nav-box .dropwrap a h4 {
            margin-bottom: 0px;
            width: 100%;
            position: relative;
            display: block;
            height: 45px;
            line-height: 45px;
            font-size: 12px;
            font-weight: 500;
            color: rgb(119, 119, 119);
          }

          .nav-box .dropwrap a:hover {
            border-bottom: 1px solid #484848;
          }

          nav .profile-area .profile-photo {
            display: block;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            overflow: hidden;
          }

          nav .profile-area button {
            display: none;
          }

          .img-fluid {
            transform: translateX(36%);
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
            /* -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
  box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3); */
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
          input[type="password"],
          input[type="email"] {
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
            border-radius: 4px;
            width: 100%;
            float: left;
            color: #888;
            background-color: #dddddd;
            text-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            outline: none;
          }

          input[type="submit"] {
            height: 48px;
            background-color: #a5ce0f;
            color: white;
            cursor: pointer;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            outline: none;
            border-radius: 4px;
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
            .img-fluid {
              transform: translateX(0%);
            }
            input[type="password"],
            input[type="email"] {
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

export default Asecurity;
