import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import axios from "axios";
import { useSelector } from "react-redux";

const Step3 = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.value);
  ReactSession.setStoreType("sessionStorage");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [workhistory, setWorkhistory] = useState("");
  const [resume, setResume] = useState("");
  const [honourTitle, setHonourTitle] = useState("");
  const [honourAwards, setHonourAwards] = useState("");
  const [skillOne, setSkillOne] = useState("");
  const [skillOne1, setSkillOne1] = useState("");
  const [skillOne2, setSkillOne2] = useState("");
  const [skillOne3, setSkillOne3] = useState("");
  const [experience, setExperience] = useState({});
  const [skillTwo, setSkillTwo] = useState("");
  const [skillTwo1, setSkillTwo1] = useState("");
  const [skillTwo2, setSkillTwo2] = useState("");
  const [skillTwo3, setSkillTwo3] = useState("");
  const [computer, setComputer] = useState({});
  const [skillThree, setSkillThree] = useState("");
  const [skillThree1, setSkillThree1] = useState("");
  const [skillThree2, setSkillThree2] = useState("");
  const [skillThree3, setSkillThree3] = useState("");
  const [sport, setSport] = useState({});
  const [languages, setLanguages] = useState("");
  const [linguistics, setLinguistics] = useState({});
  const [row, setRow] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [education, setEducation] = useState("");
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
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [userInfo, setUserInfo] = useState({});

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setCountry(ReactSession.get("teacher_country"));
    setCity(ReactSession.get("teacher_city"));
    setState(ReactSession.get("teacher_state"));
    setSuburb(ReactSession.get("teacher_suburb"));
    setStreet(ReactSession.get("teacher_street"));
    setStreetNo(ReactSession.get("teacher_streetNo"));
    setLatitude(ReactSession.get("teacher_latitude"));
    setLongitude(ReactSession.get("teacher_longitude"));
    setPostalCode(ReactSession.get("teacher_postalCode"));
    setWorkhistory(ReactSession.get("workhistory"));
    setResume(ReactSession.get("resume"));
    setHonourAwards(ReactSession.get("honourAwards"));
    setHonourTitle(ReactSession.get("honourTitle"));
    if (!ReactSession.get("teacher_phone")) {
      setPhone("");
    } else {
      setPhone(ReactSession.get("teacher_phone"));
    }
    if (!ReactSession.get("teacher_nationality")) {
      setNationality("");
    } else {
      setNationality(ReactSession.get("teacher_nationality"));
    }
    setSkillOne(ReactSession.get("skillOne"));
    setSkillOne1(ReactSession.get("skillOne1"));
    setSkillOne2(ReactSession.get("skillOne2"));
    setSkillOne3(ReactSession.get("skillOne3"));
    setExperience({
      ...experience,
      skill1Level1: ReactSession.get("skillSchool1"),
      skill1Level2: ReactSession.get("skillSchool2"),
      skill1Level3: ReactSession.get("skillSchool3"),
    });
    setSkillTwo(ReactSession.get("skillTwo"));
    setSkillTwo1(ReactSession.get("skillTwo1"));
    setSkillTwo2(ReactSession.get("skillTwo2"));
    setSkillTwo3(ReactSession.get("skillTwo3"));
    setComputer({
      ...computer,
      skill2Level1: ReactSession.get("skillComp1"),
      skill2Level2: ReactSession.get("skillComp2"),
      skill2Level3: ReactSession.get("skillComp3"),
    });

    setSkillThree(ReactSession.get("skillThree"));
    setSkillThree1(ReactSession.get("skillThree1"));
    setSkillThree2(ReactSession.get("skillThree2"));
    setSkillThree3(ReactSession.get("skillThree3"));
    setSport({
      ...sport,
      skill3Level1: ReactSession.get("skillSport1"),
      skill3Level2: ReactSession.get("skillSport2"),
      skill3Level3: ReactSession.get("skillSport3"),
    });
    setLanguages(ReactSession.get("languages"));
    setRow(ReactSession.get("row"));
    setActiveButton(ReactSession.get("activeButton"));
    setLinguistics({
      ...linguistics,
      whichlanguage0: ReactSession.get("whichlanguage0"),
      whichlanguage1: ReactSession.get("whichlanguage1"),
      whichlanguage2: ReactSession.get("whichlanguage2"),
      languageLvl0: ReactSession.get("languageLvl0"),
      languageLvl1: ReactSession.get("languageLvl1"),
      languageLvl2: ReactSession.get("languageLvl2"),
    });
    setEducation(ReactSession.get("education"));
    setDegree1(ReactSession.get("degree1"));
    setDegree2(ReactSession.get("degree2"));
    setDegree3(ReactSession.get("degree3"));
    setUniversity1(ReactSession.get("university1"));
    setUniversity2(ReactSession.get("university2"));
    setUniversity3(ReactSession.get("university3"));
    setStart1(ReactSession.get("start1"));
    setStart2(ReactSession.get("start2"));
    setStart3(ReactSession.get("start3"));
    setFinish1(ReactSession.get("finish1"));
    setFinish2(ReactSession.get("finish2"));
    setFinish3(ReactSession.get("finish3"));
    // ============ PROFILE DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/users/allusers/" +
          localStorage.getItem("userId")
      )
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
        }
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const isTeacher = true;
    fetch(process.env.REACT_APP_BACKEND_URL + "api/teachers/step4", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        isTeacher: isTeacher,
        nanoId: userInfo.nanoId,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        resume: resume,
        workhistory: workhistory,
        honourAwards: honourAwards,
        honourTitle: honourTitle,
        phone: phone,
        nationality: nationality,
        nationalId: userInfo.nationalId,
        country: country,
        city: city,
        state: state,
        suburb: suburb,
        street: street,
        streetNo: streetNo,
        latitude: latitude,
        longitude: longitude,
        postalCode: postalCode,
        skillOne: skillOne,
        skillOne1: skillOne1,
        skillOne2: skillOne2,
        skillOne3: skillOne3,
        skillSchool1: experience.skill1Level1,
        skillSchool2: experience.skill1Level2,
        skillSchool3: experience.skill1Level3,
        skillTwo: skillTwo,
        skillTwo1: skillTwo1,
        skillTwo2: skillTwo2,
        skillTwo3: skillTwo3,
        skillComp1: computer.skill2Level1,
        skillComp2: computer.skill2Level2,
        skillComp3: computer.skill2Level3,
        skillThree: skillThree,
        skillThree1: skillThree1,
        skillThree2: skillThree2,
        skillThree3: skillThree3,
        skillSport1: sport.skill3Level1,
        skillSport2: sport.skill3Level2,
        skillSport3: sport.skill3Level3,
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
        row: row,
        activeButton: activeButton,
        languages: languages,
        whichlanguage0: linguistics.whichlanguage0
          ? linguistics.whichlanguage0
          : "",
        whichlanguage1: linguistics.whichlanguage1
          ? linguistics.whichlanguage1
          : "",
        whichlanguage2: linguistics.whichlanguage2
          ? linguistics.whichlanguage2
          : "",
        languageLvl0: linguistics.languageLvl0 ? linguistics.languageLvl0 : "",
        languageLvl1: linguistics.languageLvl1 ? linguistics.languageLvl1 : "",
        languageLvl2: linguistics.languageLvl2 ? linguistics.languageLvl2 : "",
        _id: userInfo._id,
        gender: userInfo.gender,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.clear();
        navigate("/step4");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>註冊成為家教 第三步 | 愛課網</title>
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
                <Link style={{ fontWeight: "bold" }} to="/step1">
                  <span className="badge">1</span>
                  <span>個人資料</span>
                </Link>
              </li>

              <li>
                <Link style={{ fontWeight: "bold" }} to="/step2">
                  <span className="badge">2</span>
                  <span className="active">教學經驗</span>
                </Link>
              </li>
              <li>
                <Link className="active" style={{ fontWeight: "bold" }} to="#">
                  <span className="badge-highlight">3</span>
                  <span className="active">檢視履歷</span>
                </Link>
              </li>
              {/* <li><Link style={{fontWeight:"bold"}} to="#"><span className="badge">4</span><span>上傳文件</span></Link></li>  */}
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

          <div className="top-container">
            <div className="ad-description">
              <div className="sidebar">
                <div className="sidebarlogo">
                  <img
                    className="img-fluid"
                    src="/images/mainLogo_white.png"
                    width="180px"
                    alt="Acabook LOGO"
                  />
                </div>
                <div className="candidate-name">
                  <h2>
                    {ReactSession.get("teacher_lastName")}
                    {ReactSession.get("teacher_firstName")}
                    {ReactSession.get("teacher_gender") === "男" ? (
                      <span style={{ fontSize: "15px" }}> 先生</span>
                    ) : (
                      <span style={{ fontSize: "15px" }}> 小姐</span>
                    )}
                  </h2>
                </div>

                <div className="candidate-address">
                  <h2>聯絡方式</h2>

                  <p>{state + city + suburb + street + streetNo}</p>

                  <p>手機: {ReactSession.get("teacher_phone")}</p>
                  <p>Email: {user.email}</p>
                </div>

                <div className="candidate-skills">
                  {ReactSession.get("skillOne1") ||
                  ReactSession.get("skillOne2") ||
                  ReactSession.get("skillOne3") ? (
                    <h2>{ReactSession.get("skillOne")}</h2>
                  ) : (
                    ""
                  )}

                  <p>{ReactSession.get("skillOne1")}</p>

                  {ReactSession.get("skillSchool1") ? (
                    ReactSession.get("skillSchool1") === "專精達人" ||
                    ReactSession.get("skillSchool1") === "Guru" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("skillSchool1") === "經驗豐富" ||
                      ReactSession.get("skillSchool1") === "Experienced" ? (
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

                  <p>{ReactSession.get("skillOne2")}</p>
                  {ReactSession.get("skillSchool2") ? (
                    ReactSession.get("skillSchool2") === "專精達人" ||
                    ReactSession.get("skillSchool2") === "Guru" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("skillSchool2") === "經驗豐富" ||
                      ReactSession.get("skillSchool2") === "Experienced" ? (
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

                  <p>{ReactSession.get("skillOne3")}</p>

                  {ReactSession.get("skillSchool3") ? (
                    ReactSession.get("skillSchool3") === "專精達人" ||
                    ReactSession.get("skillSchool3") === "Guru" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("skillSchool3") === "經驗豐富" ||
                      ReactSession.get("skillSchool3") === "Experienced" ? (
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

                <div className="candidate-computer">
                  {ReactSession.get("skillTwo1") ||
                  ReactSession.get("skillTwo2") ||
                  ReactSession.get("skillTwo3") ? (
                    <h2>{ReactSession.get("skillTwo")}</h2>
                  ) : (
                    ""
                  )}

                  <p>{ReactSession.get("skillTwo1")}</p>

                  {ReactSession.get("skillComp1") ? (
                    ReactSession.get("skillComp1") === "專精達人" ||
                    ReactSession.get("skillComp1") === "Guru" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("skillComp1") === "經驗豐富" ||
                      ReactSession.get("skillComp1") === "Experienced" ? (
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

                  <p>{ReactSession.get("skillTwo2")}</p>
                  {ReactSession.get("skillComp2") ? (
                    ReactSession.get("skillComp2") === "專精達人" ||
                    ReactSession.get("skillComp2") === "Guru" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("skillComp2") === "經驗豐富" ||
                      ReactSession.get("skillComp2") === "Experienced" ? (
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

                  <p>{ReactSession.get("skillTwo3")}</p>
                  {ReactSession.get("skillComp3") ? (
                    ReactSession.get("skillComp3") === "專精達人" ||
                    ReactSession.get("skillComp3") === "Guru" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("skillComp3") === "經驗豐富" ||
                      ReactSession.get("skillComp3") === "Experienced" ? (
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

                <div className="candidate-pharmacoth">
                  {ReactSession.get("skillThree1") ||
                  ReactSession.get("skillThree2") ||
                  ReactSession.get("skillThree3") ? (
                    <h2>{ReactSession.get("skillThree")}</h2>
                  ) : (
                    ""
                  )}

                  <p>{ReactSession.get("skillThree1")}</p>
                  {ReactSession.get("skillSport1") ? (
                    ReactSession.get("skillSport1") === "專精達人" ||
                    ReactSession.get("skillSport1") === "Guru" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("skillSport1") === "經驗豐富" ||
                      ReactSession.get("skillSport1") === "Experienced" ? (
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

                  <p>{ReactSession.get("skillThree2")}</p>
                  {ReactSession.get("skillSport2") ? (
                    ReactSession.get("skillSport2") === "專精達人" ||
                    ReactSession.get("skillSport2") === "Guru" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("skillSport2") === "經驗豐富" ||
                      ReactSession.get("skillSport2") === "Experienced" ? (
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

                  <p>{ReactSession.get("skillThree3")}</p>
                  {ReactSession.get("skillSport3") ? (
                    ReactSession.get("skillSport3") === "專精達人" ||
                    ReactSession.get("skillSport3") === "Guru" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("skillSport3") === "經驗豐富" ||
                      ReactSession.get("skillSport3") === "Experienced" ? (
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

                <div className="candidate-languages">
                  {!ReactSession.get("whichlanguage0") ? (
                    ""
                  ) : (
                    <h2>{ReactSession.get("languages")}</h2>
                  )}

                  <p>{ReactSession.get("whichlanguage0")}</p>
                  {ReactSession.get("languageLvl0") ? (
                    ReactSession.get("languageLvl0") === "流利或母語" ||
                    ReactSession.get("languageLvl0") ===
                      "Advanced or mother tongue" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("languageLvl0") === "中階" ||
                      ReactSession.get("languageLvl0") === "Intermediate" ? (
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

                  <p>{ReactSession.get("whichlanguage1")}</p>

                  {ReactSession.get("languageLvl1") ? (
                    ReactSession.get("languageLvl1") === "流利或母語" ||
                    ReactSession.get("languageLvl1") ===
                      "Advanced or mother tongue" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("languageLvl1") === "中階" ||
                      ReactSession.get("languageLvl1") === "Intermediate" ? (
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

                  <p>{ReactSession.get("whichlanguage2")}</p>
                  {ReactSession.get("languageLvl2") ? (
                    ReactSession.get("languageLvl2") === "流利或母語" ||
                    ReactSession.get("languageLvl2") ===
                      "Advanced or mother tongue" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("languageLvl2") === "中階" ||
                      ReactSession.get("languageLvl2") === "Intermediate" ? (
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
                  {ReactSession.get("university1") ||
                  ReactSession.get("university2") ||
                  ReactSession.get("university3") ? (
                    <h2>{ReactSession.get("education")}</h2>
                  ) : (
                    ""
                  )}

                  {ReactSession.get("university1") ? (
                    <>
                      <p className="uni">
                        {ReactSession.get("degree1")} 就讀於{" "}
                        {ReactSession.get("university1")}
                      </p>
                      <p className="uni-dates">
                        自 {ReactSession.get("start1")}年 到{" "}
                        {ReactSession.get("finish1")}年
                      </p>
                    </>
                  ) : (
                    <p></p>
                  )}

                  {ReactSession.get("university2") ? (
                    <>
                      <p className="uni">
                        {ReactSession.get("degree2")} 就讀於{" "}
                        {ReactSession.get("university2")}
                      </p>
                      <p className="uni-dates">
                        自 {ReactSession.get("start2")}年 到{" "}
                        {ReactSession.get("finish2")}年
                      </p>
                    </>
                  ) : (
                    <p></p>
                  )}

                  {ReactSession.get("university3") ? (
                    <>
                      <p className="uni">
                        {ReactSession.get("degree3")} 就讀於{" "}
                        {ReactSession.get("university3")}
                      </p>
                      <p className="uni-dates">
                        自 {ReactSession.get("start3")}年 到{" "}
                        {ReactSession.get("finish3")}年
                      </p>
                    </>
                  ) : (
                    <p></p>
                  )}
                </div>

                <div className="main-experiences">
                  <h2>{ReactSession.get("workhistory")}</h2>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {ReactSession.get("resume")}
                  </p>
                </div>

                <div className="main-honor-awards">
                  {ReactSession.get("honourAwards") !== "" ? (
                    <h2>{ReactSession.get("honourTitle")}</h2>
                  ) : (
                    <p></p>
                  )}

                  <p style={{ whiteSpace: "pre-line" }}>
                    {ReactSession.get("honourAwards")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form id="formThree" onSubmit={onSubmit}>
            <div className="bottomBtn">
              <button className="btn-previous">
                <Link to="/step2">回上一頁</Link>
              </button>
              <button className="btn-next" type="submit">
                確認
              </button>
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
            min-height: 100vh;
            background-color: #333;
          }
          @media screen and (max-width: 768px) {
            .wrap {
              padding: 0;
            }
          }

          /* ============== 履歷表 ============== */
          .top-container {
            display: flex;
            /* justify-content: center; */
            /* flex-direction: column; */
            height: 100%;
            width: 100%;
            display: block;
            padding-bottom: 60px;
          }

          .ad-description {
            width: 460px;
            margin: 0px auto;
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
            font-size: 15px;
            font-weight: 100;
            font-family: sans-serif;
            width: 100%;
          }

          .sidebar {
            position: relative;
            display: inline-block;
            width: 190px;
            background-color: #193659;
          }

          .sidebarlogo {
            position: relative;
            text-align: center;
            width: 60%;
            top: 95%;
          }
          .img-fluid {
            transform: translateX(0%);
            visibility: hidden;
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
            font-size: 20px;
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
            font-size: 16px;
            font-family: sans-serif;
          }

          .candidate-address p {
            color: #fff;
            margin-bottom: 7px;
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

          .candidate-skills {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 13%;
            text-align: left;
          }
          .candidate-skills h2 {
            color: #fff;
            font-size: 16px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }
          .candidate-skills p {
            margin-top: 12px;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 5px;
            color: white;
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
          .candidate-pharmacoth {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 19%;
            text-align: left;
          }

          .candidate-pharmacoth h2 {
            color: #fff;
            font-size: 16px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }

          .candidate-pharmacoth p {
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
            font-size: 16px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }

          .candidate-languages p {
            margin-top: 12px;
            font-weight: 500;
            font-size: 14px;
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
            font-size: 23px;
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
            font-weight: 500;
          }

          .main-experiences {
            position: relative;
            top: 1%;
            text-align: left;
          }

          .main-experiences h2 {
            font-size: 23px;
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

          .main-honor-awards {
            position: relative;
            top: 1%;
            text-align: left;
          }

          .main-honor-awards h2 {
            font-size: 23px;
            margin-bottom: 12px;
            font-family: sans-serif;
          }

          @media only screen and (min-width: 768px) {
            .top-container {
              display: flex;
              justify-content: center;
              flex-direction: row;
              padding-bottom: 60px;
            }
            .ad-description {
              width: 1000px;
            }

            .sidebar {
              padding: 80px 0px 60px;
              width: 350px;
            }
            .candidate-address {
              padding: 5px 46px 0px 50px;
            }
            .candidate-address h2 {
              font-size: 20px;
            }
            .candidate-dl {
              padding: 5px 46px 0px 50px;
            }

            .candidate-skills {
              padding: 5px 46px 10px 50px;
            }
            .candidate-skills h2 {
              font-size: 20px;
            }
            .candidate-languages {
              padding: 5px 46px 10px 50px;
            }
            .candidate-languages h2 {
              font-size: 20px;
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
            .sidebarlogo {
              width: 100%;
              top: 0px;
            }
            .img-fluid {
              transform: translateX(0%);
            }
          }

          /* ========== BOTTOM BUTTONS ============ */
          .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .btn-previous,
          .btn-next {
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
            padding: 0;
            margin: 0px auto 30px;
            box-shadow: none;
          }
          .btn-previous a,
          .btn-next a {
            color: white;
            font-weight: 800;
            width: 100%;
            height: 100%;
            font-family: sans-serif;
            position: relative;
            display: block;
          }
          .btn-previous:hover,
          .btn-next:hover,
          .btn-previous:active,
          .btn-next:active,
          .btn-previous:focus,
          .btn-next:focus {
            color: white;
            border: 1px solid #a5ce0f;
            outline: none;
          }

          @media only screen and (min-width: 768px) {
            .btn-previous,
            .btn-next {
              width: 200px;
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
            width: 20px;
            height: 20px;
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
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Step3;
