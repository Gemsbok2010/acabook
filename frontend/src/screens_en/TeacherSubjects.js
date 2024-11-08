import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { useSelector } from "react-redux";
import { ReactSession } from "react-client-session";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { ThreeDots } from "react-loader-spinner";

const TeacherSubjects = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.value);
  ReactSession.setStoreType("sessionStorage");
  const [readyToShow, setReadyToShow] = useState(false);
  const [page, setPage] = useState([]);
  const [maxPage, setMaxPage] = useState([]);
  const [total, setTotal] = useState([]);
  const [sort, setSort] = useState(-1);
  const [display, setDisplay] = useState([]);

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/courses/search?page=${page <= 0 ? 0 : page - 1}` +
        "&sortBy=" +
        sort +
        "&page=" +
        page +
        "&nanoId=" +
        user.nanoId
    );

    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTotal(data.total);
    setListofCourses(data.courses);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/courses/search?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&sortBy=" +
        sort +
        "&page=" +
        page +
        "&nanoId=" +
        user.nanoId
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTotal(data.total);
    setListofCourses(data.courses);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  // ========= PAGE INTERMEDIATE BUTTONS ==========
  const circles = [];

  for (let v = 0; v < maxPage; v++) {
    circles.push(v);
  }

  const IntermediateButtons = async (id) => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/courses/search?page=${id + 1}` +
        "&sortBy=" +
        sort +
        "&page=" +
        page +
        "&nanoId=" +
        user.nanoId
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTotal(data.total);

    setListofCourses(data.courses);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
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

  // ============= POPULATE SESSION DATA =================
  // ============ PROFILE DATA ===========
  const [residence, setResidence] = useState("");

  useEffect(() => {
    setCategory(ReactSession.get("category"));
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
          }
        });
    };
    fetchData();
  }, []);

  // ========== SELECT CATEGORY ================
  const [category, setCategory] = useState("");
  const [, setActive] = useState("");

  const handleActive = (e) => {
    setActive(!e.target.removeAttribute("active"));
    setActive(e.target.setAttribute("class", "active"));
  };

  // ========== POST ================
  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("category", category);
    navigate("/selectsubjects/en");
  };
  // ============== BACKDROP ============== //
  const [backdrop, setBackdrop] = useState(false);
  const [listofCourses, setListofCourses] = useState([]);

  // ============= GET SEARCH FILTER ===============
  // ============= INITAL LOAD ===============
  useEffect(() => {
    let isCancelled = false;
    setReadyToShow(false);
    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/courses/search?nanoId=" +
          user.nanoId
      );
      const data = await res.json();

      setListofCourses(data.courses);
      setTotal(data.total);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setDisplay(data.display);
      setReadyToShow(true);
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

  // ============= PAUSE/ DISPLAY LOAD ===============
  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/courses/search?nanoId=" +
          user.nanoId
      );
      const data = await res.json();

      setListofCourses(data.courses);
      setTotal(data.total);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setDisplay(data.display);
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
  }, [display, listofCourses]);

  // ============= PAUSE SUBJECT ===============

  const sleepAd = async (e, id) => {
    e.preventDefault();

    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + `api/courses/sleepCourse/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ pauseSubject: false }),
      }
    );
    const data = await res.json();
    if (data) {
      setDisplay(data.display);
      setTotal(data.total);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setBackdrop(false);
    }
  };

  const activeAd = async (e, id) => {
    e.preventDefault();

    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + `api/courses/sleepCourse/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ pauseSubject: true }),
      }
    );
    const data = await res.json();

    if (data) {
      setDisplay(data.display);
      setTotal(data.total);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setBackdrop(false);
    }
  };

  // ============== DELETE SUBJECT ============== //
  const onDelete = async (e, id) => {
    e.preventDefault();

    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + `api/courses/deleteSubject/${id}?`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();

    if (data) {
      setDisplay(data.display);
      setBackdrop(false);
    }
  };
  // ============== LOADING ============== //
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
          <title>Add Subject | Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>
        <LoggedInNavbar />
        {backdrop ? (
          <div className="backdrop">
            <ThreeDots
              type="ThreeDots"
              height={40}
              width={80}
              color={"white"}
            />
          </div>
        ) : (
          ""
        )}
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
                <div>
                  <Link style={{ color: "#a5ce0f" }} to="#">
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
                    Category:{" "}
                    {ReactSession.get("category")
                      ? ReactSession.get("category")
                      : "Please select"}
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
                <h2>Select Categories</h2>
                <div className="btnGroup">
                  {ReactSession.get("category") === "University" ? (
                    <button
                      onClick={(e) => {
                        setCategory(e.currentTarget.innerText);
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
                        setCategory(e.currentTarget.innerText);
                        handleActive(e);
                      }}
                      type="submit"
                    >
                      University
                    </button>
                  )}

                  {ReactSession.get("category") === "School" ? (
                    <button
                      onClick={(e) => {
                        setCategory(e.currentTarget.innerText);
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
                        setCategory(e.currentTarget.innerText);
                        handleActive(e);
                      }}
                      type="submit"
                    >
                      School
                    </button>
                  )}

                  {ReactSession.get("category") === "Languages" ? (
                    <button
                      onClick={(e) => {
                        setCategory(e.currentTarget.innerText);
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
                        setCategory(e.currentTarget.innerText);
                        handleActive(e);
                      }}
                      type="submit"
                    >
                      Languages
                    </button>
                  )}
                  {residence !== "Australia" ? (
                    ReactSession.get("category") === "Musical" ? (
                      <button
                        onClick={(e) => {
                          setCategory(e.currentTarget.innerText);
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
                          setCategory(e.currentTarget.innerText);
                          handleActive(e);
                        }}
                        type="submit"
                      >
                        Musical
                      </button>
                    )
                  ) : (
                    ""
                  )}
                  {residence !== "Australia" ? (
                    ReactSession.get("category") === "Other" ? (
                      <button
                        onClick={(e) => {
                          setCategory(e.currentTarget.innerText);
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
                          setCategory(e.currentTarget.innerText);
                          handleActive(e);
                        }}
                        type="submit"
                      >
                        Other
                      </button>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </section>
            </form>
          </div>
          <section className="listOfSubjects">
            {total === 0 ? (
              <p>No Subjects</p>
            ) : total > 1 ? (
              <p>
                I can tutor <span style={{ fontSize: "23px" }}>{total}</span>{" "}
                Subjects
              </p>
            ) : (
              <p>
                I can tutor <span style={{ fontSize: "23px" }}>{total}</span>{" "}
                Subject
              </p>
            )}
            <div className="wrapper-ads">
              {listofCourses.map((course) => {
                return (
                  <div className="ads" key={course._id}>
                    <div
                      className="rightmessage"
                      style={{
                        borderTop:
                          course.category === "University"
                            ? "5px solid #54c8e8"
                            : course.category === "School"
                            ? "5px solid #a5ce0f"
                            : course.category === "Standard"
                            ? "5px solid deeppink"
                            : course.category === "Languages"
                            ? "5px solid #ffa500"
                            : "5px solid #a020f0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
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

                          {course.zoom === false ? (
                            <figure
                              style={{ display: "inline", marginLeft: "5px" }}
                            >
                              <img
                                src={"/images/housemarker.png"}
                                alt=""
                                width={25}
                              />
                            </figure>
                          ) : (
                            <figure
                              style={{ display: "inline", marginLeft: "5px" }}
                            >
                              <img
                                src={"/images/online.png"}
                                alt=""
                                width={25}
                              />
                            </figure>
                          )}
                          {course.pauseSubject === true && (
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
                        <div>
                          {course.trial === true && (
                            <>
                              <span className="trial-accepted">
                                Trial accepted
                              </span>
                              <span className="trial-accepted">
                                {course.trial_rate === ""
                                  ? "Trial free"
                                  : `AUD ${course.trial_rate} ph`}
                              </span>
                            </>
                          )}
                          {course.zoom_rate !== "" && (
                            <span className="my-rate">
                              {`AUD ${course.zoom_rate} ph`}
                            </span>
                          )}
                          {course.onsite_rate !== "" && (
                            <span className="my-rate">
                              {`AUD ${course.onsite_rate} ph`}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "60% 40%",
                        }}
                      >
                        <p>{course.description}</p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <button className="edit">
                            <ExternalLink
                              href={
                                process.env.REACT_APP_BACKEND_URL +
                                `api/courses/edit/${course._id}`
                              }
                              target="_self"
                            >
                              Edit
                            </ExternalLink>
                          </button>
                          {course.pauseSubject === false ? (
                            <button
                              className="pause"
                              onClick={(e) => {
                                activeAd(e, course._id);
                              }}
                            >
                              Pause{" "}
                              <figure
                                style={{
                                  display: "inline",
                                }}
                              >
                                <img
                                  style={{
                                    width: "19px",
                                    transform: "translateY(-2px)",
                                  }}
                                  src="/images/pause.png"
                                  alt="Acabook LOGO"
                                />
                              </figure>
                            </button>
                          ) : (
                            <button
                              className="display"
                              onClick={(e) => {
                                sleepAd(e, course._id);
                              }}
                            >
                              Display
                              <figure
                                style={{
                                  display: "inline",
                                }}
                              >
                                <img
                                  style={{
                                    width: "23px",
                                    transform: "translateY(-2px)",
                                  }}
                                  src="/images/play.png"
                                  alt="Acabook LOGO"
                                />
                              </figure>
                            </button>
                          )}

                          <button
                            onClick={(e) => {
                              onDelete(e, course._id);
                            }}
                            className="delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="buttonSegment">
              <nav className="paginate">
                <ul>
                  {maxPage >= 2 ? (
                    page > 1 ? (
                      <li
                        key={1}
                        className="previous"
                        onClick={pagePrevious}
                      ></li>
                    ) : (
                      <li
                        style={{ opacity: "0.2", cursor: "default" }}
                        className="previous"
                        key={2}
                      ></li>
                    )
                  ) : (
                    <span></span>
                  )}
                  {circles.map((circle) => {
                    return (
                      <li
                        key={circle}
                        className={page === circle + 1 ? "active" : ""}
                        onClick={() => IntermediateButtons(circle)}
                      >
                        {circle + 1}
                      </li>
                    );
                  })}

                  {maxPage >= 2 ? (
                    page < maxPage ? (
                      <li key={1} className="next" onClick={pageNext}></li>
                    ) : (
                      <li
                        style={{ opacity: "0.2", cursor: "default" }}
                        className="next"
                        key={2}
                      ></li>
                    )
                  ) : (
                    <span></span>
                  )}
                </ul>
              </nav>
            </div>
          </section>

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
            .wrap .buttonCard {
              width: 450px;
              margin: 25px 15px;
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

          /* ============== QUESTION CARD ============ */
          .wrap .questionCard {
            width: 420px;
            margin: 70px auto 0px;
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

          form .active,
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

          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
              margin-top: 0;
            }
          }

          /* ============ PAGINATION ON BOTTOM ========== */
          .buttonSegment {
            display: block;
            width: 100%;
            padding-bottom: 15px;
          }

          .paginate {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            border: none;
            z-index: 500;
            margin: 22px auto;
            background-color: transparent;
          }
          .paginate ul li,
          .paginate ul li a {
            width: 35px;
            height: 35px;
            background-color: #fff;
            color: #2b2b2b;
            font-weight: 700;
            float: left;
            border-radius: 50%;
            line-height: 35px;
            text-align: center;
            margin: 0px 10px;
            list-style-type: none;
            cursor: pointer;
          }
          .paginate .active {
            background-color: #2b2b2b;
            color: #fff;
          }

          .paginate .next {
            background-image: url(./../../images/arrow-down.png);
            background-position: center;
            background-repeat: no-repeat;
            background-size: 15px;
            background-color: #fff;
            transform: rotate(-90deg);
          }
          .paginate .previous {
            background-image: url(./../../images/left.png);
            background-position: center;
            background-repeat: no-repeat;
            background-size: 15px;
            background-color: #fff;
          }

          .pagination ul li:hover {
            cursor: pointer;
          }
          @media screen and (max-width: 768px) {
            .buttonSegment {
              display: block;
            }
          }

          /* ============= LIST OF SUBJECTS ============= */
          .wrap .listOfSubjects {
            background-color: #f4f5f6;
            width: 100%;
            padding: 2px 200px;
          }

          .wrapper-ads .ads {
            height: 121px;
            width: 100%;
            border-radius: 0px;
            border: none;
            margin: 15px 10px 10px 0px;
            position: relative;
            overflow: hidden;
          }

          .trial-accepted {
            background-color: #54c8e8;
            color: white;
            border-radius: 4px;
            padding: 2px 8px;
            font-size: 15px;
            font-weight: 400;
            height: 25px;
            line-height: 21px;
            margin-right: 5px;
          }

          .my-rate {
            background-color: #a5ce0f;
            color: white;
            border-radius: 4px;
            padding: 2px 8px;
            font-size: 15px;
            font-weight: 400;
            height: 25px;
            line-height: 21px;
            margin-left: 5px;
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
          .wrapper-ads .rightmessage {
            margin-left: 0px;
            cursor: pointer;
            position: relative;
            padding: 10px 15px;
            display: block;
            margin-right: 15px;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            background-color: white;
            border-bottom: 1px solid #777;
          }
          .wrapper-ads .ads:hover {
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .wrapper-ads .rightmessage h2 {
            font-size: 18px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 600;
            color: #2b2b2b;
          }

          .rightmessage h3 {
            font-size: 14px;
            font-family: "Noto Sans TC", sans-serif;
            color: #2b2b2b;
            font-weight: 800;
            margin: 15px 0px;
          }
          .rightmessage p {
            font-size: 14px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 100;
            color: #2b2b2b;
            margin: 5px 0px;
          }

          .rightmessage .delete,
          .rightmessage .edit {
            width: 115px;
            height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            line-height: 38px;
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
            padding: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
          }

          .rightmessage .edit a {
            color: #484848;
            font-weight: 300;
            display: block;
            width: 100%;
            height: 100%;
          }

          .rightmessage .pause {
            background-color: #e40000;
            border: 1px solid #e40000;
            font-weight: 800;
            width: 115px;
            height: 40px;
            line-height: 38px;
            text-align: center;
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
            display: block;
            color: white;
            padding: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
          }
          .rightmessage .display {
            background-color: #a5ce0f;
            border: 1px solid #a5ce0f;
            font-weight: 800;
            width: 115px;
            height: 40px;
            line-height: 38px;
            text-align: center;
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
            display: block;
            color: white;
            padding: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
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
          @media screen and (max-width: 768px) {
            .wrap .listOfSubjects {
              padding: 2px 0px;
            }
            .trial-accepted {
              padding: 1px 4px;
              font-size: 12px;
              height: 20px;
              line-height: 18px;
            }

            .my-rate {
              padding: 1px 4px;
              font-size: 12px;
              height: 20px;
              line-height: 18px;
              margin-left: 5px;
            }
            .rightmessage .display,
            .rightmessage .pause,
            .rightmessage .edit {
              width: 80px;
              height: 32px;
              line-height: 30px;
              font-size: 12px;
            }
            .rightmessage .delete {
              display: none;
            }
            .highlight_language,
            .highlight_school,
            .highlight_university,
            .highlight_standard,
            .highlight_music {
              height: 20px;
              line-height: 18px;
              padding: 1px 4px;
              font-size: 12px;
            }
            .rightmessage p {
              font-size: 12px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default TeacherSubjects;
