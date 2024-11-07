import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { ReactSession } from "react-client-session";

const Question3Level = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  // ======== POPULATE SESSION DATA =============
  useEffect(() => {
    setLevel(ReactSession.get("level"));
  }, []);

  // ============= POST ================

  const [level, setLevel] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("level", level);
    navigate("/question4/en");
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
          <form action="" id="formThree" onSubmit={onSubmit}>
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

              <h2>Your Level</h2>
              <div className="btnGroup">
                {ReactSession.get("level") === " Beginners" ? (
                  <button
                    onClick={(e) => {
                      setLevel(e.target.innerText);
                    }}
                    className={level ? "active" : ""}
                  >
                    Beginners
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setLevel(e.target.innerText);
                    }}
                    className="btn"
                  >
                    Beginners
                  </button>
                )}
                {ReactSession.get("level") === "    Intermediate" ? (
                  <button
                    onClick={(e) => {
                      setLevel(e.target.innerText);
                    }}
                    className={level ? "active" : ""}
                  >
                    Intermediate
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setLevel(e.currentTarget.innerText);
                    }}
                    className="btn"
                  >
                    Intermediate
                  </button>
                )}
                {ReactSession.get("level") === "Advanced" ? (
                  <button
                    onClick={(e) => {
                      setLevel(e.currentTarget.innerText);
                    }}
                    className={level ? "active" : ""}
                  >
                    Advanced
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setLevel(e.currentTarget.innerText);
                    }}
                    className="btn"
                  >
                    Advanced
                  </button>
                )}
              </div>
              <div className="bottomBtn">
                <button className="btn-vori">
                  <Link to="/question3Subjects/en">Previous</Link>
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

          .wrap button:active,
          .wrap button:focus {
            height: 50px;
            display: block;
            outline: none;
            border: none;
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

          /* ======== ANSWER BAR ========== */
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
            background: #fff;
            color: #2b2b2b;
            padding: 0;
            margin-bottom: 20px;
            display: block;
            padding: 12px 20px;
            color: #2b2b2b;
            font-weight: 900;
            height: 50px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }

          .wrap .questionCard .btnGroup > button:hover {
            background: #a5ce0f;
            color: #fff;
            width: 100%;
            height: 50px;
          }
          .wrap .questionCard .btnGroup > button.active {
            background: #a5ce0f;
            color: #fff;
            width: 100%;
            height: 50px;
          }

          /* ========= PREVIOUS AND NEXT BUTTONS =============*/

          .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .btn-vori {
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
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          button:active,
          button:focus {
            outline: none;
            border: none;
          }

          .wrap .btn-vori a {
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
            .btn-vori {
              width: 200px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question3Level;