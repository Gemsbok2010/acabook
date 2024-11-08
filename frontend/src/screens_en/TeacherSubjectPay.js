import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { useSelector } from "react-redux";
import { ReactSession } from "react-client-session";
import axios from "axios";


const TeacherSubjectPay = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.value);
  ReactSession.setStoreType("sessionStorage");
  const [readyToShow, setReadyToShow] = useState(false);

  const [onsite_rate, setOnsiteRate] = useState("");
  const [zoom_rate, setZoomRate] = useState("");
  const [online, setOnline] = useState("Online Tutoring");
  const [zoom, setZoom] = useState(true);
  const [trial, setTrial] = useState(false);
  const [trial_rate, setTrialRate] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [subject_en, setSubject_en] = useState("");
  const [description, setDescription] = useState("");

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    if (!ReactSession.get("category")) {
      navigate("/mysubjects/en");
    } else {
      setCategory(ReactSession.get("category"));
    }
    if (!ReactSession.get("subject")) {
      navigate("/selectsubjects/en");
    } else {
      setSubject(ReactSession.get("subject"));
    }
    if (!ReactSession.get("subject_en")) {
      navigate("/selectsubjects/en");
    } else {
      setSubject_en(ReactSession.get("subject_en"));
    }
    if (!ReactSession.get("description")) {
      navigate("/aboutsubject/en");
    } else {
      setDescription(ReactSession.get("description"));
    }

    if (!ReactSession.get("zoom_rate")) {
      setZoomRate("");
    } else {
      setZoomRate(ReactSession.get("zoom_rate"));
    }
    if (!ReactSession.get("onsite_rate")) {
      setOnsiteRate("");
    } else {
      setOnsiteRate(ReactSession.get("onsite_rate"));
    }
    if (!ReactSession.get("trial_rate")) {
      setTrialRate("");
    } else {
      setTrialRate(ReactSession.get("trial_rate"));
    }
    if (!ReactSession.get("zoom")) {
      setZoom(true);
    } else {
      setZoom(ReactSession.get("zoom"));
    }
    if (!ReactSession.get("trial")) {
      setTrial(false);
    } else {
      setTrial(ReactSession.get("trial"));
    }
    if (!ReactSession.get("online")) {
      setOnline("Online Tutoring");
    } else {
      setOnline(ReactSession.get("online"));
    }
  }, []);

  const storeData = (e) => {
    e.preventDefault();
    ReactSession.set("onsite_rate", onsite_rate);
    ReactSession.set("zoom_rate", zoom_rate);
    ReactSession.set("trial_rate", trial_rate);
    ReactSession.set("zoom", zoom);
    ReactSession.set("trial", trial);
    ReactSession.set("online", online);
  };

  // ========= CLEAR SUBJECT SESSION WHEN CLICKED =======
  const clearSubject = () => {
    ReactSession.set("category", null);
    ReactSession.remove("category");
    ReactSession.set("subject", null);
    ReactSession.remove("subject");
    ReactSession.set("subject_en", null);
    ReactSession.remove("subject_en");
    ReactSession.set("description", null);
    ReactSession.remove("description");
    ReactSession.set("onsite_rate", null);
    ReactSession.remove("onsite_rate");
    ReactSession.set("zoom_rate", null);
    ReactSession.remove("zoom_rate");
    ReactSession.set("trial_rate", null);
    ReactSession.remove("trial_rate");
    ReactSession.set("zoom", null);
    ReactSession.remove("zoom");
    ReactSession.set("trial", null);
    ReactSession.remove("trial");
    ReactSession.set("online", null);
    ReactSession.remove("online");
  };

  // ============ PROFILE DATA ===========
  const [residence, setResidence] = useState("");

  useEffect(() => {
    setReadyToShow(false);
    const fetchData = async () => {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL +
            "api/intlteachers/profile/" +
            user.email
        )
        .then((response) => {
          if (response.status === 200) {
            setResidence(response.data.country);
            setReadyToShow(true);
          }
        });
    };
    fetchData();
  }, []);

  // ========== ERROR MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);
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

    fetch(process.env.REACT_APP_BACKEND_URL + "api/courses/createCourse", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        category: category,
        subject: subject,
        subject_en: subject_en,
        description: description,
        trial_rate: trial_rate,
        zoom_rate: zoom_rate,
        onsite_rate: onsite_rate,
        zoom: zoom,
        trial: trial,
        online: online,
        email: user.email,
        nanoId: user.nanoId,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.invalid) {
            outPutErrorMessagesInQuestionSix(data.invalid);
          } else {
            ReactSession.remove("category");
            ReactSession.remove("subject");
            ReactSession.remove("subject_en");
            ReactSession.remove("description");
            ReactSession.remove("onsite_rate");
            ReactSession.remove("zoom_rate");
            ReactSession.remove("trial_rate");
            ReactSession.remove("zoom");
            ReactSession.remove("trial");
            ReactSession.remove("online");
            setUpdateNote(true);
            setAlert(false);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setTimeout(function () {
              setUpdateNote(false);
              setAlert(false);
              navigate("/mysubjects/en");
            }, 2000);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!readyToShow)
    return (
      <div
        style={{
          backgroundColor: "#121313",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          zIndex: "2500",
          display: "block",
          position: "fixed",
        }}
      >
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            display: "block",
            height: "100%",
            width: "100%",
            top: "90%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <img
            style={{
              animation: "loadingframe 1000ms infinite",
              animationDirection: "alternate-reverse",
            }}
            src="/images/logo-footer.png"
            width="80px"
            alt=""
          />
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Add Subject | Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>
        <LoggedInNavbar />
        <div
          className="personal_details"
          onClick={() => {
            ReactSession.remove("category");
            ReactSession.remove("subject");
            ReactSession.remove("subject_en");
            ReactSession.remove("description");
            ReactSession.remove("online");
            ReactSession.remove("trial");
            ReactSession.remove("trial_rate");
            ReactSession.remove("zoom");
            ReactSession.remove("onsite_rate");
            ReactSession.remove("zoom_rate");
          }}
        >
          <Link to="/dashboard/en">Back to my Dashboard</Link>
          <h2>Add Subjects</h2>
        </div>
        <div className="wrap">
          {updateNote && (
            <section className="updateNote container-fluid">
              <div className="container-fluid ">
                <img src="/images/tick.png" width="12px" alt="" />
                <span>Your subject is added to your profile.</span>
              </div>
            </section>
          )}
          {alert ? (
            <div className="alert">
              <img
                src="/images/cross-black.png"
                style={{ width: "12px" }}
                alt=""
              />{" "}
              <span dangerouslySetInnerHTML={{ __html: alertMsg }}></span>
            </div>
          ) : (
            ""
          )}
          <div className="divider">
            <div className="personContent">
              <div className="threeItem">
                <div onClick={clearSubject}>
                  <Link to="/teacher_profile/en"> My Tutor Profile</Link>
                </div>
                <div onClick={clearSubject}>
                  <Link to="/teacher_cv/en">My Experiences</Link>
                </div>
                <div>
                  <Link style={{ color: "#a5ce0f" }} to="/mysubjects/en">
                    {" "}
                    Add Subjects
                  </Link>
                  <p
                    style={{
                      marginLeft: "6px",
                      marginBottom: "2px",
                      fontSize: "14px",
                    }}
                  >
                    Category: {ReactSession.get("category")}
                  </p>
                  <p
                    style={{
                      marginLeft: "6px",
                      marginBottom: "2px",
                      fontSize: "14px",
                    }}
                  >
                    Subject: {ReactSession.get("subject_en")}
                  </p>
                  <p
                    style={{
                      marginLeft: "6px",
                      marginBottom: "2px",
                      fontSize: "14px",
                    }}
                  >
                    Description:{" "}
                    {ReactSession.get("description") && "Description filled"}
                  </p>
                  <p
                    style={{
                      marginLeft: "6px",
                      marginBottom: "2px",
                      fontSize: "14px",
                    }}
                  >
                    Trial Session: {trial === true ? "Yes" : "No"}
                  </p>
                  {trial === true ? (
                    <p
                      style={{
                        marginLeft: "6px",
                        marginBottom: "2px",
                        fontSize: "14px",
                      }}
                    >
                      Trial Rates:{" "}
                      {trial_rate ? "AUD " + trial_rate + " per hour" : "Free"}
                    </p>
                  ) : (
                    ""
                  )}
                  <p
                    style={{
                      marginLeft: "6px",
                      marginBottom: "2px",
                      fontSize: "14px",
                    }}
                  >
                    Tutoring Mode: {zoom === true ? "Online" : "On-site"}
                  </p>
                  <p
                    style={{
                      marginLeft: "6px",
                      marginBottom: "2px",
                      fontSize: "14px",
                    }}
                  >
                    Tutoring Rates:{" "}
                    {onsite_rate && "AUD " + onsite_rate + " per hour"}
                    {zoom_rate && "AUD " + zoom_rate + " per hour"}
                  </p>
                </div>
                <div onClick={clearSubject}>
                  <ExternalLink
                    href={
                      process.env.REACT_APP_BACKEND_URL +
                      `api/intlteachers/resume/${user.nanoId}`
                    }
                    target="_self"
                  >
                    Preview CV
                  </ExternalLink>
                </div>
              </div>
            </div>
            <form onSubmit={onSubmit}>
              <section className="questionCard container">
                <div className="btnGroup">
                  <h2 className="intitule">Hourly Rates</h2>
                  <div
                    className="form-group row"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgb(206, 212, 218)",
                    }}
                  >
                    <div className="align-other">
                      <input
                        id="trial"
                        type="checkbox"
                        checked={trial}
                        onChange={(e) => {
                          setTrial(e.target.checked);
                          setTrialRate("");
                        }}
                      />
                      <label htmlFor="trial">
                        I offer trial (1 session only)
                      </label>
                    </div>
                    <div id="container" className="align-trial">
                      <input
                        type="text"
                        id="zoom_rate"
                        className="form-control5"
                        placeholder="1-time trial hourly rate"
                        maxLength="3"
                        minLength="1"
                        autoComplete="off"
                        style={{
                          visibility: trial === true ? "visible" : "hidden",
                        }}
                        value={trial_rate}
                        onChange={(e) => {
                          setTrialRate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <br />
                  <div
                    className="form-group row"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="align-other">
                      <input
                        id="a"
                        type="radio"
                        name="typeOfTutoring"
                        value="Online Tutoring"
                        checked={online === "Online Tutoring" && true}
                        onChange={(e) => {
                          setOnline(e.target.value);
                          setZoom(!zoom);
                          setOnsiteRate("");
                        }}
                      />

                      <label htmlFor="a">Online Tutoring</label>

                      {residence === "Australia" ? (
                        ""
                      ) : (
                        <>
                          <input
                            id="c"
                            type="radio"
                            name="typeOfTutoring"
                            value="On-site Tutoring"
                            checked={online === "On-site Tutoring" && true}
                            onChange={(e) => {
                              setOnline(e.target.value);
                              setZoom(!zoom);
                              setZoomRate("");
                            }}
                          />
                          <label htmlFor="c">On-site Tutoring</label>
                        </>
                      )}
                    </div>
                    <div id="container" className="align">
                      <input
                        type="text"
                        id="zoom_rate"
                        className="form-control5"
                        placeholder="Online hourly rate"
                        maxLength="3"
                        minLength="1"
                        autoComplete="off"
                        style={{
                          visibility:
                            online === "Online Tutoring" ? "visible" : "hidden",
                        }}
                        value={zoom_rate}
                        onChange={(e) => {
                          setZoomRate(e.target.value);
                        }}
                      />

                      <input
                        type="text"
                        id="home_rate"
                        className="form-control5"
                        placeholder="On-site hourly rate"
                        maxLength="3"
                        minLength="1"
                        autoComplete="off"
                        style={{
                          visibility:
                            online === "On-site Tutoring"
                              ? "visible"
                              : "hidden",
                        }}
                        value={onsite_rate}
                        onChange={(e) => {
                          setOnsiteRate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="bottomBtn">
                    <button className="btn-previous" onClick={storeData}>
                      <Link to="/aboutsubject/en">Previous</Link>
                    </button>

                    {zoom_rate !== "" || onsite_rate !== "" ? (
                      <button type="submit" className="btn-next">
                        Add
                      </button>
                    ) : (
                      <button disabled className="btn-next">
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </section>
            </form>
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
            background-color: #f4f5f6;
            padding-top: 60px;
          }

          .wrap .divider {
            display: grid;
            grid-template-columns: 30% 70%;
            padding-bottom: 60px;
          }

          @media screen and (max-width: 768px) {
            .wrap {
              padding: 10px;
            }
            .wrap .divider {
              display: block;
            }
          }

          /* ============= UPDATE NOTE ============== */
          .wrap .updateNote {
            width: 80%;
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
          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 80%;
          }

          /* ============= PERSONAL DETAILS ============== */
          .personal_details {
            margin: 15px auto 15px;
            padding: 10px 210px;
          }

          .personal_details a {
            color: #a5ce0f;
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 10px;
          }

          .personal_details a:hover {
            color: #94b90d;
          }

          .personal_details h2 {
            color: #323232;
            font-weight: 500;
            font-size: 32px;
          }

          @media screen and (max-width: 768px) {
            .personal_details {
              margin: 25px auto;
              padding: 10px 100px;
              text-align: center;
            }
          }

          /* =========== LEFT RAIL ========== */
          .wrap .personContent {
            width: 350px;
            margin: 0 20px;
          }
          .wrap .personContent .threeItem:last-child {
            height: 135px;
          }
          .wrap .personContent .threeItem > div {
            padding: 10px 30px;
            width: 100%;
          }
          .wrap .personContent .threeItem > div:last-child {
            padding: 0px 30px;
            margin-top: 20px;
            border: 1px solid #2b2b2b;
            height: 38px;
            border-radius: 4px;
            line-height: 38px;
            text-align: center;
          }
          .wrap .personContent .threeItem > div:last-child:hover {
            border: 1px solid #777;
          }
          .wrap .personContent .threeItem > div a:hover {
            color: #777;
          }
          .wrap .personContent .threeItem > div a {
            color: #2b2b2b;
            font-weight: 800;
            font-size: 22px;
            font-family: sans-serif;
          }
          .wrap .personContent .threeItem > div:hover {
            cursor: pointer;
          }
          @media screen and (max-width: 768px) {
            .wrap .personContent {
              display: block;
              width: 420px;
              margin: 0 auto 30px;
              height: 200px;
            }
            .wrap .personContent .threeItem {
              margin: 0;
              width: 420px;
              margin-bottom: 20px;
              text-align: center;
            }
            .wrap .personContent .threeItem > div {
              width: 100%;
            }
          }

          /* ============== QUESTION CARD =========== */
          .wrap .questionCard {
            width: 420px;
            margin: 190px auto 0px;
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

          input[type="text"] {
            height: 42px;
            text-decoration: none;
            outline: none;
            background: none;
            border: none;
            border-bottom: 2px solid #dadada;
            font-weight: 500;
            width: 265px;
            font-size: 14px;
            color: #2b2b2b;
            font-family: sans-serif;
          }

          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
              margin-top: 0;
            }
          }

          /* ============== CHECKBOX BUTTON =========== */

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
            transform: translateY(10px);
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
          @media only screen and (max-width: 768px) {
            input[type="checkbox"] + label {
              height: 42px;
              font-size: 14px;
            }

            input[type="checkbox"] + label::before {
              width: 22px;
              height: 22px;
              left: -40px;
            }
            input[type="checkbox"] + label::after {
              width: 19px;
              height: 19px;
              left: -39px;
            }
          }

          /* ============== RADIO BUTTON =========== */

          input[type="radio"] {
            visibility: hidden;
          }
          input[type="radio"] + label {
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
            transform: translateY(10px);
          }
          input[type="radio"] + label::before {
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

          input[type="radio"] + label::after {
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
          input[type="radio"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }

          @media only screen and (max-width: 768px) {
            input[type="radio"] + label {
              height: 42px;
              font-size: 14px;
            }

            input[type="radio"] + label::before {
              width: 22px;
              height: 22px;
              left: -40px;
            }
            input[type="radio"] + label::after {
              width: 19px;
              height: 19px;
              left: -39px;
            }
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
            width: 160px;
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
            width: 160px;
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
            font-weight: 800;
          }

          .wrap .btn-next:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
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
              margin-top: 0;
            }
            .btn-previous,
            .btn-next {
              width: 200px;
            }
          }

          /* =========== TEXT INPUT ============ */

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
            display: block;
            margin-top: 10px;
            margin-left: 0px auto;
            width: 130px;
            border-radius: 0px;
          }
          .align input[type="text"]:active,
          .align input[type="text"]:focus,
          .align-trial input[type="text"]:active,
          .align-trial input[type="text"]:focus {
            outline: none;
          }
          .align-trial input[type="text"] {
            display: block;
            margin-top: 25px;
            margin-left: 0px auto;
            width: 130px;
            border-radius: 0px;
          }
          .align-other {
            margin: 0px;
            width: 150px;
            transform: translateY(-35%);
          }
          @media only screen and (min-width: 768px) {
            .align input[type="text"] {
              width: 200px;
            }
            .align-trial input[type="text"] {
              width: 200px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default TeacherSubjectPay;
