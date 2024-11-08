import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// Three dots
import { ThreeDots } from "react-loader-spinner";

const Ad_details = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const slug = pathname.split("/")[2];
  const [list, setList] = useState({});
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("");
  const [normal_rate, setNormalRate] = useState("");
  const user = useSelector((state) => state.userInfo.value);

  // =============== SALARY CALCULATIONS ==================
  let durationInt = duration.split(" ")[0];
  let frequencyInt = frequency.split(" ")[0];
  let pay = parseInt(durationInt) * parseInt(frequencyInt) * normal_rate;

  // ====== MANAGE SELECTDATE (right booking engine) ======
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
  const [verifyEmail, setVerifyEmail] = useState("");

  useEffect(() => {
    setIsshow(false);
    // ============ LISTINGS DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "api/listings/Ad_details/" + slug
      )
      .then((response) => {
        if (response.status === 200) {
          setList(response.data);
          setFrequency(response.data.frequency);
          setDuration(response.data.duration);
          setNormalRate(response.data.normal_rate);
          setVerifyEmail(response.data.email);
          setIsshow(true);
        }
      });
  }, []);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");

  const [isloaded, setIsloaded] = useState(false);
  const [isShow, setIsshow] = useState(false);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phone, setPhone] = useState("");
  const [idPhoto, setIdPhoto] = useState("");

  // ============= FACEBOOK & GOOGLE LOGIN DATA ==============
  useEffect(() => {
    if (id) {
      window.history.pushState({}, document.title, "/Ad_details/" + slug);
    }
  }, [id]);

  // ============ PROFILE DATA ===========
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/teachers/candidate/" +
          user.nanoId
      )
      .then((response) => {
        if (response.status === 200) {
          setCountry(response.data.country);
          setCity(response.data.city);
          setState(response.data.state);
          setSuburb(response.data.suburb);
          setStreet(response.data.street);
          setStreetNo(response.data.streetNo);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
          setIdPhoto(response.data.filename);
          setPhone(response.data.phone);
        }
      });
  }, []);

  // ============= DROPDOWNS ==============

  const [yourpay, setYourpay] = useState("");

  const [showhometutor, setShowhometutor] = useState(false);
  const [hometutor, setHometutor] = useState("");

  const handleShowHometutor = () => {
    setShowhometutor(false);
    setShowonlinetutor(false);
  };

  const handleSetHometutor = (e) => {
    const innerHTML = e.target.innerHTML;
    setHometutor(innerHTML);
  };

  const [showonlinetutor, setShowonlinetutor] = useState(false);
  const [onlinetutor, setOnlinetutor] = useState("");

  const handleShowOnlinetutor = () => {
    setShowonlinetutor(false);
    setShowhometutor(false);
  };

  const handleSetOnlinetutor = (e) => {
    const innerHTML = e.target.innerHTML;
    setOnlinetutor(innerHTML);
  };

  // ============= POST ==============
  const onSubmit = (e) => {
    e.preventDefault();
    setIsloaded(true);
    const email = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const nanoId = user.nanoId;
    fetch(process.env.REACT_APP_BACKEND_URL + "api/applications/applications", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        nanoId: nanoId,
        email: email,
        yourpay: yourpay,
        hometutor: hometutor,
        onlinetutor: onlinetutor,
        slugId: list.slug,
        caseId: list.caseId,
        isTeacher: user.isTeacher,
        photo: idPhoto,
        phone: phone,
        startDate: list.startDate,
        finishDate: list.finishDate,
        latitude: latitude,
        longitude: longitude,
        streetNo: streetNo,
        street: street,
        suburb: suburb,
        state: state,
        city: city,
        country: country,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          setIsloaded(false);
          outPutErrorMessage(data.invalid);
        } else {
          setIsloaded(false);
          navigate("/applicationSent");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessage(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 30,
      behavior: "smooth",
    });
    setTimeout(function () {
      setAlert(false);
    }, 3000);
    setAlertMsg(errorMessage);
  }

  const [applied, setApplied] = useState([]);

  // ============ LOGGEDIN APPLICANT APPLIED ===========
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          `api/applications/Ad_details/${slug}?nanoId=` +
          localStorage.getItem("nanoId")
      )
      .then((response) => {
        if (response.status === 200) {
          setApplied(response.data.applied);
        }
      });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>
        <Navbar />
        <div className="wrap">
          <div className="top-container">
            {!isShow ? (
              ""
            ) : (
              <div className="ad-description">
                <div style={{ fontWeight: "300" }}>
                  Case 編號：{list.caseId}
                </div>

                <div
                  style={{
                    fontWeight: "500",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  刊登者： {list.lastName} 同學
                  <figure className="smallPhoto">
                    <img src={list.filename} alt="" />
                  </figure>
                </div>
                <h2 className="mt-3 mb-4">
                  {list.subjects} {list.level}{" "}
                  {list.contractType === "大學" ||
                  list.contractType === "University" ? (
                    <span className="highlight_university">大學</span>
                  ) : list.contractType === "學校" ||
                    list.contractType === "School" ? (
                    <span className="highlight_school">學校</span>
                  ) : list.contractType === "一般課程" ||
                    list.contractType === "Other" ? (
                    <span className="highlight_standard">一般課程</span>
                  ) : list.contractType === "語言" ||
                    list.contractType === "Languages" ? (
                    <span className="highlight_language">語言</span>
                  ) : (
                    <span className="highlight_music">樂器</span>
                  )}
                </h2>
                <p style={{ fontWeight: "900" }}>
                  上課地點:
                  <b>
                    {list.state}
                    {list.city}
                    {list.suburb}
                    {list.street}
                  </b>
                </p>
                <p style={{ fontWeight: "900" }}>
                  <b>刊登日期: {list.todaysDate} </b>
                </p>
                <br />
                <p style={{ whiteSpace: "pre-wrap" }}> {list.about} </p>
                <br />
                <div className="container-job">
                  <h2>上課時間</h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="chart">預期開始日期</p>
                    <p style={{ textAlign: "right" }}>{list.startDate}</p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="chart">預期上至日期</p>

                    <p style={{ textAlign: "right" }}>{list.finishDate}</p>
                  </div>
                  <h2>時刻表</h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">星期一</p>
                    {list.monday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.monStart + " 至 " + list.monFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>不上課</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">星期二</p>
                    {list.tuesday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.tueStart + " 至 " + list.tueFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>不上課</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">星期三</p>
                    {list.wednesday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.wedStart + " 至 " + list.wedFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>不上課</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">星期四</p>
                    {list.thursday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.thuStart + " 至 " + list.thuFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>不上課</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">星期五</p>
                    {list.friday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.friStart + " 至 " + list.friFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>不上課</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">星期六</p>
                    {list.saturday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.satStart + " 至 " + list.satFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>不上課</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">星期日</p>
                    {list.sunday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.sunStart + " 至 " + list.sunFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>不上課</p>
                    )}
                  </div>
                  <h2>上課次數</h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="chart">預估一週上課次數</p>

                    <p style={{ textAlign: "right" }}>{list.frequency}</p>
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="chart">一堂課上課時間:</p>

                    <p style={{ textAlign: "right" }}>{list.duration}</p>
                  </div>
                </div>
                <div className="container-onoffer">
                  <h2>學生的要求</h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="pig">時薪</p>
                    {list.normal_rate === "" ? (
                      <p style={{ textAlign: "right" }}>可討論</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>
                        每小時 {list.normal_rate} 元
                      </p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="house">到府授課時薪</p>
                    {list.home_rate === "" ? (
                      <p style={{ textAlign: "right" }}>可討論</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>
                        每小時 {list.home_rate} 元
                      </p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="computer">線上授課時薪</p>
                    {list.zoom_rate === "" ? (
                      <p style={{ textAlign: "right" }}>暫不考慮</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>
                        每小時 {list.zoom_rate} 元
                      </p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="car">自備交通工具</p>
                    {list.transport ? (
                      <p style={{ textAlign: "right" }}>需要</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>可以到達就好</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="foreigner">外籍教師</p>
                    {list.foreigner ? (
                      <p style={{ textAlign: "right" }}>需要</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>非必要</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="house">到府授課</p>
                    {list.home_tutoring ? (
                      <p style={{ textAlign: "right" }}>需要</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>非必要</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!isShow ? (
              ""
            ) : (
              <form id="selectdate" onSubmit={onSubmit}>
                <div className="container-price">
                  <h2 id="pricehere">每一週預估: {pay} 元收入</h2>
                </div>
                <div className="container-details">
                  <h6>參考以下:</h6>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="pig">時薪</p>
                    <p style={{ textAlign: "right" }}>{list.normal_rate} 元</p>
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="house">到府授課時薪</p>
                    {list.home_rate === "" ? (
                      <p style={{ textAlign: "right" }}>可討論</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>{list.home_rate} 元</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="computer">線上授課時薪</p>
                    {list.zoom_rate === "" ? (
                      <p style={{ textAlign: "right" }}>暫不考慮</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>{list.zoom_rate} 元</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="col-xs-8">
                      <p className="car">自備交通工具</p>
                    </div>
                    <div className="col-xs-4">
                      {list.transport ? <p>需要</p> : <p>非必要</p>}
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="col-xs-8">
                      <p className="foreigner">外籍教師</p>
                    </div>
                    <div className="col-xs-4">
                      {list.foreigner ? <p>需要</p> : <p>非必要</p>}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="col-xs-8">
                      <p className="house">到府授課</p>
                    </div>
                    <div className="col-xs-4">
                      {list.home_tutoring ? <p>需要</p> : <p>非必要</p>}
                    </div>
                  </div>
                </div>
                <div className="container-license">
                  <p>您的最低時薪是 (單位：元)？</p>
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
                  {alert ? (
                    ""
                  ) : (
                    <input
                      type="text"
                      className="form-control-lg"
                      id="whoyouareList"
                      name=""
                      autoComplete="off"
                      value={yourpay ? yourpay : ""}
                      onChange={(e) => {
                        setYourpay(e.target.value);
                      }}
                      style={{ fontWeight: "700" }}
                    />
                  )}
                </div>
                <div className="container-license">
                  <p>您是否願意到府授課？</p>

                  <input
                    type="text"
                    required
                    className="form-control-lg"
                    id="hometutorList"
                    name=""
                    autoComplete="off"
                    readOnly
                    value={hometutor ? hometutor : ""}
                    onFocus={() => {
                      setShowhometutor(true);
                      setShowonlinetutor(false);
                    }}
                    style={{ fontWeight: "700" }}
                  />
                  {showhometutor && (
                    <div className="hometutorList">
                      <ul>
                        <li
                          onClick={(e) => {
                            handleSetHometutor(e);
                            handleShowHometutor();
                          }}
                        >
                          我不太方便
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetHometutor(e);
                            handleShowHometutor();
                          }}
                        >
                          我可以的
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="container-license">
                  <p>您是否願意線上授課？</p>

                  <input
                    type="text"
                    required
                    className="form-control-lg"
                    id="onlinetutorList"
                    name=""
                    readOnly
                    autoComplete="off"
                    value={onlinetutor ? onlinetutor : ""}
                    onFocus={() => {
                      setShowonlinetutor(true);
                      setShowhometutor(false);
                    }}
                    style={{ fontWeight: "700" }}
                  />
                  {showonlinetutor && (
                    <div className="onlinetutorList">
                      <ul>
                        <li
                          onClick={(e) => {
                            handleSetOnlinetutor(e);
                            handleShowOnlinetutor();
                          }}
                        >
                          我不太方便
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetOnlinetutor(e);
                            handleShowOnlinetutor();
                          }}
                        >
                          我可以的
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {applied.slice(0, 1).map((appId) => {
                  return (
                    appId.caseId === list.caseId && (
                      <input
                        type="button"
                        className="appliedbefore"
                        value="已投過"
                      />
                    )
                  );
                })}
                {applied.length === 0 ? (
                  user.isLoggedIn ? (
                    verifyEmail !== localStorage.getItem("username") ? (
                      user.isTeacher ? (
                        !isloaded ? (
                          <input
                            type="submit"
                            className="btn-aca"
                            value="發送請我的履歷"
                          />
                        ) : (
                          <button className="btn-login">
                            <ThreeDots
                              type="ThreeDots"
                              height={40}
                              width={80}
                              color={"white"}
                            />
                          </button>
                        )
                      ) : (
                        <input
                          type="button"
                          className="btn-inactiveLoggedIn"
                          id="loginFirst"
                          value="註冊老師才可發送履歷"
                        />
                      )
                    ) : (
                      <input
                        type="button"
                        className="btn-notself"
                        value="無法申請自己的刊登"
                      />
                    )
                  ) : (
                    <input
                      type="button"
                      className="btn-inactive"
                      id="loginFirst"
                      value="發送請我的履歷"
                    />
                  )
                ) : (
                  ""
                )}

                {user.isLoggedIn ? (
                  ""
                ) : (
                  <div className="container-signup">
                    <p>
                      在申請工作前，您需要先登入或註冊帳號.
                      <Link target="_blank" to="/login">
                        登入
                      </Link>
                    </p>
                  </div>
                )}
              </form>
            )}
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
            min-height: 100vh;
            padding-top: 60px;
            background-color: #a5ce0f;
          }

          .wrap .alert {
            background-color: #fcebcd;
            margin: 0px auto 0px;
            padding: 7px;
            width: 100%;
          }
          .top-container {
            height: 100%;
            width: 100%;
            display: block;
            padding-bottom: 60px;
          }
          @media only screen and (min-width: 768px) {
            .top-container {
              display: flex;
              justify-content: center;
              flex-direction: row;
              padding-bottom: 60px;
            }
          }

          .calendar {
            background-image: url("./../../images/calendarmarker.png");
            background-repeat: no-repeat;
            background-position: 1px 2px;
            background-size: 18px;
          }
          .foreigner {
            background-image: url("./../../images/ukflag.png");
            background-repeat: no-repeat;
            background-position: -2px -2px;
            background-size: 22px;
          }

          .house {
            background-image: url("./../../images/housemarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .chart {
            background-image: url("./../../images/pencilmarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }

          .car {
            background-image: url("./../../images/busmarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 16px;
          }
          .pig {
            background-image: url("./../../images/pigmarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .computer {
            background-image: url("./../../images/online.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .pencil {
            background-image: url("./../../images/pencil.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }

          /* ========== LEFT RAIL ============ */

          figure {
            position: relative;
            display: block;
          }
          .wrap .top-container .smallPhoto {
            position: absolute;
            display: inline-block;
            margin: 0px 8px 0px 8px;
            transform: translateY(-8px);
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
            padding-bottom: 30px;
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
          .container-onoffer p,
          .container-job p {
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

          #notShow {
            display: none;
          }

          @media only screen and (min-width: 768px) {
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
          }

          /* ========== RIGHT PANEL =========== */
          #selectdate {
            width: 470px;
            height: 695px;
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
            font-weight: 800;
            font-size: 22px;
            width: 100%;
            padding-top: 8px;
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

          .container-details {
            position: relative;
            width: 100%;
            left: 0%;
            outline: none;
            z-index: 1000;
          }
          .container-details p {
            width: 100%;
            padding-left: 22px;
            margin: 8px auto;
          }

          input[type="text"] {
            outline: none;
            padding: 6px 10px 6px 13px;
            height: 40px;
            width: 100%;
            color: #2b2b2b;
            font-size: 13px;
            font-weight: 100;
            font-family: "roboto";
            margin-right: 15px;
            left: 50%;
            border: 1px solid #ebebeb;
          }
          .whoyouareList {
            position: absolute;
            z-index: 2000;
            width: 90%;
            display: block;
          }
          .whoyouareList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .whoyouareList ul li {
            background-color: #f4f5f6;
            text-decoration: none;
            cursor: pointer;
            list-style-type: none;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #dadada;
            border-left: 2px solid #dadada;
            border-right: 2px solid #dadada;
            padding-left: 18px;
            position: relative;
            width: 100%;
          }
          .whoyouareList ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }

          .hometutorList {
            position: absolute;
            z-index: 2000;
            width: 90%;
            display: block;
          }
          .hometutorList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .hometutorList ul li {
            background-color: #f4f5f6;
            text-decoration: none;
            cursor: pointer;
            list-style-type: none;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #dadada;
            border-left: 2px solid #dadada;
            border-right: 2px solid #dadada;
            padding-left: 18px;
            position: relative;
            width: 100%;
          }
          .hometutorList ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }
          .onlinetutorList {
            position: absolute;
            z-index: 2000;
            width: 90%;
            display: block;
          }
          .onlinetutorList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .onlinetutorList ul li {
            background-color: #f4f5f6;
            text-decoration: none;
            cursor: pointer;
            list-style-type: none;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #dadada;
            border-left: 2px solid #dadada;
            border-right: 2px solid #dadada;
            padding-left: 18px;
            position: relative;
            width: 100%;
          }
          .onlinetutorList ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }
          .container-signup {
            position: relative;
            top: 0%;
            left: 0%;
            width: 100%;
          }
          .container-signup a {
            color: #008489;
            font-weight: 700;
            font-family: sans-serif;
          }

          @media screen and (max-width: 768px) {
            .whoyouareList ul li {
              width: 101%;
            }
            .hometutorList ul li {
              width: 101%;
            }
            .onlinetutorList ul li {
              width: 101%;
            }
          }
          @media only screen and (min-width: 768px) {
            #selectdate {
              width: 400px;
              display: inline-block;
              margin-top: 0px;
              position: fixed;
              margin-left: 700px;
              padding: 20px 20px;
            }
            .container-price h2 {
              width: 100%;
            }
            .container-details .row {
              width: 100%;
            }
          }

          /* ========= BUTTON ============= */
          .btn-aca {
            height: 48px;
            border-radius: 4px;
            color: white;
            background-color: #a5ce0f;
            text-align: center;
            border: 1px solid #a5ce0f;
            position: relative;
            width: 100%;
            margin-top: 25px;
            outline: none;
          }
          .btn-aca:hover {
            cursor: pointer;
          }

          .btn-login {
            height: 48px;
            border-radius: 4px;
            color: white;
            background-color: #a5ce0f;
            text-align: center;
            border: 1px solid #a5ce0f;
            position: relative;
            width: 100%;
            margin-top: 25px;
            outline: none;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #a5ce0f;
          }

          .btn-inactive {
            height: 48px;
            border-radius: 4px;
            color: #888;
            background-color: #ddd;
            text-align: center;
            border: 1px solid #ddd;
            position: relative;
            width: 100%;
            margin-top: 10px;
            outline: none;
            cursor: default;
          }
          .btn-inactiveLoggedIn,
          .appliedbefore {
            height: 48px;
            border-radius: 4px;
            color: #888;
            background-color: #ddd;
            text-align: center;
            border: 1px solid #ddd;
            position: relative;
            width: 100%;
            margin-top: 25px;
            outline: none;
            cursor: default;
          }

          .btn-notteacher {
            height: 48px;
            border-radius: 4px;
            color: #888;
            background-color: #ddd;
            text-align: center;
            border: 1px solid #ddd;
            position: relative;
            width: 100%;
            margin-top: 25px;
            outline: none;
            cursor: default;
          }

          .btn-notself {
            height: 48px;
            border-radius: 4px;
            color: white;
            text-align: center;
            position: relative;
            background-color: #e40000;
            border: 1px solid #e40000;
            width: 100%;
            margin-top: 25px;
            outline: none;
            cursor: default;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Ad_details;
