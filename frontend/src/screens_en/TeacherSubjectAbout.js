import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { useSelector } from "react-redux";
import { ReactSession } from "react-client-session";

const TeacherSubjectAbout = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");
  const user = useSelector((state) => state.userInfo.value);
  const [description, setDescription] = useState("");
  const [readyToShow, setReadyToShow] = useState(false);

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

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setReadyToShow(false);
    if (!ReactSession.get("description")) {
      setDescription("");
      setReadyToShow(true);
    } else {
      setDescription(ReactSession.get("description"));
      setReadyToShow(true);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("description", description);
    navigate("/paysubject/en");
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
          <div className="divider">
            <div className="personContent">
              <div className="threeItem">
                <div onClick={clearSubject}>
                  <Link to="/teacher_profile/en"> My Tutor Profile</Link>
                </div>
                <div onClick={clearSubject}>
                  <Link to="/teacher_cv/en">My Experiences</Link>
                </div>
                <div onClick={clearSubject}>
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
            <form id="formSeven" onSubmit={onSubmit}>
              <section className="questionCard container">
                <h2>Description</h2>

                <textarea
                  id="about"
                  required
                  maxLength="500"
                  placeholder="A minimum of 50 characters and maximum of 500 characters"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <br />

                <div className="bottomBtn">
                  <button className="btn-previous">
                    <Link to="/selectsubjects/en">Previous</Link>
                  </button>

                  {description !== "" ? (
                    <button type="submit" className=" btn-next">
                      Next
                    </button>
                  ) : (
                    <button disabled className=" btn-next">
                      Next
                    </button>
                  )}
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

          /* ============== QUESTION CARD ============ */
          .wrap .questionCard {
            width: 420px;
            margin: 110px auto 0px;
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

          .wrap .questionCard textarea {
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

          .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }

          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
              margin-top: 0;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default TeacherSubjectAbout;
