import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { CSVLink } from "react-csv";
import { ExternalLink } from "react-external-link";
import "react-day-picker/dist/style.css";
import zh from "date-fns/locale/zh-TW";
// Three dots
import { ThreeDots } from "react-loader-spinner";

const Asubjects = () => {
  const [noOfSubjects, setNoOfSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState([]);
  const [maxPage, setMaxPage] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/subjects?page=${page <= 0 ? 0 : page - 1}` +
        "&sortBy=" +
        sort
    );

    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfSubjects(data.num);
    setSubjects(data.subjects);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/subjects?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&sortBy=" +
        sort
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfSubjects(data.num);
    setSubjects(data.subjects);
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
        `api/admin/subjects?page=${id + 1}` +
        "&sortBy=" +
        sort
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfSubjects(data.num);
    setSubjects(data.subjects);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  // =============== SORT BY CONTRACT TYPE ================
  const sortContractType = async (ascDesc) => {
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/contractType?sortBy=asc" +
          "&contract=" +
          contract +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfSubjects(data.num);
      setSubjects(data.subjects);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }

    if (ascDesc === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/contractType?sortBy=desc" +
          "&contract=" +
          contract +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfSubjects(data.num);
      setSubjects(data.subjects);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }
  };

  // =============== SORT BY SUBJECT NAMES ================
  const sortNames = async (ascDesc) => {
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/sortnames?sortBy=asc" +
          "&contract=" +
          contract +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfSubjects(data.num);
      setSubjects(data.subjects);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }

    if (ascDesc === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/sortnames?sortBy=desc" +
          "&contract=" +
          contract +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfSubjects(data.num);
      setSubjects(data.subjects);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }
  };

  // ============= SORT BY SUBJECT NAMES (ENG) =============
  const sortNamesEng = async (ascDesc) => {
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/sortnames_en?sortBy=asc" +
          "&contract=" +
          contract +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfSubjects(data.num);
      setSubjects(data.subjects);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }

    if (ascDesc === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/sortnames_en?sortBy=desc" +
          "&contract=" +
          contract +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfSubjects(data.num);
      setSubjects(data.subjects);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }
  };

  // =============== SORT ================
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);
  const [, setReload] = useState(false);

  const sorting = async (ascDesc) => {
    setReload(false);
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/subjects?sortBy=asc" +
          "&contract=" +
          contract +
          "&page=" +
          page
      );
      const data = await res.json();
      setReload(true);
      setNoOfSubjects(data.num);
      setSubjects(data.subjects);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }

    if (ascDesc === true) {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/subjects?sortBy=desc" +
          "&contract=" +
          contract +
          "&page=" +
          page
      );
      const data = await res.json();
      setReload(true);
      setNoOfSubjects(data.num);
      setSubjects(data.subjects);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }
  };

  // ========== SELECT LEVEL (大學 學校 一般課程 etc) ===========
  const [contract, setContract] = useState([]);

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

  // ========= CLEAR ALL IN FILTERCARD ===========
  const clearAll = async () => {
    setStartDate("");
    setSelectedFinishDay("");
    setFinishDate("");
    setCheckedUni(false);
    setCheckedSchool(false);
    setCheckedStd(false);
    setCheckedTaal(false);
    setCheckedMusic(false);
    setContract([]);
  };

  // ============= GET USERS  ===============
  // ============= GET SEARCH FILTER ================

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/subjects?" +
          "contract=" +
          contract +
          "&sortBy=" +
          sort +
          "&page=" +
          page
      );
      const data = await res.json();

      if (isCancelled === false) {
        setReload(true);
        setNoOfSubjects(data.num);
        setSubjects(data.subjects);
        setPage(data.page);
        setMaxPage(data.maxPage);
        setSort(data.sort);
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
  }, [contract]);

  // ============ CALENDAR ================
  const [finishDate, setFinishDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const [showCalendarStart, setShowCalendarStart] = useState(false);
  const [showCalendarFinish, setShowCalendarFinish] = useState(false);
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const [selectedFinishDay, setSelectedFinishDay] = useState("");

  const selectionner = (selectedDay) => {
    setSelectedDay(selectedDay);
    setStartDate(selectedDay);
    setFinishDate("");
    setShowCalendarStart(false);
    setShowCalendarFinish(true);
  };

  const selectionnerFinit = (selectedFinishDay) => {
    setSelectedFinishDay(selectedFinishDay);
    setFinishDate(selectedFinishDay);
    setShowCalendarFinish(false);
  };

  // ============== BACKDROP ============== //
  const [backdrop, setBackdrop] = useState(false);

  const [show, setShow] = useState(false);
  // ========== CLOSE OR OPEN SUBJECT (SLIDEKEY) ==========
  const hideSubject = async (e, id) => {
    e.preventDefault();

    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/hideSubject/${id}` +
        "?sortBy=" +
        sort,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ showSubject: false }),
      }
    );
    const data = await res.json();
    if (data) {
      setSubjects(data.allSubjects);
      setNoOfSubjects(data.total);
      setBackdrop(false);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
    }
  };

  const showSubject = async (e, id) => {
    e.preventDefault();
    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/hideSubject/${id}` +
        "?sortBy=" +
        sort,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ showSubject: true }),
      }
    );
    const data = await res.json();
    if (data) {
      setSubjects(data.allSubjects);
      setNoOfSubjects(data.total);
      setBackdrop(false);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }
  };

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessage(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  // ============== CREATED NEW SUBJECT ============== //

  const [subjectMan, setSubjectMan] = useState("");
  const [subjectEng, setSubjectEng] = useState("");
  const [showTypes, setShowTypes] = useState(false);
  const [types, setTypes] = useState({});

  const handleShowTypes = () => {
    setShowTypes(false);
  };
  const handleSetTypes = (e) => {
    const innerHTML = e.target.innerHTML;
    setTypes({ ...types, contractType: innerHTML });
  };

  const newSubject = async (e) => {
    e.preventDefault();
    setBackdrop(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `api/admin/subject` +
          "?sortBy=" +
          sort,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subjectName: subjectMan,
            subjectName_en: subjectEng,
            contractType: types.contractType,
            showSubject: true,
          }),
        }
      );

      const data = await res.json();
      if (data.prompt) {
        setSubjectMan("");
        setSubjectEng("");
        setTypes({});
        outPutErrorMessage(data.prompt);
        setBackdrop(false);
        setTimeout(function () {
          setUpdateNote(false);
          setAlert(false);
        }, 5000);
      } else {
        setSubjectMan("");
        setSubjectEng("");
        setTypes({});
        setNoOfSubjects(data.numOfSubjects);
        setSubjects(data.subjects);
        setSort(data.sort);
        setUpdateNote(true);
        setAlert(false);
        setBackdrop(false);
        setTimeout(function () {
          setUpdateNote(false);
          setAlert(false);
        }, 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // ============== DELETE SUBJECT ============== //
  const onDelete = async (e, id) => {
    e.preventDefault();
    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + `api/admin/deleteSubject/${id}?`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data) {
      setSubjects(data.subjects);
      setBackdrop(false);
    }
  };

  // ============== CALENDAR FILTER CARD ============== //
  const onSubmit = (e) => {
    e.preventDefault();
    setBackdrop(true);
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/subjects?sortBy=" +
          sort +
          "&page=" +
          page +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();
      setSubjects(data.subjects);

      setBackdrop(false);
      if (isCancelled === false) {
        setReload(true);
        setNoOfSubjects(data.num);
        setPage(data.page);
        setMaxPage(data.maxPage);
        setSort(data.sort);
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
  };

  // =========== CUSTOMISED CSV FILE ============
  const headers = [
    { label: "顯示科目", key: "showSubject" },
    { label: "Id", key: "_id" },
    { label: "類別", key: "contractType" },
    { label: "科目", key: "subjectName" },
    { label: "Subject", key: "subjectName_en" },
    { label: "註冊日期", key: "createdAt" },
    { label: "最後更改日期", key: "updatedAt" },
  ];

  const csvReport = {
    data: subjects,
    headers: headers,
    filename: "Acabook_Subjects.csv",
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>

        <nav>
          <div className="dashboard">
            <div className="logo"></div>

            <div className="profile-area">
              <div className="nav-box">
                <figure
                  className="smallPhoto"
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                >
                  <img src={"/images/pencilmarker.png"} alt="" />
                </figure>
                {dropdown ? (
                  <div id="dropItem">
                    <div className="dropwrap">
                      <Link to="/admin/dashboard">
                        <h4>控制台</h4>
                      </Link>
                      <Link to="/admin/users">
                        <h4>會員管理</h4>
                      </Link>
                      <Link to="/admin/teachers">
                        <h4>老師管理</h4>
                      </Link>
                      <Link to="/admin/listings">
                        <h4>Case 管理</h4>
                      </Link>
                      <Link to="/admin/subjects">
                        <h4>科目管理</h4>
                      </Link>
                      <Link to="/admin/security">
                        <h4>安全設定</h4>
                      </Link>
                      <ExternalLink target="_self" href="/admin/logout">
                        <h4>登出</h4>
                      </ExternalLink>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </nav>
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
        <div className="wrap">
          <div className="errorMessageHere">
            {updateNote && (
              <section className="updateNote container-fluid">
                <div className="container-fluid ">
                  <img src="/images/tick.png" width="12px" alt="" />
                  <span>The subject is added successfully.</span>
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
          </div>
          <form onSubmit={newSubject}>
            <div className="container-fuild">
              <div className="box box-primary">
                <div className="container-candidate">
                  <h2>新建科目</h2>
                </div>

                <div className="row">
                  <div className="col-xs-5">科目類別</div>
                  <div className="col-xs-7">
                    <div className="subject-type">
                      <input
                        type="text"
                        autoComplete="none"
                        readOnly
                        className="subject-types"
                        value={types.contractType ? types.contractType : ""}
                        onFocus={() => setShowTypes(true)}
                      />
                      {showTypes && (
                        <div className="contractList">
                          <ul>
                            <li
                              onClick={(e) => {
                                handleSetTypes(e);
                                handleShowTypes();
                              }}
                            >
                              大學
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetTypes(e);
                                handleShowTypes();
                              }}
                            >
                              學校
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetTypes(e);
                                handleShowTypes();
                              }}
                            >
                              一般課程
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetTypes(e);
                                handleShowTypes();
                              }}
                            >
                              語言
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetTypes(e);
                                handleShowTypes();
                              }}
                            >
                              樂器
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-5">科目名 中文</div>
                  <div className="col-xs-7">
                    <div className="date-paid">
                      <input
                        type="text"
                        value={subjectMan}
                        maxLength={5}
                        placeholder="例: 數學"
                        onChange={(e) => setSubjectMan(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-5">科目名 English</div>
                  <div className="col-xs-7">
                    <div className="date-paid">
                      <input
                        type="text"
                        placeholder="eg: Mathematics"
                        value={subjectEng}
                        onChange={(e) => setSubjectEng(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {subjectEng && subjectMan && types.contractType ? (
                  <input type="submit" className="btn-search" value="建立" />
                ) : (
                  <input
                    type="button"
                    disabled
                    className="btn-search"
                    value="建立"
                  />
                )}
              </div>
            </div>
          </form>

          <form onSubmit={onSubmit}>
            <div className="container-fuild">
              <div className="box box-primary">
                <div className="container-candidate">
                  <h2>科目搜尋</h2>
                </div>

                <div className="row">
                  <div className="col-xs-5">刊登日期</div>
                  <div className="col-xs-7 selectdate">
                    <div className="date-paid day_picker">
                      <label htmlFor="calstart"></label>
                      <input
                        className="calstart"
                        type="text"
                        readOnly
                        autoComplete="off"
                        placeholder="開始日期"
                        id="demo-3_1"
                        value={
                          startDate
                            ? `${selectedDay.getFullYear()}年 ${
                                selectedDay.getMonth() + 1
                              }月 ${selectedDay.getDate()}日`
                            : startDate
                        }
                        onClick={() => {
                          setShowCalendarStart(!showCalendarStart);
                          setShowCalendarFinish(false);
                          setSelectedFinishDay("");
                          setStartDate("");
                        }}
                      />
                      {showCalendarStart ? (
                        <DayPicker
                          defaultMonth={
                            startDate
                              ? new Date(
                                  startDate.getFullYear(),
                                  startDate.getMonth()
                                )
                              : new Date()
                          }
                          toDate={today}
                          onSelect={selectionner}
                          selected={startDate}
                          showOutsideDays
                          fixedWeeks
                          numberOfMonths={1}
                          locale={zh}
                          mode="single"
                        />
                      ) : (
                        ""
                      )}

                      <label htmlFor="calfinish"></label>
                      <input
                        className="calfinish"
                        type="text"
                        readOnly
                        autoComplete="off"
                        placeholder="截止日期"
                        id="demo-3_2"
                        value={
                          finishDate
                            ? `${finishDate.getFullYear()}年 ${
                                finishDate.getMonth() + 1
                              }月 ${finishDate.getDate()}日`
                            : finishDate
                        }
                        onClick={() => {
                          setShowCalendarStart(false);
                          setShowCalendarFinish(!showCalendarFinish);
                        }}
                      />
                      {showCalendarFinish ? (
                        <DayPicker
                          fromDate={startDate}
                          defaultMonth={
                            startDate
                              ? new Date(
                                  startDate.getFullYear(),
                                  startDate.getMonth()
                                )
                              : new Date()
                          }
                          toDate={today}
                          onSelect={selectionnerFinit}
                          selected={finishDate}
                          showOutsideDays
                          fixedWeeks
                          numberOfMonths={1}
                          locale={zh}
                          mode="single"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  {startDate && finishDate ? (
                    <input
                      type="submit"
                      className="btn-search"
                      value="搜尋"
                      readOnly
                    />
                  ) : (
                    <input
                      type="button"
                      disabled
                      className="btn-search"
                      value="搜尋"
                      readOnly
                    />
                  )}
                </div>
                <div className="row locationBox">
                  <div className="container-candidate">
                    <h2 style={{ margin: "0" }}>課程類別</h2>
                  </div>
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

                <div className="row">
                  <input
                    type="button"
                    className="btn-search"
                    defaultValue="清除所有"
                    onClick={clearAll}
                  />
                </div>
                <button>
                  <CSVLink {...csvReport} className="btn-search">
                    下載
                  </CSVLink>
                </button>
              </div>
            </div>
          </form>
          <form>
            <div className="container-members">
              <div className="box">
                <div className="container-candidate">
                  {noOfSubjects === 0 ? (
                    <h2>目前無科目</h2>
                  ) : (
                    <h2>所有科目： {noOfSubjects} 個</h2>
                  )}
                </div>
                <table>
                  <thead>
                    <tr>
                      <th
                        className="head contractType"
                        onClick={() => {
                          setAscDesc(!ascDesc);
                          sortContractType(ascDesc);
                        }}
                      >
                        <div>類別</div>
                      </th>
                      <th
                        className="head cell-v subjects"
                        onClick={() => {
                          setAscDesc(!ascDesc);
                          sortNames(ascDesc);
                        }}
                      >
                        <div>科目</div>
                      </th>
                      <th
                        className="head english"
                        onClick={() => {
                          setAscDesc(!ascDesc);
                          sortNamesEng(ascDesc);
                        }}
                      >
                        <div>Subjects</div>
                      </th>

                      <th className="head cell-v rest">
                        <div>暫歇停止</div>
                      </th>

                      <th
                        className="head createdAt"
                        onClick={() => {
                          setAscDesc(!ascDesc);
                          sorting(ascDesc);
                        }}
                      >
                        <div>刊登日期</div>
                      </th>
                      <th className="head edit">
                        <div></div>
                      </th>
                    </tr>
                  </thead>
                </table>

                <table>
                  <tbody>
                    {subjects.map((subject) => {
                      return (
                        <tr key={subject._id}>
                          <td className="cell contractType">
                            <div>{subject.contractType}</div>
                          </td>
                          <td className="cell cell-v subjects">
                            <div>{subject.subjectName}</div>
                          </td>
                          <td className="cell english">
                            <div>{subject.subjectName_en}</div>
                          </td>

                          <td className="cell cell-v rest">
                            <div>
                              {subject.showSubject ? (
                                <div className="checkbox-btn">
                                  <input
                                    type="checkbox"
                                    checked={true}
                                    className="form-check-input"
                                    onChange={(e) => {
                                      hideSubject(e, subject._id);
                                      setShow(!show);
                                    }}
                                  />
                                  <div>
                                    <span className="slidekey"></span>
                                  </div>
                                </div>
                              ) : (
                                <div className="checkbox-btn">
                                  <input
                                    type="checkbox"
                                    checked={false}
                                    className="form-check-input"
                                    onChange={(e) => {
                                      showSubject(e, subject._id);
                                      setShow(!show);
                                    }}
                                  />
                                  <div>
                                    <span className="slidekey"></span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="cell createdAt">
                            <div> {subject.createdAt.split("T")[0]}</div>
                          </td>
                          <td className="cell edit">
                            <div>
                              <input
                                onClick={(e) => {
                                  onDelete(e, subject._id);
                                }}
                                type="button"
                                defaultValue="刪除"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
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
        </div>

        <style jsx="true">{`
          body {
            background: linear-gradient(
              180deg,
              #00a1e4,
              rgba(0, 131, 123, 0.5)
            );
            background-color: #00a1e4;
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

          /* ============== NAV BAR ============= */

          nav {
            width: 100%;
            background-color: var(--color-white);
            padding: 1rem 0;
          }

          nav .dashboard {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            width: 96%;
            margin: 0 auto;
          }

          nav {
            height: 65px;
          }

          nav img.logo {
            width: 10rem;
            display: block;
          }

          nav .logo.active {
            display: block;
          }

          nav .profile-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4rem;
          }

          nav .profile-area .theme-btn .active {
            background: var(--color-dark);
            border-radius: var(--border-radius-2);
            color: var(--color-white);
          }

          nav .profile-area .profile {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .nav-box {
            width: 35px;
            height: 35px;
            left: 90%;
            top: 50%;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
          }
          nav > figure {
            width: 200px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 10%;
            top: 50%;
          }
          .nav-box .smallPhoto {
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: transparent;
            border: none;
            cursor: pointer;
          }
          .nav-box .smallPhoto img {
            position: absolute;
            width: 29px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }

          .nav-box #dropItem {
            width: 280px;
            background: white;
            position: absolute;
            border: 1px solid #ebebeb;
            border-top: none;
            transform: translateX(-84%);
            display: block;
          }

          .nav-box #dropItem.open {
            display: block;
          }

          .nav-box .dropwrap {
            padding-bottom: 0px;
            width: 88%;
            background: var(--color-white);
            margin-top: 3%;
            margin-left: 6%;
          }

          .nav-box .dropwrap a {
            color: #777;
            font-weight: 500;
            font-size: 13px;
            font-family: "Noto Sans TC", sans-serif;
            height: 45px;
            line-height: 45px;
            width: 100%;
            position: relative;
            display: block;
          }

          .nav-box .dropwrap a h4 {
            margin-bottom: 0px;
            width: 100%;
            position: relative;
            display: block;
            height: 45px;
            line-height: 45px;
            font-size: 12px;
            font-weight: 500;
            color: rgb(119, 119, 119);
          }

          .nav-box .dropwrap a:hover {
            border-bottom: 1px solid #484848;
          }

          nav .profile-area .profile-photo {
            display: block;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            overflow: hidden;
          }

          nav .profile-area button {
            display: none;
          }
          /* ============ CELLS ========== */
          td {
            height: 40px;
            text-align: left;
            font-size: 13px;
            font-weight: 900;
            color: white;
            font-family: sans-serif;
            white-space: nowrap;
          }
          th {
            padding-left: 10px;
            height: 40px;
            text-align: left;
            font-size: 13px;
            font-weight: 900;
            color: white;
            font-family: sans-serif;
            cursor: pointer;
            white-space: nowrap;
          }

          .head {
            padding: 0px;
          }
          .head div {
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-weight: 900;
          }
          .cell {
            padding: 0px 0px 4px;
          }
          .cell div {
            background-color: rgba(35, 35, 35, 0.3);
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-weight: 900;

            position: relative;
            overflow: hidden;
          }
          .cell-v {
            background-color: rgba(35, 35, 35, 0.3);
            height: 100%;
          }

          tbody .contractType div {
            width: 250px;
            padding-left: 10px;
          }
          thead .contractType div {
            width: 250px;
            padding-left: 10px;
          }
          tbody .contractType {
            width: 250px;
          }
          thead .contractType {
            width: 250px;
          }
          thead .subjects div {
            width: 250px;
            padding-left: 10px;
          }
          tbody .subjects div {
            width: 250px;
            padding-left: 10px;
          }
          thead .subjects {
            width: 250px;
          }
          tbody .subjects {
            width: 250px;
          }
          thead .english div {
            width: 250px;
            padding-left: 10px;
          }
          tbody .english div {
            width: 250px;
            padding-left: 10px;
          }
          thead .english {
            width: 250px;
          }
          tbody .english {
            width: 250px;
          }

          thead .rest div {
            width: 100px;
          }
          .rest div {
            padding-left: 0px;
          }
          tbody .rest div {
            width: 110px;
          }
          thead .rest {
            width: 110px;
            padding-left: 10px;
          }
          tbody .rest {
            width: 110px;
          }

          thead .createdAt div {
            width: 250px;
            padding-left: 10px;
          }
          tbody .createdAt div {
            width: 250px;
            padding-left: 10px;
          }
          thead .createdAt {
            width: 250px;
          }
          tbody .createdAt {
            width: 250px;
          }
          thead .edit div {
            width: 170px;
            padding-left: 10px;
          }
          tbody .edit div {
            width: 170px;
            padding-left: 10px;
          }
          thead .edit {
            width: 170px;
          }
          tbody .edit {
            width: 170px;
          }
          @media only screen and (max-width: 768px) {
            tbody div,
            thead div {
              font-size: 11px;
            }
            tbody,
            table,
            .box,
            .container-member {
              width: 485px;
              margin: 0 auto;
            }

            thead .contractType {
              width: 60px;
            }
            thead .contractType div {
              width: 60px;
            }
            tbody .contractType {
              width: 60px;
            }
            tbody .contractType div {
              width: 60px;
            }
            thead .subjects {
              width: 90px;
            }
            tbody .subjects {
              width: 90px;
            }
            thead .subjects div {
              width: 90px;
            }
            tbody .subjects div {
              width: 90px;
            }
            thead .english {
              width: 90px;
            }
            tbody .english {
              width: 90px;
            }
            thead .english div {
              width: 90px;
            }
            tbody .english div {
              width: 90px;
            }
            thead .cell-v {
              width: 80px;
            }
            tbody .cell-v {
              width: 80px;
            }

            thead .rest {
              width: 80px;
            }
            tbody .rest {
              width: 80px;
            }
            thead .createdAt {
              width: 75px;
            }
            tbody .createdAt {
              width: 75px;
            }
            thead .createdAt div {
              width: 75px;
            }
            tbody .createdAt div {
              width: 75px;
            }
            thead .edit {
              width: 60px;
            }
            tbody .edit {
              width: 60px;
            }
            thead .edit div {
              width: 60px;
            }
            tbody .edit div {
              width: 60px;
            }
            tbody input[type="button"],
            thead input[type="button"] {
              width: 50px;
            }
          }

          /* ============== CALENDAR =============== */

          .selectdate .day_picker .rdp {
            position: absolute;
            z-index: 2000;
            margin: 0;
          }

          .rdp-button:not([disabled]).rdp-day_selected,
          .rdp-day_disabled,
          .rdp-button {
            color: white;
          }
          .rdp-nav .rdp-button {
            width: 30px;
          }

          .selectdate .day_picker .rdp-month {
            background-color: white;
            padding: 10px 15px;
            border: 1px solid black;
          }
          .selectdate .day_picker .rdp-day.rdp-day_selected {
            background-color: #a5ce0f;
            color: white;
          }

          .selectdate .day_picker .rdp-day {
            height: 40px;
            width: 40px;
            border-radius: 0%;
          }

          .selectdate .day_picker .rdp-button_reset {
            color: #212529;
            font-size: 16px;
          }

          .selectdate .day_picker .rdp-day:hover {
            background-color: #a5ce0f;
            color: white;
          }

          .selectdate .day_picker .rdp-day_outside {
            opacity: 0.25;
          }

          .selectdate .day_picker .rdp-day_outside:hover {
            opacity: 1;
            background-color: #a5ce0f;
            color: white;
          }

          .rdp-button[disabled]:not(.rdp-day_selected):hover {
            color: #212529;
            opacity: 0.25;
            background-color: transparent;
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
          .date-paid select {
            width: 100%;
            height: 35px;
            border-radius: 0px;
            border: 1px solid #ebebeb;
            outline: 0;
            display: block;
            font-size: 15px;
            padding: 5px 8px;
            -webkit-appearance: none;
            -moz-appearance: textfield;
            appearance: none;
          }
          .date-paid {
            position: relative;
            width: 100%;
          }
          .date-paid label {
            display: none;
            font-weight: 900;
            color: white;
            position: absolute;
            transform: translate(-130%, 30%);
            font-size: 15px;
            text-align: left;
          }

          .date-paid input[type="text"] {
            margin-bottom: 15px;
            margin-right: 0px;
          }
          @media only screen and (min-width: 768px) {
            .date-paid input[type="text"] {
              margin-right: 100px;
            }
            .date-paid label {
              display: block;
            }
            .date-paid select {
              width: 200px;
              max-width: 300px;
              margin: 0px auto;
              display: inline-block;
            }
          }

          /* ============ BOX PRIMARY =========== */
          .box.box-primary {
            padding: 15px 10px;
            box-shadow: none;
            position: relative;
          }
          .box-primary .locationBox {
            display: flex;
            justify-content: space-between;
            background-color: transparent;
            width: 100%;
            position: relative;
          }

          .box-primary .subject-type {
            width: 200px;
            margin-bottom: 16px;
          }

          .subject-type .contractList {
            position: absolute;
            z-index: 2000;
            width: 34%;
            margin-top: 1px;
            display: block;
          }
          .subject-type .contractList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .subject-type .contractList ul li {
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

          .subject-type .contractList ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }
          .subject-type .subject-types {
            margin: 0;
          }

          .container-fuild {
            margin: 40px auto;
            width: 390px;

            border-radius: 0px;
            background-color: transparent;
            border: 1px solid white;
            position: relative;
          }
          .container-members {
            margin: 60px auto;
            width: 485px;
            height: 100%;
            border-radius: 0px;
            background-color: transparent;
          }

          .col-xs-5 {
            font-weight: 900;
            text-align: left;
            color: #fff;
            font-size: 18px;
            height: 30px;
            line-height: 30px;
            padding: 0px;
            margin-left: 0px;
            width: 250px;
          }
          .col-xs-7 {
            padding: 0px;
            margin: 0px;
            position: relative;
            width: 100%;
          }
          .col-xs-7 p {
            margin-top: 10px;
          }

          .box .row {
            margin: 15px auto 0px;
            text-align: center;
            width: 100%;
          }

          .states_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 1px 0px 0px 80px;
            height: 100%;
            width: 200px;
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
          .nonselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
    supported by Chrome, Edge, Opera and Firefox */
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
          input[type="checkbox"] + label {
            margin: 0 0 0 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 200;
            float: left;
            margin: 0px;
            width: 100%;
            color: white;
            font-weight: 600;
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
          .container-candidate {
            position: relative;
            width: 100%;
            top: 7%;
            left: 0%;
          }
          .container-candidate h2 {
            font-weight: 800;
            font-size: 22px;
            width: 100%;
            padding-top: 8px;
            padding-bottom: 12px;
            color: #fff;
            border-bottom: 1px solid #ebebeb;
          }
          input[type="button"],
          input[type="submit"] {
            color: white;
            background-color: #f4436c;
            border: 1px solid #f4436c;
            outline: none;
            cursor: pointer;
            width: 60px;
            height: 32px;
            line-height: 30px;
            font-weight: 900;
            margin-top: 4px;
          }
          input[type="text"] {
            width: 100%;
            height: 35px;
            outline: 0;
            display: block;
            padding: 5px 8px;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            font-size: 15px;
          }
          .box button {
            margin-top: 8px;
            outline: none;
            width: 100%;
            height: 32px;
            border: none;
            cursor: pointer;
            padding: 0;
          }

          .box a {
            color: white;
            background-color: #f4436c;
            border: none;
            outline: none;
            cursor: pointer;
            width: 100%;
            height: 100%;
            line-height: 32px;
            font-weight: 900;
            display: block;
          }

          input[type="button"]:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
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
          @media only screen and (max-width: 768px) {
            input[type="button"] {
              width: 100%;
            }
            .box,
            .box-primary {
              width: 100%;
            }

            .box-primary .subject-type {
              width: 100%;
            }

            .subject-type .contractList {
              width: 100%;
            }

            .subject-type .contractList ul li {
              padding: 0;
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
          .buttonSegment {
            display: block;
            width: 100%;
            padding-bottom: 15px;
          }
          @media only screen and (min-width: 768px) {
            .container-fuild {
              margin: 20px auto;
              width: 1280px;
            }
            .col-xs-7 {
              width: 580px;
            }

            input[type="text"] {
              width: 200px;
              max-width: 300px;
              margin: 0px auto;
              display: inline-block;
            }

            input[type="button"],
            input[type="submit"] {
              width: 80px;
            }
            .box button {
              width: 80px;
            }

            .container-members {
              width: 1280px;
            }
            .box.box-primary {
              padding: 15px 40px;
            }
            .col-xs-5 {
              font-size: 14px;
            }

            .box .row {
              text-align: left;
            }
          }
          /* ============== SLIDE KEY ================= */
          .checkbox-btn {
            position: relative;
            width: 130px;
            height: 36px;
            transform: translate(0%, 0%);
            border: 3px solid transparent;
            overflow: hidden;
            border-radius: 0px;
          }
          .checkbox-btn input {
            height: 100%;
            width: 100%;
            position: relative;
            cursor: pointer;
            opacity: 0;
            top: 0;
            left: 0;
            z-index: 3;
          }
          .checkbox-btn div {
            top: 0;
            left: 0;
            position: absolute;
            height: 36px;
            background-color: transparent;
            border-radius: 0px;
          }
          .checkbox-btn div .slidekey {
            position: absolute;
            width: 50px;
            height: 36px;
            top: 0;
            left: 0;
            text-align: center;
            background-color: transparent;
            transition: 0.5s ease-in-out 0ms;
          }
          .checkbox-btn input:checked + div .slidekey {
            transform: translateX(107px);
          }
          .checkbox-btn .slidekey:before {
            content: "刊登中";
            position: absolute;
            height: 100%;
            width: 107px;
            text-align: center;
            top: 0;
            left: -107px;
            line-height: 36px;
            background-color: #2ed9c3;
            color: white;
            font-size: 14px;
            font-weight: 500;
          }
          .checkbox-btn .slidekey:after {
            content: "關閉中";
            background-color: transparent;
            color: white;
            position: absolute;
            height: 100%;
            width: 107px;
            text-align: center;
            top: 0;
            right: -56px;
            line-height: 36px;
            font-size: 14px;
            font-weight: 500;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Asubjects;
