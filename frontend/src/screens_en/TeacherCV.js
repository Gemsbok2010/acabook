import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { ThreeDots } from "react-loader-spinner";
import { ExternalLink } from "react-external-link";
import { useSelector } from "react-redux";
import { ReactSession } from "react-client-session";

const TeacherCV = () => {
  const user = useSelector((state) => state.userInfo.value);
  ReactSession.setStoreType("sessionStorage");
  const [userInfo, setUserInfo] = useState("");
  const [workhistory, setWorkhistory] = useState("");
  const [resume, setResume] = useState("");
  const [honourTitle, setHonourTitle] = useState("");
  const [honourAwards, setHonourAwards] = useState("");
  const [education, setEducation] = useState("Education (Max. 3 Degrees)");
  const [degree1, setDegree1] = useState("");
  const [university1, setUniversity1] = useState("");
  const [start1, setStart1] = useState("");
  const [finish1, setFinish1] = useState("");
  const [degree2, setDegree2] = useState("");
  const [university2, setUniversity2] = useState("");
  const [start2, setStart2] = useState("");
  const [finish2, setFinish2] = useState("");
  const [degree3, setDegree3] = useState("");
  const [university3, setUniversity3] = useState("");
  const [start3, setStart3] = useState("");
  const [finish3, setFinish3] = useState("");
  const [readyToShow, setReadyToShow] = useState(false);
  const [isloading, setIsloading] = useState(false);

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

  // ================ 語言 ==================
  const [languages, setLanguages] = useState("");
  const [linguistics, setLinguistics] = useState({});

  const [test, setTest] = useState([]);
  const [testo, setTesto] = useState([]);
  const [langName, setLangName] = useState("");
  const [, setLangValue] = useState("");
  const [, setLevelValue] = useState("");
  const [globalIndex, setGlobalIndex] = useState("");
  const [levelIndex, setLevelIndex] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [langdropdown, setLangdropdown] = useState(false);
  const [langlevel, setLanglevel] = useState(false);
  const [row, setRow] = useState([]);

  const circles = [];
  const circlo = [];

  for (let v = 0; v < row.length; v++) {
    circles.push(test[v]);
    circlo.push(testo[v]);
  }

  // Add Row
  const handleAdd = (e) => {
    e.preventDefault();
    const abc = [...row, []];
    // Limite maxiumum 3 languages
    abc.splice(3, 1);
    setRow(abc);
    setGlobalIndex(-1);
    setActiveButton(-1);
  };

  const handleChange = (onChangeValue, index) => {
    const inputdata = [...row];
    inputdata[index] = onChangeValue.target.value;
    setRow(inputdata);
    setGlobalIndex(index);
  };

  // click event
  const chooseLanguage = (e, index) => {
    const innerHTML = e.target.innerHTML;

    setGlobalIndex(-1);
    setLangValue(innerHTML);
    setLinguistics({ ...linguistics, [langName]: innerHTML });

    const inputarr = [...test];
    inputarr[index] = innerHTML;
    setTest([...inputarr]);
  };

  const chooseLanguageLvl = (e, index) => {
    const innerHTML = e.target.innerHTML;

    setLevelIndex(-1);
    setActiveButton(index);
    setLevelValue(innerHTML);
    const languageLvl = `languageLvl${index}`;
    setLinguistics({ ...linguistics, [languageLvl]: innerHTML });

    const levelarr = [...testo];
    levelarr[index] = innerHTML;
    setTesto([...levelarr]);
  };

  // choose language
  const handleLanguage = (e) => {
    const name = e.target.name;
    setLinguistics({ ...linguistics, [name]: "" });
    setLangName(name);
  };

  const handleLanguageLvl = (e) => {
    const name = e.target.name;
    setLevelValue(name);
    setLinguistics({ ...linguistics, [name]: "" });
  };

  // Delete Row
  const handleDelete = (e, i, arr) => {
    e.preventDefault();
    const maxRow = row.length;
    setActiveButton(maxRow - 2);
    const deleteVal = [...arr];
    deleteVal.splice(i, 1);
    setRow(deleteVal);

    const inputarr = [...test];
    inputarr.splice(i, 1);
    setTest([...inputarr]);

    const levelarr = [...testo];
    levelarr.splice(i, 1);
    setTesto([...levelarr]);

    delete linguistics[`whichlanguage${i}`];
    delete linguistics[`languageLvl${i}`];

    if (i + 1 < row.length) {
      let num = row.length - i - 1;
      const newK = linguistics[`whichlanguage${i + num}`];
      const newL = linguistics[`languageLvl${i + num}`];
      delete linguistics[`whichlanguage${i + num}`];
      delete linguistics[`languageLvl${i + num}`];
      setLinguistics({
        ...linguistics,
        [`whichlanguage${i}`]: newK,
        [`languageLvl${i}`]: newL,
      });
    }

    setGlobalIndex(-1);
  };

  const [talen] = useState([
    { title: "國語 中文 - Mandarin Chinese", id: 1 },
    { title: "台語 閩南語 - Taiwanese", id: 2 },
    { title: "粵語 廣東話 - Cantonese", id: 3 },
    { title: "阿拉伯語 - Arabic", id: 4 },
    { title: "荷蘭語 - Dutch", id: 5 },
    { title: "英語 - English", id: 6 },
    { title: "法語 - French", id: 7 },
    { title: "德語 - German", id: 8 },
    { title: "希臘語 - Greek", id: 9 },
    { title: "印尼語 - Indonesian", id: 10 },
    { title: "義大利語 - Italian", id: 11 },
    { title: "日語 - Japanese", id: 12 },
    { title: "韓語 - Korean", id: 13 },
    { title: "波斯語 - Persian", id: 14 },
    { title: "波蘭語 - Polish", id: 15 },
    { title: "葡萄牙語 - Portuguese", id: 16 },
    { title: "俄語 - Russian", id: 17 },
    { title: "西班牙語 - Spanish", id: 18 },
    { title: "泰語 - Thai", id: 19 },
    { title: "土耳其語 - Turkish", id: 20 },
    { title: "越南語 - Vietnamese", id: 21 },
  ]);

  useEffect(() => {
    setReadyToShow(false);
    // ============ PROFILE DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/intlteachers/profile/" +
          user.email
      )
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
          setResume(response.data.resume);
          setWorkhistory(response.data.workhistory);
          setHonourTitle(response.data.honourTitle);
          setHonourAwards(response.data.honourAwards);
          setEducation(response.data.education);
          setDegree1(response.data.degree1);
          setDegree2(response.data.degree2);
          setDegree3(response.data.degree3);
          setUniversity1(response.data.university1);
          setUniversity2(response.data.university2);
          setUniversity3(response.data.university3);
          setStart1(response.data.start1);
          setStart2(response.data.start2);
          setStart3(response.data.start3);
          setFinish1(response.data.finish1);
          setFinish2(response.data.finish2);
          setFinish3(response.data.finish3);
          setLanguages(response.data.languages);
          setRow(response.data.row);
          setActiveButton(response.data.activeButton);
          setLinguistics({
            ...linguistics,
            whichlanguage0: response.data.whichlanguage0_en,
            whichlanguage1: response.data.whichlanguage1_en,
            whichlanguage2: response.data.whichlanguage2_en,
            languageLvl0: response.data.languageLvl0,
            languageLvl1: response.data.languageLvl1,
            languageLvl2: response.data.languageLvl2,
          });
          setReadyToShow(true);
        }
      });
  }, []);

  // ============ HIGHLIGHT ADDRESS SEARCH FIELD ==========
  var has_focus = false;

  $("#languages").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#workhistory").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#honourTitle").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#education").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });

  $("#languages").blur(function (e) {
    has_focus = false;
  });
  $("#workhistory").blur(function (e) {
    has_focus = false;
  });
  $("#honourTitle").blur(function (e) {
    has_focus = false;
  });
  $("#education").blur(function (e) {
    has_focus = false;
  });

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    let taal0;
    let taal1;
    let taal2;
    let taal0_en;
    let taal1_en;
    let taal2_en;
    if (linguistics.whichlanguage0) {
      taal0 = linguistics.whichlanguage0.split(" - ")[0];
      taal0_en = linguistics.whichlanguage0.split(" - ")[1];
    }
    if (linguistics.whichlanguage1) {
      taal1 = linguistics.whichlanguage1.split(" - ")[0];
      taal1_en = linguistics.whichlanguage1.split(" - ")[1];
    }
    if (linguistics.whichlanguage2) {
      taal2 = linguistics.whichlanguage2.split(" - ")[0];
      taal2_en = linguistics.whichlanguage2.split(" - ")[1];
    }

    fetch(process.env.REACT_APP_BACKEND_URL + "api/intlteachers/updateCv", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: userInfo._id,
        nanoId: userInfo.nanoId,
        gender: userInfo.gender,
        row: row,
        activeButton: activeButton,
        education: education,
        degree1: degree1,
        university1: university1,
        start1: start1,
        finish1: finish1,
        degree2: degree2,
        university2: university2,
        start2: start2,
        finish2: finish2,
        degree3: degree3,
        university3: university3,
        start3: start3,
        finish3: finish3,
        languages: languages,
        whichlanguage0: linguistics.whichlanguage0 ? taal0 : "",
        whichlanguage1: linguistics.whichlanguage1 ? taal1 : "",
        whichlanguage2: linguistics.whichlanguage2 ? taal2 : "",
        whichlanguage0_en: linguistics.whichlanguage0 ? taal0_en : "",
        whichlanguage1_en: linguistics.whichlanguage1 ? taal1_en : "",
        whichlanguage2_en: linguistics.whichlanguage2 ? taal2_en : "",
        languageLvl0: linguistics.languageLvl0 ? linguistics.languageLvl0 : "",
        languageLvl1: linguistics.languageLvl1 ? linguistics.languageLvl1 : "",
        languageLvl2: linguistics.languageLvl2 ? linguistics.languageLvl2 : "",
        workhistory: workhistory,
        resume: resume,
        honourAwards: honourAwards,
        honourTitle: honourTitle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateNote(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setIsloading(false);
        setTimeout(function () {
          setUpdateNote(false);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // ============= POPULATE SESSION DATA =================
  const [listOfMusic, setListOfMusic] = useState([]);
  const [listOfLanguage, setListOfLanguage] = useState([]);
  const [listOfUniversity, setListOfUniversity] = useState([]);
  const [listOfStandard, setListOfStandard] = useState([]);
  const [listOfSchool, setListOfSchool] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "api/intlteachers/listOfSubjects"
      );
      const data = await res.json();
      if (isCancelled === false) {
        setListOfUniversity(data.university);
        setListOfLanguage(data.language);
        setListOfMusic(data.music);
        setListOfStandard(data.standard);
        setListOfSchool(data.school);
      }
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
          <title>Tutor Experiences | Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>
        <LoggedInNavbar />
        <div className="personal_details">
          <Link to="/dashboard/en">Back to my Dashboard</Link>
          <h2>My Experiences</h2>
        </div>
        <div className="wrap">
          <div className="divider">
            <div className="personContent">
              <div className="threeItem">
                <div onClick={clearSubject}>
                  <Link to="/teacher_profile/en"> My Tutor Profile</Link>
                </div>
                <div onClick={clearSubject}>
                  <Link style={{ color: "#a5ce0f" }} to="#">
                    My Experiences
                  </Link>
                </div>
                <div onClick={clearSubject}>
                  <Link to="/mysubjects/en"> Add Subjects</Link>
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
              <section className="questionCard container-fluid">
                <div className="container-fluid regCon">
                  <div className="errorMessageHere">
                    {updateNote && (
                      <section className="updateNote container-fluid">
                        <div className="container-fluid ">
                          <img src="/images/tick.png" width="12px" alt="" />
                          <span>Updated successfully.</span>
                        </div>
                      </section>
                    )}
                  </div>
                  <h2>My Experiences</h2>
                  <div className="form-group">
                    <span className="pencil"></span>
                    <input
                      type="text"
                      id="workhistory"
                      autoComplete="off"
                      value={workhistory}
                      onChange={(e) => setWorkhistory(e.target.value)}
                      onBlur={() =>
                        workhistory === ""
                          ? setWorkhistory(userInfo.workhistory)
                          : workhistory
                      }
                    />
                    <div className="workhistory">
                      <textarea
                        id="resume"
                        cols="90"
                        rows="10"
                        autoComplete="off"
                        value={resume}
                        onChange={(e) => {
                          setResume(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <span className="pencil"></span>
                      <input
                        type="text"
                        id="honourTitle"
                        autoComplete="off"
                        onChange={(e) => setHonourTitle(e.target.value)}
                        onBlur={() =>
                          honourTitle === ""
                            ? setHonourTitle(userInfo.honourTitle)
                            : honourTitle
                        }
                        value={honourTitle}
                      />
                      <div className="honour-awards">
                        <textarea
                          id="honourAwards"
                          cols="90"
                          rows="10"
                          autoComplete="off"
                          value={honourAwards}
                          onChange={(e) => {
                            setHonourAwards(e.target.value);
                          }}
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group">
                      <span className="pencil"></span>
                      <input
                        autoComplete="off"
                        type="text"
                        id="education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        onBlur={() =>
                          education === ""
                            ? setEducation(userInfo.education)
                            : education
                        }
                      />

                      <div className="education">
                        <div className="row">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="degree1"
                              type="text"
                              placeholder="Eg: Statistics"
                              value={degree1}
                              onChange={(e) => setDegree1(e.target.value)}
                            />
                            <label htmlFor="education1"></label>
                          </div>
                          <div className="container2">
                            <input
                              autoComplete="off"
                              id="university1"
                              type="text"
                              placeholder="Eg: University of Melbourne"
                              value={university1}
                              onChange={(e) => setUniversity1(e.target.value)}
                            />
                            <label htmlFor="education1"></label>
                          </div>
                          <div className="container3">
                            <input
                              autoComplete="off"
                              id="start1"
                              type="text"
                              placeholder="From"
                              maxLength={4}
                              value={start1}
                              onChange={(e) => setStart1(e.target.value)}
                            />
                          </div>
                          <div className="container4">
                            <input
                              autoComplete="off"
                              id="finish1"
                              type="text"
                              placeholder="To Year"
                              maxLength={4}
                              value={finish1}
                              onChange={(e) => setFinish1(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="education">
                        <div className="row">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="degree2"
                              type="text"
                              placeholder="Eg: Statistics"
                              value={degree2}
                              onChange={(e) => setDegree2(e.target.value)}
                            />
                            <label htmlFor="education2"></label>
                          </div>
                          <div className="container2">
                            <input
                              autoComplete="off"
                              id="university2"
                              type="text"
                              placeholder="Eg: University of Melbourne"
                              value={university2}
                              onChange={(e) => setUniversity2(e.target.value)}
                            />
                            <label htmlFor="education2"></label>
                          </div>
                          <div className="container3">
                            <input
                              autoComplete="off"
                              id="start2"
                              type="text"
                              placeholder="From"
                              maxLength={4}
                              value={start2}
                              onChange={(e) => setStart2(e.target.value)}
                            />
                          </div>
                          <div className="container4">
                            <input
                              autoComplete="off"
                              id="finish2"
                              type="text"
                              placeholder="To Year"
                              maxLength={4}
                              value={finish2}
                              onChange={(e) => setFinish2(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="education">
                        <div className="row">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="degree3"
                              type="text"
                              placeholder="Eg: Statistics"
                              value={degree3}
                              onChange={(e) => setDegree3(e.target.value)}
                            />
                            <label htmlFor="education3"></label>
                          </div>
                          <div className="container2">
                            <input
                              autoComplete="off"
                              id="university3"
                              type="text"
                              placeholder="Eg: University of Melbourne"
                              value={university3}
                              onChange={(e) => setUniversity3(e.target.value)}
                            />
                            <label htmlFor="education3"></label>
                          </div>
                          <div className="container3">
                            <input
                              autoComplete="off"
                              id="start3"
                              type="text"
                              placeholder="From"
                              maxLength={4}
                              value={start3}
                              onChange={(e) => setStart3(e.target.value)}
                            />
                          </div>
                          <div className="container4">
                            <input
                              autoComplete="off"
                              id="finish3"
                              type="text"
                              placeholder="To Year"
                              maxLength={4}
                              value={finish3}
                              onChange={(e) => setFinish3(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <span className="pencil"></span>
                      <input
                        type="text"
                        id="languages"
                        value={languages}
                        autoComplete="off"
                        onChange={(e) => {
                          setLanguages(e.target.value);
                        }}
                        onBlur={() =>
                          languages === ""
                            ? setLanguages(userInfo.languages)
                            : languages
                        }
                      />

                      <div className="languages">
                        {row.length > 0 ? (
                          ""
                        ) : (
                          <button
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#a5ce0f",
                              border: "#a5ce0f",
                              color: "#fff",
                              fontWeight: "800",
                              fontSize: "14px",
                              width: "125px",
                              outline: "none",
                              borderRadius: "4px",
                              height: "39px",
                              lineHeight: "39px",
                            }}
                            onClick={(e) => {
                              handleAdd(e);
                            }}
                          >
                            Add Language
                          </button>
                        )}
                        {row.map((data, i, arr) => {
                          return (
                            <div key={i}>
                              <div className="alignSkills">
                                <div className="container1">
                                  <input
                                    autoComplete="off"
                                    id={`language${i}`}
                                    type="text"
                                    placeholder="Language"
                                    name={`whichlanguage${i}`}
                                    value={
                                      linguistics
                                        ? linguistics[`whichlanguage${i}`]
                                        : ""
                                    }
                                    onSelect={handleLanguage}
                                    onClick={() => {
                                      setGlobalIndex(i);
                                      setLangdropdown(true);
                                      setLanglevel(false);
                                    }}
                                    onChange={(e) => {
                                      handleChange(e, i);
                                    }}
                                  />
                                  <label htmlFor={`language${i}`}></label>
                                  {globalIndex === i && langdropdown ? (
                                    <div className="language1">
                                      <ul>
                                        {talen.map((taal) => {
                                          return (
                                            taal.title !==
                                              linguistics["whichlanguage0"] &&
                                            taal.title !==
                                              linguistics["whichlanguage1"] &&
                                            taal.title !==
                                              linguistics["whichlanguage2"] && (
                                              <li
                                                key={taal.id}
                                                onClick={(e) => {
                                                  chooseLanguage(e, i);
                                                }}
                                              >
                                                {taal.title}
                                              </li>
                                            )
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="container2">
                                  <label htmlFor={`languageLevel${i}`}></label>
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    id={`languageLevel${i}`}
                                    name={`languageLvl${i}`}
                                    placeholder="Language Level"
                                    value={
                                      linguistics
                                        ? linguistics[`languageLvl${i}`]
                                        : ""
                                    }
                                    onSelect={handleLanguageLvl}
                                    onFocus={() => {
                                      setLevelIndex(i);
                                      setLangdropdown(false);
                                      setLanglevel(true);
                                    }}
                                    onChange={(e) => {
                                      handleLanguageLvl(e.target.name);
                                    }}
                                  />
                                  {levelIndex === i &&
                                  langlevel &&
                                  linguistics[`whichlanguage${i}`] !== "" ? (
                                    <div className="languageLevel1">
                                      <ul>
                                        <li
                                          onClick={(e) => {
                                            chooseLanguageLvl(e, i);
                                          }}
                                        >
                                          Beginners
                                        </li>
                                        <li
                                          onClick={(e) => {
                                            chooseLanguageLvl(e, i);
                                          }}
                                        >
                                          Intermediate
                                        </li>
                                        <li
                                          onClick={(e) => {
                                            chooseLanguageLvl(e, i);
                                          }}
                                        >
                                          Advanced or mother tongue
                                        </li>
                                      </ul>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <br />
                              {activeButton === i &&
                              linguistics[`whichlanguage${i}`] !== "" &&
                              linguistics[`languageLvl${i}`] !== "" ? (
                                activeButton === 2 ? (
                                  <button
                                    type="button"
                                    style={{
                                      color: "#888",
                                      backgroundColor: "#ddd",
                                      fontWeight: "800",
                                      fontSize: "14px",
                                      width: "125px",
                                      outline: "none",
                                      borderRadius: "4px",
                                      border: "#ddd",
                                      height: "39px",
                                      lineHeight: "39px",
                                      marginRight: "20px",
                                    }}
                                  >
                                    Add Language
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      cursor: "pointer",
                                      backgroundColor: "#a5ce0f",
                                      border: "#a5ce0f",
                                      color: "#fff",
                                      fontWeight: "800",
                                      fontSize: "14px",
                                      width: "125px",
                                      outline: "none",
                                      borderRadius: "4px",
                                      height: "39px",
                                      lineHeight: "39px",
                                      marginRight: "20px",
                                    }}
                                    onClick={(e) => {
                                      handleAdd(e);
                                    }}
                                  >
                                    Add Language
                                  </button>
                                )
                              ) : (
                                <button
                                  type="button"
                                  style={{
                                    color: "#888",
                                    backgroundColor: "#ddd",
                                    fontWeight: "800",
                                    fontSize: "14px",
                                    width: "125px",
                                    outline: "none",
                                    borderRadius: "4px",
                                    border: "#ddd",
                                    height: "39px",
                                    lineHeight: "39px",
                                    marginRight: "20px",
                                  }}
                                >
                                  Add Language
                                </button>
                              )}
                              <button
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: "#e40000",
                                  border: "#e40000",
                                  color: "#fff",
                                  fontWeight: "800",
                                  fontSize: "14px",
                                  outline: "none",
                                  borderRadius: "4px",
                                  height: "39px",
                                  lineHeight: "39px",
                                  width: "85px",
                                }}
                                onClick={(e) => handleDelete(e, i, arr)}
                              >
                                Remove
                              </button>
                            </div>
                          );
                        })}
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="buttonCard">
                {resume && workhistory ? (
                  activeButton === 0 ||
                  activeButton === 1 ||
                  activeButton === 2 ? (
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
                      <button type="submit" className="btn-save">
                        Update
                      </button>
                    )
                  ) : (
                    <input
                      type="button"
                      disabled
                      className="btn-save"
                      defaultValue="Update"
                    />
                  )
                ) : (
                  <input
                    type="button"
                    disabled
                    className="btn-save"
                    defaultValue="Update"
                  />
                )}
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

          /* ========== SUBMIT BUTTON ========= */
          .btn-vori {
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
            margin: 20px 0px 20px 0px;
            border: none;
          }

          .buttonCard .btn-vori {
            width: 200px;
            text-align: center;
            background-color: #a5ce0f;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
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
            .buttonCard .btn-vori {
              width: 100%;
            }
          }

          /* ============== NAVBAR POST-LOGIN ========== */
          nav {
            background-color: #fff;
            width: 100%;
            height: 85px;
            margin: 0 auto;
            padding: 0;
            border-bottom: 1px solid #ebebeb;
            position: relative;
          }

          .navbar-nav {
            float: right;
            position: absolute;
            display: block;
          }

          .navbar-nav ul {
            padding: 0;
            margin: 0;
          }

          .navbar-nav ul li {
            text-decoration: none;
            list-style: none;
          }

          .navbar-nav ul li a {
            font-weight: 800;
            font-size: 14px;
            color: #2b2b2b;
          }

          .nav-box {
            width: 35px;
            height: 35px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 90%;
            top: 50%;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
          }

          nav > figure > a {
            display: block;
          }
          nav h2 {
            font-weight: bold;
          }
          nav > figure {
            width: 200px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 10%;
            top: 50%;
          }
          .smallPhoto {
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: #eee;
            border: 2px solid white;
            cursor: pointer;
          }
          .smallPhoto img {
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
          @media only screen and (min-width: 768px) {
            .nav-box {
              left: 96%;
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

          /* ============== QUESTION CARD RESUME =========== */
          .wrap .questionCard {
            width: 920px;
            min-height: 80vh;
            padding: 30px 20px;
            margin: 20px 30px 0px 0px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 7px;
            background: #fff;
          }
          .wrap .questionCard h2 {
            font-weight: 800;
            font-size: 28px;
            width: 440px;
            margin-top: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .form-group .workhistory textarea {
            display: block;
            width: 100%;
            height: 500px;
            padding: 0.375rem 0.75rem;
            font-size: 16px;
            line-height: 1.5;
            color: #2b2b2b;
            font-weight: 500;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            outline: 0;
          }
          .form-group .honour-awards textarea {
            display: block;
            width: 100%;
            height: 200px;
            padding: 0.375rem 0.75rem;
            font-size: 16px;
            line-height: 1.5;
            color: #2b2b2b;
            font-weight: 500;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            outline: 0;
          }
          .regCon {
            width: 90% !important;
            padding: 20px 0;
          }
          .regCon h3 {
            margin-bottom: 20px;
          }

          #honourAwards {
            white-space: pre-wrap;
          }
          #resume {
            white-space: pre-wrap;
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

          .form-group .education input[type="text"] {
            width: 225px;
          }
          .form-group .education input[type="text"]:last-child {
            width: 110px;
          }

          .education .row {
            display: flex;
            justify-content: space-around;
          }

          .pencil {
            background-image: url("./../../images/pencil.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 26px;
          }

          .form-group span {
            height: 27px;
            width: 27px;
            display: inline-block;
          }

          .row label {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            left: 0%;
            font-family: sans-serif;
            font-size: 14px;
            color: #777;
            font-weight: 500;
            padding: 0px 0px;
            pointer-events: none;
            transition: all 300ms ease-in-out 0ms;
          }

          .questionCard .form-group h2 {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
          }

          .questionCard .form-group #honourTitle {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }
          .questionCard .form-group #workhistory {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .questionCard .form-group #education {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .languages .alignSkills {
            display: flex;
            justify-content: space-between;

            padding-right: 100px;
          }

          .questionCard .form-group #languages {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .container1,
          .container2,
          .container3,
          .container4 {
            position: relative;
          }

          .language1,
          .languageLevel1,
          .language2,
          .languageLevel2,
          .language3,
          .languageLevel3 {
            position: absolute;
            z-index: 2000;
            width: 100%;
            display: block;
            overflow: scroll;
            height: 200px;
          }

          .language1 ul,
          .languageLevel1 ul,
          .language2 ul,
          .languageLevel2 ul,
          .language3 ul,
          .languageLevel3 ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }

          .languageLevel1 ul li,
          .language1 ul li,
          .languageLevel2 ul li,
          .language2 ul li,
          .languageLevel3 ul li,
          .language3 ul li {
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

          .language1 ul li:hover,
          .language1 ul li:hover,
          .language1 ul li:hover,
          .languageLevel1 ul li:hover,
          .language2 ul li:hover,
          .languageLevel2 ul li:hover,
          .language3 ul li:hover,
          .languageLevel3 ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }

          /* ========== SUBMIT BUTTON ========= */
          form .btn-save {
            position: relative;
            background-color: #a5ce0f;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: 800;
            width: 100%;
            margin: 20px auto;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          form .btn-save:focus,
          form .btn-save:active {
            outline: none;
          }

          form .btn-save:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }
          @media only screen and (min-width: 768px) {
            form .btn-save {
              width: 200px;
            }
          }
          @media only screen and (min-width: 768px) {
            .btn-save {
              width: 200px;
            }
          }

          @media screen and (max-width: 768px) {
            .form-group .education input[type="text"] {
              width: 185px;
            }
            .form-group .education input[type="text"] {
              width: 185px;
            }
            .form-group .education input[type="text"]:last-child {
              width: 110px;
            }
            .wrap .questionCard {
              width: 450px;
              margin: 0px auto;
              display: block;
            }

            input[type="text"] {
              width: 170px;
              font-size: 13px;
            }

            .languages .alignSkills {
              padding: 0px;
            }

            #workhistory,
            #honourTitle,
            #languages {
              width: 265px;
            }

            form .btn-save {
              width: 100%;
            }
            .languageLevel1 ul li,
            .language1 ul li,
            .languageLevel2 ul li,
            .language2 ul li,
            .languageLevel3 ul li,
            .language3 ul li {
              font-size: 12px;
              width: 120%;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default TeacherCV;
