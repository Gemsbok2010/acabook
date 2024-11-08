import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { ExternalLink } from "react-external-link";
import { RotatingLines } from "react-loader-spinner";

const TeacherDb = () => {
  ReactSession.setStoreType("sessionStorage");
  const { search } = useLocation();
  const [noOfCases, setNoOfCases] = useState([]);
  const [page, setPage] = useState([]);
  const [maxPage, setMaxPage] = useState([]);
  const [isloaded, setIsloaded] = useState(false);
  const email = localStorage.getItem("username");

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/intlteachers/database?page=${page <= 0 ? 0 : page - 1}` +
        "&sortBy=" +
        sort +
        "&language=" +
        language +
        "&subjects=" +
        subjects +
        "&location=" +
        location +
        "&country=" +
        country +
        "&email=" +
        email
    );

    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setTeachers(data.teachers);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setListOfSubjects(data.subjects);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/intlteachers/database?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&sortBy=" +
        sort +
        "&language=" +
        language +
        "&subjects=" +
        subjects +
        "&location=" +
        location +
        "&country=" +
        country +
        "&email=" +
        email
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setTeachers(data.teachers);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setListOfSubjects(data.subjects);
  };

  // ========= PAGE INTERMEDIATE BUTTONS ==========
  const circles = [];

  for (let v = 0; v < maxPage; v++) {
    circles.push(v);
  }

  const IntermediateButtons = async (id) => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/intlteachers/database?page=${id + 1}` +
        "&language=" +
        language +
        "&subjects=" +
        subjects +
        "&location=" +
        location +
        "&country=" +
        country +
        "&sortBy=" +
        sort +
        "&email=" +
        email
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setTeachers(data.teachers);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setListOfSubjects(data.subjects);
  };

  // =============== SORT ================
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);

  const sorting = async (ascDesc) => {
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/intlteachers/database?sortBy=asc" +
          "&language=" +
          language +
          "&subjects=" +
          subjects +
          "&location=" +
          location +
          "&country=" +
          country +
          "&page=" +
          page +
          "&email=" +
          email +
          "&slug=" +
          ReactSession.get("slug")
      );
      const data = await res.json();
      setNoOfCases(data.num);
      setTeachers(data.teachers);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setListOfSubjects(data.subjects);
    }

    if (ascDesc === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/intlteachers/database?sortBy=desc" +
          "&language=" +
          language +
          "&subjects=" +
          subjects +
          "&location=" +
          location +
          "&country=" +
          country +
          "&page=" +
          page +
          "&email=" +
          email +
          "&slug=" +
          ReactSession.get("slug")
      );
      const data = await res.json();

      setNoOfCases(data.num);
      setTeachers(data.teachers);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setListOfSubjects(data.subjects);
    }
  };

  //=========== FILTER CARD APPEARS ===========
  const [filterCard, setFilterCard] = useState(false);

  const appearFunction = () => {
    setFilterCard(true);
    setBackdrop(true);
  };

  // ========== SELECT LEVEL (大學 學校 一般課程 etc) ===========
  const [language, setLanguage] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [listOfSubjects, setListOfSubjects] = useState([]);
  const [checks, setChecks] = useState([]);
  const [location, setLocation] = useState([]);
  const [country, setCountry] = useState([]);
  const [checkedUni, setCheckedUni] = useState(false);
  const [checkedSchool, setCheckedSchool] = useState(false);
  const [checkedStd, setCheckedStd] = useState(false);
  const [checkedTaal, setCheckedTaal] = useState(false);
  const [checkedMusic, setCheckedMusic] = useState(false);

  const [, setChecker] = useState([]);

  // =========== ADD LANGUAGE ==================
  const onLanguageChange = async (event) => {
    const { value } = event.target;
    setLanguage([...language, value]);
    const { checked } = event.target;
    setChecker([...language, checked]);
  };

  // ============= REMOVE LANGUAGE =============
  const onRemoveLevel = async (event) => {
    const { value } = event.target;
    const index = language.indexOf(value);
    if (index !== -1) {
      language.splice(index, 1);
    }
    setLanguage([...language]);
  };
  // ========== SELECT SUBJECTS ===========

  const checkingsubject = (e) => {
    const value = e.target.value;

    if (!subjects.includes(value)) {
      setSubjects([...subjects, value]);
    } else {
      const index = subjects.indexOf(value);

      if (index !== -1) {
        subjects.splice(index, 1);
      }
      setSubjects([...subjects]);
    }
  };

  const checkingchecks = (id) => {
    if (!checks.includes(id)) {
      setChecks([...checks, id]);
    } else {
      const index = checks.indexOf(id);
      if (index !== -1) {
        checks.splice(index, 1);
      }
      setChecks([...checks]);
    }
  };

  // ============== SELECT LOCATIONS ===============
  const [checkedTaipei, setCheckedTaipei] = useState(false);
  const [checkedNewTaipei, setCheckedNewTaipei] = useState(false);
  const [checkedTaoyuan, setCheckedTaoyuan] = useState(false);
  const [checkedMiaoli, setCheckedMiaoli] = useState(false);
  const [checkedHsinchu, setCheckedHsinchu] = useState(false);
  const [checkedTaichung, setCheckedTaichung] = useState(false);
  const [checkedChanghwa, setCheckedChanghwa] = useState(false);
  const [checkedNantou, setCheckedNantou] = useState(false);
  const [checkedYunlin, setCheckedYunlin] = useState(false);
  const [checkedChiayi, setCheckedChiayi] = useState(false);
  const [checkedTainan, setCheckedTainan] = useState(false);
  const [checkedKaohsiung, setCheckedKaohsiung] = useState(false);
  const [checkedPenghu, setCheckedPenghu] = useState(false);
  const [checkedPingtung, setCheckedPingtung] = useState(false);
  const [checkedTaitung, setCheckedTaitung] = useState(false);
  const [checkedHualien, setCheckedHualien] = useState(false);
  const [checkedYilan, setCheckedYilan] = useState(false);
  const [checkedKeelung, setCheckedKeelung] = useState(false);
  const [checkedHsinchuCity, setCheckedHsinchuCity] = useState(false);
  const [checkedChiayiCity, setCheckedChiayiCity] = useState(false);
  const [checkedOverseas, setCheckedOverseas] = useState(false);

  // ========== REMOVE STATE LOCATION ===========
  const onRemoveLocation = async (event) => {
    const { value } = event.target;
    const index = location.indexOf(value);
    if (index !== -1) {
      location.splice(index, 1);
    }
    setLocation([...location]);
  };

  // ========= ADD STATE LOCATION ===========
  const onLocationChange = async (event) => {
    const { value } = event.target;
    setLocation([...location, value]);
  };

  // ========== REMOVE COUNTRY LOCATION ===========
  const onRemoveCountry = async (event) => {
    const { value } = event.target;
    const index = country.indexOf(value);
    if (index !== -1) {
      country.splice(index, 1);
    }
    setCountry([...country]);
  };

  // ========= ADD COUNTRY LOCATION ===========
  const onCountryChange = async (event) => {
    const { value } = event.target;
    setCountry([...country, value]);
  };

  // ========= CLEAR ALL IN FILTERCARD ===========
  const clearAll = async () => {
    setCheckedUni(false);
    setCheckedSchool(false);
    setCheckedStd(false);
    setCheckedTaal(false);
    setCheckedMusic(false);
    setCheckedTaipei(false);
    setCheckedNewTaipei(false);
    setCheckedTaoyuan(false);
    setCheckedMiaoli(false);
    setCheckedHsinchu(false);
    setCheckedTaichung(false);
    setCheckedChanghwa(false);
    setCheckedNantou(false);
    setCheckedYunlin(false);
    setCheckedChiayi(false);
    setCheckedTainan(false);
    setCheckedKaohsiung(false);
    setCheckedPenghu(false);
    setCheckedPingtung(false);
    setCheckedTaitung(false);
    setCheckedHualien(false);
    setCheckedYilan(false);
    setCheckedKeelung(false);
    setCheckedHsinchuCity(false);
    setCheckedChiayiCity(false);
    setCheckedOverseas(false);
    setLocation([]);
    setCountry([]);
    setLanguage([]);
    setSubjects([]);
    setChecks([]);
  };

  // ============== BACKDROP ============== //
  const [, setBackdrop] = useState(false);

  const clickOnBackdrop = () => {
    setBackdrop(false);
    setFilterCard(false);
  };

  // ============= GET TEACHER LIST================
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    let isCancelled = false;
    if (search === "") {
      sessionStorage.clear();
    }

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/intlteachers/database?" +
          "language=" +
          language +
          "&subjects=" +
          subjects +
          "&location=" +
          location +
          "&country=" +
          country +
          "&sortBy=" +
          sort +
          "&page=" +
          page +
          "&email=" +
          email +
          "&slug=" +
          ReactSession.get("slug")
      );
      const data = await res.json();

      if (isCancelled === false) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setIsloaded(true);
        setNoOfCases(data.num);
        setTeachers(data.teachers);
        setPage(data.page);
        setMaxPage(data.maxPage);
        setSort(data.sort);
        setListOfSubjects(data.subjects);
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
  }, [language, subjects, location, country, search, email]);

  // ======= TAKE OUT DUPLICATE SUBJECTS ======

  const noDuplicates = [
    ...new Map(listOfSubjects.map((list) => [list.subjectName, list])).values(),
  ];

  // ============= LOAD SUBJECTS ===============
  const [listofCourses, setListofCourses] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "api/intlteachers/listOfCourses"
      );
      const data = await res.json();
      console.log(data.courses);
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

  // ============== LOADING ============== //
  if (!isloaded)
    return (
      <div
        style={{
          backgroundColor: "rgba(33, 40, 46, 0.8)",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          zIndex: "2500",
          justifyContent: "center",
          alignItems: "center",
          display: "block",
          position: "fixed",
          color: "white",
        }}
      >
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            transform: "translate(50%,50%)",
          }}
        >
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="76"
            visible={true}
          />
          {"  "}
          Loading...
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossorigin="anonymous"
          />
          <meta name="description" content="Acabook" />
        </Helmet>
        <LoggedInNavbar />
        <section>
          <div className="fix-Container">
            <div className="row">
              <div
                className="nonselect"
                id="filterPanel"
                onClick={appearFunction}
              >
                <div id="filter"></div>
                <span>Filter</span>
              </div>

              <form style={{ marginRight: "118px" }}>
                {ascDesc ? (
                  <button
                    id="arrow-up"
                    onClick={() => {
                      setAscDesc(!ascDesc);
                      sorting(ascDesc);
                    }}
                  >
                    <Link
                      to={`?sortBy=desc&language=${language}&location=${location}&country=${country}&subjects=${subjects}`}
                      target="_self"
                    >
                      Sort
                    </Link>
                  </button>
                ) : (
                  <button
                    id="arrow-down"
                    onClick={() => {
                      setAscDesc(!ascDesc);
                      sorting(ascDesc);
                    }}
                  >
                    <Link
                      to={`?sortBy=asc&language=${language}&location=${location}&country=${country}&subjects=${subjects}`}
                      target="_self"
                    >
                      Sort
                    </Link>
                  </button>
                )}
              </form>

              {noOfCases.length === 0 ? (
                <div className="results">Found 0 tutors</div>
              ) : noOfCases > 1 ? (
                <div className="results">Found {noOfCases} tutors</div>
              ) : (
                <div className="results">Found {noOfCases} tutor</div>
              )}
            </div>
          </div>
        </section>
        <div className="wrap">
          {filterCard ? (
            <div className="filterCard container">
              <div className="filterTitle">
                <img
                  onClick={clickOnBackdrop}
                  style={{
                    width: "20px",
                    cursor: "pointer",
                    verticalAlign: "top",
                  }}
                  src="/images/cross-black.png"
                  alt=""
                />
                <h2>Filter Card</h2>
              </div>

              <form id="filterForm">
                <div className="modal-box-roletype">
                  <h2 style={{ margin: "0" }}>Subjects</h2>
                  <div className="row">
                    <div className="role_flex">
                      {noDuplicates.map((subject) => {
                        return (
                          <span key={subject._id}>
                            <input
                              id={subject.subjectName_en}
                              type="checkbox"
                              checked={
                                checks.includes(subject._id) ? true : false
                              }
                              name={subject.subjectName_en}
                              onChange={(e) => {
                                checkingsubject(e);
                                checkingchecks(subject._id);
                              }}
                              value={subject.subjectName}
                            />
                            <label htmlFor={subject.subjectName_en}>
                              {subject.subjectName_en}
                            </label>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="modal-box-location">
                  <h2 style={{ margin: "0" }}>Location</h2>
                  <div className="row">
                    <div className="states_flex">
                      <input
                        id="r"
                        type="checkbox"
                        checked={checkedKeelung ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedKeelung
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedKeelung(!checkedKeelung);
                        }}
                        value="基隆市"
                      />
                      <label htmlFor="r">Keelung City</label>
                      <input
                        id="a"
                        type="checkbox"
                        checked={checkedTaipei ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedTaipei
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedTaipei(!checkedTaipei);
                        }}
                        value="台北市"
                      />
                      <label htmlFor="a">Taipei City</label>
                      <input
                        name="location"
                        id="b"
                        checked={checkedNewTaipei ? true : false}
                        type="checkbox"
                        onChange={(event) => {
                          !checkedNewTaipei
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedNewTaipei(!checkedNewTaipei);
                        }}
                        value="新北市"
                      />
                      <label htmlFor="b">New Taipei City</label>
                      <input
                        id="c"
                        type="checkbox"
                        checked={checkedTaoyuan ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedTaoyuan
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedTaoyuan(!checkedTaoyuan);
                        }}
                        value="桃園市"
                      />
                      <label htmlFor="c">Taoyuan City</label>
                      <input
                        id="s"
                        type="checkbox"
                        checked={checkedHsinchuCity ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedHsinchuCity
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedHsinchuCity(!checkedHsinchuCity);
                        }}
                        value="新竹市"
                      />
                      <label htmlFor="s">Hsinchu City</label>
                      <input
                        id="d"
                        type="checkbox"
                        checked={checkedHsinchu ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedHsinchu
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedHsinchu(!checkedHsinchu);
                        }}
                        value="新竹縣"
                      />
                      <label htmlFor="d">Hsinchu County</label>
                      <input
                        id="e"
                        type="checkbox"
                        checked={checkedMiaoli ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedMiaoli
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedMiaoli(!checkedMiaoli);
                        }}
                        value="苗栗縣"
                      />
                      <label htmlFor="e">Miaoli County</label>
                      <input
                        id="f"
                        type="checkbox"
                        checked={checkedNantou ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedNantou
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedNantou(!checkedNantou);
                        }}
                        value="南投縣"
                      />
                      <label htmlFor="f">Nantou County</label>
                      <input
                        id="g"
                        type="checkbox"
                        name="location"
                        checked={checkedTaichung ? true : false}
                        onChange={(event) => {
                          !checkedTaichung
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedTaichung(!checkedTaichung);
                        }}
                        value="台中市"
                      />
                      <label htmlFor="g">Taichung City</label>
                      <input
                        id="h"
                        type="checkbox"
                        checked={checkedChanghwa ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedChanghwa
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedChanghwa(!checkedChanghwa);
                        }}
                        value="彰化縣"
                      />
                      <label htmlFor="h">Changhwa County</label>
                      <input
                        id="i"
                        type="checkbox"
                        checked={checkedYunlin ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedYunlin
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedYunlin(!checkedYunlin);
                        }}
                        value="雲林縣"
                      />
                      <label htmlFor="i">Yunlin County</label>
                      <input
                        id="t"
                        type="checkbox"
                        checked={checkedChiayiCity ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedChiayiCity
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedChiayiCity(!checkedChiayiCity);
                        }}
                        value="嘉義市"
                      />
                      <label htmlFor="t">Chiayi City</label>
                      <input
                        id="j"
                        type="checkbox"
                        checked={checkedChiayi ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedChiayi
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedChiayi(!checkedChiayi);
                        }}
                        value="嘉義縣"
                      />
                      <label htmlFor="j">Chiayi County</label>
                      <input
                        id="k"
                        type="checkbox"
                        checked={checkedTainan ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedTainan
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedTainan(!checkedTainan);
                        }}
                        value="台南市"
                      />
                      <label htmlFor="k">Tainan City</label>
                      <input
                        id="l"
                        type="checkbox"
                        checked={checkedKaohsiung ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedKaohsiung
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedKaohsiung(!checkedKaohsiung);
                        }}
                        value="高雄市"
                      />
                      <label htmlFor="l">Kaohsiung City</label>
                      <input
                        id="m"
                        type="checkbox"
                        checked={checkedPingtung ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedPingtung
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedPingtung(!checkedPingtung);
                        }}
                        value="屏東縣"
                      />
                      <label htmlFor="m">Pingtung County</label>
                      <input
                        id="n"
                        type="checkbox"
                        checked={checkedYilan ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedYilan
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedYilan(!checkedYilan);
                        }}
                        value="宜蘭縣"
                      />
                      <label htmlFor="n">Yilan County</label>
                      <input
                        id="o"
                        type="checkbox"
                        checked={checkedHualien ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedHualien
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedHualien(!checkedHualien);
                        }}
                        value="花蓮縣"
                      />
                      <label htmlFor="o">Hualien County</label>
                      <input
                        id="p"
                        type="checkbox"
                        checked={checkedTaitung ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedTaitung
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedTaitung(!checkedTaitung);
                        }}
                        value="台東縣"
                      />
                      <label htmlFor="p">Taitung County</label>
                      <input
                        id="q"
                        type="checkbox"
                        checked={checkedPenghu ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedPenghu
                            ? onLocationChange(event)
                            : onRemoveLocation(event);
                        }}
                        onClick={() => {
                          setCheckedPenghu(!checkedPenghu);
                        }}
                        value="澎湖縣"
                      />
                      <label htmlFor="q">Penghu Islands</label>
                      <input
                        id="int"
                        type="checkbox"
                        checked={checkedOverseas ? true : false}
                        name="country"
                        onChange={(event) => {
                          !checkedOverseas
                            ? onCountryChange(event)
                            : onRemoveCountry(event);
                        }}
                        onClick={() => {
                          setCheckedOverseas(!checkedOverseas);
                        }}
                        value="海外"
                      />
                      <label htmlFor="int">International</label>
                    </div>
                  </div>
                </div>
                <div className="modal-box-language">
                  <h2 style={{ margin: "0" }}>Tutor's spoken language</h2>
                  <div className="row">
                    <div className="language_flex">
                      <input
                        id="mandarin"
                        type="checkbox"
                        checked={checkedUni ? true : false}
                        name="language"
                        onChange={(event) => {
                          !checkedUni
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedUni(!checkedUni);
                        }}
                        value="國語 中文"
                      />
                      <label htmlFor="mandarin">Mandarin Chinese</label>
                      <input
                        id="taiwanese"
                        type="checkbox"
                        checked={checkedMusic ? true : false}
                        name="language"
                        onChange={(event) => {
                          !checkedMusic
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedMusic(!checkedMusic);
                        }}
                        value="台語 閩南語"
                      />
                      <label htmlFor="taiwanese">Taiwanese</label>

                      <input
                        id="engels"
                        type="checkbox"
                        checked={checkedSchool ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedSchool
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedSchool(!checkedSchool);
                        }}
                        value="英文"
                      />

                      <label htmlFor="engels">English</label>

                      <input
                        id="japanese"
                        type="checkbox"
                        checked={checkedTaal ? true : false}
                        name="language"
                        onChange={(event) => {
                          !checkedTaal
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedTaal(!checkedTaal);
                        }}
                        value="日語"
                      />
                      <label htmlFor="japanese">Japanese</label>

                      <input
                        id="french"
                        type="checkbox"
                        name="language"
                        checked={checkedStd ? true : false}
                        onChange={(event) => {
                          !checkedStd
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedStd(!checkedStd);
                        }}
                        value="法語"
                      />
                      <label htmlFor="french">French</label>
                    </div>
                  </div>
                </div>
                <input
                  type="button"
                  className="btn-search"
                  value="Clear all"
                  onClick={clearAll}
                />
              </form>
            </div>
          ) : (
            ""
          )}
          {filterCard ? (
            <div onClick={clickOnBackdrop} className="backdrop"></div>
          ) : (
            ""
          )}
          <main>
            <section>
              <div className="tilesGrid">
                {teachers.map((teacher) => {
                  return (
                    <div className="tiles" key={teacher._id}>
                      <ExternalLink
                        target="_blank"
                        href={
                          process.env.REACT_APP_BACKEND_URL +
                          `api/intlteachers/resumeCandidate/${teacher.nanoId}/${teacher.slugId}`
                        }
                      >
                        <div className="topBox" style={{ overflow: "hidden" }}>
                          <div>
                            {teacher.filename ? (
                              <figure className="smallPhoto">
                                <img src={teacher.filename} alt="" />
                              </figure>
                            ) : teacher.gender === "男" ||
                              teacher.gender === "Male" ? (
                              <figure className="smallPhoto">
                                <img src={`/teacherPhoto/boy.png`} alt="" />
                              </figure>
                            ) : (
                              <figure className="smallPhoto">
                                <img src={`/teacherPhoto/girl.png`} alt="" />
                              </figure>
                            )}

                            {teacher.country === "台灣" ? (
                              <span className="teacherName">
                                {teacher.lastName} 老師
                              </span>
                            ) : (
                              <span className="teacherName">
                                {teacher.firstName}
                              </span>
                            )}
                            <h4>Teacher ID: {teacher.teacherId}</h4>
                            {teacher.country !== "台灣" ? (
                              <h3>Australia</h3>
                            ) : (
                              <h3>
                                {teacher.state === "台北市"
                                  ? "Taipei City"
                                  : teacher.state === "新北市"
                                  ? "New Taipei City"
                                  : teacher.state === "桃園市"
                                  ? "Taoyuan City"
                                  : teacher.state === "新竹縣"
                                  ? "Hsinchu County"
                                  : teacher.state === "新竹市"
                                  ? "Hsinchu City"
                                  : teacher.state === "苗栗縣"
                                  ? "Miaoli County"
                                  : teacher.state === "台中市"
                                  ? "Taichung City"
                                  : teacher.state === "南投縣"
                                  ? "Nantou County"
                                  : teacher.state === "彰化縣"
                                  ? "Changhwa County"
                                  : teacher.state === "雲林縣"
                                  ? "Yunlin County"
                                  : teacher.state === "台南市"
                                  ? "Tainan City"
                                  : teacher.state === "嘉義縣"
                                  ? "Chiayi County"
                                  : teacher.state === "嘉義市"
                                  ? "Chiayi City"
                                  : teacher.state === "高雄市"
                                  ? "Kaohsiung City"
                                  : teacher.state === "屏東縣"
                                  ? "Pintung County"
                                  : teacher.state === "澎湖縣"
                                  ? "Penghu Country"
                                  : teacher.state === "宜蘭縣"
                                  ? "Yilan County"
                                  : teacher.state === "花蓮縣"
                                  ? "Hualien County"
                                  : teacher.state === "基隆市"
                                  ? "Keelung City"
                                  : teacher.state === "台東縣"
                                  ? "Taitung County"
                                  : ""}
                              </h3>
                            )}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                                overflow: "hidden",
                                width: "230px",
                                height: "58px",
                                position: "relative",
                                backgroundColor: "white",
                              }}
                            >
                              <span
                                className={teacher.university1 ? "green" : ""}
                              >
                                {teacher.university1}
                              </span>
                              <span
                                className={teacher.university2 ? "red" : ""}
                              >
                                {teacher.university2}
                              </span>
                              <span
                                className={teacher.university3 ? "blue" : ""}
                              >
                                {teacher.university3}
                              </span>
                              <br />
                              <span className={teacher.degree1 ? "green" : ""}>
                                {teacher.degree1}
                              </span>
                              <span className={teacher.degree2 ? "red" : ""}>
                                {teacher.degree2}
                              </span>
                              <span className={teacher.degree3 ? "blue" : ""}>
                                {teacher.degree3}
                              </span>
                            </div>
                          </div>
                          {listofCourses.map((course) => {
                            return <div key={course._id}></div>;
                          })}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateRows: "50% 50%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexWrap: "no-wrap",
                                overflow: "hidden",
                                width: "180px",
                              }}
                            >
                              <div className="leftBox">
                                <p
                                  style={{
                                    fontSize: "14px",
                                    marginBottom: "0",
                                  }}
                                >
                                  {teacher.skillOne1}
                                </p>
                                <p
                                  style={{
                                    fontSize: "14px",
                                    marginBottom: "0",
                                  }}
                                >
                                  {teacher.skillOne2}
                                </p>
                                <p
                                  style={{
                                    fontSize: "14px",
                                    marginBottom: "0",
                                  }}
                                >
                                  {teacher.skillOne3}
                                </p>
                              </div>
                              <div className="rightBox">
                                <p
                                  style={{
                                    fontSize: "14px",
                                    marginBottom: "0",
                                  }}
                                >
                                  {teacher.skillSchool1 === "專精達人" ||
                                  teacher.skillSchool1 === "Guru" ? (
                                    <span
                                      className="mx-2"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                    </span>
                                  ) : teacher.skillSchool1 === "經驗豐富" ||
                                    teacher.skillSchool1 === "Experienced" ? (
                                    <span
                                      className="mx-2"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                    </span>
                                  ) : teacher.skillSchool1 === "有一些經驗" ||
                                    teacher.skillSchool1 ===
                                      "Know fundamentals" ? (
                                    <span
                                      className="mx-2"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <i className="fas fa-star"></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                                <p
                                  style={{
                                    fontSize: "14px",
                                    marginBottom: "0",
                                  }}
                                >
                                  {teacher.skillSchool2 === "專精達人" ||
                                  teacher.skillSchool2 === "Guru" ? (
                                    <span
                                      className="mx-2"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                    </span>
                                  ) : teacher.skillSchool2 === "經驗豐富" ||
                                    teacher.skillSchool2 === "Experienced" ? (
                                    <span
                                      className="mx-2"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                    </span>
                                  ) : teacher.skillSchool2 === "有一些經驗" ||
                                    teacher.skillSchool2 ===
                                      "Know fundamentals" ? (
                                    <span
                                      className="mx-2"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <i className="fas fa-star"></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                                <p
                                  style={{
                                    fontSize: "14px",
                                    marginBottom: "0",
                                  }}
                                >
                                  {teacher.skillSchool3 === "專精達人" ||
                                  teacher.skillSchool3 === "Guru" ? (
                                    <span
                                      className="mx-2"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                    </span>
                                  ) : teacher.skillSchool3 === "經驗豐富" ||
                                    teacher.skillSchool3 === "Experienced" ? (
                                    <span
                                      className="mx-2"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                    </span>
                                  ) : teacher.skillSchool3 === "有一些經驗" ||
                                    teacher.skillSchool3 ===
                                      "Know fundamentals" ? (
                                    <span
                                      className="mx-2"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <i className="fas fa-star"></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                                overflow: "hidden",
                                width: "100%",
                                height: "70px",
                                position: "relative",
                                backgroundColor: "white",
                              }}
                            >
                              <span
                                className={teacher.skillTwo1 ? "greenSm" : ""}
                              >
                                {teacher.skillTwo1 && teacher.skillTwo1}
                              </span>
                              <span
                                className={teacher.skillTwo2 ? "greenSm" : ""}
                              >
                                {teacher.skillTwo2 && teacher.skillTwo2}
                              </span>
                              <span
                                className={teacher.skillTwo3 ? "greenSm" : ""}
                              >
                                {teacher.skillTwo3 && teacher.skillTwo3}
                              </span>
                              <br />
                              <span
                                className={teacher.skillThree1 ? "redSm" : ""}
                              >
                                {teacher.skillThree1 && teacher.skillThree1}
                              </span>
                              <span
                                className={teacher.skillThree2 ? "redSm" : ""}
                              >
                                {teacher.skillThree2 && teacher.skillThree2}
                              </span>
                              <span
                                className={teacher.skillThree3 ? "redSm" : ""}
                              >
                                {teacher.skillThree3 && teacher.skillThree3}
                              </span>
                              <br />
                              <span
                                className={
                                  teacher.whichlanguage0_en ? "blueSm" : ""
                                }
                              >
                                {teacher.whichlanguage0_en &&
                                  teacher.whichlanguage0_en}
                              </span>
                              <span
                                className={
                                  teacher.whichlanguage1_en ? "blueSm" : ""
                                }
                              >
                                {teacher.whichlanguage1_en &&
                                  teacher.whichlanguage1_en}
                              </span>
                              <span
                                className={
                                  teacher.whichlanguage2_en ? "blueSm" : ""
                                }
                              >
                                {teacher.whichlanguage2_en &&
                                  teacher.whichlanguage2_en}
                              </span>
                            </div>
                          </div>
                        </div>
                      </ExternalLink>
                    </div>
                  );
                })}
                {teachers.length === 0 && (
                  <div className="no-listings">
                    <h2>No tutors at the moment.</h2>
                  </div>
                )}
              </div>
            </section>
          </main>

          <nav className="paginate">
            <ul>
              {maxPage >= 2 ? (
                page > 1 ? (
                  <li key={1} className="previous" onClick={pagePrevious}></li>
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

          <Footer />
        </div>
        <style jsx="true">{`
          body {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          /*================== TEACHER CARDS ================= */
          main {
            display: grid;
            grid-template-columns: 16rem auto 30rem;
            gap: 2rem;
            width: 96%;
            margin: 1rem auto 4rem;
          }
          main .tilesGrid {
            background-color: transparent;
            width: 1500px;
            display: grid;
            margin-top: 0px;
            grid-template-columns: 30% 30% 30%;
            grid-row-gap: 12px;
            grid-column-gap: 12px;
          }

          main .tiles {
            width: 430px;
            height: 171px;
            border-radius: 5px;
            cursor: pointer;
            border-top: 5px solid #a5ce0f;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }

          main .red {
            color: #e40000;
            font-size: 14px;
            height: 26px;
            line-height: 24px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-right: 8px;
            margin-bottom: 3px;
          }
          main .green {
            color: green;
            font-size: 14px;
            height: 26px;
            line-height: 24px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid green;
            margin-right: 8px;
            margin-bottom: 3px;
          }

          main .blue {
            color: #54c8e8;
            font-size: 14px;
            height: 26px;
            line-height: 24px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #54c8e8;
            margin-right: 8px;
            margin-bottom: 3px;
          }
          main .greenSm {
            color: green;
            font-size: 14px;
            height: 20px;
            line-height: 18px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid green;
            margin-right: 8px;
            margin-bottom: 3px;
          }
          main .blueSm {
            color: #54c8e8;
            font-size: 14px;
            height: 20px;
            line-height: 18px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #54c8e8;
            margin-right: 8px;
            margin-bottom: 3px;
          }
          main .redSm {
            color: #e40000;
            font-size: 14px;
            height: 20px;
            line-height: 18px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-right: 8px;
            margin-bottom: 3px;
          }

          main .topBox {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px 5px 20px;
            overflow: hidden;
            background-color: white;
            margin: 0;
            height: 100%;
            border-bottom: 1px solid rgba(0, 0, 0, 0.18);
          }

          main .topBox .smallPhoto {
            display: inline-block;
            margin: 0px;
          }

          main .topBox .teacherName {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 3px;
            margin-left: 5px;
            position: relative;
            top: -10px;
          }

          main .topBox h2 {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 3px;
          }
          main .topBox h4 {
            color: rgba(99, 106, 109);
            font-weight: 200;
            font-family: "Noto Sans TC", sans-serif;
            font-size: 14px;
            margin-bottom: 7px;
          }

          main .topBox h3 {
            color: #2f383c;
            font-size: 1rem;
            word-break: break-word;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 3px;
          }
          main .topBox p {
            font-size: 28px;
            font-weight: 600;
            color: #2f383c;
          }

          main .topBox a {
            color: white;
            height: 100%;
            width: 100%;
          }
          .fa-star {
            color: gold;
            font-size: 14px;
          }

          .ratings {
            font-size: 14px;
            margin-left: 5px;
          }
          .no-listings {
            text-align: center;
            margin-top: 20px;
            padding: 0px auto;
          }
          .no-listings h2 {
            color: 333;
            font-weight: 800;
            margin: 0;
            font-size: 18px;
          }
          /*===================== FILTER CARD ================= */

          .wrap .filterCard {
            width: 420px;
            height: 95vh;
            padding: 20px 10px;
            align-items: center;
            border-radius: 0px;
            background: #fff;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            z-index: 3000;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            position: absolute;
            display: block;
            animation: filterframe 300ms ease-in 0ms;
            overflow: scroll;
          }

          @keyframes filterframe {
            from {
              transform: translate(-50%, -30%);
              opacity: 0;
            }
            to {
              transform: translateY(-50%, -50%);
              opacity: 1;
            }
          }

          @media only screen and (min-width: 768px) {
            .wrap .filterCard {
              width: 680px;
              padding: 30px 16px;
              z-index: 3500;
            }
          }

          .wrap .filterCard .filterTitle {
            position: relative;
            height: 42px;
            line-height: 42px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .filterCard .filterTitle h2 {
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            font-weight: 600;
            font-size: 18px;
            font-family: Museo-Sans-500;
            color: rgb(51, 63, 72);
          }

          .wrap .filterCard .filterTitle img:hover {
            background-color: #dedede;
          }

          .modal-box-roletype {
            display: block;
            background: white;
            width: 100%;
            padding-bottom: 20px;
            margin: 30px auto;
            position: relative;
            font-size: 13px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .modal-box-roletype h2 {
            color: rgb(51, 63, 72);
            font-size: 16px;
            font-weight: 600;
            font-family: Museo-Sans-500;
          }

          .modal-box-language {
            display: block;
            background: white;
            width: 100%;
            padding-bottom: 20px;
            margin: 30px auto;
            position: relative;
            font-size: 13px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .modal-box-language h2 {
            color: rgb(51, 63, 72);
            font-size: 16px;
            font-weight: 600;
            font-family: Museo-Sans-500;
          }

          .wrap .modal-box-location {
            display: block;
            background: white;
            width: 100%;
            padding-bottom: 20px;
            margin: 30px auto;
            position: relative;
            font-size: 13px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .modal-box-location h2 {
            color: rgb(51, 63, 72);
            font-size: 16px;
            font-weight: 600;
            font-family: Museo-Sans-500;
          }

          .filterCard .btn-search {
            height: 48px;
            border-radius: 4px;
            width: 120px;
            font-weight: 800;
            font-size: 20px;
            background-color: #a5ce0f;
            text-align: center;
            border-color: #a5ce0f;
            box-sizing: border-box;
            margin-top: 0px;
            cursor: pointer;
            padding: 1px auto;
            line-height: 32px;
            color: #fff;
            position: relative;
            outline: none;
            border: none;
          }
          .modal-box-location input[type="checkbox"],
          .modal-box-roletype input[type="checkbox"],
          .modal-box-language input[type="checkbox"] {
            display: none;
            margin: 0;
            width: 0;
          }
          .fix-Container {
            width: 100%;
            height: 56px;
            position: relative;
          }

          .states_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 1px 0px 0px 80px;
            height: 100%;
          }
          .language_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 1px 0px 0px 80px;
            height: 100%;
          }
          .role_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 1px 0px 0px 80px;
            height: 100%;
          }

          .filterCard .btn-search:active,
          .filterCard .btn-search:focus {
            outline: none;
            border: none;
          }

          .results {
            position: relative;
            height: 56px;
            line-height: 56px;
            width: 200px;
            font-weight: 600;
            font-size: 13px;
            font-family: "Noto Sans TC", sans-serif;
            color: rgb(51, 63, 72);
            display: none;
          }

          .nonselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
          }

          #filterPanel {
            width: 150px;
            height: 40px;
            padding: 5px 16px;
            line-height: 30px;
            font-size: 13px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            cursor: pointer;
            display: inline-block;
            font-family: sans-serif;
            font-weight: 500;
            position: relative;
            left: 30px;
            top: 7px;
          }

          #filterPanel span {
            margin-left: 26px;
            font-weight: 500;
          }

          #filterPanel:hover,
          #arrow-down:hover {
            background-color: #f7f8f9;
            border-color: #353f47;
          }

          #arrow-up {
            background-image: url(./../../images/arrow-up.png);
            height: 40px;
            width: 150px;
            line-height: 32px;
            font-size: 13px;
            border-radius: 4px;
            border: 1px solid #dce0e0;
            position: relative;
            left: 50px;
            top: 7px;
            text-align: center;
            font-family: sans-serif;
            font-weight: 500;
            cursor: pointer;
            display: inline-block;
            background-repeat: no-repeat;
            background-position: 19px 14px;
            background-size: 13px;
            padding: 0;
            background-color: #a5ce0f;
            border: 1px solid #a5ce0f;
          }

          #arrow-down {
            background-image: url(./../../images/arrow-down.png);
            height: 40px;
            width: 150px;
            line-height: 32px;
            font-size: 13px;
            border-radius: 4px;
            border: 1px solid #dce0e0;
            text-align: center;
            font-family: sans-serif;
            font-weight: 500;
            cursor: pointer;
            background-color: white;
            background-repeat: no-repeat;
            background-position: 19px 14px;
            background-size: 13px;
            display: inline-block;
            position: relative;
            left: 50px;
            top: 7px;
            padding: 0;
          }
          #arrow-up a {
            height: 100%;
            width: 100%;
            color: #fff;
            position: relative;
            font-family: sans-serif;
            font-weight: 500;
            display: block;
            line-height: 40px;
          }
          #arrow-down a {
            height: 100%;
            width: 100%;
            color: #484848;
            position: relative;
            font-family: sans-serif;
            font-weight: 500;
            display: block;
            line-height: 40px;
          }
          #filter {
            background-image: url(./../../images/filters-small.png);
            height: 30px;
            width: 30px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 22px;
            display: block;
            position: absolute;
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
          .checkboxes {
            background-color: #a5ce0f;
            cursor: pointer;
            color: white;
            border: 1px solid #a5ce0f;
            position: relative;
            width: 250px;
            font-size: 16px;
            text-align: center;
            height: 40px;
            margin-top: 18px;
            border-radius: 4px;
            transform: translateX(19%);
            outline: none;
          }

          .checkboxes:focus,
          .checkboxes:active {
            outline: none;
          }

          input::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            color: #555 !important;
            font-weight: bold;
          }
          input::-moz-placeholder {
            /* Firefox 19+ */
            color: #555 !important;
            font-weight: bold;
          }
          input :-ms-input-placeholder {
            /* IE 10+ */
            color: #555 !important;
            font-weight: bold;
          }
          input:-moz-placeholder {
            /* Firefox 18- */
            color: #555 !important;
            font-weight: bold;
          }
          input[type="checkbox"] {
            opacity: 0;
            float: left;
          }

          /* ============= CHECKBOXES ================*/
          input[type="checkbox"] + label {
            margin: 0 0 0 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
            float: left;
            margin: 0px;
            width: 100%;
          }
          input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -45px;
            top: 19px;
            width: 20px;
            height: 20px;
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
            left: -50px;
            top: 15px;
            width: 30px;
            height: 30px;
            display: block;
            z-index: 1;
            background: url("./../../images/check.png");
            background-repeat: no-repeat;
            background-size: 15px;
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

          @keyframes myframes {
            from {
              opacity: 1;
              transform: translateY(-40%);
            }
            to {
              opacity: 1;
              transform: translateY(0%);
            }
          }

          @media only screen and (min-width: 768px) {
            .results {
              display: block;
            }
          }
          /* ============ PAGINATION ON BOTTOM ========== */
          .paginate {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            border: none;
            z-index: 500;
            margin: 22px auto;
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

          /* ============ MEDIA QUERIES FOR TABLETS =========*/
          @media screen and (max-width: 1024px) {
            .topBox {
              position: relative;
              width: 100%;
            }
            main .tilesGrid {
              display: grid;
              grid-column-gap: 0.1em;
              background-size: cover;
              grid-template-columns: 50% 50%;
              position: relative;
              padding: 0px 0px 0px 15px;
              overflow: hidden;
              position: relative;
              width: 1000px;
            }
            main .tiles {
              position: relative;
              width: 455px;
            }
            .wrap {
              padding: 0 auto;
            }
          }

          /*  ====== MEDIA QUERIES FOR MOBILE PHONES */

          @media screen and (max-width: 768px) {
            .topBox {
              position: relative;
              width: 100%;
            }
            main .tilesGrid {
              display: grid;
              grid-column-gap: 0.1em;
              background-size: cover;
              grid-template-columns: 100%;
              position: relative;
              padding: 0px 0px 0px 15px;
              overflow: hidden;
              position: relative;
              width: 485px;
            }
            main .tiles {
              position: relative;
              width: 455px;
            }
            .wrap {
              padding: 0 auto;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default TeacherDb;
