import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";

const Step2 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");
  const [country, setCountry] = useState("");
  const [workhistory, setWorkhistory] = useState("教學經驗");
  const [resume, setResume] = useState("");
  const [honourTitle, setHonourTitle] = useState("最有成就感的事情");
  const [honourAwards, setHonourAwards] = useState("");

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setCountry(ReactSession.get("teacher_country"));
    setActiveButton(ReactSession.get("activeButton"));

    if (!ReactSession.get("skillOne")) {
      setSkillOne("學校科目");
    } else {
      setSkillOne(ReactSession.get("skillOne"));
    }
    setSkillOne1(ReactSession.get("skillOne1"));
    setSkillOne2(ReactSession.get("skillOne2"));
    setSkillOne3(ReactSession.get("skillOne3"));
    setExperience({
      ...experience,
      skill1Level1: ReactSession.get("skillSchool1"),
      skill1Level2: ReactSession.get("skillSchool2"),
      skill1Level3: ReactSession.get("skillSchool3"),
    });

    if (!ReactSession.get("skillTwo")) {
      setSkillTwo("電腦");
    } else {
      setSkillTwo(ReactSession.get("skillTwo"));
    }
    setSkillTwo1(ReactSession.get("skillTwo1"));
    setSkillTwo2(ReactSession.get("skillTwo2"));
    setSkillTwo3(ReactSession.get("skillTwo3"));
    setComputer({
      ...computer,
      skill2Level1: ReactSession.get("skillComp1"),
      skill2Level2: ReactSession.get("skillComp2"),
      skill2Level3: ReactSession.get("skillComp3"),
    });

    if (!ReactSession.get("skillThree")) {
      setSkillThree("體育");
    } else {
      setSkillThree(ReactSession.get("skillThree"));
    }
    setSkillThree1(ReactSession.get("skillThree1"));
    setSkillThree2(ReactSession.get("skillThree2"));
    setSkillThree3(ReactSession.get("skillThree3"));
    setSport({
      ...sport,
      skill3Level1: ReactSession.get("skillSport1"),
      skill3Level2: ReactSession.get("skillSport2"),
      skill3Level3: ReactSession.get("skillSport3"),
    });

    if (!ReactSession.get("languages")) {
      setLanguages("語言");
    } else {
      setLanguages(ReactSession.get("languages"));
    }
    setLinguistics({
      ...linguistics,
      whichlanguage0: ReactSession.get("whichlanguage0"),
      whichlanguage1: ReactSession.get("whichlanguage1"),
      whichlanguage2: ReactSession.get("whichlanguage2"),
      languageLvl0: ReactSession.get("languageLvl0"),
      languageLvl1: ReactSession.get("languageLvl1"),
      languageLvl2: ReactSession.get("languageLvl2"),
    });

    if (!ReactSession.get("education")) {
      setEducation("學歷");
    } else {
      setEducation(ReactSession.get("education"));
    }
    if (!ReactSession.get("degree1")) {
      setDegree1("");
    } else {
      setDegree1(ReactSession.get("degree1"));
    }

    if (!ReactSession.get("degree2")) {
      setDegree2("");
    } else {
      setDegree2(ReactSession.get("degree2"));
    }
    if (!ReactSession.get("degree3")) {
      setDegree3("");
    } else {
      setDegree3(ReactSession.get("degree3"));
    }
    if (!ReactSession.get("university1")) {
      setUniversity1("");
    } else {
      setUniversity1(ReactSession.get("university1"));
    }

    if (!ReactSession.get("university2")) {
      setUniversity2("");
    } else {
      setUniversity2(ReactSession.get("university2"));
    }
    if (!ReactSession.get("university3")) {
      setUniversity3("");
    } else {
      setUniversity3(ReactSession.get("university3"));
    }
    if (!ReactSession.get("start1")) {
      setStart1("");
    } else {
      setStart1(ReactSession.get("start1"));
    }
    if (!ReactSession.get("start2")) {
      setStart2("");
    } else {
      setStart2(ReactSession.get("start2"));
    }
    if (!ReactSession.get("start3")) {
      setStart3("");
    } else {
      setStart3(ReactSession.get("start3"));
    }

    setFinish1(ReactSession.get("finish1"));
    if (!ReactSession.get("finish1")) {
      setFinish1("");
    } else {
      setFinish1(ReactSession.get("finish1"));
    }

    if (!ReactSession.get("finish2")) {
      setFinish2("");
    } else {
      setFinish2(ReactSession.get("finish2"));
    }

    if (!ReactSession.get("finish3")) {
      setFinish3("");
    } else {
      setFinish3(ReactSession.get("finish3"));
    }
    if (!ReactSession.get("workhistory")) {
      setWorkhistory("教學經驗");
    } else {
      setWorkhistory(ReactSession.get("workhistory"));
    }
    if (!ReactSession.get("resume")) {
      setResume("");
    } else {
      setResume(ReactSession.get("resume"));
    }

    if (!ReactSession.get("honourTitle")) {
      setHonourTitle("最有成就感的事情");
    } else {
      setHonourTitle(ReactSession.get("honourTitle"));
    }
    if (!ReactSession.get("honourAwards")) {
      setHonourAwards("");
    } else {
      setHonourAwards(ReactSession.get("honourAwards"));
    }
    if (!ReactSession.get("row")) {
      setRow([]);
    } else {
      setRow(ReactSession.get("row"));
    }
  }, []);

  // ============ HIGHLIGHT ADDRESS SEARCH FIELD ==========
  var has_focus = false;
  $("#skillOne").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#skillTwo").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#skillThree").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
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

  $("#skillOne").blur(function (e) {
    has_focus = false;
  });
  $("#skillTwo").blur(function (e) {
    has_focus = false;
  });
  $("#skillThree").blur(function (e) {
    has_focus = false;
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

  // =========== 技能一 例如:學校科目 ===============
  const [skillOne, setSkillOne] = useState("技能一 例如:學校科目");
  const [skillOne1, setSkillOne1] = useState("");
  const [skillOne2, setSkillOne2] = useState("");
  const [skillOne3, setSkillOne3] = useState("");
  const [seeSkill1Level1, setSeeSkill1Level1] = useState(false);
  const [seeSkill1Level2, setSeeSkill1Level2] = useState(false);
  const [seeSkill1Level3, setSeeSkill1Level3] = useState(false);
  const [experience, setExperience] = useState({});
  const [naam, setNaam] = useState("");
  const [ans, setAns] = useState("");

  const explvl = (e) => {
    const innerHTML = e.target.innerHTML;
    setSeeSkill1Level1(false);
    setSeeSkill1Level2(false);
    setSeeSkill1Level3(false);
    setAns(innerHTML);
    setExperience({ ...experience, [naam]: innerHTML });
  };

  const handleSkill = (e) => {
    const name = e.target.name;
    setNaam(name);
    setExperience({ ...experience, [name]: ans });
  };

  const deleteExp = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNaam("");
    setAns("");
    if (value === "") {
      setExperience({ ...experience, [name]: "" });
      setSeeSkill1Level1(false);
      setSeeSkill1Level2(false);
      setSeeSkill1Level3(false);
    }
  };

  // =========== 技能二 例如:電腦 ===============
  const [skillTwo, setSkillTwo] = useState("技能二 例如:電腦");
  const [skillTwo1, setSkillTwo1] = useState("");
  const [skillTwo2, setSkillTwo2] = useState("");
  const [skillTwo3, setSkillTwo3] = useState("");
  const [seeSkill2Level1, setSeeSkill2Level1] = useState(false);
  const [seeSkill2Level2, setSeeSkill2Level2] = useState(false);
  const [seeSkill2Level3, setSeeSkill2Level3] = useState(false);
  const [computer, setComputer] = useState({});
  const [com, setCom] = useState("");
  const [comValue, setComValue] = useState("");

  const complvl = (e) => {
    const innerHTML = e.target.innerHTML;
    setSeeSkill2Level1(false);
    setSeeSkill2Level2(false);
    setSeeSkill2Level3(false);
    setComValue(innerHTML);
    setComputer({ ...computer, [com]: innerHTML });
  };

  const handleComp = (e) => {
    const name = e.target.name;
    setCom(name);
    setComputer({ ...computer, [name]: comValue });
  };

  const deleteComp = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setComValue("");
    setCom("");
    if (value === "") {
      setComputer({ ...computer, [name]: "" });
      setSeeSkill2Level1(false);
      setSeeSkill2Level2(false);
      setSeeSkill2Level3(false);
    }
  };

  // =========== 技能三 例如:體育 ===============
  const [skillThree, setSkillThree] = useState("技能三 例如:體育");
  const [skillThree1, setSkillThree1] = useState("");
  const [skillThree2, setSkillThree2] = useState("");
  const [skillThree3, setSkillThree3] = useState("");
  const [seeSkill3Level1, setSeeSkill3Level1] = useState(false);
  const [seeSkill3Level2, setSeeSkill3Level2] = useState(false);
  const [seeSkill3Level3, setSeeSkill3Level3] = useState(false);
  const [sportName, setSportName] = useState("");
  const [sportValue, setSportValue] = useState("");
  const [sport, setSport] = useState({});

  const sportlvl = (e) => {
    const innerHTML = e.target.innerHTML;
    setSeeSkill3Level1(false);
    setSeeSkill3Level2(false);
    setSeeSkill3Level3(false);
    setSportValue(innerHTML);
    setSport({ ...sport, [sportName]: innerHTML });
  };

  const handleSport = (e) => {
    const name = e.target.name;
    setSportName(name);
    setSport({ ...sport, [name]: sportValue });
  };

  const deleteSport = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setSportValue("");
    setSportName("");
    if (value === "") {
      setSport({ ...sport, [name]: "" });
      setSeeSkill3Level1(false);
      setSeeSkill3Level2(false);
      setSeeSkill3Level3(false);
    }
  };

  // ===========教育 ===============
  const [education, setEducation] = useState("學歷(最多三個)");
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

  // ================ 語言 ==================
  const [languages, setLanguages] = useState("語言(最多三個)");
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
    { title: "Mandarin Chinese - 國語 中文", id: 1 },
    { title: "Arabic - 阿拉伯語", id: 2 },
    { title: "Cantonese - 粵語 廣東話", id: 3 },
    { title: "Dutch - 荷蘭語", id: 4 },
    { title: "English - 英語", id: 5 },
    { title: "French - 法語", id: 6 },
    { title: "German - 德語", id: 7 },
    { title: "Greek - 希臘語", id: 8 },
    { title: "Indonesian - 印尼語", id: 9 },
    { title: "Italian - 義大利語", id: 10 },
    { title: "Japanese - 日語", id: 11 },
    { title: "Korean - 韓語", id: 12 },
    { title: "Persian - 波斯語", id: 13 },
    { title: "Polish - 波蘭語", id: 14 },
    { title: "Portuguese - 葡萄牙語", id: 15 },
    { title: "Russian - 俄語", id: 16 },
    { title: "Spanish - 西班牙語", id: 17 },
    { title: "Taiwanese - 台語 閩南語", id: 18 },
    { title: "Thai - 泰語", id: 19 },
    { title: "Turkish - 土而其語", id: 20 },
    { title: "Vietnamese - 越南語", id: 21 },
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("resume", resume);
    ReactSession.set("workhistory", workhistory);
    ReactSession.set("honourTitle", honourTitle);
    ReactSession.set("honourAwards", honourAwards);
    ReactSession.set("education", education);
    ReactSession.set("degree1", degree1);
    ReactSession.set("degree2", degree2);
    ReactSession.set("degree3", degree3);
    ReactSession.set("university1", university1);
    ReactSession.set("university2", university2);
    ReactSession.set("university3", university3);
    ReactSession.set("start1", start1);
    ReactSession.set("start2", start2);
    ReactSession.set("start3", start3);
    ReactSession.set("finish1", finish1);
    ReactSession.set("finish2", finish2);
    ReactSession.set("finish3", finish3);
    ReactSession.set("skillOne", skillOne);
    ReactSession.set("skillOne1", skillOne1);
    ReactSession.set("skillOne2", skillOne2);
    ReactSession.set("skillOne3", skillOne3);
    ReactSession.set("skillSchool1", experience.skill1Level1);
    ReactSession.set("skillSchool2", experience.skill1Level2);
    ReactSession.set("skillSchool3", experience.skill1Level3);
    ReactSession.set("skillTwo", skillTwo);
    ReactSession.set("skillTwo1", skillTwo1);
    ReactSession.set("skillTwo2", skillTwo2);
    ReactSession.set("skillTwo3", skillTwo3);
    ReactSession.set("skillComp1", computer.skill2Level1);
    ReactSession.set("skillComp2", computer.skill2Level2);
    ReactSession.set("skillComp3", computer.skill2Level3);
    ReactSession.set("skillThree", skillThree);
    ReactSession.set("skillThree1", skillThree1);
    ReactSession.set("skillThree2", skillThree2);
    ReactSession.set("skillThree3", skillThree3);
    ReactSession.set("skillSport1", sport.skill3Level1);
    ReactSession.set("skillSport2", sport.skill3Level2);
    ReactSession.set("skillSport3", sport.skill3Level3);
    ReactSession.set("languages", languages);
    ReactSession.set("whichlanguage0", linguistics.whichlanguage0);
    ReactSession.set("whichlanguage1", linguistics.whichlanguage1);
    ReactSession.set("whichlanguage2", linguistics.whichlanguage2);
    ReactSession.set("languageLvl0", linguistics.languageLvl0);
    ReactSession.set("languageLvl1", linguistics.languageLvl1);
    ReactSession.set("languageLvl2", linguistics.languageLvl2);
    ReactSession.set("row", row);
    ReactSession.set("activeButton", activeButton);
    navigate("/step3");
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>註冊成為家教 第二步 | 愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>
        <LoggedInNavbar />
        <div className="personal_details">
          <Link to="/dashboard">返回帳戶中心</Link>
          <h2>註冊成為家教</h2>
        </div>
        <div className="wrap">
          <div className="Q1title">
            <ul className="stepNav threeWide">
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: ReactSession.get("teacher_street")
                      ? "pointer"
                      : "default",
                  }}
                  to={ReactSession.get("teacher_street") ? "/step1" : "#"}
                >
                  <span className="badge">1</span>
                  <span>個人資料</span>
                </Link>
              </li>
              <li>
                <Link className="active" style={{ fontWeight: "bold" }} to="#">
                  <span className="badge-highlight">2</span>
                  <span>教學經驗</span>
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: ReactSession.get("resume") ? "pointer" : "default",
                  }}
                  to={ReactSession.get("resume") ? "/step3" : "#"}
                >
                  <span className="badge">3</span>
                  <span>檢視履歷</span>
                </Link>
              </li>
              {/* <li>
                <Link style={{ fontWeight: "bold" }} to="#">
                  <span className="badge">4</span>
                  <span>上傳文件</span>
                </Link>
              </li> */}
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: "default",
                  }}
                  to={"#"}
                >
                  <span className="badge">4</span>
                  <span>完成</span>
                </Link>
              </li>
            </ul>
          </div>
          <form id="formTwo" onSubmit={onSubmit}>
            <div className="personContent">
              <section className="questionCard container-fluid">
                <div className="container-fluid regCon">
                  <h2>教學經驗</h2>
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
                          ? setWorkhistory("教學經驗")
                          : workhistory
                      }
                    />

                    <div className="workhistory">
                      <textarea
                        id="resume"
                        required
                        autoComplete="off"
                        cols="90"
                        rows="10"
                        value={resume}
                        onChange={(e) => {
                          setResume(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="pencil"></span>

                    <input
                      type="text"
                      id="honourTitle"
                      value={honourTitle}
                      autoComplete="off"
                      onChange={(e) => setHonourTitle(e.target.value)}
                      onBlur={() =>
                        honourTitle === ""
                          ? setHonourTitle("最有成就感的事情")
                          : honourTitle
                      }
                    />

                    <div className="honour-awards">
                      <textarea
                        id="honourAwards"
                        cols="90"
                        rows="10"
                        required
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
                          ? setEducation("學歷(最多三個)")
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
                            placeholder="例：數學系"
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
                            placeholder="例：交通大學"
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
                            placeholder="就讀年份"
                            value={start1}
                            onChange={(e) => setStart1(e.target.value)}
                            minLength="4"
                            maxLength="4"
                          />
                        </div>
                        <div className="container4">
                          <input
                            autoComplete="off"
                            id="finish1"
                            type="text"
                            placeholder="畢業年份"
                            value={finish1}
                            onChange={(e) => setFinish1(e.target.value)}
                            minLength="4"
                            maxLength="4"
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
                            placeholder="例：數學系"
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
                            placeholder="例：交通大學"
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
                            placeholder="就讀年份"
                            value={start2}
                            onChange={(e) => setStart2(e.target.value)}
                            minLength="4"
                            maxLength="4"
                          />
                        </div>
                        <div className="container4">
                          <input
                            autoComplete="off"
                            id="finish2"
                            type="text"
                            placeholder="畢業年份"
                            value={finish2}
                            onChange={(e) => setFinish2(e.target.value)}
                            minLength="4"
                            maxLength="4"
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
                            placeholder="例：數學系"
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
                            placeholder="例：交通大學"
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
                            placeholder="就讀年份"
                            value={start3}
                            minLength="4"
                            maxLength="4"
                            onChange={(e) => setStart3(e.target.value)}
                          />
                        </div>
                        <div className="container4">
                          <input
                            autoComplete="off"
                            id="finish3"
                            type="text"
                            placeholder="畢業年份"
                            value={finish3}
                            minLength="4"
                            maxLength="4"
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
                      id="skillOne"
                      value={skillOne}
                      autoComplete="off"
                      onChange={(e) => setSkillOne(e.target.value)}
                      onBlur={() =>
                        skillOne === ""
                          ? setSkillOne("技能一 例如:學校科目")
                          : skillOne
                      }
                    />
                    <div className="skillOne">
                      <div className="alignSkills">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="skillOne1"
                            name="skill1Level1"
                            type="text"
                            placeholder="例: 國文"
                            value={skillOne1}
                            onChange={(e) => {
                              setSkillOne1(e.target.value);
                              deleteExp(e);
                            }}
                          />
                          <label htmlFor="skillOne1"></label>
                        </div>
                        <div className="container2">
                          {skillOne1 ? (
                            <>
                              <label htmlFor="skill1Level1"></label>
                              <input
                                autoComplete="off"
                                type="text"
                                id="skill1Level1"
                                name="skill1Level1"
                                placeholder="技能水平"
                                value={
                                  experience.skill1Level1
                                    ? experience.skill1Level1
                                    : ""
                                }
                                onFocus={() => {
                                  setSeeSkill1Level1(!seeSkill1Level1);
                                }}
                                onSelect={handleSkill}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              id="skill1Level1"
                              disabled
                              placeholder="禁止填寫"
                            />
                          )}
                          {seeSkill1Level1 ? (
                            <div className="skill1Level1">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    explvl(e);
                                  }}
                                >
                                  有一些經驗
                                </li>
                                <li
                                  onClick={(e) => {
                                    explvl(e);
                                  }}
                                >
                                  經驗豐富
                                </li>
                                <li
                                  onClick={(e) => {
                                    explvl(e);
                                  }}
                                >
                                  專精達人
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <br />
                      <div className="alignSkills">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="skillOne2"
                            name="skill1Level2"
                            type="text"
                            placeholder="例: 數學"
                            value={skillOne2}
                            onChange={(e) => {
                              setSkillOne2(e.target.value);
                              deleteExp(e);
                            }}
                          />
                          <label htmlFor="skillOne2"></label>
                        </div>
                        <div className="container2">
                          {skillOne2 ? (
                            <>
                              <label htmlFor="skill1Level2"></label>
                              <input
                                autoComplete="off"
                                type="text"
                                id="skill1Level2"
                                name="skill1Level2"
                                placeholder="技能水平"
                                value={
                                  experience.skill1Level2
                                    ? experience.skill1Level2
                                    : ""
                                }
                                onFocus={() => {
                                  setSeeSkill1Level2(!seeSkill1Level2);
                                }}
                                onSelect={handleSkill}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              id="skill1Level2"
                              disabled
                              placeholder="禁止填寫"
                            />
                          )}

                          {seeSkill1Level2 ? (
                            <div className="skill1Level2">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    explvl(e);
                                  }}
                                >
                                  有一些經驗
                                </li>
                                <li
                                  onClick={(e) => {
                                    explvl(e);
                                  }}
                                >
                                  經驗豐富
                                </li>
                                <li
                                  onClick={(e) => {
                                    explvl(e);
                                  }}
                                >
                                  專精達人
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <br />
                      <div className="alignSkills">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="skillOne3"
                            name="skill1Level3"
                            type="text"
                            placeholder="例: 理化"
                            value={skillOne3}
                            onChange={(e) => {
                              setSkillOne3(e.target.value);
                              deleteExp(e);
                            }}
                          />
                          <label htmlFor="skillOne3"></label>
                        </div>
                        <div className="container2">
                          {skillOne3 ? (
                            <>
                              <label htmlFor="skill1Level3"></label>
                              <input
                                autoComplete="off"
                                type="text"
                                id="skill1Level3"
                                name="skill1Level3"
                                placeholder="技能水平"
                                value={
                                  experience.skill1Level3
                                    ? experience.skill1Level3
                                    : ""
                                }
                                onFocus={() => {
                                  setSeeSkill1Level3(!seeSkill1Level3);
                                }}
                                onSelect={handleSkill}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              id="skill1Level3"
                              disabled
                              placeholder="禁止填寫"
                            />
                          )}

                          {seeSkill1Level3 ? (
                            <div className="skill1Level3">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    explvl(e);
                                  }}
                                >
                                  有一些經驗
                                </li>
                                <li
                                  onClick={(e) => {
                                    explvl(e);
                                  }}
                                >
                                  經驗豐富
                                </li>
                                <li
                                  onClick={(e) => {
                                    explvl(e);
                                  }}
                                >
                                  專精達人
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="pencil"></span>
                    <input
                      type="text"
                      id="skillTwo"
                      value={skillTwo}
                      autoComplete="off"
                      onChange={(e) => {
                        setSkillTwo(e.target.value);
                      }}
                      onBlur={() =>
                        skillTwo === ""
                          ? setSkillTwo("技能二 例如:電腦")
                          : skillTwo
                      }
                    />

                    <div className="skillTwo">
                      <div className="alignSkills">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="skillTwo1"
                            name="skill2Level1"
                            type="text"
                            placeholder="例: 微軟Office"
                            value={skillTwo1}
                            onChange={(e) => {
                              setSkillTwo1(e.target.value);
                              deleteComp(e);
                            }}
                          />
                          <label htmlFor="skillTwo1"></label>
                        </div>
                        <div className="container2">
                          {skillTwo1 ? (
                            <>
                              <label htmlFor="skill2Level1"></label>
                              <input
                                autoComplete="off"
                                type="text"
                                id="skill2Level1"
                                name="skill2Level1"
                                placeholder="技能水平"
                                value={
                                  computer.skill2Level1
                                    ? computer.skill2Level1
                                    : ""
                                }
                                onFocus={() => {
                                  setSeeSkill2Level1(!seeSkill2Level1);
                                }}
                                onSelect={handleComp}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              disabled
                              id="skill2Level1"
                              placeholder="禁止填寫"
                            />
                          )}

                          {seeSkill2Level1 ? (
                            <div className="skill2Level1">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    complvl(e);
                                  }}
                                >
                                  有一些經驗
                                </li>
                                <li
                                  onClick={(e) => {
                                    complvl(e);
                                  }}
                                >
                                  經驗豐富
                                </li>
                                <li
                                  onClick={(e) => {
                                    complvl(e);
                                  }}
                                >
                                  專精達人
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <br />
                      <div className="alignSkills">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="skillTwo2"
                            name="skill2Level2"
                            type="text"
                            placeholder="例: HTML CSS"
                            value={skillTwo2}
                            onChange={(e) => {
                              setSkillTwo2(e.target.value);
                              deleteComp(e);
                            }}
                          />
                          <label htmlFor="skillTwo2"></label>
                        </div>
                        <div className="container2">
                          {skillTwo2 ? (
                            <>
                              <label htmlFor="skill2Level2"></label>
                              <input
                                autoComplete="off"
                                type="text"
                                id="skill2Level2"
                                name="skill2Level2"
                                placeholder="技能水平"
                                value={
                                  computer.skill2Level2
                                    ? computer.skill2Level2
                                    : ""
                                }
                                onFocus={() => {
                                  setSeeSkill2Level2(!seeSkill2Level2);
                                }}
                                onSelect={handleComp}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              id="skill2Level2"
                              disabled
                              placeholder="禁止填寫"
                            />
                          )}

                          {seeSkill2Level2 ? (
                            <div className="skill2Level2">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    complvl(e);
                                  }}
                                >
                                  有一些經驗
                                </li>
                                <li
                                  onClick={(e) => {
                                    complvl(e);
                                  }}
                                >
                                  經驗豐富
                                </li>
                                <li
                                  onClick={(e) => {
                                    complvl(e);
                                  }}
                                >
                                  專精達人
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <br />
                      <div className="alignSkills">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="skillTwo3"
                            name="skill2Level3"
                            type="text"
                            placeholder="例: Python"
                            value={skillTwo3}
                            onChange={(e) => {
                              setSkillTwo3(e.target.value);
                              deleteComp(e);
                            }}
                          />
                          <label htmlFor="skillTwo3"></label>
                        </div>
                        <div className="container2">
                          {skillTwo3 ? (
                            <>
                              <label htmlFor="skill2Level3"></label>
                              <input
                                autoComplete="off"
                                type="text"
                                id="skill2Level3"
                                name="skill2Level3"
                                placeholder="技能水平"
                                value={
                                  computer.skill2Level3
                                    ? computer.skill2Level3
                                    : ""
                                }
                                onFocus={() => {
                                  setSeeSkill2Level3(!seeSkill2Level3);
                                }}
                                onSelect={handleComp}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              id="skill2Level3"
                              disabled
                              placeholder="禁止填寫"
                            />
                          )}

                          {seeSkill2Level3 ? (
                            <div className="skill2Level3">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    complvl(e);
                                  }}
                                >
                                  有一些經驗
                                </li>
                                <li
                                  onClick={(e) => {
                                    complvl(e);
                                  }}
                                >
                                  經驗豐富
                                </li>
                                <li
                                  onClick={(e) => {
                                    complvl(e);
                                  }}
                                >
                                  專精達人
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="pencil"></span>
                    <input
                      type="text"
                      id="skillThree"
                      value={skillThree}
                      autoComplete="off"
                      onChange={(e) => {
                        setSkillThree(e.target.value);
                      }}
                      onBlur={() =>
                        skillThree === ""
                          ? setSkillThree("技能三 例如:體育")
                          : skillThree
                      }
                    />

                    <div className="skillThree">
                      <div className="alignSkills">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="skillThree1"
                            name="skill3Level1"
                            type="text"
                            placeholder="例: 羽毛球"
                            value={skillThree1}
                            onChange={(e) => {
                              setSkillThree1(e.target.value);
                              deleteSport(e);
                            }}
                          />
                          <label htmlFor="skillThree1"></label>
                        </div>
                        <div className="container2">
                          {skillThree1 ? (
                            <>
                              <label htmlFor="skill3Level1"></label>
                              <input
                                autoComplete="off"
                                type="text"
                                id="skill3Level1"
                                name="skill3Level1"
                                placeholder="技能水平"
                                value={
                                  sport.skill3Level1 ? sport.skill3Level1 : ""
                                }
                                onFocus={() => {
                                  setSeeSkill3Level1(!seeSkill3Level1);
                                }}
                                onSelect={handleSport}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              id="skill3Level1"
                              disabled
                              placeholder="禁止填寫"
                            />
                          )}

                          {seeSkill3Level1 ? (
                            <div className="skill3Level1">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    sportlvl(e);
                                  }}
                                >
                                  有一些經驗
                                </li>
                                <li
                                  onClick={(e) => {
                                    sportlvl(e);
                                  }}
                                >
                                  經驗豐富
                                </li>
                                <li
                                  onClick={(e) => {
                                    sportlvl(e);
                                  }}
                                >
                                  專精達人
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <br />
                      <div className="alignSkills">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="skillThree2"
                            name="skill3Level2"
                            type="text"
                            placeholder="例: 乒乓球"
                            value={skillThree2}
                            onChange={(e) => {
                              setSkillThree2(e.target.value);
                              deleteSport(e);
                            }}
                          />
                          <label htmlFor="skillThree2"></label>
                        </div>
                        <div className="container2">
                          {skillThree2 ? (
                            <>
                              <label htmlFor="skill3Level2"></label>
                              <input
                                autoComplete="off"
                                type="text"
                                id="skill3Level2"
                                name="skill3Level2"
                                placeholder="技能水平"
                                value={
                                  sport.skill3Level2 ? sport.skill3Level2 : ""
                                }
                                onFocus={() => {
                                  setSeeSkill3Level2(!seeSkill3Level2);
                                }}
                                onSelect={handleSport}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              id="skill3Level2"
                              disabled
                              placeholder="禁止填寫"
                            />
                          )}

                          {seeSkill3Level2 ? (
                            <div className="skill3Level2">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    sportlvl(e);
                                  }}
                                >
                                  有一些經驗
                                </li>
                                <li
                                  onClick={(e) => {
                                    sportlvl(e);
                                  }}
                                >
                                  經驗豐富
                                </li>
                                <li
                                  onClick={(e) => {
                                    sportlvl(e);
                                  }}
                                >
                                  專精達人
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <br />
                      <div className="alignSkills">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="skillThree3"
                            name="skill3Level3"
                            type="text"
                            placeholder="例: 象棋"
                            value={skillThree3}
                            onChange={(e) => {
                              setSkillThree3(e.target.value);
                              deleteSport(e);
                            }}
                          />
                          <label htmlFor="skillThree3"></label>
                        </div>
                        <div className="container2">
                          {skillThree3 ? (
                            <>
                              <label htmlFor="skill3Level3"></label>
                              <input
                                autoComplete="off"
                                type="text"
                                id="skill3Level3"
                                name="skill3Level3"
                                placeholder="技能水平"
                                value={
                                  sport.skill3Level3 ? sport.skill3Level3 : ""
                                }
                                onClick={() => {
                                  setSeeSkill3Level3(!seeSkill3Level3);
                                }}
                                onSelect={handleSport}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              id="skill3Level3"
                              disabled
                              placeholder="禁止填寫"
                            />
                          )}

                          {seeSkill3Level3 ? (
                            <div className="skill3Level3">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    sportlvl(e);
                                  }}
                                >
                                  有一些經驗
                                </li>
                                <li
                                  onClick={(e) => {
                                    sportlvl(e);
                                  }}
                                >
                                  經驗豐富
                                </li>
                                <li
                                  onClick={(e) => {
                                    sportlvl(e);
                                  }}
                                >
                                  專精達人
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
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
                        languages === "" ? setLanguages("語言") : languages
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
                          增加新語言
                        </button>
                      )}

                      {row.map((data, i, arr) => {
                        return (
                          <>
                            <div className="alignSkills">
                              <div className="container1">
                                <input
                                  autoComplete="off"
                                  key={i}
                                  id={`language${i}`}
                                  type="text"
                                  placeholder="語言"
                                  name={`whichlanguage${i}`}
                                  value={
                                    linguistics
                                      ? linguistics[`whichlanguage${i}`]
                                      : ""
                                  }
                                  onClick={() => {
                                    setGlobalIndex(i);
                                    setLangdropdown(true);
                                    setLanglevel(false);
                                  }}
                                  onSelect={handleLanguage}
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
                                            linguistics["whichlanguage1"] && (
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
                                  placeholder="語言水平"
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
                                        初階
                                      </li>
                                      <li
                                        onClick={(e) => {
                                          chooseLanguageLvl(e, i);
                                        }}
                                      >
                                        中階
                                      </li>
                                      <li
                                        onClick={(e) => {
                                          chooseLanguageLvl(e, i);
                                        }}
                                      >
                                        流利或母語
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
                                  增加新語言
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
                                  增加新語言
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
                                增加新語言
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
                              刪除語言
                            </button>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="personContent">
              <section className="buttonCard">
                {resume && workhistory ? (
                  activeButton === 0 ||
                  activeButton === 1 ||
                  activeButton === 2 ? (
                    <button type="submit" className="btn-vori">
                      履歷表製作
                    </button>
                  ) : (
                    <button type="button" disabled className="btn-vori">
                      履歷表製作
                    </button>
                  )
                ) : (
                  <button type="button" disabled className="btn-vori">
                    履歷表製作
                  </button>
                )}
              </section>
            </div>
          </form>
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
            padding: 0;
            background-color: #333;
          }
          @media screen and (max-width: 768px) {
            .wrap {
              padding: 0;
            }
          }
          /* ========== 履歷表製作 按鈕 ==========*/
          .wrap .buttonCard {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            background-color: #333;
            width: 80%;
            margin: 30px auto 30px;
            text-align: center;
          }

          .btn-vori {
            position: relative;
            background-color: #a5ce0f;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: 800;
            width: 150px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          .btn-vori:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          @media only screen and (min-width: 768px) {
            .btn-vori {
              width: 200px;
            }
          }

          @media screen and (max-width: 768px) {
            .wrap .buttonCard {
              width: 410px;
              margin: 25px auto;
            }
            input[type="submit"] {
              width: 100%;
            }
          }

          /* ============== QUESTION CARD RESUME =========== */

          .wrap .personContent {
            width: 90%;
            margin: 0 auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
          }

          .wrap .questionCard {
            width: 80%;
            padding: 30px 20px;
            margin: 90px auto 0px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 0px;
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

          .form-group .workhistory textarea,
          .form-group .workhistory iframe {
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
            font-weight: 800;
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

          .skillOne .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .skillTwo .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .skillThree .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .languages .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .questionCard .form-group #workhistory {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }
          #resume {
            white-space: pre-wrap;
          }

          #honourAwards {
            white-space: pre-wrap;
          }

          .questionCard .form-group #honourTitle {
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
          .questionCard .form-group #skillOne {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .questionCard .form-group #languages {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .questionCard .form-group #skillTwo {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .questionCard .form-group #skillThree {
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

          .skill1Level1,
          .skill1Level2,
          .skill1Level3,
          .skill2Level1,
          .skill2Level2,
          .skill2Level3,
          .skill3Level1,
          .skill3Level2,
          .skill3Level3,
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

          .skill1Level1 ul,
          .skill1Level2 ul,
          .skill1Level3 ul,
          .skill2Level1 ul,
          .skill2Level2 ul,
          .skill2Level3 ul,
          .skill3Level1 ul,
          .skill3Level2 ul,
          .skill3Level3 ul,
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
          .skill1Level1 ul li,
          .skillOne1 ul li,
          .skill1Level2 ul li,
          .skillOne2 ul li,
          .skill1Level3 ul li,
          .skillOne3 ul li,
          .skill2Level1 ul li,
          .skillTwo1 ul li,
          .skill2Level2 ul li,
          .skillTwo2 ul li,
          .skill2Level3 ul li,
          .skillTwo3 ul li,
          .skill3Level1 ul li,
          .skillThree1 ul li,
          .skill3Level2 ul li,
          .pharma2 ul li,
          .skill3Level3 ul li,
          .pharma3 ul li,
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

          .skillOne1 ul li:hover,
          .skill1Level1 ul li:hover,
          .skillOne2 ul li:hover,
          .skill1Level2 ul li:hover,
          .skillOne3 ul li:hover,
          .skill1Level3 ul li:hover,
          .language1 ul li:hover,
          .skillTwo1 ul li:hover,
          .skill2Level1 ul li:hover,
          .skillTwo2 ul li:hover,
          .skill2Level2 ul li:hover,
          .skillTwo3 ul li:hover,
          .skill2Level3 ul li:hover,
          .language1 ul li:hover,
          .skillThree1 ul li:hover,
          .skill3Level1 ul li:hover,
          .pharma2 ul li:hover,
          .skill3Level2 ul li:hover,
          .pharma3 ul li:hover,
          .skill3Level3 ul li:hover,
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
          .regCon {
            width: 90% !important;
            padding: 20px 0;
          }

          @media screen and (max-width: 768px) {
            .form-group .education input[type="text"] {
              width: 185px;
            }
            .form-group .education input[type="text"]:last-child {
              width: 110px;
            }

            .wrap .questionCard {
              margin: 0 auto;
              width: 440px;
            }
            .wrap .personContent {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
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

          .btn-vori:active,
          .btn-vori:focus {
            color: white;
            border: 1px solid #a5ce0f;
            outline: none;
            border: none;
          }

          /* ============== PROCESS BAR ON TOP ============== */
          .wrap .Q1title {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            height: auto;
            font-size: 16px;
            color: #484848;
            padding: 0px;
            text-align: center;
            margin: 0px auto;
          }

          .wrap .Q1title > ul {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
          }
          .wrap .Q1title > ul > li {
            list-style: none;
          }

          .stepNav {
            margin: 30px 20px;
            height: auto;
            padding-right: 20px;
            position: relative;
            z-index: 0;
          }

          .badge {
            display: block;
            font-size: 12px;
            width: 22px;
            border: 1px solid white;
            height: 22px;
            line-height: 12px;
            background: #777;
            color: #fff;
            border-radius: 50%;
            margin-right: 5px;
          }

          .badge-highlight {
            display: block;
            font-size: 12px;
            width: 22px;
            border: 1px solid white;
            height: 22px;
            line-height: 20px;
            background: #a5ce0f;
            color: #fff;
            border-radius: 50%;
            margin-right: 5px;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            font-weight: 700;
          }
          .stepNav.threeWide li {
            width: 33%;
          }
          .stepNav li {
            float: left;
            position: relative;
            z-index: 3;
          }

          .stepNav li:first-child {
            border-radius: 0px 0 0 0px;
          }

          .stepNav li:nth-child(2) {
            z-index: 2;
          }

          .stepNav li:nth-child(3) {
            z-index: 1;
          }

          .stepNav li:nth-child(4) {
            z-index: 0;
          }
          .stepNav.threeWide li {
            width: 33%;
          }
          .stepNav a,
          .stepNav a:visited {
            display: block;
            width: 100%;
            height: 43px;
            padding: 0 0 0 25px;
            color: #999;
            text-align: center;
            text-shadow: 0 1px 0 #fff;
            line-height: 43px;
            white-space: nowrap;
            border: none;
            text-decoration: none;
            border-right: 0;
            background-color: #ededed;
            position: relative;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
          .stepNav a {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
          }

          .stepNav a:before {
            content: "";
            width: 30px;
            height: 30px;
            background: #ededed;
            display: block;
            position: absolute;
            top: 6px;
            right: -16px;
            z-index: -1;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }

          .stepNav a.active {
            text-shadow: none;
            color: #fff;
            background: #a5ce0f;
          }
          .stepNav a.active::before {
            border-right: 1px solid #a5ce0f;
            border-bottom: 1px solid #a5ce0f;
            background: #a5ce0f;
          }

          @media screen and (max-width: 768px) {
            .wrap .Q1title {
              width: 100%;
              padding: 0px 0px 0px 0px;
            }
            .wrap .Q1title > ul {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
              padding-left: 10px;
            }
            .wrap .Q1title > ul > li {
              width: 100%;
              margin-bottom: 10px;
              list-style: none;
            }
            .wrap .Q1title > ul > li a {
              text-align: left !important;
            }
            .stepNav a {
              -webkit-box-pack: left;
              -ms-flex-pack: left;
              justify-content: left;
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
              margin: 0;
              width: 450px;
              margin: 0px auto;
              display: block;
            }
            input[type="text"] {
              width: 170px;
              font-size: 13px;
            }
            .skillOne .alignSkills,
            .skillTwo .alignSkills,
            .skillThree .alignSkills,
            .languages .alignSkills {
              padding: 0px;
            }

            #workhistory,
            #honourTitle,
            #skillOne,
            #skillTwo,
            #skillThree,
            #languages {
              width: 265px;
            }

            form .btn-save {
              width: 450px;
              margin: 25px;
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
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Step2;
