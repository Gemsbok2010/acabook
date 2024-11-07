import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";
import { ThreeDots } from "react-loader-spinner";

const TeacherSubjectEdit = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const user = useSelector((state) => state.userInfo.value);
  const [readyToShow, setReadyToShow] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const [subject, setSubject] = useState({});
  const [description, setDescription] = useState("");
  const [residence, setResidence] = useState("");
  const [backdrop, setBackdrop] = useState(false);
  const [updateNote, setUpdateNote] = useState(false);

  const onSave = () => {
    setTimeout(function () {
      setAlert(false);
      setUpdateNote(false);
    }, 3000);
  };

  // ============= PUT ==============
  const onSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    const nanoId = user.nanoId;

    fetch(process.env.REACT_APP_BACKEND_URL + "api/courses/edit", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        nanoId,
        description,
        trial,
        trial_rate,
        onsite_rate,
        zoom,
        zoom_rate,
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessages(data.invalid);
        } else {
          setUpdateNote(true);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setIsloading(false);
          setTimeout(function () {
            setUpdateNote(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const [trial, setTrial] = useState(false);
  const [trial_rate, setTrialRate] = useState("");
  const [onsite_rate, setOnsiteRate] = useState("");
  const [zoom_rate, setZoomRate] = useState("");
  const [, setOnline] = useState("Online Tutoring");
  const [zoom, setZoom] = useState(true);

  // ============ SUBJECT DATA ===========
  useEffect(() => {
    setReadyToShow(false);
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "api/courses/subjectEdit/" + id)
      .then((response) => {
        if (response.status === 200) {
          setResidence(response.data.teacher.country);
          setSubject(response.data.this_subject);
          setDescription(response.data.this_subject.description);
          setZoomRate(response.data.this_subject.zoom_rate);
          setZoom(response.data.this_subject.zoom);
          setOnsiteRate(response.data.this_subject.onsite_rate);
          setTrialRate(response.data.this_subject.trial_rate);
          setTrial(response.data.this_subject.trial);
          setReadyToShow(true);
        }
      });
  }, []);

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessages(error) {
    setAlert(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const errorMessage = error;
    setAlertMsg(errorMessage);
  }

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
          <RotatingLines
            strokeColor="white"
            strokeWidth="4"
            animationDuration="1.25"
            width="100"
            visible={true}
          />
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Edit Subject | Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <LoggedInNavbar />

        {backdrop ? (
          <div
            onClick={() => setBackdrop(false)}
            className="backdrop-delete"
          ></div>
        ) : (
          ""
        )}

        <div className="wrap">
          <div className="edit-description">
            {updateNote ? (
              <section className="updateNote container-fluid">
                <div className="container-fluid ">
                  <img
                    src="/images/tick.png"
                    style={{ width: "12px" }}
                    alt=""
                  />
                  <span>Updated successfully.</span>
                </div>
              </section>
            ) : null}
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

            <div className="container-intro">
              <h2>
                {subject.subject_en + " "}
                {subject.category === "University" ? (
                  <span className="highlight_university ">University</span>
                ) : subject.category === "School" ? (
                  <span className="highlight_school ">School</span>
                ) : subject.category === "Standard" ? (
                  <span className="highlight_standard">Other</span>
                ) : subject.category === "Languages" ? (
                  <span className="highlight_language">Languages</span>
                ) : (
                  <span className="highlight_music">Musical</span>
                )}
                {subject.pauseSubject === true && (
                  <span
                    style={{
                      color: "#e40000",
                      fontSize: "18px",
                      border: "1px solid  #e40000",
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      marginLeft: "5px",
                    }}
                  >
                    Paused
                  </span>
                )}
              </h2>
            </div>
            <form onSubmit={onSubmit}>
              <div className="flexwrap">
                <div className="groupFive">
                  <div className="checkBoxGroup">
                    <div className="container-rate">
                      <h2>Description</h2>
                    </div>
                  </div>
                  <div className="container-level">
                    <textarea
                      id="about"
                      maxLength={2000}
                      placeholder="Maximum 2000 words"
                      value={description}
                      required
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="groupSeven">
                  <div className="checkBoxGroup">
                    <div className="container-rate">
                      <h2>Hourly Rates</h2>
                    </div>
                  </div>
                  <div className="container-level">
                    <div className="form-group offer-trial">
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
                      <div className="align-trial">
                        <input
                          type="text"
                          id="trial_rate"
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
                    <div className="form-group tutoring">
                      <div className="align-other">
                        <input
                          id="a"
                          type="radio"
                          name="typeOfTutoring"
                          value="Online Tutoring"
                          checked={zoom === true && true}
                          onChange={(e) => {
                            setOnline(e.target.value);
                            setZoom(!zoom);
                            setOnsiteRate("");
                          }}
                        />

                        <label htmlFor="a">Online Tutoring</label>

                        {residence === "Australia" ? (
                          <>
                            <input id="c" type="radio" />
                            <label style={{ visibility: "hidden" }} htmlFor="c">
                              On-site Tutoring
                            </label>
                          </>
                        ) : (
                          <>
                            <input
                              id="c"
                              type="radio"
                              name="typeOfTutoring"
                              value="On-site Tutoring"
                              checked={zoom === false && true}
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
                      <div className="align-trial">
                        <input
                          type="text"
                          id="zoom_rate"
                          className="form-control5"
                          placeholder="Online hourly rate"
                          maxLength="3"
                          minLength="1"
                          autoComplete="off"
                          style={{
                            display: zoom === true ? "block" : "none",
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
                            display: zoom === false ? "block" : "none",
                          }}
                          value={onsite_rate}
                          onChange={(e) => {
                            setOnsiteRate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottomButtons">
                {description ? (
                  zoom_rate !== "" || onsite_rate !== "" ? (
                    isloading ? (
                      <button className="btn-vori">
                        <ThreeDots
                          type="ThreeDots"
                          height={40}
                          width={80}
                          color={"white"}
                        />
                      </button>
                    ) : (
                      <input
                        type="submit"
                        className="save-btn"
                        value="Save"
                        onClick={onSave}
                      />
                    )
                  ) : (
                    <input disabled className="save-btn" value="Save" />
                  )
                ) : (
                  <input disabled className="save-btn" value="Save" />
                )}
              </div>
            </form>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
      <style jsx="true">{`
        .wrap {
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding-top: 60px;
          background-color: #f0eff5;
        }
        html,
        body {
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        .backdrop {
          position: fixed;
          display: block;
          background-color: rgba(33, 40, 46, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2500;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .wrap .updateNote {
          width: 80%;
          background-color: #bff4f2;
          margin-bottom: 8px;
          height: 40px;
          line-height: 40px;
          padding: 0px 15px 0px 28px;
          display: none;
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

        .flexwrap {
          padding: 0;
          margin: 0;
          width: 100%;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .edit-description {
          width: 410px;
          position: relative;
          display: flex;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: -moz-box;
          flex-wrap: wrap;
          justify-content: center;
          padding: 20px;
          margin: 0px auto 60px;
          border: 1px solid #ebebeb;
          background-color: #fff;
          padding-bottom: 20px;
          -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
        }
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

        .bottomButtons input[type="submit"] {
          position: relative;
          background-color: #a5ce0f;
          color: white;
          border: 1px solid #a5ce0f;
          cursor: pointer;
          font-weight: 800;
          width: 150px;
          height: 50px;
          line-height: 50px;
          outline: none;
          font-size: 20px;
          border-radius: 4px;
        }

        .bottomButtons {
          margin-top: 40px;
          display: flex;
          width: 100%;
          justify-content: space-around;
        }
        .wrap .save-btn:disabled {
          background-color: #ddd;
          color: #888;
          cursor: default;
          border: #ddd;
          border-radius: 4px;
          text-align: center;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
        }
        .container-intro {
          width: 100%;
        }

        .container-intro h2 {
          font-size: 22px;
          color: #333;
          font-weight: 800;
        }
        .container-intro p {
          color: rgb(51, 51, 51);
          line-height: 20px;
          font-size: 15px;
          font-weight: 100;
          font-family: sans-serif;
          width: 100%;
        }

        /* ============= COURSE TYPE ============= */

        .highlight_school {
          color: white;
          background: #a5ce0f;
          border-radius: 4px;
          height: 25px;
          line-height: 21px;
          text-align: center;
          padding: 2px 8px;
          display: inline-block;
        }

        .highlight_standard {
          color: white;
          background: deeppink;
          border-radius: 4px;
          height: 25px;
          line-height: 21px;
          text-align: center;
          padding: 2px 8px;
          display: inline-block;
        }
        .highlight_language {
          color: white;
          background: #ffa500;
          border-radius: 4px;
          height: 25px;
          line-height: 21px;
          text-align: center;
          padding: 2px 8px;
          display: inline-block;
        }
        .highlight_music {
          color: white;
          background: #a020f0;
          border-radius: 4px;
          height: 25px;
          line-height: 21px;
          text-align: center;
          padding: 2px 8px;
          display: inline-block;
        }

        .highlight_university {
          color: white;
          background: #54c8e8;
          border-radius: 4px;
          height: 25px;
          line-height: 21px;
          text-align: center;
          padding: 2px 8px;
          display: inline-block;
        }

        /* ============= GROUP TITLES ============= */
        .container-title {
          width: 100%;
          left: 0%;
          padding: 0px 20px 0px;
        }
        .container-title h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        /* ========== SUBMIT BUTTON ========= */
        .bottomButtons .btn-vori {
          position: relative;
          background-color: #a5ce0f;
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
          border: none;
        }

        .bottomButtons .btn-vori {
          width: 200px;
          text-align: center;
          background-color: #a5ce0f;
          cursor: pointer;
          justify-content: center;
          align-items: center;
        }
        .bottomButtons .btn-vori div {
          display: block !important;
        }

        .wrap .buttonCard {
          width: 450px;
          margin: 25px 30px;
        }
        @media only screen and (min-width: 768px) {
          .container-title .form-cont {
            margin: 3px 46px 7px 0px;
            width: 80px;
          }
          .container-title h2 {
            width: 440px;
          }
          .container-title {
            width: 480px;
          }
        }

        /* =============== GROUP FIVE (DESC.) ===============*/
        .groupFive {
          margin-top: 50px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .groupFive .container-rate {
          width: 100%;
          left: 0%;
          padding: 0px 20px;
        }
        .groupFive .container-rate h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        .container-level {
          width: 100%;
          left: 0%;
          padding: 0px 20px;
          position: relative;
        }
        .container-level h2 {
          font-weight: 800;
          font-size: 22px;
          width: 440px;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }
        textarea {
          height: 330px;
          width: 100%;
          padding: 10px;
          border: 1px solid rgb(238, 238, 238);
          outline: none;
        }

        /* ========== GROUP SEVEN (HOURLY RATES) =========== */

        .groupSeven {
          margin-top: 50px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          margin-left: 0px;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .groupSeven .container-rate {
          width: 100%;
          left: 0%;
          padding: 0px 20px;
        }
        .groupSeven .container-rate h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
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

        /*Right banner*/
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        input[type="text"] {
          outline: none;
          padding: 6px 10px 6px 13px;
          height: 40px;
          width: 140px;
          color: #2b2b2b;
          font-size: 13px;
          font-weight: 500;
          font-family: sans-serif;
          margin-right: 15px;
          left: 50%;
          border: 1px solid #ebebeb;
        }

        .img-fluid {
          transform: translateX(36%);
        }

        .container {
          text-align: center;
        }
        @media only screen and (min-width: 768px) {
          .container {
            text-align: left;
          }

          .img-fluid {
            transform: translateX(0%);
          }

          input[type="text"] {
            width: 220px;
          }

          .bottomButtons input[type="submit"] {
            width: 200px;
          }
          .bottomButtons {
            margin-top: 21px;
          }
          .edit-description {
            width: 1050px;
          }

          .container-rate h2 {
            width: 440px;
          }
          .container-rate {
            width: 480px;
          }

          .groupFive {
            width: 480px;
          }
          .align-other {
            margin: -18px 0px;
          }

          .container-level {
            width: 480px;
          }
          .groupSeven {
            width: 480px;
            margin-left: 28px;
          }
        }

        /* ============== CHECKBOX BUTTON =========== */

        input[type="checkbox"] + label {
          height: 22px;
          position: relative;
          cursor: pointer;
          font-size: 14px;
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
          width: 22px;
          height: 22px;
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
          left: -54px;
          top: 23px;
          width: 20px;
          height: 20px;
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
          font-size: 14px;
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
          width: 22px;
          height: 22px;
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
          left: -54px;
          top: 23px;
          width: 20px;
          height: 20px;
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

        /* =========== TEXT INPUT ============ */

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

        .offer-trial {
          display: block;
          height: 140px;
          border-bottom: 1px solid rgb(206, 212, 218);
        }
        .tutoring {
          display: block;
          transform: translateY(-25px);
        }

        .align-trial #trial_rate {
          outline: none;
          width: 100%;
          border-radius: 0px;
          color: #2b2b2b;
          display: block;
        }

        .align-trial #zoom_rate {
          outline: none;
          width: 100%;
          border-radius: 0px;
          display: block;
          color: #2b2b2b;
        }

        .align-trial #home_rate {
          outline: none;
          width: 100%;
          border-radius: 0px;
          display: block;
        }

        .align input[type="text"]:active,
        .align input[type="text"]:focus,
        .align-trial input[type="text"]:active,
        .align-trial input[type="text"]:focus {
          outline: none;
        }
        .align-trial input[type="text"] {
          display: block;
          margin-top: 8px;
          margin-left: 0px auto;
          width: 130px;
          border-radius: 0px;
        }
        .align-other {
          margin: 0px;
          width: 150px;
          display: block;
          transform: translateY(-54%);
        }
        @media only screen and (min-width: 768px) {
          .align input[type="text"] {
            width: 170px;
          }
          .align-trial input[type="text"] {
            width: 170px;
          }
          .align-other {
            transform: translateY(-24%);
          }
          .offer-trial {
            display: flex;
            height: 90px;
            justify-content: space-between;
            border-bottom: 1px solid rgb(206, 212, 218);
          }
          .tutoring {
            display: flex;
            justify-content: space-between;
            transform: translateY(0);
          }
          .align-trial #trial_rate {
            width: 170px;
            border-radius: 0px;
            margin-right: 0px;
            margin-top: 25px;
          }
          .align-trial #zoom_rate {
            width: 170px;
            margin-right: 0px;
            color: #2b2b2b;
            margin-top: 17px;
          }

          .align-trial #home_rate {
            margin-top: 75px;
            margin-right: 0px;
            width: 170px;
          }
        }
      `}</style>
    </>
  );
};

export default TeacherSubjectEdit;
