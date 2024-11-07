import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

const Question7 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  const [about, setAbout] = useState("");
  const [subject, setSubject] = useState("");

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInQuestionSeven(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 30,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setAbout(ReactSession.get("about"));
    setSubject(ReactSession.get("subjects"));
  }, []);

  function outPutErrorMessagesInAllusers() {}

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_BACKEND_URL + "api/listings/question7", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ about }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInQuestionSeven(data.invalid);
        } else {
          ReactSession.set("about", data.about);
          navigate("/question8");
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          const errorMessage = `請確認在程度說明您是否輸入至少30個文字.`;
          outPutErrorMessagesInAllusers(errorMessage);
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
          <form action="" id="formSeven" onSubmit={onSubmit}>
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

              <h2>程度說明</h2>
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
                ) : (
                  ""
                )}
              </div>

              <textarea
                id="about"
                required
                maxLength="300"
                placeholder="至少50個文字，最多300個文字"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
              <br />
              <h2>參考以下（樣板）:</h2>
              <textarea
                placeholder=""
                disabled
                value={`學習狀況： 
需要相關科教老師教幼兒${subject}，包括閱讀、文法、會話及遊戲學習。需耐心及教學經驗。學生為一位小三的女孩，今年十歲，個性內向、不大會表達、缺乏自信心，已經會簡單的英文詞彙。

日期和時間： 
* 星期二 晚上 7.00 - 晚上 9.00或 
* 星期四 晚上 7.00 - 晚上 9.00或 
* 星期六 早上 10.30 - 下午 12.30 或 
* 星期日 早上 10.30 - 下午 12.30
希望平日晚上或週末早上上課，一禮拜兩次，一次兩小時。
交通和地理位置： 國父紀念館站第1號出口，步行約五分鐘。`}
                style={{ whiteSpace: "pre-wrap" }}
              />

              <div className="bottomBtn">
                <button className="btn-previous">
                  <Link to="/question6">上一步</Link>
                </button>

                {about !== "" ? (
                  <button type="submit" className=" btn-next">
                    下一步
                  </button>
                ) : (
                  <button disabled className=" btn-next">
                    下一步
                  </button>
                )}
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
            width: 100%;
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
          }
          .wrap .questionCard .btnGroup > button > a {
            display: block;
            padding: 12px 20px;
            color: #6b7c93;
          }
          .wrap .questionCard .btnGroup > button > a:hover {
            color: #fff;
          }
          textarea {
            height: 200px !important;
            color: #2b2b2b;
            width: 100%;
            padding: 10px;
            border: 1px solid rgb(238, 238, 238);
            margin-bottom: 15px;
            white-space: pre-wrap;
          }

          textarea:focus,
          textarea:active {
            outline: none;
          }

          span {
            font-size: 14px;
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

          .wrap .btn-next:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
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
          button:focus,
          input[type="submit"]:active,
          input[type="submit"]:focus {
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
            .btn-volg,
            .btn-vori {
              width: 200px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question7;
