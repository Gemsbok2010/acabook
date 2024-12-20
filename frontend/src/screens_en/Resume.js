import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
// useSelector is accessing value of states
import { useSelector } from "react-redux";
import { ReactSession } from "react-client-session";


const Resume = () => {
  const user = useSelector((state) => state.userInfo.value);
  ReactSession.setStoreType("sessionStorage");
  const [readyToShow, setReadyToShow] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [, setLongitude] = useState("");
  const [, setLatitude] = useState("");
  const [idPhoto, setIdPhoto] = useState("");

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
  useEffect(() => {
    setReadyToShow(false);
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/intlteachers/profile/" +
          user.email
      )
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
          setCountry(response.data.country);
          setPostalCode(response.data.postalCode);
          setCity(response.data.city);
          setState(response.data.state);
          setSuburb(response.data.suburb);
          setStreet(response.data.street);
          setStreetNo(response.data.streetNo);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
          setIdPhoto(response.data.filename);
          setPhone(response.data.phone);
          setReadyToShow(true);
        }
      });
  }, []);

  // ============= LOAD SUBJECTS ===============
  const [listofCourses, setListofCourses] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/courses/resume?nanoId=" +
          user.nanoId
      );
      const data = await res.json();
      setListofCourses(data.courses);
    };

    if (isCancelled === false) {
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

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
          <title>Resume | Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>
        <LoggedInNavbar />
        <div className="personal_details">
          <Link to="/dashboard/en">Back to my Dashboard</Link>
          <h2>Preview CV</h2>
        </div>
        <div className="wrap">
          <div className="top-container">
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
                    <Link to="/mysubjects/en"> Add Subjects</Link>
                  </div>
                  <div onClick={clearSubject}>
                    <Link style={{ color: "#a5ce0f" }} to="#">
                      Preview CV
                    </Link>
                  </div>
                </div>
              </div>
              <div className="ad-description">
                <div className="sidebar">
                  <div className="sidebarlogo">
                    <img
                      className="img-fluid"
                      src="/images/mainLogo_white.png"
                      width="180px"
                      alt=""
                    />
                  </div>
                  {user.filename ? (
                    <div className="candidate-photo">
                      <figure className="smallPhoto">
                        <img src={idPhoto} alt="" name="image-File" />
                      </figure>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="candidate-name">
                    <h2>
                      {user.firstName} {user.lastName}
                    </h2>
                  </div>
                  <div className="candidate-address">
                    <h2>Contact Details</h2>
                    {country !== "Australia" ? (
                      <p>{state + city + suburb + street + streetNo}</p>
                    ) : (
                      <>
                        <p>{country}</p>
                        <br />
                      </>
                    )}

                    <p>Mobile: {phone}</p>
                    <p>Email: {user.email}</p>
                  </div>

                  <div className="candidate-languages">
                    <h2>{userInfo.languages}</h2>

                    <p>{userInfo.whichlanguage0_en}</p>
                    {userInfo.languageLvl0 ? (
                      userInfo.languageLvl0 === "Advanced or mother tongue" ? (
                        <div className="bar">
                          <div className="level-excellent"></div>
                        </div>
                      ) : userInfo.languageLvl0 === "Intermediate" ? (
                        <div className="bar">
                          <div className="level-int"></div>
                        </div>
                      ) : (
                        <div className="bar">
                          <div className="level-deb"></div>
                        </div>
                      )
                    ) : (
                      <p></p>
                    )}

                    <p>{userInfo.whichlanguage1_en}</p>

                    {userInfo.languageLvl1 ? (
                      userInfo.languageLvl1 === "Advanced or mother tongue" ? (
                        <div className="bar">
                          <div className="level-excellent"></div>
                        </div>
                      ) : userInfo.languageLvl1 === "Intermediate" ? (
                        <div className="bar">
                          <div className="level-int"></div>
                        </div>
                      ) : (
                        <div className="bar">
                          <div className="level-deb"></div>
                        </div>
                      )
                    ) : (
                      <p></p>
                    )}

                    <p>{userInfo.whichlanguage2_en}</p>
                    {userInfo.languageLvl2 ? (
                      userInfo.languageLvl2 === "Advanced or mother tongue" ? (
                        <div className="bar">
                          <div className="level-excellent"></div>
                        </div>
                      ) : userInfo.languageLvl2 === "Intermediate" ? (
                        <div className="bar">
                          <div className="level-int"></div>
                        </div>
                      ) : (
                        <div className="bar">
                          <div className="level-deb"></div>
                        </div>
                      )
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
                <div className="main">
                  <div className="main-education">
                    <h2>{userInfo.education}</h2>
                    {userInfo.university1 ? (
                      <>
                        <p className="uni">
                          {userInfo.degree1} at {userInfo.university1}
                        </p>
                        <p className="uni-dates">
                          From {userInfo.start1} to {userInfo.finish1}
                        </p>
                      </>
                    ) : (
                      <p></p>
                    )}

                    {userInfo.university2 ? (
                      <>
                        <p className="uni">
                          {userInfo.degree2} at {userInfo.university2}
                        </p>
                        <p className="uni-dates">
                          From {userInfo.start2} to {userInfo.finish2}
                        </p>
                      </>
                    ) : (
                      <p></p>
                    )}

                    {userInfo.university3 ? (
                      <>
                        <p className="uni">
                          {userInfo.degree3} at {userInfo.university3}
                        </p>
                        <p className="uni-dates">
                          From {userInfo.start3} to {userInfo.finish3}
                        </p>
                      </>
                    ) : (
                      <p></p>
                    )}
                  </div>

                  <div className="main-experiences">
                    <h2>{userInfo.workhistory}</h2>
                    <p style={{ whiteSpace: "pre-line" }}>{userInfo.resume}</p>
                  </div>

                  <div className="main-honor-awards">
                    {userInfo.honourAwards !== "" ? (
                      <h2>{userInfo.honourTitle}</h2>
                    ) : (
                      <p></p>
                    )}

                    <p style={{ whiteSpace: "pre-line" }}>
                      {userInfo.honourAwards}
                    </p>
                  </div>

                  {listofCourses.map((course) => {
                    return (
                      <div className="main-honor-courses" key={course._id}>
                        <h2>
                          {course.subject_en + " "}
                          {course.category === "University" ? (
                            <span className="highlight_university ">
                              University
                            </span>
                          ) : course.category === "School" ? (
                            <span className="highlight_school ">School</span>
                          ) : course.category === "Standard" ? (
                            <span className="highlight_standard">Other</span>
                          ) : course.category === "Languages" ? (
                            <span className="highlight_language">
                              Languages
                            </span>
                          ) : (
                            <span className="highlight_music">Musical</span>
                          )}
                        </h2>

                        <p
                          style={{
                            whiteSpace: "pre-line",
                            fontSize: "14px",
                            color: "#2b2b2b",
                          }}
                        >
                          {course.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
            background-color: #f0eff5;
          }
          .wrap .divider {
            display: grid;
            grid-template-columns: 30% 70%;
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
            border: 1px solid #a5ce0f;
            height: 38px;
            border-radius: 4px;
            line-height: 38px;
            text-align: center;
          }
          .wrap .personContent .threeItem > div:last-child:hover {
            border: 1px solid #a5ce0f;
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
            .wrap .divider {
              display: block;
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
          /* ============== RESUME ============== */
          .top-container {
            height: 100%;
            width: 100%;
            display: block;
            padding-bottom: 60px;
          }

          .ad-description {
            width: 460px;
            margin: 0 auto;
            background-color: white;
            position: relative;
            border: none;
            padding: 0px;
            display: flex;
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
            font-size: 12px;
            font-weight: 400;
            font-family: sans-serif;
            width: 100%;
          }

          .sidebar {
            position: relative;
            display: inline;
            width: 190px;
            background-color: #193659;
          }
          .sidebarlogo {
            position: relative;
            text-align: center;
            width: 100%;
          }
          .sidebarlogo .img-fluid {
            transform: translateX(0%);
            width: 110px;
            margin-top: 30px;
          }

          .candidate-photo .smallPhoto {
            overflow: hidden;
            position: relative;
            text-align: center;
            border-radius: 50%;
            width: 65px;
            height: 65px;
            background: #eee;
            border: 2px solid white;
            margin: 0;
            left: 50%;
            transform: translate(-50%, 55%);
          }
          .candidate-photo .smallPhoto img {
            position: absolute;
            width: 65px;
            height: 65px;
            max-width: 65px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }

          .candidate-name {
            position: relative;
            top: 5%;
            text-align: center;
            width: 100%;
          }

          .candidate-name h2 {
            color: #fff;
            width: 100%;
            font-size: 18px;
            font-family: sans-serif;
          }

          .candidate-address {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 9%;
            text-align: left;
          }
          .candidate-address h2 {
            color: #fff;
            font-size: 14px;
            font-family: sans-serif;
          }

          .candidate-address p {
            color: #fff;
            font-size: 12px;
            font-family: sans-serif;
          }
          .candidate-dl {
            position: relative;
            top: 11%;
            padding: 5px 26px 0px 30px;
            text-align: left;
          }

          .candidate-dl h2 {
            color: #6382a5;
            font-size: 12px;
          }

          .candidate-dl p {
            color: #fff;
            font-family: sans-serif;
          }

          .sidebar .bar {
            margin-top: 4px;
            height: 6px;
            width: 100%;
            background-color: #6382a5;
          }
          .sidebar .level-deb {
            position: relative;
            height: 6px;
            width: 30%;
            background-color: white;
            border: none;
          }
          .sidebar .level-excellent {
            position: relative;
            height: 6px;
            width: 100%;
            background-color: white;
            border: none;
          }
          .sidebar .level-int {
            position: relative;
            height: 6px;
            width: 66%;
            background-color: white;
            border: none;
          }
          .sidebar .level-excellent {
            position: relative;
            height: 6px;
            width: 100%;
            background-color: white;
            border: none;
          }

          .candidate-computer {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 16%;
            text-align: left;
          }

          .candidate-computer h2 {
            color: #fff;
            font-size: 16px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }
          .candidate-computer p {
            margin-top: 12px;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 5px;
            color: white;
          }

          .candidate-languages {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 21%;
            text-align: left;
            height: 450px;
          }

          .candidate-languages h2 {
            color: #fff;
            font-size: 14px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }

          .candidate-languages p {
            margin-top: 12px;
            font-weight: 500;
            font-size: 12px;
            margin-bottom: 5px;
            color: white;
          }

          .main {
            display: inline-block;
            width: 650px;
            padding: 80px 20px 60px;
          }
          .main-education {
            position: relative;
            top: 0%;
            text-align: left;
          }
          .main-education h2 {
            font-size: 14px;
            margin-bottom: 12px;
            font-family: sans-serif;
          }
          .main-education .uni {
            position: relative;
            font-weight: 800;
            margin-bottom: 0px;
          }
          .main-education .uni-dates {
            font-size: 11px;
            color: #777;
          }

          .main-experiences {
            position: relative;
            top: 1%;
            text-align: left;
          }

          .main-experiences h2 {
            font-size: 14px;
            margin-bottom: 12px;
            font-family: sans-serif;
          }
          .main-experiences .work-title {
            margin-top: 12px;
            position: relative;
            font-weight: 800;
            margin-bottom: 0px;
          }
          .main-experiences .work-dates {
            font-size: 11px;
            color: #777;
          }

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

          .main-honor-awards {
            position: relative;
            top: 1%;
            text-align: left;
          }

          .main-honor-awards h2 {
            font-size: 14px;
            margin-bottom: 12px;
            font-family: sans-serif;
          }

          .main-honor-courses {
            position: relative;
            top: 1%;
            text-align: left;
          }

          .main-honor-courses h2 {
            font-size: 14px;
            margin-bottom: 12px;
            font-family: sans-serif;
          }

          .container {
            text-align: center;
          }
          @media only screen and (min-width: 768px) {
            .container {
              text-align: left;
            }
            .top-container {
              justify-content: center;
              flex-direction: row;
              padding-bottom: 60px;
            }
            .ad-description {
              width: 1000px;
              margin: 0;
            }
            .ad-description p {
              font-size: 15px;
            }

            .sidebar {
              padding: 80px 0px 60px;
              width: 350px;
            }
            .sidebarlogo .img-fluid {
              transform: translateX(0%);
              width: 180px;
              margin-top: 30px;
            }

            .candidate-name h2 {
              font-size: 23px;
            }
            .candidate-address {
              padding: 5px 46px 0px 50px;
            }
            .candidate-address h2 {
              font-size: 20px;
            }

            .candidate-address p {
              font-size: 15px;
            }

            .candidate-dl {
              padding: 5px 46px 0px 50px;
            }

            .candidate-languages {
              padding: 5px 46px 10px 50px;
            }
            .candidate-languages h2 {
              font-size: 20px;
            }
            .candidate-languages p {
              font-size: 15px;
            }
            .candidate-pharmacoth {
              padding: 5px 46px 10px 50px;
            }
            .candidate-pharmacoth h2 {
              font-size: 20px;
            }
            .candidate-computer {
              padding: 5px 46px 10px 50px;
            }
            .candidate-computer h2 {
              font-size: 20px;
            }

            .main {
              padding: 80px 50px 60px;
            }

            .main-education h2 {
              font-size: 23px;
            }
            .main-experiences h2 {
              font-size: 23px;
            }
            .main-honor-awards h2 {
              font-size: 23px;
            }

            .main-honor-courses h2 {
              font-size: 18px;
            }

            .sidebar {
              height: 100%;
              width: 350px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Resume;
