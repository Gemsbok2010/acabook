import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { useSelector } from "react-redux";

const Question10 = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.value);
  ReactSession.setStoreType("sessionStorage");

  const [backDrop, setBackdrop] = useState(true);
  const [contractType, setContractType] = useState("");
  const [level, setLevel] = useState("");
  const [subjects, setSubjects] = useState("");
  const [subjects_en, setSubjects_en] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [todaysDate, setTodaysDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [monStart, setMonStart] = useState("");
  const [monFinish, setMonFinish] = useState("");
  const [tueStart, setTueStart] = useState("");
  const [tueFinish, setTueFinish] = useState("");
  const [wedStart, setWedStart] = useState("");
  const [wedFinish, setWedFinish] = useState("");
  const [thuStart, setThuStart] = useState("");
  const [thuFinish, setThuFinish] = useState("");
  const [friStart, setFriStart] = useState("");
  const [friFinish, setFriFinish] = useState("");
  const [satStart, setSatStart] = useState("");
  const [satFinish, setSatFinish] = useState("");
  const [sunStart, setSunStart] = useState("");
  const [sunFinish, setSunFinish] = useState("");
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("");
  const [normal_rate, setNormalRate] = useState("");
  const [home_rate, setHomeRate] = useState("");
  const [zoom_rate, setZoomRate] = useState("");
  const [transport, setTransport] = useState(false);
  const [foreigner, setForeigner] = useState(false);
  const [home_tutoring, setHomeTutoring] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");

  // =============== SALARY CALCULATIONS ==================
  let durationInt = duration.split(" ")[0];
  let frequencyInt = frequency.split(" ")[0];
  let pay = parseInt(durationInt) * parseInt(frequencyInt) * normal_rate;

  // ================= MANAGE RIGHT PANEL ================
  var media = window.matchMedia("(min-width:768px)");
  window.onscroll = function () {
    let topContainer =
      document.querySelector(".top-container").clientHeight - 60;
    let selectDateHeight =
      document.querySelector("#selectdate").clientHeight + 2;
    let y = window.pageYOffset + selectDateHeight;
    if (media.matches) {
      if (y <= topContainer) {
        document.querySelector("#selectdate").style.cssText =
          "margin-left:700px;";
      } else {
        document.querySelector("#selectdate").style.cssText =
          "position:sticky; top:3000px; margin-left:-27px";
      }
    } else {
      document.querySelector("#selectdate").style.cssText =
        "background-color:white";
    }
  };

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setContractType(ReactSession.get("contractType"));
    setAbout(ReactSession.get("about"));
    setLevel(ReactSession.get("level"));
    setSubjects(ReactSession.get("subjects"));
    setSubjects_en(ReactSession.get("subjects_en"));
    setCountry(ReactSession.get("country"));
    setState(ReactSession.get("state"));
    setCity(ReactSession.get("city"));
    setPostalCode(ReactSession.get("postalCode"));
    setSuburb(ReactSession.get("suburb"));
    setStreet(ReactSession.get("street"));
    setStreetNo(ReactSession.get("streetNo"));
    setLatitude(ReactSession.get("latitude"));
    setLongitude(ReactSession.get("longitude"));
    setTodaysDate(ReactSession.get("todaysDate"));
    setStartDate(ReactSession.get("startDate"));
    setFinishDate(ReactSession.get("finishDate"));
    setMonday(ReactSession.get("monday"));
    setTuesday(ReactSession.get("tuesday"));
    setWednesday(ReactSession.get("wednesday"));
    setThursday(ReactSession.get("thursday"));
    setFriday(ReactSession.get("friday"));
    setSaturday(ReactSession.get("saturday"));
    setSunday(ReactSession.get("sunday"));
    setMonStart(ReactSession.get("monStart"));
    setTueStart(ReactSession.get("tueStart"));
    setWedStart(ReactSession.get("wedStart"));
    setThuStart(ReactSession.get("thuStart"));
    setFriStart(ReactSession.get("friStart"));
    setSatStart(ReactSession.get("satStart"));
    setSunStart(ReactSession.get("sunStart"));
    setMonFinish(ReactSession.get("monFinish"));
    setTueFinish(ReactSession.get("tueFinish"));
    setWedFinish(ReactSession.get("wedFinish"));
    setThuFinish(ReactSession.get("thuFinish"));
    setFriFinish(ReactSession.get("friFinish"));
    setSatFinish(ReactSession.get("satFinish"));
    setSunFinish(ReactSession.get("sunFinish"));
    setDuration(ReactSession.get("duration"));
    setFrequency(ReactSession.get("frequency"));
    setNormalRate(ReactSession.get("normal_rate"));
    setHomeRate(ReactSession.get("home_rate"));
    setZoomRate(ReactSession.get("zoom_rate"));
    setTransport(ReactSession.get("transport"));
    setForeigner(ReactSession.get("foreigner"));
    setHomeTutoring(ReactSession.get("home_tutoring"));
    setExpiryDate(ReactSession.get("expiryDate"));
  }, []);

  // ============= POST ==============
  const onSubmit = (e) => {
    e.preventDefault();

    const isTeacherJob = true;

    fetch(
      process.env.REACT_APP_BACKEND_URL +
        "api/listings/question10?expiryDate=" +
        expiryDate,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          isTeacherJob,
          contractType,
          about,
          level,
          subjects,
          subjects_en,
          country,
          city,
          state,
          suburb,
          street,
          streetNo,
          latitude,
          longitude,
          postalCode,
          duration,
          frequency,
          normal_rate,
          home_rate,
          zoom_rate,
          foreigner,
          transport,
          home_tutoring,
          startDate,
          finishDate,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
          monStart,
          tueStart,
          wedStart,
          thuStart,
          friStart,
          satStart,
          sunStart,
          monFinish,
          tueFinish,
          wedFinish,
          thuFinish,
          friFinish,
          satFinish,
          sunFinish,
          todaysDate,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          filename: user.filename,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          sessionStorage.clear();
          navigate("/question_thank_you");
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
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="刊登問答" />
        </Helmet>

        <div className="wrap">
          {backDrop ? <div className="backdrop"></div> : ""}

          {backDrop ? (
            <div className="alertCard container">
              <img
                onClick={() => {
                  setBackdrop(false);
                }}
                style={{ width: "25px", marginLeft: "0px", cursor: "pointer" }}
                src="/images/cross-black.png"
                alt=""
              />
              <h3>刊登注意事項</h3>

              <p>
                這個頁面呈現您的刊登廣告的樣板, 請詳查看您填寫的內容正確.
                如果愛可網發現刊登內容有不實或違反愛課網的使用條款,
                我們將不通知, 並且刪除此刊登, 嚴重違反使用條款者或勸告無效者,
                我們將永久關閉或封鎖貴帳戶.
              </p>
              <br />
              <p>
                確認填寫無誤之後, 請點擊頁面下方的「儲存」鍵.
                <img
                  style={{ width: "200px", marginLeft: "20px" }}
                  src="/images/upload_button.png"
                  alt=""
                />
              </p>
              <br />
              <p>
                如果有疑問, 請跟
                <Link target="_blank" to="/contact">
                  愛課網聯繫.
                </Link>
              </p>
            </div>
          ) : (
            ""
          )}

          <div className="top-container">
            <div className="ad-description">
              <div
                style={{
                  fontWeight: "500",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                刊登者： {user.lastName} 同學
                <figure className="smallPhoto">
                  <img src={user.filename} alt="" />
                </figure>
              </div>
              <h2 className="mt-3 mb-4">
                {subjects}{" "}
                {contractType === "大學" ? (
                  <span className="highlight_university">{contractType}</span>
                ) : contractType === "學校" ? (
                  <span className="highlight_school">{contractType}</span>
                ) : contractType === "一般課程" ? (
                  <span className="highlight_standard">{contractType}</span>
                ) : contractType === "語言" ? (
                  <span className="highlight_language">{contractType}</span>
                ) : (
                  <span className="highlight_music">{contractType}</span>
                )}
              </h2>
              <p style={{ fontWeight: "900" }}>
                上課地點:
                <b>
                  {state}
                  {city}
                  {suburb}
                  {street}
                </b>
              </p>
              <p style={{ fontWeight: "900" }}>
                <b>刊登日期: {todaysDate} </b>
              </p>
              <br />
              <p style={{ whiteSpace: "pre-wrap" }}> {about}</p>
              <br />

              <div className="container-job">
                <h2>上課時間</h2>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="chart">預期開始日期</p>
                  </div>
                  <div className="col-xs-5">
                    <p>{startDate}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="chart">預期上至日期</p>
                  </div>
                  <div className="col-xs-5">
                    <p>{finishDate}</p>
                  </div>
                </div>
                <h2>時刻表</h2>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">星期一</p>
                  </div>
                  <div className="col-xs-5">
                    {monday ? (
                      <p>
                        {monStart} 至 {monFinish}
                      </p>
                    ) : (
                      <p>不上課</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">星期二</p>
                  </div>
                  <div className="col-xs-5">
                    {tuesday ? (
                      <p>
                        {tueStart} 至 {tueFinish}
                      </p>
                    ) : (
                      <p>不上課</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">星期三</p>
                  </div>
                  <div className="col-xs-5">
                    {wednesday ? (
                      <p>
                        {wedStart} 至 {wedFinish}
                      </p>
                    ) : (
                      <p>不上課</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">星期四</p>
                  </div>
                  <div className="col-xs-5">
                    {thursday ? (
                      <p>
                        {thuStart} 至 {thuFinish}
                      </p>
                    ) : (
                      <p>不上課</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">星期五</p>
                  </div>
                  <div className="col-xs-5">
                    {friday ? (
                      <p>
                        {friStart} 至 {friFinish}
                      </p>
                    ) : (
                      <p>不上課</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">星期六</p>
                  </div>
                  <div className="col-xs-5">
                    {saturday ? (
                      <p>
                        {satStart} 至 {satFinish}
                      </p>
                    ) : (
                      <p>不上課</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">星期日</p>
                  </div>
                  <div className="col-xs-5">
                    {sunday ? (
                      <p>
                        {sunStart} 至 {sunFinish}
                      </p>
                    ) : (
                      <p>不上課</p>
                    )}
                  </div>
                </div>

                <h2>上課次數</h2>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="chart">預估一週上課次數</p>
                  </div>
                  <div className="col-xs-5">
                    <p>{frequency}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="chart">一堂課上課時間:</p>
                  </div>
                  <div className="col-xs-5">
                    <p>{duration}</p>
                  </div>
                </div>

                <div className="container-onoffer">
                  <h2>學生的要求</h2>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="pig">時薪</p>
                    </div>
                    <div className="col-xs-5">
                      {normal_rate === "" ? (
                        <p>可討論</p>
                      ) : (
                        <p>每小時 {normal_rate} 元</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="house">到府授課時薪</p>
                    </div>
                    <div className="col-xs-5">
                      {home_rate === "" ? (
                        <p>可討論</p>
                      ) : (
                        <p>每小時 {home_rate} 元</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="computer">線上授課時薪</p>
                    </div>
                    <div className="col-xs-5">
                      {zoom_rate === "" ? (
                        <p>暫不考慮</p>
                      ) : (
                        <p>每小時 {zoom_rate} 元</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="car">自備交通工具</p>
                    </div>
                    <div className="col-xs-5">
                      {transport ? <p>需要</p> : <p>可以到達就好</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="foreigner">外籍教師</p>
                    </div>
                    <div className="col-xs-5">
                      {foreigner ? <p>需要</p> : <p>非必要</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="house">到府授課</p>
                    </div>
                    <div className="col-xs-5">
                      {home_tutoring ? <p>需要</p> : <p>非必要</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form id="selectdate">
              <div className="container-price">
                <h2 id="pricehere">每一週預估: {pay} 元收入</h2>
              </div>

              <div className="container-details">
                <p>參考以下:</p>
                <div className="row">
                  <div className="col-xs-8">
                    <p className="pig">時薪</p>
                  </div>
                  <div className="col-xs-4">
                    <p>{normal_rate} 元</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <p className="house">到府授課時薪</p>
                  </div>
                  <div className="col-xs-4">
                    {home_rate === "" ? <p>可討論</p> : <p>{home_rate} 元</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <p className="computer">線上授課時薪</p>
                  </div>
                  <div className="col-xs-4">
                    {zoom_rate === "" ? <p>暫不考慮</p> : <p>{zoom_rate} 元</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <p className="car">自備交通工具</p>
                  </div>
                  <div className="col-xs-4">
                    {transport ? <p>需要</p> : <p>非必要</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <p className="foreigner">外籍教師</p>
                  </div>
                  <div className="col-xs-4">
                    {foreigner ? <p>需要</p> : <p>非必要</p>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-8">
                    <p className="house">到府授課</p>
                  </div>
                  <div className="col-xs-4">
                    {home_tutoring ? <p>需要</p> : <p>非必要</p>}
                  </div>
                </div>
              </div>
              <div className="container-license">
                <p>您的最低時薪是？</p>
                <input
                  type="text"
                  className="form-control-lg"
                  id="whoyouareList"
                  name=""
                  autoComplete="off"
                  style={{ fontWeight: "700", width: "100%" }}
                />
              </div>
              <div className="container-license">
                <p>您是否願意到府授課？</p>
                <select id="license" className="form-control">
                  <option>我不太方便</option>
                  <option>我可以的</option>
                </select>
              </div>
              <div className="container-license">
                <p>您是否願意線上授課？</p>
                <select id="license" className="form-control">
                  <option>我不太方便</option>
                  <option>我可以的</option>
                </select>
              </div>
              <input
                type="submit"
                disabled="disabled"
                className="btn-aca"
                value="發送請我的履歷"
              />
            </form>
          </div>
          <form action="" onSubmit={onSubmit}>
            <div className="bottomBtn">
              <button className="btn-previous">
                <Link to="/question9">上一頁</Link>
              </button>

              <button type="submit" className="btn-submit">
                確認刊登
              </button>
            </div>
          </form>
        </div>

        <style jsx="true">{`
          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100vh;
            padding-top: 60px;
            padding-bottom: 60px;
            background-image: url("./../../images/languages.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }

          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          .top-container {
            height: 100%;
            width: 100%;
            display: block;
            padding-bottom: 60px;
          }

          /*Left banner*/
          figure {
            position: relative;
            display: block;
            margin: 0 auto;
          }

          .wrap .top-container .smallPhoto {
            position: absolute;
            display: inline-block;
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: #eee;
            border: 2px solid white;
            cursor: pointer;
            top: 10px;
            left: 8px;
          }

          .wrap .top-container .smallPhoto img {
            position: absolute;
            max-width: 48px;
            height: auto;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }
          .ad-description {
            width: 470px;
            margin: 0px auto;
            background-color: white;
            position: relative;
            border: 1px solid #ebebeb;
            padding: 20px 30px 20px;
            display: block;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          .ad-description h2 {
            font-size: 22px;
            color: #333;
            font-weight: 800;
          }
          .ad-description p {
            color: rgb(51, 51, 51);
            line-height: 20px;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
            width: 100%;
          }

          .highlight_school {
            color: white;
            background: #a5ce0f;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }

          .highlight_university {
            color: white;
            background: #54c8e8;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }
          .highlight_standard {
            color: white;
            background: deeppink;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }
          .highlight_language {
            color: white;
            background: #ffa500;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }
          .highlight_music {
            color: white;
            background: #a020f0;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }

          .container-job {
            position: relative;
            width: 100%;
            left: 0%;
            padding-bottom: 10px;
            display: block;
            padding-top: 20px;
            border-top: 1px solid #ebebeb;
          }
          .container-onoffer {
            position: relative;
            width: 100%;
            left: 0%;
            display: block;
            padding-bottom: 30px;
            padding-top: 20px;
            border-top: 1px solid #ebebeb;
          }

          .container-onoffer p,
          .container-job p {
            margin: 8px 0px;
          }
          .container-onoffer .row p,
          .container-job .row p {
            width: 100%;
            padding-left: 22px;
          }
          .container-onoffer .col-xs-5 p,
          .container-job .col-xs-5 p {
            text-align: right;
          }
          .container-job h2,
          .container-onoffer h2 {
            margin: 18px 0px 16px 0px;
            color: #484848;
            width: 100%;
            font-size: 16px;
            font-weight: 500;
            font-family: sans-serif;
            width: 400px;
          }
          .container-price p,
          .container-details p,
          .container-onoffer p,
          .container-job p {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            font-family: sans-serif;
          }
          .container-job .row {
            display: flex;
            justify-content: space-between;
          }

          /*end*/

          /* ========== RIGHT PANEL =========== */
          #selectdate {
            width: 470px;
            height: 640px;
            background-color: white;
            position: relative;
            margin: 30px auto 0px;
            border: 1px solid #ebebeb;
            padding: 20px 20px;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          .container-price {
            position: relative;
            width: 100%;
          }
          .container-price h2 {
            font-weight: 600;
            font-size: 18px;
            width: 100%;
            padding-top: 0px;
            padding-bottom: 8px;
            border-bottom: 1px solid #ebebeb;
          }
          .container-license p {
            margin: 8px auto;
          }
          .container-license .form-control {
            -webkit-appearance: none;
            appearance: none;
            height: 40px;
            outline: none;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            font-size: 14px;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
          }

          .container-license select:active,
          .container-license select:focus {
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            outline: none;
          }

          .container-details {
            position: relative;
            width: 100%;
            left: 0%;
            outline: none;
            z-index: 1000;
          }
          .container-details .row p {
            width: 100%;
            padding-left: 22px;
          }
          .container-details .row {
            margin-left: 4px;
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .container-details .col-xs-4 p {
            text-align: right;
          }
          .container-details .col-xs-8 {
            padding-left: 0;
            padding-right: 0;
          }

          #calstart,
          #calfinish {
            outline: none;
            height: 40px;
            color: #2b2b2b;
            padding: 10px 10px 10px 12px;
            width: 100%;
            display: block;
            font-size: 16px;
            margin-left: 0px;
            left: 40%;
          }
          input[type="text"]:disabled {
            background-color: #fff;
          }
          select:disabled,
          .form-control:disabled {
            background-color: #fff;
            cursor: default;
          }

          ::-webkit-input-placeholder {
            color: #555;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
          }
          ::-moz-placeholder {
            color: #555;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
          }
          :-ms-input-placeholder {
            color: #555;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
          }

          .calendar {
            background-image: url(./../../Images/calendarmarker.png);
            background-repeat: no-repeat;
            background-position: 1px 2px;
            background-size: 18px;
          }
          .foreigner {
            background-image: url(./../../Images/ukflag.png);
            background-repeat: no-repeat;
            background-position: -2px -2px;
            background-size: 22px;
          }

          .house {
            background-image: url(./../../Images/housemarker.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .chart {
            background-image: url(./../../Images/pencilmarker.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }

          .car {
            background-image: url(./../../images/busmarker.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 16px;
          }
          .pig {
            background-image: url(./../../images/pigmarker.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .computer {
            background-image: url(./../../images/online.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .pencil {
            background-image: url(./../../images/pencil.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .container-details p {
            margin: 8px auto;
          }

          #payRoll {
            outline: none;
            height: 40px;
            color: #2b2b2b;
            padding: 10px 10px 10px 12px;
            width: 100%;
            display: block;
            font-size: 14px;
            margin-left: 0px;
            left: 40%;
          }

          input[type="text"] {
            outline: none;
            padding: 6px 10px 6px 13px;
            height: 40px;
            width: 170px;
            color: #2b2b2b;
            font-size: 13px;
            font-weight: 100;
            font-family: "roboto";
            margin-right: 15px;
            left: 50%;
            border: 1px solid #ebebeb;
          }

          .btn-aca {
            height: 48px;
            border-radius: 4px;
            color: white;
            background-color: #a5ce0f;
            text-align: center;
            border-color: #a5ce0f;
            border: 1px solid #a5ce0f;
            position: relative;
            width: 100%;
            margin-top: 18px;
            outline: none;
            cursor: default;
          }
          .btn-aca:hover {
            cursor: pointer;
          }

          .wrap .btn-aca:focus,
          .wrap .btn-aca:active,
          .wrap .btn-aca:hover {
            color: white;
            outline: none;
            border: none;
            cursor: default;
          }
          .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .bottomBtn > button:active {
            border: none;
            outline: none;
          }
          .bottomBtn > button:focus {
            border: none;
            outline: none;
          }
          .bottomBtn > button:hover {
            border: none;
            outline: none;
            color: white;
            cursor: pointer;
          }

          .btn-previous,
          .btn-submit {
            position: relative;
            background-color: #a5ce0f;
            color: white;
            border: 2px solid #fff;
            cursor: pointer;
            font-weight: 800;
            width: 160px;
            height: 58px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }
          .wrap .btn-previous:focus,
          .wrap .btn-submit:focus {
            background: #a5ce0f;
            color: #fff;
            outline: none;
            border: 2px solid #fff;
          }
          .wrap .btn-previous:hover,
          .wrap .btn-submit:hover {
            background: #a5ce0f;
            color: #fff;
            outline: none;
            border: 2px solid #fff;
          }
          .wrap .btn-previous:active,
          .wrap .btn-submit:active {
            background: #a5ce0f;
            color: #fff;
            outline: none;
            border: 2px solid #fff;
          }
          .btn-previous a {
            color: white;
            font-weight: 800;
            width: 100%;
            height: 100%;
            font-family: sans-serif;
            position: relative;
            display: block;
          }

          .backdrop {
            display: block;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: #3f3f3f;
            z-index: 100;
            opacity: 0.8;
            cursor: auto;
            z-index: 2000;
          }
          .alertCard {
            position: fixed;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            padding: 28px 30px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 0px;
            background: rgba(255, 255, 255, 0.9);
            z-index: 2000;
            width: 480px;
          }
          .alertCard h3 {
            color: #333;
            font-size: 42px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 900;
            margin-bottom: 40px;
            text-align: center;
          }

          .alertCard p {
            color: #333;
            font-size: 23px;
            font-family: "Noto Sans TC", sans-serif;
            text-align: left;
          }

          .alertCard a {
            color: #008489;
            text-decoration: none;
          }

          .alertCard a:focus,
          .alertCard a:active {
            text-decoration: none;
          }

          .wrap button {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #a5ce0f;
            position: relative;
            background-color: #a5ce0f;
            color: white;
            border: 2px solid #fff;
            cursor: pointer;
            font-weight: 800;
            width: 160px;
            height: 58px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          @media only screen and (min-width: 768px) {
            .top-container {
              display: flex;
              justify-content: center;
              flex-direction: row;
              padding-bottom: 60px;
            }
            .ad-description {
              width: 600px;
              margin-left: 126px;
              display: inline-block;
            }

            .container-onoffer {
              width: 540px;
            }
            .container-job {
              width: 540px;
            }
            #selectdate {
              width: 400px;
              display: inline-block;
              margin-top: 0px;
              position: fixed;
              margin-left: 700px;
              padding: 20px 20px;
            }

            input[type="text"] {
              width: 170px;
            }

            .container-price h2 {
              width: 100%;
            }
            .container-details .row {
              width: 100%;
            }
            .alertCard {
              width: 1080px;
            }

            .alertCard p {
              font-size: 23px;
            }

            .btn-previous,
            .btn-submit {
              width: 240px;
            }
            .bottomBtn {
              justify-content: space-around;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question10;
