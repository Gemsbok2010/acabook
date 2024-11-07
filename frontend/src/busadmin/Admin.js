import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userInfo";
import { useSelector } from "react-redux";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [springbok, setSpringbok] = useState(false);
  const user = useSelector((state) => state.userInfo.value);

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, []);

  // ========== POST ================
  const onSubmit = async (e) => {
    e.preventDefault();
    fetch(process.env.BACKEND_URL + "api/admin/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInQuestionCard(data.invalid);
          setEmail("");
          setPassword("");
        } else {
          localStorage.setItem("firstName", data.admin.firstName);
          localStorage.setItem("nanoId", data.admin.nanoId);
          localStorage.setItem("userId", data.admin._id);
          localStorage.setItem("username", data.admin.email);
          localStorage.setItem("isAdmin", data.admin.isAdmin);
          dispatch(
            login({
              firstName: data.admin.firstName,
              isLoggedIn: true,
              lastName: data.admin.lastName,
              email: data.admin.email,
              filename: data.admin.filename,
              isTeacher: data.admin.isTeacher,
              isActive: data.admin.isActive,
            })
          );
          setEmail("");
          setPassword("");
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        setEmail("");
        setPassword("");
        outPutErrorMessagesInQuestionCard("Email 或密碼不正確. 請確認再輸入.");
      });
  };
  // ========== ERROR MESSAGE ===============

  const [updateNote, setUpdateNote] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function outPutErrorMessagesInQuestionCard(errorMessage) {
    setUpdateNote(true);
    setErrorMsg(errorMessage);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>
        <div className="wrap">
          <section className="questionCard container">
            <figure>
              <Link to="/">
                <img
                  src="/images/mainLogo_white.png"
                  alt="LOGO"
                  className="img-fluid"
                />
              </Link>
            </figure>

            <div className="errorMessageHereInQuestionCard">
              {updateNote ? (
                <div className="updateNote">
                  <img
                    src="/images/cross-black.png"
                    alt=""
                    style={{ width: "12px" }}
                  />
                  <span dangerouslySetInnerHTML={{ __html: errorMsg }}></span>
                </div>
              ) : (
                ""
              )}
            </div>

            <h2>控制台</h2>
            <div className="container regCon">
              <form onSubmit={onSubmit}>
                <div className="form-group row">
                  <div className="input-group">
                    <input
                      className={springbok && email !== "" ? "springbok" : ""}
                      type="email"
                      id="email"
                      value={email}
                      autoComplete="off"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      onBlur={() => {
                        setSpringbok(true);
                      }}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="input-group">
                    <input
                      className={
                        springbok && password !== "" ? "springbok" : ""
                      }
                      type="password"
                      id="password"
                      value={password}
                      autoComplete="off"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      onBlur={() => {
                        setSpringbok(true);
                      }}
                    />
                    <label htmlFor="password">密碼</label>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="input-group">
                    <button className="btn btn-aca">登入</button>
                  </div>
                </div>
              </form>
              <Link style={{ color: "white" }} to="/admin/forgotpassword">
                忘記密碼？
              </Link>
            </div>
          </section>
        </div>
      </HelmetProvider>
      <style jsx="true">{`
        .wrap {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          min-height: 100vh;
          background: #333;
        }
        .wrap .questionCard {
          width: 340px;
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
          background: #333;
          -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
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
          text-align: center;
          font-weight: 800;
          font-size: 28px;
          width: 100%;
          margin: 24px auto;
          padding-top: 8px;
          padding-bottom: 8px;
          color: #fff;
        }
        .regCon {
          margin: 0px auto;
          width: 80%;
        }
        @media screen and (max-width: 768px) {
          .regCon {
            width: 100%;
          }
        }
        input-group {
          display: block;
          margin-right: 20px;
          position: relative;
        }
        .input-group input {
          padding: 15px 20px;
        }
        .input-group label {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          font-family: sans-serif;
          font-size: 14px;
          left: 10px;
          color: #fff;
          font-weight: 500;
          padding: 15px 10px;
          pointer-events: none;
          transition: all 1500ms ease-in-out 0ms;
        }
        #email {
          background-image: url(./../../images/mail.png);
          background-repeat: no-repeat;
          background-size: 16px;
          background-position: 290px;
        }
        #password {
          background-image: url(./../../images/lock.png);
          background-repeat: no-repeat;
          background-size: 15px;
          background-position: 290px;
        }

        .updateNote {
          background-color: #fcebcd;
          margin: 5px auto 12px;
          padding: 7px;
        }

        .input-group input:focus + label {
          left: 220px;
          font-size: 14px;
          opacity: 1;
        }
        .input-group input.springbok + label {
          left: 220px;
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
        .questionCard .btn-aca {
          height: 48px;
          border-radius: 4px;
          width: 100%;
          color: white;
          font-weight: 800;
          font-size: 20px;
          background-color: #a5ce0f;
          text-align: center;
          border-color: #a5ce0f;
          box-sizing: border-box;
          margin-top: 0px;
        }
        input[type="text"],
        input[type="password"],
        input[type="email"] {
          height: 42px;
          border-radius: 4px;
          text-decoration: none;
          outline: none;
          background: none;
          border: 1px solid #fff;
          padding: 12px 20px;
          font-weight: 500;
          width: 100%;
          font-size: 16px;
          color: #fff;
          font-family: sans-serif;
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
          font-weight: 700;
          font-family: sans-serif;
          color: #008489;
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
          font-family: sans-serif;
          margin-left: 30px;
        }
        @media only screen and (min-width: 768px) {
          .wrap .questionCard {
            width: 710px;
            padding: 30px 20px;
          }
          .form-check-input {
            margin-left: -1.25rem;
          }
          .form-check-label {
            margin-left: 0px;
            font-size: 16px;
          }
          .input-group input:focus + label {
            left: 400px;
          }
          .input-group input.springbok + label {
            left: 400px;
          }

          #email {
            background-image: url(./../../images/mail.png);

            background-position: 505px;
          }
          #password {
            background-image: url(./../../images/lock.png);

            background-position: 505px;
          }
        }
      `}</style>
    </>
  );
};

export default Admin;
