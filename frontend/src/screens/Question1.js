import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

const Question1 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setContractType(ReactSession.get("contractType"));
  }, []);

  function clearSession() {
    sessionStorage.clear();
  }

  const [contractType, setContractType] = useState("");
  const [, setActive] = useState("");

  const handleActive = (e) => {
    setActive(e.target.setAttribute("class", "active"));
  };

  // ========== POST ================
  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("contractType", contractType);
    if (contractType === "大學") {
      navigate("/question2University");
    }
    if (contractType === "學校") {
      navigate("/question2Primary");
    }
    if (
      contractType === "一般課程" ||
      contractType === "語言" ||
      contractType === "樂器"
    ) {
      navigate("/question3Subjects");
    }
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
          <form id="formOne" action="" onSubmit={onSubmit}>
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
              <h2>您需要什麼幫助？</h2>
              <div className="btnGroup">
                {ReactSession.get("contractType") === "大學" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    大學
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    大學
                  </button>
                )}

                {ReactSession.get("contractType") === "學校" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    學校
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    學校
                  </button>
                )}

                {ReactSession.get("contractType") === "一般課程" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    一般課程
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    一般課程
                  </button>
                )}

                {ReactSession.get("contractType") === "語言" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    語言
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    語言
                  </button>
                )}
                {ReactSession.get("contractType") === "樂器" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    樂器
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    樂器
                  </button>
                )}
              </div>
              <div className="bottomBtn">
                <button
                  className="btn-cancel"
                  onClick={() => {
                    clearSession();
                  }}
                >
                  <Link to="/dashboard">取消</Link>
                </button>
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

          .active,
          button {
            padding: 12px 20px;
            height: 50px;
            font-weight: 900;
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
          .wrap .questionCard .btnGroup > button.active {
            background: #a5ce0f;
            color: #fff;
            width: 100%;
            height: 50px;
          }

          .wrap .questionCard > figure {
            width: 200px;
            margin-bottom: 40px;
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
            margin: 0px auto 24px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
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

          .wrap .questionCard .btnGroup > button:hover {
            background: #a5ce0f;
            color: #fff;
          }

          .wrap .questionCard .btnGroup > button:active {
            background: #a5ce0f;
            color: #fff;
            border: none;
            outline: none;
          }
          .wrap .questionCard .btnGroup > button:focus {
            background: #a5ce0f;
            color: #fff;
            border: none;
            outline: none;
          }

          .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .btn-cancel {
            position: relative;
            background-color: #e40000;
            color: white;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            margin-top: 20px;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .btn-cancel:focus,
          .btn-cancel:active {
            outline: none;
            border: none;
          }
          .btn-cancel a {
            color: white;
            font-weight: 800;
            width: 100%;
            height: 100%;
            font-family: "Noto Sans TC", sans-serif;
            position: relative;
            display: block;
          }

          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question1;
