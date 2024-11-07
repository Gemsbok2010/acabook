import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
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
    if (contractType === "University") {
      navigate("/question2University/en");
    }
    if (contractType === "School") {
      navigate("/question2Primary/en");
    }
    if (
      contractType === "Other" ||
      contractType === "Languages" ||
      contractType === "Musical"
    ) {
      navigate("/question3Subjects/en");
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>

        <div className="wrap">
          <form id="formOne" action="" onSubmit={onSubmit}>
            <section className="questionCard container">
              <figure>
                <Link to="/dashboard/en">
                  <img
                    src="/images/mainLogo.png"
                    alt="LOGO"
                    className="img-fluid"
                  />
                </Link>
              </figure>
              <h2>Select Categories</h2>
              <div className="btnGroup">
                {ReactSession.get("contractType") === "University" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    University
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    University
                  </button>
                )}

                {ReactSession.get("contractType") === "School" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    School
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    School
                  </button>
                )}

                {ReactSession.get("contractType") === "Languages" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    Languages
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    Languages
                  </button>
                )}
                {ReactSession.get("contractType") === "Musical" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    Musical
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    Musical
                  </button>
                )}
                {ReactSession.get("contractType") === "Other" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    Other
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    Other
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
                  <Link to="/dashboard/en">Cancel</Link>
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
