import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

const Question6 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  const [normal_rate, setNormalRate] = useState("");
  const [home_rate, setHomeRate] = useState("");
  const [zoom_rate, setZoomRate] = useState("");
  const [transport, setTransport] = useState(false);
  const [foreigner, setForeigner] = useState(false);
  const [home_tutoring, setHomeTutoring] = useState(false);

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    if (!ReactSession.get("normal_rate")) {
      setNormalRate("");
    } else {
      setNormalRate(ReactSession.get("normal_rate"));
    }

    if (!ReactSession.get("home_rate")) {
      setHomeRate("");
    } else {
      setHomeRate(ReactSession.get("home_rate"));
    }

    if (!ReactSession.get("zoom_rate")) {
      setZoomRate("");
    } else {
      setZoomRate(ReactSession.get("zoom_rate"));
    }

    if (!ReactSession.get("foreigner")) {
      setForeigner(false);
    } else {
      setForeigner(ReactSession.get("foreigner"));
    }

    if (!ReactSession.get("transport")) {
      setTransport(false);
    } else {
      setTransport(ReactSession.get("transport"));
    }

    if (!ReactSession.get("home_tutoring")) {
      setHomeTutoring(false);
    } else {
      setHomeTutoring(ReactSession.get("home_tutoring"));
    }
  }, []);

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInQuestionSix(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 30,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  // ============= POST ==============
  const onSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BACKEND_URL + "api/listings/question6", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        normal_rate,
        home_rate,
        zoom_rate,
        transport,
        foreigner,
        home_tutoring,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInQuestionSix(data.invalid);
        } else {
          ReactSession.set("normal_rate", normal_rate);
          ReactSession.set("home_rate", home_rate);
          ReactSession.set("zoom_rate", zoom_rate);
          ReactSession.set("transport", transport);
          ReactSession.set("foreigner", foreigner);
          ReactSession.set("home_tutoring", home_tutoring);
          navigate("/question7");
        }
      })
      .catch((err) => {
        if (err) {
          const errorMessage = `請確認您是否正確輸入至少普通薪資欄位.`;
          outPutErrorMessagesInQuestionSix(errorMessage);
        }
      });
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="刊登問答" />
        </Helmet>
        <div className="wrap">
          <form action="" onSubmit={onSubmit}>
            <section className="questionCard container">
              <figure>
                <Link to="/dashboard">
                  <img
                    src="/images/mainLogo.png"
                    alt="LOGO"
                    className="img-fluid"
                  />
                </Link>
              </figure>

              <h2>我的條件</h2>
              <div className="btnGroup">
                <div className="errorMessageHere">
                  {alert ? (
                    <div className="alert">
                      <img
                        src="/images/cross-black.png"
                        style={{ width: "12px" }}
                        alt=""
                      />
                      <span
                        dangerouslySetInnerHTML={{ __html: alertMsg }}
                      ></span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <h2 className="intitule">時薪</h2>

                <div className="align">
                  <input
                    type="text"
                    id="normal_rate"
                    className="form-control5"
                    placeholder="時薪"
                    autoComplete="off"
                    maxLength="5"
                    minLength="2"
                    value={normal_rate}
                    onChange={(e) => {
                      setNormalRate(e.target.value);
                    }}
                  />
                </div>
                <div className="align">
                  <input
                    type="text"
                    id="home_rate"
                    className="form-control5"
                    placeholder="到府授課時薪"
                    maxLength="5"
                    minLength="2"
                    autoComplete="off"
                    value={home_rate}
                    onChange={(e) => {
                      setHomeRate(e.target.value);
                    }}
                  />
                </div>
                <div className="align">
                  <input
                    type="text"
                    id="zoom_rate"
                    className="form-control5"
                    placeholder="線上授課時薪"
                    maxLength="5"
                    minLength="2"
                    autoComplete="off"
                    value={zoom_rate}
                    onChange={(e) => {
                      setZoomRate(e.target.value);
                    }}
                  />
                </div>

                <h2 className="intitule">其他</h2>
                <div className="align-other">
                  {transport ? (
                    <>
                      <input
                        id="a"
                        type="checkbox"
                        checked={transport}
                        onChange={(e) => {
                          setTransport(e.target.checked);
                        }}
                      />
                      <label htmlFor="a">自備交通工具</label>
                    </>
                  ) : (
                    <>
                      <input
                        id="a"
                        type="checkbox"
                        checked={false}
                        onChange={(e) => {
                          setTransport(e.target.checked);
                        }}
                      />
                      <label htmlFor="a">自備交通工具</label>
                    </>
                  )}

                  {foreigner ? (
                    <>
                      <input
                        id="b"
                        type="checkbox"
                        checked={foreigner}
                        onChange={(e) => {
                          setForeigner(e.target.checked);
                        }}
                      />
                      <label htmlFor="b">外籍人士</label>
                    </>
                  ) : (
                    <>
                      <input
                        id="b"
                        type="checkbox"
                        checked={false}
                        onChange={(e) => {
                          setForeigner(e.target.checked);
                        }}
                      />
                      <label htmlFor="b">外籍人士</label>
                    </>
                  )}

                  {home_tutoring ? (
                    <>
                      <input
                        id="c"
                        type="checkbox"
                        checked={home_tutoring}
                        onChange={(e) => {
                          setHomeTutoring(e.target.checked);
                        }}
                      />
                      <label htmlFor="c">到府授課</label>
                    </>
                  ) : (
                    <>
                      <input
                        id="c"
                        type="checkbox"
                        checked={false}
                        onChange={(e) => {
                          setHomeTutoring(e.target.checked);
                        }}
                      />
                      <label htmlFor="c">到府授課</label>
                    </>
                  )}
                </div>
                <div className="bottomBtn">
                  <button className="btn-previous">
                    <Link to="/question5">上一步</Link>
                  </button>

                  {normal_rate !== "" ? (
                    <button type="submit" className="btn-next">
                      下一步
                    </button>
                  ) : (
                    <button disabled className="btn-next">
                      下一步
                    </button>
                  )}
                </div>
              </div>
            </section>
          </form>
        </div>

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
            background-image: url("./../../images/languages.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            padding-bottom: 60px;
            padding-top: 60px;
          }
          .wrap .questionCard {
            width: 475px;
            padding-bottom: 30px;
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
            border: 1px solid #ebebeb;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          button:active,
          button:focus {
            height: 50px;
            display: block;
          }

          .wrap .btn-next:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          /* =========== LOGO AND BAR ============ */
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
            font-size: 22px;
            width: 100%;
            margin: 24px auto;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 80%;
          }

          .wrap .questionCard .btnGroup {
            width: 90%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }
          .wrap .questionCard .btnGroup > button {
            background: #a5cd0f;
            color: white;
            padding: 0;
            margin-bottom: 20px;
          }
          .wrap .questionCard .btnGroup > button:hover {
            background: #a5cd0f;
            color: #fff;
          }
          .wrap .questionCard .btnGroup > button:active {
            background: #a4cd0f;
            color: #fff;
          }
          .wrap .questionCard .btnGroup > button > a:hover {
            color: #fff;
          }
          input[type="text"] {
            outline: none;
            padding: 10px 10px 10px 18px;
            height: 45px;
            width: 200px;
            color: #2b2b2b;
            font-size: 16px;
            margin-right: 25px;
            left: 50%;
          }
          input[type="text"]:active,
          input[type="text"]:focus {
            outline: 3px solid #a5cd0f;
          }

          .intitule {
            font-family: sans-serif;
            font-size: 25px;
            font-weight: 100;
            margin-top: 25px;
            width: 600px;
            height: 50px;
            line-height: 50px;
            padding-left: 0px;
          }
          .wrap .btnGroup h2 {
            text-align: left;
            margin-top: 0px;
          }
          input::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            color: #2b2b2b !important;
            font-weight: bold;
          }
          input::-moz-placeholder {
            /* Firefox 19+ */
            color: #2b2b2b !important;
            font-weight: bold;
          }
          input :-ms-input-placeholder {
            /* IE 10+ */
            color: #2b2b2b !important;
            font-weight: bold;
          }
          input:-moz-placeholder {
            /* Firefox 18- */
            color: #2b2b2b !important;
            font-weight: bold;
          }
          input[type="checkbox"] {
            visibility: hidden;
          }
          input[type="checkbox"] + label {
            height: 52px;
            position: relative;
            cursor: pointer;
            font-size: 16px;
            font-family: sans-serif;
            font-weight: 500;
            float: left;
            width: 210px;
            margin-left: 60px;
            color: #2b2b2b;
            font-weight: 500;
            transform: translateY(-50px);
          }
          input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -55px;
            top: 22px;
            width: 32px;
            height: 32px;
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
            left: -53px;
            top: 26px;
            width: 29px;
            height: 29px;
            display: block;
            z-index: 1;
            background: url("./../../images/check.png");
            background-repeat: no-repeat;
            background-size: contain;
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
          .btnGroup .form-control5 {
            display: inline-block;
            width: 250px;
            outline: none;
            height: 40px;
            padding: 0.375rem 0.75rem;
            font-size: 12px;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            -webkit-transition: border-color 0.15s ease-in-out,
              -webkit-box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out,
              -webkit-box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            margin-bottom: 10px;
          }
          .align input[type="text"] {
            display: inline-block;
            margin-bottom: 20px;
            margin-left: 0px auto;
            width: 290px;
            border-radius: 0px;
          }
          .align-other {
            margin: 0px;
            width: 150px;
          }

          /* ========= PREVIOUS AND NEXT BUTTONS =============*/

          .wrap .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .wrap .btn-next {
            position: relative;
            background-color: #a5ce0f;
            color: white;
            border: 1px solid #a5ce0f;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }
          .wrap .btn-previous {
            position: relative;
            background-color: #a5ce0f;
            color: white;
            border: 1px solid #a5ce0f;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          .wrap .btn-previous a,
          .wrap .btn-next a {
            display: block;
            height: 100%;
            width: 100%;
            color: #fff;
          }

          button,
          button:active,
          button:focus {
            padding: 12px 20px;
            height: 50px;
            background: #fff;
            color: #2b2b2b;
            margin-bottom: 20px;
            border: none;
            outline: none;
            border-radius: 0px;
            cursor: pointer;
            font-size: 16px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .btnGroup .form-control5 {
              margin-bottom: 0px;
              width: 160px;
            }
            .align input[type="number"] {
              margin-left: 10px;
              width: 300px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question6;
