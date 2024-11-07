import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import { DayPicker } from "react-day-picker";
import { CSVLink } from "react-csv";
import "react-day-picker/dist/style.css";
import zh from "date-fns/locale/zh-TW";
// Three dots
import { ThreeDots } from "react-loader-spinner";

const Ateachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState([]);
  const [maxPage, setMaxPage] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.BACKEND_URL +
        `api/admin/allteachers?page=${page <= 0 ? 0 : page - 1}` +
        "&sortBy=" +
        sort +
        "&location=" +
        location
    );

    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTotal(data.total);
    setTeachers(data.teachers);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.BACKEND_URL +
        `api/admin/allteachers?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&sortBy=" +
        sort +
        "&location=" +
        location
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTotal(data.total);
    setTeachers(data.teachers);
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
      process.env.BACKEND_URL +
        `api/admin/allteachers?page=${id + 1}` +
        "&location=" +
        location +
        "&sortBy=" +
        sort
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTotal(data.total);
    setTeachers(data.teachers);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  // =============== SORT ================
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);
  const [, setReload] = useState(false);

  const sorting = async (ascDesc) => {
    setReload(false);
    if (ascDesc === false) {
      const res = await fetch(
        process.env.BACKEND_URL +
          "api/admin/allteachers?sortBy=asc" +
          "&location=" +
          location +
          "&page=" +
          page
      );
      const data = await res.json();
      setReload(true);
      setTotal(data.total);
      setTeachers(data.teachers);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }

    if (ascDesc === true) {
      setReload(false);
      const res = await fetch(
        process.env.BACKEND_URL +
          "api/admin/allteachers?sortBy=desc" +
          "&location=" +
          location +
          "&page=" +
          page
      );
      const data = await res.json();
      setReload(true);
      setTotal(data.total);
      setTeachers(data.teachers);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }
  };

  // ============== SELECT LOCATIONS ===============
  const [location, setLocation] = useState([]);
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
    setStartDate("");
    setSelectedFinishDay("");
    setFinishDate("");
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
  };

  // ============= GET USERS  ===============
  // ============= GET SEARCH FILTER ================

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.BACKEND_URL +
          "api/admin/allteachers?" +
          "location=" +
          location +
          "&sortBy=" +
          sort +
          "&page=" +
          page
      );
      const data = await res.json();

      if (isCancelled === false) {
        setReload(true);
        setTotal(data.total);
        setTeachers(data.teachers);
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
  }, [location, sort, page]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    setBackdrop(true);
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.BACKEND_URL +
          "api/admin/allteachers?" +
          "location=" +
          location +
          "&sortBy=" +
          sort +
          "&page=" +
          page +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();

      setBackdrop(false);
      if (isCancelled === false) {
        setReload(true);
        setTotal(data.total);
        setTeachers(data.teachers);
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
  const [show, setShow] = useState(false);
  // ================== CLOSE OR OPEN TEACHER ==============
  const hideMe = async (e, id) => {
    e.preventDefault();

    setBackdrop(true);
    const res = await fetch(
      process.env.BACKEND_URL + `api/admin/hideme/${id}` + "?sortBy=" + sort,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ showTeacher: false }),
      }
    );
    const data = await res.json();
    if (data) {
      setTeachers(data.allTeachers);
      setTotal(data.total);
      setBackdrop(false);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
    }
  };

  const showMe = async (e, id) => {
    e.preventDefault();
    setBackdrop(true);
    const res = await fetch(
      process.env.BACKEND_URL + `api/admin/hideme/${id}` + "?sortBy=" + sort,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ showTeacher: true }),
      }
    );
    const data = await res.json();
    if (data) {
      setTeachers(data.allTeachers);
      setTotal(data.total);
      setBackdrop(false);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }
  };

  // =========== CUSTOMISED CSV FILE ============
  const headers = [
    { label: "註冊老師", key: "isTeacher" },
    { label: "Id", key: "_id" },
    { label: "家教編號", key: "teacherId" },
    { label: "國籍", key: "nationality" },
    { label: "姓氏", key: "lastName" },
    { label: "名字", key: "firstName" },
    { label: "手機", key: "phone" },
    { label: "Email", key: "email" },
    { label: "大學一", key: "university1" },
    { label: "學歷一", key: "degree1" },
    { label: "大學二", key: "university2" },
    { label: "學歷二", key: "degree2" },
    { label: "大學三", key: "university3" },
    { label: "學歷三", key: "degree3" },
    { label: "教學科目一", key: "skillOne1" },
    { label: "教學科目二", key: "skillOne2" },
    { label: "教學科目三", key: "skillOne3" },
    { label: "教學科目四", key: "skillTwo1" },
    { label: "教學科目五", key: "skillTwo2" },
    { label: "教學科目六", key: "skillTwo3" },
    { label: "教學科目七", key: "skillThree1" },
    { label: "教學科目八", key: "skillThree2" },
    { label: "教學科目九", key: "skillThree3" },
    { label: "語言一", key: "whichlanguage0" },
    { label: "語言二", key: "whichlanguage1" },
    { label: "語言三", key: "whichlanguage2" },
    { label: "國家", key: "country" },
    { label: "直轄市", key: "state" },
    { label: "城市", key: "city" },
    { label: "區", key: "suburb" },
    { label: "路名", key: "street" },
    { label: "地址", key: "streetNo" },
    { label: "郵遞區號", key: "postalCode" },
    { label: "註冊日期", key: "createdAt" },
    { label: "最後更改日期", key: "updatedAt" },
  ];

  const csvReport = {
    data: teachers,
    headers: headers,
    filename: "Acabook_Teachers.csv",
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
          <form onSubmit={onSubmit}>
            <div className="container-fuild">
              <div className="box box-primary">
                <div className="container-candidate">
                  <h2>老師搜尋</h2>
                </div>

                <div className="row">
                  <div className="col-xs-5">註冊日期</div>
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
                      readOnly
                      className="btn-search"
                      value="搜尋"
                    />
                  )}
                </div>

                <div className="row locationBox">
                  <div className="container-candidate">
                    <h2 style={{ margin: "0" }}>縣市位置</h2>
                  </div>
                  <div className="grid">
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
                          defaultValue="台北市"
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
                          defaultValue="新北市"
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
                          defaultValue="桃園市"
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
                      </div>
                    </div>
                  </div>

                  <div className="grid">
                    <div className="row">
                      <div className="states_flex">
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
                          defaultValue="新竹縣"
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
                          defaultValue="苗栗縣"
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
                          defaultValue="南投縣"
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
                          defaultValue="台中市"
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
                          defaultValue="彰化縣"
                        />
                        <label htmlFor="h">彰化縣</label>
                      </div>
                    </div>
                  </div>
                  <div className="grid">
                    <div className="row">
                      <div className="states_flex">
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
                          defaultValue="雲林縣"
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
                          defaultValue="嘉義縣"
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
                          defaultValue="台南市"
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
                          defaultValue="高雄市"
                        />
                        <label htmlFor="l">高雄市</label>
                      </div>
                    </div>
                  </div>
                  <div className="grid">
                    <div className="row">
                      <div className="states_flex">
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
                          defaultValue="屏東縣"
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
                          defaultValue="宜蘭縣"
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
                          defaultValue="花蓮縣"
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
                          defaultValue="台東縣"
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
                          defaultValue="澎湖縣"
                        />
                        <label htmlFor="q">澎湖縣</label>
                      </div>
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
            <div
              className="container-members"
              onClick={() => {
                setShowCalendarStart(false);
              }}
            >
              <div className="box">
                <div className="container-candidate">
                  {total === 0 ? (
                    <h2>目前無老師</h2>
                  ) : (
                    <h2>所有老師： {total} 人</h2>
                  )}
                </div>
                <table>
                  <thead>
                    <tr>
                      <th className="head nanoId">
                        <div>家教編號</div>
                      </th>
                      <th className="head nationalId">
                        <div>國籍</div>
                      </th>
                      <th className="head photo">
                        <div>大頭</div>
                      </th>
                      <th className="head cell-v name">
                        <div>姓名</div>
                      </th>
                      <th className="head gender">
                        <div>性別</div>
                      </th>
                      <th className="head phone">
                        <div>手機</div>
                      </th>
                      <th className="head email">
                        <div>Email</div>
                      </th>
                      <th className="head birth">
                        <div>學歷</div>
                      </th>
                      <th className="head cell-v switch">
                        <div>帳戶開關</div>
                      </th>

                      <th className="head address">
                        <div>居住地址</div>
                      </th>
                      <th
                        className="head createdAt"
                        onClick={() => {
                          setAscDesc(!ascDesc);
                          sorting(ascDesc);
                        }}
                      >
                        <div>註冊日期</div>
                      </th>
                      <th className="head edit">
                        <div></div>
                      </th>
                    </tr>
                  </thead>
                </table>

                <table>
                  <tbody>
                    {teachers.map((teacher) => {
                      return (
                        <tr key={teacher._id}>
                          <td className="cell nanoId">
                            <div>{teacher.teacherId}</div>
                          </td>
                          <td className="cell nationalId">
                            <div>{teacher.nationality.split(" - ")[1]}</div>
                          </td>
                          <td className="cell photo">
                            <div>
                              <figure className="smallPhoto ">
                                <img
                                  src={`/teacherPhoto/${teacher.filename}`}
                                  alt=""
                                />
                              </figure>
                            </div>
                          </td>
                          <td className="cell cell-v name">
                            {teacher.gender === "Male" ||
                            teacher.gender === "Female" ? (
                              <div>
                                {teacher.firstName} {teacher.lastName}
                              </div>
                            ) : (
                              <div>
                                {teacher.lastName}
                                {teacher.firstName}
                              </div>
                            )}
                          </td>
                          <td className="cell gender">
                            <div>{teacher.gender}</div>
                          </td>
                          <td className="cell phone">
                            <div>{teacher.phone}</div>
                          </td>
                          <td className="cell email">
                            <div>{teacher.email}</div>
                          </td>
                          <td className="cell birth">
                            <div>
                              {teacher.degree1
                                ? teacher.degree2
                                  ? teacher.degree2
                                  : teacher.degree1
                                : "無"}
                            </div>
                          </td>
                          <td className="cell cell-v switch">
                            <div>
                              {teacher.showTeacher ? (
                                <div className="checkbox-btn">
                                  <input
                                    type="checkbox"
                                    checked={teacher.showTeacher ? true : false}
                                    className="form-check-input"
                                    onChange={(e) => {
                                      hideMe(e, teacher.teacherId);
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
                                    checked={teacher.showTeacher ? true : false}
                                    className="form-check-input"
                                    onChange={(e) => {
                                      showMe(e, teacher.teacherId);
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

                          <td className="cell address">
                            <div>
                              {teacher.state}
                              {teacher.city}
                              {teacher.suburb}
                              {teacher.street}
                            </div>
                          </td>
                          <td className="cell createdAt">
                            <div>{teacher.createdAt.split("T")[0]}</div>
                          </td>
                          <td className="cell edit">
                            <div>
                              <ExternalLink
                                target="_blank"
                                href={
                                  process.env.BACKEND_URL +
                                  `api/admin/teacherProfile/${teacher.teacherId}`
                                }
                              >
                                <input type="button" defaultValue="編輯" />
                              </ExternalLink>
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
              #00837b,
              rgba(0, 131, 123, 0.5)
            );
            background-color: #2ed9c3;
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
          .box-primary .locationBox {
            display: flex;
            justify-content: space-between;
            background-color: transparent;
            width: 100%;
            position: relative;
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
          input[type="button"]:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
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

          nav .search-bar {
            background: var(--color-light);
            padding: var(--padding-2) var(--card-padding);
            width: 32vw;
            border-radius: var(--border-radius-2);
            display: flex;
            align-items: center;
            gap: 1rem;
            color: var(--color-gray-light);
            position: absolute;
            left: 15%;
          }

          nav .search-bar input[type="search"] {
            color: var(--color-dark);
            width: 100%;
            background: transparent;
          }

          nav .search-bar input[type="search"]::placeholder {
            color: var(--color-gray-dark);
          }

          nav .profile-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4rem;
          }

          nav .profile-area .theme-btn span {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
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
          .box.box-primary {
            padding: 15px 10px;
            box-shadow: none;
            position: relative;
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
          td {
            height: 40px;
            text-align: left;
            font-size: 11px;
            font-weight: 900;
            color: white;
            font-family: sans-serif;
            white-space: nowrap;
          }
          th {
            padding-left: 10px;
            height: 40px;
            text-align: left;
            font-size: 11px;
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
            height: 40px;
            line-height: 40px;
            font-weight: 900;
            padding-left: 5px;
          }
          .cell {
            padding: 0px 0px 4px;
          }
          .cell div {
            background-color: rgba(35, 35, 35, 0.3);
            height: 40px;
            line-height: 40px;
            font-weight: 900;
            padding-left: 5px;
            position: relative;
            overflow: hidden;
          }
          .cell-v {
            background-color: rgba(35, 35, 35, 0.3);
            height: 100%;
          }
          table {
            width: 100%;
            position: relative;
          }
          input[type="button"],
          input[type="submit"] {
            color: white;
            background-color: #f4436c;
            border: 1px solid #f4436c;
            outline: none;
            cursor: pointer;
            width: 100%;
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

          .box table a {
            color: white;
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            width: 80px;
            height: 32px;
            line-height: 30px;
            font-weight: 900;
            display: block;
          }
          .box .row button a {
            color: #fff;
            background-color: #f4436c;
            border: 1px solid #f4436c;
            outline: none;
            cursor: pointer;
            width: 100%;
            height: 100%;
            line-height: 28px;
            font-weight: 900;
            display: block;
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

          .smallPhoto {
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            background: #eee;
            border: 2px solid white;
            cursor: pointer;
            transform: translateY(-50%);
            top: 50%;
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

          .date-paid input[type="text"] {
            margin-bottom: 15px;
            margin-right: 0px;
          }

          .cell div .img-1,
          .cell div .img-2,
          .cell div .img-3,
          .cell div .img-4 {
            width: 35px;
            height: 35px;
            position: absolute;
            background-image: url(./../../images/1713679370655_picture.jpg);
            background-position: center;
            background-repeat: no-repeat;
            background-size: 35px;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 35%;
            z-index: 1000;
          }
          .cell div .img-2 {
            background-image: url(./../../images/avatar-nathalieteston.jpg);
          }
          .cell div .img-3 {
            background-image: url(./../../images/lin.jpg);
          }
          .cell div .img-4 {
            background-image: url(./../../images/pic.jpg);
          }
          @media only screen and (min-width: 768px) {
            .container-fuild {
              margin: 20px auto;
              width: 1280px;
            }
            .col-xs-7 {
              width: 580px;
            }
            .date-paid input[type="text"] {
              margin-right: 100px;
            }
            .date-paid select {
              width: 200px;
              max-width: 300px;
              margin: 0px auto;
              display: inline-block;
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
            td {
              font-size: 13px;
            }
            th {
              font-size: 13px;
            }

            tbody .email div {
              width: 210px;
            }
            tbody .phone div {
              width: 100px;
              padding-left: 10px;
            }

            tbody .nanoId div {
              width: 100px;
              padding-left: 10px;
            }

            tbody .nanoId {
              width: 100px;
            }

            tbody .nationalId div {
              width: 100px;
              padding-left: 10px;
            }
            tbody .photo div {
              width: 65px;
              padding-left: 10px;
            }

            tbody .name div {
              width: 90px;
              padding-left: 10px;
            }
            tbody .gender div {
              width: 50px;
              padding-left: 10px;
            }

            tbody .edit div {
              width: 100px;
              padding-left: 10px;
            }
            tbody .email div {
              width: 210px;
              padding-left: 10px;
            }
            tbody .birth div {
              width: 110px;
              padding-left: 10px;
            }
            tbody .switch div {
              width: 100px;
              padding-left: 0px;
            }
            tbody .address div {
              width: 170px;
              padding-left: 10px;
            }
            tbody .createdAt div {
              width: 90px;
              padding-left: 10px;
            }
            .head div {
              width: 110px;
              padding-left: 10px;
            }
            thead .nanoId div {
              width: 100px;
              padding-left: 10px;
            }
            thead .nanoId {
              width: 100px;
            }
            thead .nationalId div {
              width: 100px;
              padding-left: 10px;
            }
            thead .birth div {
              width: 110px;
              padding-left: 10px;
            }
            thead .photo div {
              width: 65px;
              padding-left: 10px;
            }
            thead .name div {
              width: 90px;
              padding-left: 10px;
            }
            thead .gender div {
              width: 50px;
              padding-left: 10px;
            }
            thead .edit div {
              width: 100px;
              padding-left: 10px;
            }
            thead .phone div {
              width: 100px;
            }
            thead .email div {
              width: 210px;
            }

            thead .switch div {
              width: 100px;
            }
            thead .address div {
              width: 170px;
            }
            thead .createdAt div {
              width: 90px;
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
            .date-paid label {
              display: block;
            }
            .box .row {
              text-align: left;
            }
          }
          @media only screen and (max-width: 768px) {
            tbody .photo {
              width: 60px;
            }

            thead .photo {
              width: 60px;
            }
            tbody .photo div {
              width: 60px;
            }

            thead .photo div {
              width: 60px;
            }

            tbody .nationalId {
              display: none;
            }

            thead .nationalId {
              display: none;
            }
            tbody .nationalId div {
              display: none;
            }

            thead .nationalId div {
              display: none;
            }

            thead .name {
              width: 60px;
            }
            tbody .name {
              width: 60px;
            }

            thead .name div {
              width: 60px;
            }
            tbody .name div {
              width: 60px;
            }
            thead .nanoId {
              width: 70px;
            }
            tbody .nanoId {
              width: 70px;
            }
            thead .nanoId div {
              width: 70px;
            }
            tbody .nanoId div {
              width: 70px;
            }
            thead .phone {
              display: none;
            }
            tbody .phone {
              display: none;
            }
            thead .phone div {
              display: none;
            }
            tbody .phone div {
              display: none;
            }
            tbody .email {
              display: none;
            }
            thead .email {
              display: none;
            }
            tbody .email div {
              display: none;
            }
            thead .email div {
              display: none;
            }
            thead .switch {
              display: none;
            }
            tbody .switch {
              display: none;
            }
            thead .switch div {
              display: none;
            }
            tbody .switch div {
              display: none;
            }
            thead .birth {
              display: none;
            }
            tbody .birth {
              display: none;
            }
            thead .birth div {
              display: none;
            }
            tbody .birth div {
              display: none;
            }
            thead .address {
              width: 150px;
            }
            tbody .address {
              width: 150px;
            }
            thead .address div {
              width: 150px;
            }
            tbody .address div {
              width: 150px;
            }
            thead .createdAt {
              width: 70px;
            }
            tbody .createdAt {
              width: 70px;
            }
            thead .createdAt div {
              width: 70px;
            }
            tbody .createdAt div {
              width: 70px;
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

          /* ============== SLIDE KEY FOR SHOW ============== */
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
            content: "開啟中";
            position: absolute;
            height: 100%;
            width: 95px;
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
            width: 95px;
            text-align: center;
            top: 0;
            right: -45px;
            line-height: 36px;
            font-size: 14px;
            font-weight: 500;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Ateachers;
