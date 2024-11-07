import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components_en/Navbar";
import Footer from "../components_en/Footer";
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

  // ============ SALARY CALCULATIONS ============
  let noOfTimes;
  if (frequency === "Once") {
    noOfTimes = 1;
  } else if (frequency === "Twice") {
    noOfTimes = 2;
  } else {
    noOfTimes = frequency.split(" ")[0];
  }

  let durationInt = duration.split(" ")[0];
  let frequencyInt = noOfTimes;
  let pay = parseInt(durationInt) * parseInt(frequencyInt) * normal_rate;

  // ====== MANAGE SELECTDATE (right booking engine) ======
  var media = window.matchMedia("(min-width:768px)");
  window.onscroll = function () {
    var topContainer =
      document.querySelector(".top-container").clientHeight - 60;
    var selectDateHeight =
      document.querySelector("#selectdate").clientHeight + 2;
    var y = window.pageYOffset + selectDateHeight;
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
      .get(process.env.BACKEND_URL + "api/intllistings/Ad_details/" + slug)
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
      window.history.pushState({}, document.title, "/Ad_details_en/" + slug);
    }
  }, [id]);

  useEffect(() => {
    // ============ PROFILE DATA ===========

    axios
      .get(
        process.env.BACKEND_URL +
          "api/intlteachers/candidate/" +
          localStorage.getItem("nanoId")
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
    const nanoId = localStorage.getItem("nanoId");
    fetch(process.env.BACKEND_URL + "api/intlapplications/applications", {
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
          navigate("/applicationSent/en");
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
        process.env.BACKEND_URL +
          `api/intlapplications/Ad_details/${slug}?nanoId=` +
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
          <title>Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>
        <Navbar />
        <div className="wrap">
          <div className="top-container">
            {!isShow ? (
              ""
            ) : (
              <div className="ad-description">
                <div style={{ fontWeight: "300" }}>Case ID: {list.caseId}</div>

                <div
                  style={{
                    fontWeight: "500",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Posted by {list.firstName}
                  <figure className="smallPhoto">
                    <img src={list.filename} alt="" />
                  </figure>
                </div>

                <h2 className="mt-3 mb-4">
                  {list.subjects_en}{" "}
                  {list.contractType === "大學" ||
                  list.contractType === "University" ? (
                    <span className="highlight_university">University</span>
                  ) : list.contractType === "學校" ||
                    list.contractType === "School" ? (
                    <span className="highlight_school">School</span>
                  ) : list.contractType === "一般課程" ||
                    list.contractType === "Other" ? (
                    <span className="highlight_standard">Other</span>
                  ) : list.contractType === "語言" ||
                    list.contractType === "Languages" ? (
                    <span className="highlight_language">Languages</span>
                  ) : (
                    <span className={"highlight_music"}>Musical</span>
                  )}
                </h2>

                <p style={{ fontWeight: "900" }}>
                  {!isShow ? "" : "Location:"}
                  <b>
                    {" "}
                    {list.state}
                    {list.city}
                    {list.suburb}
                    {list.street}
                  </b>
                </p>

                <p style={{ fontWeight: "900" }}>
                  <b>Posted: {list.todaysDate} </b>
                </p>

                <br />
                <p style={{ whiteSpace: "pre-wrap" }}> {list.about} </p>
                <br />

                <div className="container-job">
                  <h2>Commencing</h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="chart">Starting from</p>
                    <p style={{ textAlign: "right" }}>{list.startDate}</p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="chart">Terminates on</p>

                    <p style={{ textAlign: "right" }}>{list.finishDate}</p>
                  </div>
                  <h2>Schedule</h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">Monday</p>
                    {list.monday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.monStart + " to " + list.monFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Unavailable</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">Tuesday</p>
                    {list.tuesday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.tueStart + " to " + list.tueFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Unavailable</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">Wednesday</p>
                    {list.wednesday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.wedStart + " to " + list.wedFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Unavailable</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">Thursday</p>
                    {list.thursday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.thuStart + " to " + list.thuFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Unavailable</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">Friday</p>
                    {list.friday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.friStart + " to " + list.friFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Unavailable</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">Saturday</p>
                    {list.saturday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.satStart + " to " + list.satFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Unavailable</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="calendar">Sunday</p>
                    {list.sunday ? (
                      <p style={{ textAlign: "right" }}>
                        {list.sunStart + " to " + list.sunFinish}
                      </p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Unavailable</p>
                    )}
                  </div>
                  <h2>Class Frequency</h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="chart">Lessons per week</p>

                    <p style={{ textAlign: "right" }}>{list.frequency}</p>
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="chart">Duration per lesson</p>
                    <p style={{ textAlign: "right" }}>{list.duration}</p>
                  </div>
                </div>

                <div className="container-onoffer">
                  <h2>Student's Preferences</h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="pig">Hourly Rate</p>
                    {list.normal_rate === "" ? (
                      <p style={{ textAlign: "right" }}>Negotiable</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>
                        NTD {list.normal_rate} per hr
                      </p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="house">Home tutoring Rate</p>
                    {list.home_rate === "" ? (
                      <p style={{ textAlign: "right" }}>Negotiable</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>
                        NTD {list.home_rate} per hr
                      </p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="computer">Online tutoring Rate</p>
                    {list.zoom_rate === "" ? (
                      <p style={{ textAlign: "right" }}>Not interested</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>
                        NTD {list.zoom_rate} per hr
                      </p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="car">Own transport</p>
                    {list.transport ? (
                      <p style={{ textAlign: "right" }}>Yes</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Optional</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="foreigner">Foreign tutor</p>
                    {list.foreigner ? (
                      <p style={{ textAlign: "right" }}>Yes</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Optional</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p className="house">Home tutoring</p>
                    {list.home_tutoring ? (
                      <p style={{ textAlign: "right" }}>Yes</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>Optional</p>
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
                  <h2 id="pricehere">Estimated weekly payout: NTD {pay} </h2>
                </div>
                <div className="container-details">
                  <h6>Student's Preferences:</h6>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="pig">Hourly rate</p>
                    <p style={{ textAlign: "right" }}>NTD {list.normal_rate}</p>
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="house">Home tutoring Rate</p>
                    {list.home_rate === "" ? (
                      <p style={{ textAlign: "right" }}>Negotiable</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>NTD {list.home_rate}</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="computer">Online tutoring Rate</p>
                    {list.zoom_rate === "" ? (
                      <p style={{ textAlign: "right" }}>Not interested</p>
                    ) : (
                      <p style={{ textAlign: "right" }}>NTD {list.zoom_rate}</p>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="col-xs-8">
                      <p className="car">Own transport</p>
                    </div>
                    <div className="col-xs-4">
                      {list.transport ? <p>Yes</p> : <p>Optional</p>}
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="col-xs-8">
                      <p className="foreigner">Foreign tutor</p>
                    </div>
                    <div className="col-xs-4">
                      {list.foreigner ? <p>Yes</p> : <p>Optional</p>}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="col-xs-8">
                      <p className="house">Home tutoring</p>
                    </div>
                    <div className="col-xs-4">
                      {list.home_tutoring ? <p>Yes</p> : <p>Optional</p>}
                    </div>
                  </div>
                </div>
                <div className="container-license">
                  <p>My Hourly rate (in NTD)</p>
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
                  <p>Would you be able to do home tutoring?</p>

                  <input
                    type="text"
                    required
                    className="form-control-lg"
                    id="hometutorList"
                    name=""
                    autoComplete="off"
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
                          No, sorry.
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetHometutor(e);
                            handleShowHometutor();
                          }}
                        >
                          Yes, I am willing.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="container-license">
                  <p>Would you be able to do online tutoring?</p>

                  <input
                    type="text"
                    required
                    className="form-control-lg"
                    id="onlinetutorList"
                    name=""
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
                          No, sorry.
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetOnlinetutor(e);
                            handleShowOnlinetutor();
                          }}
                        >
                          Yes, I am willing.
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
                        value="Applied"
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
                            value="Apply"
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
                          value="Only registered tutors can apply"
                        />
                      )
                    ) : (
                      <input
                        type="button"
                        className="btn-notself"
                        value="Cannot apply for your own listing"
                      />
                    )
                  ) : (
                    <input
                      type="button"
                      className="btn-inactive"
                      id="loginFirst"
                      value="Apply"
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
                      You need to login or sign up.
                      <Link target="_blank" to="/login/en">
                        {" "}
                        Login here
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
