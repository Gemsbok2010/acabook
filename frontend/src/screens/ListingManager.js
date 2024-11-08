import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { ReactSession } from "react-client-session";
import { useSelector } from "react-redux";
import axios from "axios";
// Three dots
import { ThreeDots } from "react-loader-spinner";

const ListingManager = () => {
  ReactSession.setStoreType("sessionStorage");
  const user = useSelector((state) => state.userInfo.value);

  const { search } = useLocation();
  const [listingInfo, setListingInfo] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [newApplicants, setNewApplicants] = useState([]);
  const [noApplied, setNoApplied] = useState("");
  const [noOfCases, setNoOfCases] = useState([]);
  const [page, setPage] = useState([]);
  const [maxPage, setMaxPage] = useState([]);
  const email = user.email;

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/listingmanager?page=${page <= 0 ? 0 : page - 1}` +
        "&sortBy=" +
        sort +
        "&contract=" +
        contract +
        "&subjects=" +
        subjects +
        "&location=" +
        location +
        "&email=" +
        email
    );

    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setListingInfo(data.adPosts);

    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/listingmanager?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&sortBy=" +
        sort +
        "&contract=" +
        contract +
        "&subjects=" +
        subjects +
        "&location=" +
        location +
        "&email=" +
        email
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setListingInfo(data.adPosts);
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
        `api/listings/listingmanager?page=${id + 1}` +
        "&contract=" +
        contract +
        "&subjects=" +
        subjects +
        "&location=" +
        location +
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
    setListingInfo(data.adPosts);
    setCandidates(data.candidates);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setListOfSubjects(data.subjects);
  };

  // =============== SORT ================
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);
  const [reload, setReload] = useState(false);

  const sorting = async (ascDesc) => {
    setReload(false);
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/listingmanager?sortBy=asc" +
          "&contract=" +
          contract +
          "&subjects=" +
          subjects +
          "&location=" +
          location +
          "&page=" +
          page +
          "&email=" +
          email +
          "&slug=" +
          ReactSession.get("slug")
      );
      const data = await res.json();
      setReload(true);
      setNoOfCases(data.num);
      setListingInfo(data.adPosts);
      setCandidates(data.candidates);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setListOfSubjects(data.subjects);
    }

    if (ascDesc === true) {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/listingmanager?sortBy=desc" +
          "&contract=" +
          contract +
          "&subjects=" +
          subjects +
          "&location=" +
          location +
          "&page=" +
          page +
          "&email=" +
          email +
          "&slug=" +
          ReactSession.get("slug")
      );
      const data = await res.json();
      setReload(true);
      setNoOfCases(data.num);
      setListingInfo(data.adPosts);
      setCandidates(data.candidates);
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
  const [contract, setContract] = useState([]);
  const [listOfSubjects, setListOfSubjects] = useState([]);
  const [checks, setChecks] = useState([]);
  const [location, setLocation] = useState([]);

  const [subjects, setSubjects] = useState([]);

  const [checkedUni, setCheckedUni] = useState(false);
  const [checkedSchool, setCheckedSchool] = useState(false);
  const [checkedStd, setCheckedStd] = useState(false);
  const [checkedTaal, setCheckedTaal] = useState(false);
  const [checkedMusic, setCheckedMusic] = useState(false);

  // ========= ADD LEVEL (大學 學校 一般課程 etc) ==========
  const onContractChange = async (event) => {
    const { value } = event.target;
    setContract([...contract, value]);
  };

  // ========== REMOVE LEVEL (大學 學校 一般課程 etc) ==========
  const onRemoveLevel = async (event) => {
    const { value } = event.target;
    const index = contract.indexOf(value);
    if (index !== -1) {
      contract.splice(index, 1);
    }
    setContract([...contract]);
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
    setLocation([]);
    setContract([]);
    setSubjects([]);
    setChecks([]);
  };

  // ============== BACKDROP ============== //
  const [backdrop, setBackdrop] = useState(false);

  const clickOnBackdrop = () => {
    setBackdrop(false);
    setFilterCard(false);
  };

  const highlight = async (slug) => {
    ReactSession.set("slug", slug);
    setReload(false);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/candidates?sortBy=` +
        sort +
        "&contract=" +
        contract +
        "&subjects=" +
        subjects +
        "&location=" +
        location +
        "&page=" +
        page +
        "&email=" +
        email +
        "&slug=" +
        slug
    );
    const data = await res.json();

    setReload(true);
    setNoOfCases(data.num);
    setListingInfo(data.adPosts);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setCandidates(data.candidates);
    setListOfSubjects(data.subjects);
  };

  const activeAd = async (e, slug) => {
    e.preventDefault();
    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/sleepAd/${slug}/?sortBy=` +
        sort +
        "&page=" +
        page,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isTeacherJob: false }),
      }
    );
    const data = await res.json();

    if (data) {
      setListingInfo(data.adPosts);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setBackdrop(false);
    }
  };

  const sleepAd = async (e, slug) => {
    e.preventDefault();
    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/sleepAd/${slug}/?sortBy=` +
        sort +
        "&page=" +
        page,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isTeacherJob: true }),
      }
    );
    const data = await res.json();

    if (data) {
      setListingInfo(data.adPosts);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setBackdrop(false);
    }
  };

  const onReject = async (e, slugId, nanoId) => {
    e.preventDefault();

    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/reject/${slugId}/${nanoId}?sortBy=` +
        sort +
        "&page=" +
        page,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isRejected: true }),
      }
    );

    const data = await res.json();
    if (data) {
      setNewApplicants(data.newApplicants);
      setCandidates(data.candidates);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
    }
  };

  // ============= GET LISTINGMANAGER ===============
  // ============= GET SEARCH FILTER ================

  useEffect(() => {
    let isCancelled = false;

    if (search === "") {
      sessionStorage.clear();
    }

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/listingmanager?" +
          "contract=" +
          contract +
          "&subjects=" +
          subjects +
          "&location=" +
          location +
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
      console.log(data);
      if (isCancelled === false) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setReload(true);
        setNoOfCases(data.num);
        setListingInfo(data.adPosts);
        setCandidates(data.candidates);
        setPage(data.page);
        setMaxPage(data.maxPage);
        setSort(data.sort);
        setNewApplicants(data.newApplicants);
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
  }, [contract, subjects, location, search, email, sort, page]);

  // ======= TAKE OUT DUPLICATE SUBJECTS ======

  const noDuplicates = [
    ...new Map(listOfSubjects.map((list) => [list.subjectName, list])).values(),
  ];

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossorigin="anonymous"
          />
          <meta name="description" content="愛課網" />
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
        <section>
          <div className="fix-Container">
            <div className="row">
              <div
                className="nonselect"
                id="filterPanel"
                onClick={appearFunction}
              >
                <div id="filter"></div>
                <span>快搜選項</span>
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
                      to={`?sortBy=desc&contract=${contract}&location=${location}&subjects=${subjects}`}
                      target="_self"
                    >
                      由舊到新排序
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
                      to={`?sortBy=asc&contract=${contract}&location=${location}&subjects=${subjects}`}
                      target="_self"
                    >
                      由新到舊排序
                    </Link>
                  </button>
                )}
              </form>

              {noOfCases.length === 0 ? (
                <div className="results">目前找到 0 個工作Case</div>
              ) : (
                <div className="results">目前找到 {noOfCases} 個工作Case</div>
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
                <h2>快搜選項</h2>
              </div>

              <form id="filterForm">
                <div className="modal-box-contract">
                  <h2 style={{ margin: "0" }}>課程類別</h2>
                  <div className="row">
                    <div className="contract_flex">
                      <input
                        id="university"
                        type="checkbox"
                        checked={checkedUni ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedUni
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedUni(!checkedUni);
                        }}
                        value="大學"
                      />
                      <label htmlFor="university">大學</label>

                      <input
                        id="school"
                        type="checkbox"
                        checked={checkedSchool ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedSchool
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedSchool(!checkedSchool);
                        }}
                        value="學校"
                      />
                      <label htmlFor="school">學校</label>
                      <input
                        id="standard"
                        type="checkbox"
                        name="contract"
                        checked={checkedStd ? true : false}
                        onChange={(event) => {
                          !checkedStd
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedStd(!checkedStd);
                        }}
                        value="一般課程"
                      />
                      <label htmlFor="standard">一般課程</label>
                      <input
                        id="language"
                        type="checkbox"
                        checked={checkedTaal ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedTaal
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedTaal(!checkedTaal);
                        }}
                        value="語言"
                      />
                      <label htmlFor="language">語言</label>
                      <input
                        id="music"
                        type="checkbox"
                        checked={checkedMusic ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedMusic
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedMusic(!checkedMusic);
                        }}
                        value="樂器"
                      />
                      <label htmlFor="music">樂器</label>
                    </div>
                  </div>
                </div>

                <div className="modal-box-roletype">
                  <h2 style={{ margin: "0" }}>科目</h2>
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
                              {subject.subjectName}
                            </label>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="modal-box-location">
                  <h2 style={{ margin: "0" }}>縣市位置</h2>
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
                      <label htmlFor="r">基隆市</label>
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
                      <label htmlFor="a">台北市</label>
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
                      <label htmlFor="b">新北市</label>
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
                      <label htmlFor="c">桃園市</label>
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
                      <label htmlFor="s">新竹市</label>
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
                      <label htmlFor="d">新竹縣</label>
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
                      <label htmlFor="e">苗栗縣</label>
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
                      <label htmlFor="f">南投縣</label>
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
                      <label htmlFor="g">台中市</label>
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
                      <label htmlFor="h">彰化縣</label>
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
                      <label htmlFor="i">雲林縣</label>
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
                      <label htmlFor="t">嘉義市</label>
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
                      <label htmlFor="j">嘉義縣</label>
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
                      <label htmlFor="k">台南市</label>
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
                      <label htmlFor="l">高雄市</label>
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
                      <label htmlFor="m">屏東縣</label>
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
                      <label htmlFor="n">宜蘭縣</label>
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
                      <label htmlFor="o">花蓮縣</label>
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
                      <label htmlFor="p">台東縣</label>
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
                      <label htmlFor="q">澎湖縣</label>
                    </div>
                  </div>
                </div>
                <input
                  type="button"
                  className="btn-search"
                  value="清除所有"
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

          <section className="listContent container-fluid">
            <div className="wrapper">
              <div className="adList">
                <div className="wrapper-ads">
                  {listingInfo.map((listing) => {
                    return (
                      <div className="ads" key={listing._id}>
                        <div className="leftmessage">
                          <ExternalLink
                            href={
                              process.env.REACT_APP_BACKEND_URL +
                              `api/listings/edit/${listing.slug}`
                            }
                          >
                            <div className="edit-ad">編輯</div>
                          </ExternalLink>

                          <ExternalLink
                            href={
                              process.env.REACT_APP_BACKEND_URL +
                              `api/listings/adPosts/${listing.slug}`
                            }
                            target="_blank"
                          >
                            <div className="preview-ad">查看</div>
                          </ExternalLink>

                          <div
                            id={
                              ReactSession.get("slug") === listing.slug
                                ? "chosenOne"
                                : ""
                            }
                            className="applicants"
                            onClick={() => {
                              highlight(listing.slug);
                            }}
                          >
                            {newApplicants.map((newApplicant) => {
                              return newApplicant.slugId === listing.slug ? (
                                ReactSession.get("slug") === listing.slug ? (
                                  <span
                                    className="alertCircle"
                                    key={newApplicant._id}
                                  >
                                    {noApplied}
                                  </span>
                                ) : (
                                  <span
                                    className="alertCircle"
                                    key={newApplicant._id}
                                  >
                                    新
                                  </span>
                                )
                              ) : (
                                <span key={newApplicant._id}></span>
                              );
                            })}
                            申請老師
                          </div>

                          {listing.isTeacherJob ? (
                            <div
                              className="retire"
                              id={listing.isTeacherJob && "sleep"}
                              onClick={(e) => {
                                activeAd(e, listing.slug);
                              }}
                            >
                              暫歇刊登{" "}
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
                            </div>
                          ) : (
                            <>
                              <div
                                className="retire"
                                id={listing.isTeacherJob ? "" : "notsleep"}
                                onClick={(e) => {
                                  sleepAd(e, listing.slug);
                                }}
                              >
                                關閉中
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
                              </div>
                            </>
                          )}

                          <h2>
                            {listing.subjects + " "}
                            {listing.contractType === "大學" ? (
                              <span className="highlight_university">
                                {listing.contractType}
                              </span>
                            ) : listing.contractType === "學校" ? (
                              <span className="highlight_school">
                                {listing.contractType}
                              </span>
                            ) : listing.contractType === "一般課程" ? (
                              <span className="highlight_standard">
                                {listing.contractType}
                              </span>
                            ) : listing.contractType === "語言" ? (
                              <span className="highlight_language">
                                {listing.contractType}
                              </span>
                            ) : (
                              <span className="highlight_music">
                                {listing.contractType}
                              </span>
                            )}
                          </h2>
                          <h3 style={{ fontWeight: "200" }}>
                            Case 編號： {listing.caseId}
                          </h3>
                          <h3
                            style={{
                              height: "30px",
                              width: "150px",
                              display: "block",
                              color: "#2b2b2b",
                            }}
                          >
                            {listing.state + listing.city}
                          </h3>
                          <h3>刊登日期: {listing.todaysDate}</h3>
                          <p>{listing.about}</p>
                        </div>
                      </div>
                    );
                  })}
                  {listingInfo.length === 0 && (
                    <div className="no-listings">
                      <h2>目前無刊登找家教</h2>
                    </div>
                  )}
                </div>
              </div>

              {ReactSession.get("slug") ? (
                <div
                  className="applicant-ads"
                  style={{ display: reload ? "block" : "none" }}
                >
                  {candidates.map((candidate) => {
                    return (
                      <div
                        className={"ads"}
                        key={candidate._id}
                        style={
                          candidate.seen
                            ? { backgroundColor: "white" }
                            : { backgroundColor: "#fffec8" }
                        }
                      >
                        {candidate.photo ? (
                          <figure className="candidatePhoto">
                            <img
                              src={`/teacherPhoto/${candidate.photo}`}
                              alt=""
                            />
                          </figure>
                        ) : (
                          <span key={candidate._id}></span>
                        )}

                        <div className="rightmessage">
                          <div className="bookdateBar">
                            <ExternalLink
                              target="_blank"
                              href={
                                process.env.REACT_APP_BACKEND_URL +
                                `api/teachers/resumeCandidate/${candidate.nanoId}/${candidate.slugId}`
                              }
                            >
                              <div className="previewme">履歷</div>
                            </ExternalLink>

                            <div
                              className="reject"
                              onClick={(e) => {
                                onReject(e, candidate.slugId, candidate.nanoId);
                              }}
                            >
                              婉拒
                            </div>
                          </div>
                          <h2>
                            {candidate.lastName}
                            <span style={{ fontSize: "13px", fontWeight: 300 }}>
                              老師
                            </span>
                            {candidate.seen ? (
                              <span className="seen">已讀取</span>
                            ) : (
                              <span className="new">新</span>
                            )}
                            <span className="ratings">
                              4.8
                              <span className="mx-2">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </span>
                              {/* <span className="graySpan">61 Reviews</span> */}
                            </span>
                          </h2>
                          <div className={"parentfirstSecond"}>
                            <div className="firstBox">
                              <p className="home">
                                地點：{candidate.state}
                                {candidate.city}
                              </p>

                              <p className="pig">
                                時薪：{candidate.yourpay} 元
                              </p>
                            </div>
                            <div className="secondBox">
                              {candidate.hometutor === "我不太方便" ? (
                                <p className="forbid">到府授課</p>
                              ) : (
                                <p className="yes">到府授課</p>
                              )}
                              {candidate.onlinetutor === "我不太方便" ? (
                                <p className="forbid">線上授課</p>
                              ) : (
                                <p className="yes">線上授課</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {candidates.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        height: "90px",
                        lineHeight: "90px",
                      }}
                    >
                      目前沒有老師應徵
                    </div>
                  )}
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </section>
          <div className="buttonSegment">
            <div
              style={{
                height: "70px",
                width: "100%",
              }}
            >
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
          </div>
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

          .new {
            color: green;
            font-size: 16px;
            height: 28px;
            line-height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid green;
            margin-left: 10px;
          }

          .seen {
            color: #e40000;
            font-size: 16px;
            height: 28px;
            line-height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-left: 10px;
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
          .wrap .modal-box-roletype {
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

          .modal-box-contract {
            display: block;
            background: white;
            width: 100%;
            padding-bottom: 20px;
            margin: 30px auto;
            position: relative;
            font-size: 13px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .modal-box-contract h2 {
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
          .modal-box-contract input[type="checkbox"] {
            display: none;
            margin: 0;
            width: 0;
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
          .contract_flex {
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

          .modal-box-location input[type="checkbox"],
          .modal-box-roletype input[type="checkbox"],
          .modal-box-contract input[type="checkbox"] {
            display: none;
            margin: 0;
            width: 0;
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
          /*Checboxes*/
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

          .wrapper {
            display: grid;
            grid-column-gap: 2em;
            background-size: cover;
            grid-auto-rows: 796px;
            grid-template-columns: 100%;
            position: relative;
            padding: 0px 25px 0px 25px;
            overflow: hidden;
          }

          .buttonSegment {
            display: grid;
            grid-template-columns: 56% 44%;
            padding: 0px 0px 0px 15px;
          }

          .wrapper-ads .ads {
            height: 230px;
            width: 100%;
            border-radius: 0px;
            border: none;
            margin: 15px 10px 10px 0px;
            position: relative;
            overflow: hidden;
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

          .ads p {
            height: 46px;
            overflow: hidden;
          }

          .wrap .alertCircle {
            background-color: #e40000;

            border-radius: 50%;
            color: white;
            height: 30px;
            width: 30px;
            line-height: 30px;
            position: absolute;
            transform: translate(210%, -50%);
          }

          .wrapper .adList {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            position: relative;
          }
          ::-webkit-scrollbar {
            display: none;
          }
          ::-moz-scrollbar {
            display: none;
          }
          :-ms-scrollbar {
            display: none;
          }
          .scrollbar {
            display: none;
          }

          @media only screen and (min-width: 768px) {
            .wrapper {
              grid-template-columns: 56% 44%;
              padding: 0px 50px 0px 25px;
            }
          }

          /* ============ POSTS =============== */

          .wrapper-ads .leftmessage {
            margin-left: 0px;
            height: 230px;
            position: relative;
            overflow: hidden;
            background: white;
            border: 2px solid #ebebeb;
            height: 100%;
          }
          .wrapper-ads .ads:hover {
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .wrapper-ads .leftmessage h2 {
            font-size: 18px;
            font-family: sans-serif;
            font-weight: 600;
            color: #333;
            margin: 10px 10px 10px 10px;
          }

          .wrapper-ads .leftmessage h3 {
            font-size: 15px;
            font-family: sans-serif;
            color: #333;
            font-weight: 800;
            margin: 15px 10px;
          }
          .wrapper-ads .leftmessage p {
            font-size: 15px;
            font-family: sans-serif;
            font-weight: 100;
            color: #333;
            margin: 10px 10px;
          }

          .applicant-ads {
            animation: myframes 500ms ease-in-out 0ms;
          }

          #chosenOne {
            background-color: #a5ce0f;
            border: 1px solid #a5ce0f;
            font-weight: 800;
            color: white;
          }

          #sleep {
            background-color: #e40000;
            border: 1px solid #e40000;
            font-weight: 800;
            color: white;
          }
          #notsleep {
            background-color: #a5ce0f;
            border: 1px solid #a5ce0f;
            font-weight: 800;
            color: white;
          }

          .applicant-ads .ads {
            height: 140px;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #333;
            background-color: white;
            margin: 15px 10px 10px 0px;
            position: relative;
            overflow: hidden;
            display: block;
            padding-top: 20px;
          }

          .candidatePhoto {
            width: 39px;
            height: 39px;
            border-radius: 50%;
            position: absolute;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            transform: translate(-50%, -50%);
            left: 8%;
            top: 50%;
            overflow: hidden;
            background: #eee;
            border: 2px solid white;
          }

          .candidatePhoto img {
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

          .fa-star {
            color: gold;
            font-size: 14px;
          }

          .ratings {
            font-size: 14px;
            margin-left: 5px;
          }

          .parentfirstSecond {
            display: flex;
            justify-content: space-between;
            width: 310px;
          }

          .applicant-ads .rightmessage {
            margin-left: 90px;
            cursor: default;
            height: 140px;
            position: relative;
            height: 100%;
          }

          .applicant-ads .rightmessage h2 {
            font-size: 18px;
            font-family: sans-serif;
            font-weight: 600;
            color: #2b2b2b;
            margin: 0px 10px 10px 0px;
          }

          .applicant-ads .ads .rightmessage p {
            margin: 9px 2px 0px;
            color: #777;
            padding-left: 25px;
            font-size: 15px;
            font-weight: 300;
            font-family: sans-serif;
            height: 22px;
            position: relative;
            /* width: 400px; */
          }

          .ads .rightmessage {
            width: 100%;
          }

          .bookdateBar {
            position: absolute;
            display: flex;
            justify-content: space-evenly;
            width: 90px;
            height: 100%;
            flex-direction: column;
            left: 59%;
          }

          .previewme,
          .reject {
            width: 90px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            position: relative;
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
          }
          .fs-sign-link,
          .fs-edit-link,
          .formswift-button {
            display: none;
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
          .preview-ad,
          .edit-ad,
          .retire,
          .applicants {
            width: 115px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            position: absolute;
            top: 30%;
            left: 96%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
          }
          .preview-ad {
            position: absolute;
            top: 20%;
            left: 55%;
            transform: translate(-50%, -50%);
            display: block;
          }
          .edit-ad {
            position: absolute;
            top: 45%;
            left: 55%;
            transform: translate(-50%, -50%);
            display: block;
          }

          .applicants {
            position: absolute;
            top: 45%;
            left: 85%;
            transform: translate(-50%, -50%);
            display: block;
          }
          .retire {
            position: absolute;
            top: 20%;
            left: 85%;
            transform: translate(-50%, -50%);
            display: block;
          }
          .retire:hover,
          .applicants:hover,
          .edit-ad:hover,
          .preview-ad:hover,
          .previewme:hover {
            background-color: #f7f8f9;
            border-color: #353f47;
          }
          .reject:hover {
            color: white;
            background-color: #e40000;
          }

          @media screen and (max-width: 768px) {
            .wrap .listContent .adList {
              width: 100%;
            }
            .applicant-ads .rightmessage {
              margin-left: 65px;
              pointer: default;
              height: 140px;
              position: relative;
              height: 100%;
            }

            .buttonSegment {
              display: block;
            }

            .parentfirstSecond {
              width: 250px;
            }
          }

          input[type="button"] {
            background-color: pink;
            display: block;
            height: 100%;
            width: 100%;
          }

          .fix-Container {
            width: 100%;
            height: 56px;
            position: relative;
          }

          .yes {
            background-image: url(./../../images/check.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .forbid {
            background-image: url(./../../images/forbid.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .pig {
            background-image: url(./../../images/pigmarker.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .home {
            background-image: url(./../../images/housemarker.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
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

          /* ========= FOOTER LOGO ========== */

          .mainTitle .img-fluid {
            transform: translateX(0%);
          }

          /* ========= FOOTER SUBSCRIPTION ============ */

          #subscribe-btn a:hover {
            color: white;
          }
          #subscribe-btn a {
            height: 100%;
            width: 100%;
            display: block;
            color: white;
          }

          button a:active,
          button:focus {
            border: none;
            outline: none;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default ListingManager;
