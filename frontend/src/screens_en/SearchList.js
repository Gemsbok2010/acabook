import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components_en/Navbar";
import Footer from "../components_en/Footer";
import { useEffect } from "react";
import axios from "axios";
import { Wrapper } from "@googlemaps/react-wrapper";
import { ExternalLink } from "react-external-link";
// Three dots
import { ThreeDots } from "react-loader-spinner";
// useSelector is accessing value of states
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../redux/userInfo";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function Plan({ latitude, longitude, state }) {
  const defaultProps = {
    center: {
      lat: 23.6978,
      lng: 120.9605,
    },
    zoom: 7,
    latLngBounds: {
      north: 25.36,
      south: 21.35,
      east: 155.81,
      west: 110.28,
    },
  };

  let array = [];
  let arr = [];
  var arrObj = {};
  for (var i = 0; i < latitude.length; i++) {
    var lat = parseFloat(latitude[i]);
    var lng = parseFloat(longitude[i]);
    arrObj = { lat: lat, lng: lng };
    arr.push([lat, lng]);
    array.push(arrObj);
  }

  let myZoom;
  let myLatitude;
  let myLongitude;
  let myDrag;

  if (state.length === 1 && state[0] === "台北市") {
    myZoom = 13;
    myLatitude = 25.033;
    myLongitude = 121.5654;
    myDrag = true;
  }

  if (state.length === 1 && state[0] === "高雄市") {
    myZoom = 13;
    myLatitude = 22.61626;
    myLongitude = 120.31333;
    myDrag = true;
  }
  if (state.length === 1 && state[0] === "台中市") {
    myZoom = 13;
    myLatitude = 24.1632;
    myLongitude = 120.6747;
    myDrag = true;
  }

  if (state.length === 1 && state[0] === "新北市") {
    myZoom = 13;
    myLatitude = 25.012366;
    myLongitude = 121.465746;
    myDrag = true;
  }

  if (state.length === 1 && state[0] === "桃園市") {
    myZoom = 13;
    myLatitude = 24.99368;
    myLongitude = 121.29696;
    myDrag = true;
  }
  if (state.length === 1 && state[0] === "台南市") {
    myZoom = 13;
    myLatitude = 22.9999;
    myLongitude = 120.2269;
    myDrag = true;
  }
  if (state.length === 0 && state[0] === "基隆市") {
    myZoom = 15;
    myLatitude = 25.127603;
    myLongitude = 121.739183;
    myDrag = true;
  }

  if (state.length === 0 && state[0] === "新竹市") {
    myZoom = 14;
    myLatitude = 24.8138;
    myLongitude = 120.9675;
    myDrag = true;
  }

  if (state.length === 0 && state[0] === "新竹縣") {
    myZoom = 13;
    myLatitude = 24.8138;
    myLongitude = 120.9675;
    myDrag = true;
  }

  if (state.length === 0 && state[0] === "苗栗縣") {
    myZoom = 13;
    myLatitude = 24.5602;
    myLongitude = 120.8214;
    myDrag = true;
  }
  if (state.length === 0 && state[0] === "南投縣") {
    myZoom = 13;
    myLatitude = 23.961;
    myLongitude = 120.9719;
    myDrag = true;
  }

  if (state.length === 0 && state[0] === "彰化縣") {
    myZoom = 13;
    myLatitude = 23.9596;
    myLongitude = 120.5855;
    myDrag = true;
  }
  if (state.length === 0 && state[0] === "雲林縣") {
    myZoom = 14;
    myLatitude = 23.7092;
    myLongitude = 120.4313;
    myDrag = true;
  }
  if (state.length === 0 && state[0] === "嘉義市") {
    myZoom = 14;
    myLatitude = 23.4801;
    myLongitude = 120.4491;
    myDrag = true;
  }
  if (state.length === 0 && state[0] === "嘉義縣") {
    myZoom = 14;
    myLatitude = 23.4801;
    myLongitude = 120.4491;
    myDrag = true;
  }
  if (state.length === 0 && state[0] === "屏東縣") {
    myZoom = 12;
    myLatitude = 22.6647;
    myLongitude = 120.4888;
    myDrag = true;
  }

  if (state.length === 0 && state[0] === "澎湖縣") {
    myZoom = 14;
    myLatitude = 23.5706;
    myLongitude = 119.5775;
    myDrag = true;
  }

  if (state.length === 0 && state[0] === "宜蘭縣") {
    myZoom = 14;
    myLatitude = 24.7591;
    myLongitude = 121.7537;
    myDrag = true;
  }
  if (state.length === 0 && state[0] === "花蓮縣") {
    myZoom = 14;
    myLatitude = 23.9872;
    myLongitude = 121.6016;
    myDrag = true;
  }
  if (state.length === 0 && state[0] === "台東縣") {
    myZoom = 14;
    myLatitude = 22.7613;
    myLongitude = 121.1438;
    myDrag = true;
  }

  const option = {
    center: {
      lat: myLatitude,
      lng: myLongitude,
    },
    zoom: myZoom,
    draggable: myDrag,
  };
  return (
    <>
      {/* default map loads on no inputs */}
      <GoogleMap
        center={option.center.lat ? option.center : defaultProps.center}
        zoom={option.zoom ? option.zoom : 7}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          marginBottom: "20px",
        }}
        options={{
          disableDefaultUI: true,
          gestureHandling: option.draggable ? "cooperative" : "none",
          streetViewControl: false,
          dragabble: option.draggable ? option.draggable : false,
          restriction: {
            strictBounds: false,
            latLngBounds: defaultProps.latLngBounds,
          },
        }}
      >
        {array.map((mark, index) => {
          return (
            <Marker
              key={index}
              position={mark}
              animation={window.google.maps.Animation.DROP}
              icon={{
                url: "/images/pencilmarker.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(0, 0),
                scaledSize: new window.google.maps.Size(25, 25),
                anchorPoint: window.google.maps.Point(0, 0),
              }}
            />
          );
        })}
      </GoogleMap>
    </>
  );
}

const SearchList = () => {
  const dispatch = useDispatch();
  let zoek = window.location.search;
  let params = new URLSearchParams(zoek);
  let id = params.get("id");
  let token = params.get("token");
  let access = params.get("access");
  var { search } = useLocation();

  const user = useSelector((state) => state.userInfo.value);

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [listingInfo, setListingInfo] = useState([]);
  const [noOfCases, setNoOfCases] = useState([]);
  const [page, setPage] = useState([]);
  const [maxPage, setMaxPage] = useState([]);
  const [isloaded, setIsloaded] = useState(false);

  // ========= FACEBOOK & GOOGLE LOGIN DATA ==========

  useEffect(() => {
    if (id) {
      localStorage.setItem("userId", id);
      localStorage.setItem("token", token);
      localStorage.setItem("access", access);
    }
    // ============ PROFILE DATA ===========
    if (id) {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL +
            "api/users/allusers/" +
            localStorage.getItem("userId")
        )
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("firstName", response.data.firstName);
            localStorage.setItem("nanoId", response.data.nanoId);
            localStorage.setItem("userId", response.data._id);
            localStorage.setItem("username", response.data.email);
            localStorage.setItem("isTeacher", response.data.isTeacher);

            dispatch(
              login({
                firstName: response.data.firstName,
                isLoggedIn: true,
                lastName: response.data.lastName,
                email: response.data.email,
                filename: response.data.filename,
                isTeacher: response.data.isTeacher,
                isActive: response.data.isActive,
              })
            );
            window.history.pushState({}, document.title, "/searchlist/en");
          }
        });
    }
  }, [id]);

  const [applied, setApplied] = useState([]);
  // ============ LOGGEDIN APPLICANT APPLIED ===========
  useEffect(() => {
    if (user.isLoggedIn) {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL +
            +"api/intlapplications/applied?nanoId=" +
            localStorage.getItem("nanoId")
        )
        .then((response) => {
          if (response.status === 200) {
            setApplied(response.data.applied);
          }
        });
    }
  }, []);

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/intllistings/search?page=${page <= 0 ? 0 : page - 1}` +
        "&sortBy=" +
        sort +
        "&contract=" +
        contract +
        "&subjects=" +
        subjects +
        "&location=" +
        location
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
    setListOfSubjects(data.subjects);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        +`api/intllistings/search?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&sortBy=" +
        sort +
        "&contract=" +
        contract +
        "&subjects=" +
        subjects +
        "&location=" +
        location
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
        +`api/intllistings/search?page=${id + 1}` +
        "&contract=" +
        contract +
        "&subjects=" +
        subjects +
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
    setNoOfCases(data.num);
    setListingInfo(data.adPosts);
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
          +"api/intllistings/search?sortBy=asc" +
          "&contract=" +
          contract +
          "&subjects=" +
          subjects +
          "&location=" +
          location +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfCases(data.num);
      setListingInfo(data.adPosts);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setListOfSubjects(data.subjects);
    }

    if (ascDesc === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          +"api/intllistings/search?sortBy=desc" +
          "&contract=" +
          contract +
          "&subjects=" +
          subjects +
          "&location=" +
          location +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfCases(data.num);
      setListingInfo(data.adPosts);
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
  const [subjects, setSubjects] = useState([]);
  const [checks, setChecks] = useState([]);
  const [location, setLocation] = useState([]);

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

  // ======= TAKE OUT DUPLICATE SUBJECTS ======
  const noDuplicates = [
    ...new Map(listOfSubjects.map((list) => [list.subjectName, list])).values(),
  ];

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
  const onRemoveState = async (event) => {
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

  // ============= GET SEARCH FILTER ===============
  useEffect(() => {
    let isCancelled = false;
    setIsloaded(false);
    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/intllistings/search?" +
          "contract=" +
          contract +
          "&subjects=" +
          subjects +
          "&location=" +
          location +
          "&sortBy=" +
          sort +
          "&page=" +
          page
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
      setListOfSubjects(data.subjects);
      setLongitude(data.longArr);
      setLatitude(data.latArr);
      setIsloaded(true);
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
  }, [contract, subjects, location]);

  // FILTERCARD CLEAR ALL

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
  const [, setBackdrop] = useState(false);

  const clickOnBackdrop = () => {
    setBackdrop(false);
    setFilterCard(false);
  };

  // FOOTER LINK FROM CHILD REDIRECT TO SEARCHLIST
  const [footLocation] = useState(
    search.split("=")[0].at(-1) === "n" && search.split("=")[1]
  );

  const [footCity] = useState(
    search.split("=")[0].at(-1) === "y" && search.split("=")[1]
  );

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      if (footLocation === "taipei") {
        setCheckedTaipei(true);
        setLocation(["台北市"]);
      }
      if (footLocation === "newTaipei") {
        setLocation(["新北市"]);
        setCheckedNewTaipei(true);
      }
      if (footLocation === "taoyuan") {
        setCheckedTaoyuan(true);
        setLocation(["桃園市"]);
      }
      if (footLocation === "taichung") {
        setCheckedTaichung(true);
        setLocation(["台中市"]);
      }
      if (footLocation === "tainan") {
        setCheckedTainan(true);
        setLocation(["台南市"]);
      }
      if (footLocation === "kaohsiung") {
        setCheckedKaohsiung(true);
        setLocation(["高雄市"]);
      }
      if (footCity === "keelung") {
        setCheckedKeelung(true);
        setLocation(["基隆市"]);
      }
      if (footCity === "hsinchuCity") {
        setCheckedHsinchuCity(true);
        setLocation(["新竹市"]);
      }
      if (footCity === "hsinchu") {
        setCheckedHsinchu(true);
        setLocation(["新竹縣"]);
      }
      if (footCity === "miaoli") {
        setCheckedMiaoli(true);
        setLocation(["苗栗縣"]);
      }
      if (footCity === "changhwa") {
        setCheckedChanghwa(true);
        setLocation(["彰化縣"]);
      }
      if (footCity === "nantou") {
        setCheckedNantou(true);
        setLocation(["南投縣"]);
      }
      if (footCity === "yunlin") {
        setCheckedYunlin(true);
        setLocation(["雲林縣"]);
      }
      if (footCity === "chiayiCity") {
        setCheckedChiayiCity(true);
        setLocation(["嘉義市"]);
      }
      if (footCity === "chiayi") {
        setCheckedChiayi(true);
        setLocation(["嘉義縣"]);
      }
      if (footCity === "pingtung") {
        setCheckedPingtung(true);
        setLocation(["屏東縣"]);
      }
      if (footCity === "penghu") {
        setCheckedPenghu(true);
        setLocation(["澎湖縣"]);
      }
      if (footCity === "yilan") {
        setCheckedYilan(true);
        setLocation(["宜蘭縣"]);
      }
      if (footCity === "hualien") {
        setCheckedHualien(true);
        setLocation(["花蓮縣"]);
      }
      if (footCity === "taitung") {
        setCheckedTaitung(true);
        setLocation(["台東縣"]);
      }
    };
    if (isCancelled === false) {
      // call the function
      setTimeout(function () {
        fetchData()
          // make sure to catch any error
          .catch(console.error);
      }, 200);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const asx = async (event) => {
    const value = event.target.innerHTML;

    if (value.substring(0, 3) === "台北市") {
      clearPartial();
      setCheckedTaipei(true);

      setLocation(["台北市"]);
    }
    if (value.substring(0, 3) === "新北市") {
      clearPartial();
      setCheckedNewTaipei(true);

      setLocation(["新北市"]);
    }
    if (value.substring(0, 3) === "桃園市") {
      clearPartial();
      setCheckedTaoyuan(true);

      setLocation(["桃園市"]);
    }
    if (value.substring(0, 3) === "台中市") {
      clearPartial();
      setCheckedTaichung(true);

      setLocation(["台中市"]);
    }
    if (value.substring(0, 3) === "台南市") {
      clearPartial();
      setCheckedTainan(true);

      setLocation(["台南市"]);
    }
    if (value.substring(0, 3) === "高雄市") {
      clearPartial();
      setCheckedKaohsiung(true);

      setLocation(["高雄市"]);
    }
    if (value.substring(0, 3) === "基隆市") {
      clearPartial();
      setCheckedKeelung(true);

      setLocation(["基隆市"]);
    }
    if (value.substring(0, 3) === "新竹市") {
      clearPartial();
      setCheckedHsinchuCity(true);

      setLocation(["新竹市"]);
    }
    if (value.substring(0, 3) === "新竹縣") {
      clearPartial();
      setCheckedHsinchu(true);

      setLocation(["新竹縣"]);
    }
    if (value.substring(0, 3) === "苗栗縣") {
      clearPartial();
      setCheckedMiaoli(true);
      setLocation(["苗栗縣"]);
    }
    if (value.substring(0, 3) === "南投縣") {
      clearPartial();
      setCheckedNantou(true);

      setLocation(["南投縣"]);
    }
    if (value.substring(0, 3) === "彰化縣") {
      clearPartial();
      setCheckedChanghwa(true);
      setLocation([]);
      setLocation(["彰化縣"]);
    }
    if (value.substring(0, 3) === "雲林縣") {
      clearPartial();
      setCheckedYunlin(true);

      setLocation(["雲林縣"]);
    }
    if (value.substring(0, 3) === "嘉義市") {
      clearPartial();
      setCheckedChiayiCity(true);

      setLocation(["嘉義市"]);
    }
    if (value.substring(0, 3) === "嘉義縣") {
      clearPartial();
      setCheckedChiayi(true);

      setLocation(["嘉義縣"]);
    }
    if (value.substring(0, 3) === "屏東縣") {
      clearPartial();
      setCheckedPingtung(true);

      setLocation(["屏東縣"]);
    }
    if (value.substring(0, 3) === "宜蘭縣") {
      clearPartial();
      setCheckedYilan(true);

      setLocation(["宜蘭縣"]);
    }
    if (value.substring(0, 3) === "花蓮縣") {
      clearPartial();
      setCheckedHualien(true);
      setLocation(["花蓮縣"]);
    }
    if (value.substring(0, 3) === "台東縣") {
      clearPartial();
      setCheckedTaitung(true);

      setLocation(["台東縣"]);
    }
    if (value.substring(0, 3) === "澎湖縣") {
      clearPartial();
      setCheckedPenghu(true);

      setLocation(["澎湖縣"]);
    }
  };

  const clearPartial = async () => {
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
  };

  // ================= LOAD GOOGLE MAP ==================
  const [libraries] = useState(["drawing", "places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // LANGUAGE AND PLACES
    language: "zh-TW",
    region: "TW",
    libraries: libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>
        <Navbar />
        <section className="filter">
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
                      to={`?sortBy=desc&contract=${contract}&location=${location}&subjects=${subjects}`}
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
                      to={`?sortBy=asc&contract=${contract}&location=${location}&subjects=${subjects}`}
                      target="_self"
                    >
                      Sort
                    </Link>
                  </button>
                )}
              </form>

              {noOfCases.length === 0 ? (
                <div className="results">Results: 0 Job Cases</div>
              ) : noOfCases > 1 ? (
                <div className="results">Results: {noOfCases} Job Cases</div>
              ) : (
                <div className="results">Results: {noOfCases} Job Case</div>
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
                <div className="modal-box-contract">
                  <h2 style={{ margin: "0" }}>Category</h2>
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
                      <label htmlFor="university">Univeristy</label>

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

                      <label htmlFor="school">School</label>

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
                      <label htmlFor="language">Languages</label>
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
                      <label htmlFor="music">Musical</label>
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
                      <label htmlFor="standard">Other</label>
                    </div>
                  </div>
                </div>

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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
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
                            : onRemoveState(event);
                        }}
                        onClick={() => {
                          setCheckedPenghu(!checkedPenghu);
                        }}
                        value="澎湖縣"
                      />
                      <label htmlFor="q">Penghu Islands</label>
                    </div>
                  </div>
                </div>
                <input
                  type="button"
                  className="btn-search"
                  value="Clear All"
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
          <div className="wrap">
            <section className="listContent container-fluid">
              <div className="wrapper">
                <div className="adList">
                  {!isloaded ? (
                    <div
                      className="sidebar"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
                        alignItems: "center",
                        height: "604px",
                      }}
                    >
                      <ThreeDots
                        type="ThreeDots"
                        height={40}
                        width={80}
                        color={"grey"}
                      />
                    </div>
                  ) : (
                    <div className="wrapper-ads">
                      <div className="app-photo-1"></div>

                      {listingInfo.map((listing) => {
                        return (
                          <div className="ads" key={listing._id}>
                            <ExternalLink
                              href={
                                process.env.REACT_APP_BACKEND_URL +
                                `api/intllistings/adPosts/${listing.slug}`
                              }
                              target="_self"
                            >
                              <div className="rightmessage">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <h2>
                                    <figure className="smallPhoto">
                                      <img src={listing.filename} alt="" />
                                    </figure>
                                    <span
                                      style={{ marginRight: "45px" }}
                                    ></span>
                                    {listing.subjects_en + " "}
                                    {listing.contractType === "大學" ? (
                                      <span className="highlight_university">
                                        University
                                      </span>
                                    ) : listing.contractType === "學校" ? (
                                      <span className="highlight_school">
                                        School
                                      </span>
                                    ) : listing.contractType === "一般課程" ? (
                                      <span className="highlight_standard">
                                        Other
                                      </span>
                                    ) : listing.contractType === "語言" ? (
                                      <span className="highlight_language">
                                        Languages
                                      </span>
                                    ) : (
                                      <span className="highlight_music">
                                        Musical
                                      </span>
                                    )}
                                  </h2>

                                  <div
                                    style={{
                                      height: "30px",
                                      width: "150px",
                                      display: "block",
                                      color: "#2b2b2b",
                                    }}
                                  >
                                    {listing.state === "台北市"
                                      ? "Taipei City"
                                      : listing.state === "基隆市"
                                      ? "Keelung City"
                                      : listing.state === "新北市"
                                      ? "New Taipei City"
                                      : listing.state === "桃園市"
                                      ? "Taoyuan City"
                                      : listing.state === "台中市"
                                      ? "Taichung City"
                                      : listing.state === "新竹縣"
                                      ? "Hsinchu County"
                                      : listing.state === "苗栗縣"
                                      ? "Miaoli County"
                                      : listing.state === "南投縣"
                                      ? "Nantou County"
                                      : listing.state === "彰化縣"
                                      ? "Changhwa County"
                                      : listing.state === "嘉義縣"
                                      ? "Chiayi Count"
                                      : listing.state === "雲林縣"
                                      ? "Yunlin County"
                                      : listing.state === "屏東縣"
                                      ? "Pintung County"
                                      : listing.state === "澎湖縣"
                                      ? "Penghu Country"
                                      : listing.state === "宜蘭縣"
                                      ? "Yilan County"
                                      : listing.state === "花蓮縣"
                                      ? "Hualien County"
                                      : listing.state === "台東縣"
                                      ? "Taitung County"
                                      : listing.state === "嘉義市"
                                      ? "Chiayi City"
                                      : listing.state === "新竹市"
                                      ? "Hsinchu City"
                                      : listing.state === "台南市"
                                      ? "Tainan City"
                                      : listing.state === "高雄市"
                                      ? "Kaohsiung City"
                                      : ""}

                                    <div
                                      style={{
                                        fontWeight: "300",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Case ID:{" " + listing.caseId}
                                    </div>
                                  </div>
                                </div>

                                <h3>
                                  Posted: {listing.todaysDate}
                                  {applied.map((appId) => {
                                    return appId.caseId === listing.caseId ? (
                                      <span
                                        className="appliedbefore"
                                        key={appId._id}
                                      >
                                        Applied
                                      </span>
                                    ) : (
                                      <span key={appId._id}></span>
                                    );
                                  })}
                                </h3>
                                <p>{listing.about}</p>
                              </div>
                            </ExternalLink>
                          </div>
                        );
                      })}
                      {!listingInfo && (
                        <div className="no-listings">
                          <h2>No cases at this moment</h2>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="fixMap">
                  <Wrapper>
                    <Plan
                      state={location}
                      latitude={latitude}
                      longitude={longitude}
                    />
                  </Wrapper>
                </div>
              </div>
            </section>
            <div className="buttonSegment">
              <div
                style={{
                  backgroundColor: "#f0eff5",
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
          </div>
          <Footer asx={asx} />
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
            padding-top: 0px;
            background-color: #f0eff5;
          }

          .wrapper {
            display: grid;
            grid-column-gap: 0.1em;
            background-size: cover;
            grid-auto-rows: 796px;
            grid-template-columns: 100%;
            position: relative;
            padding: 0px 0px 0px 15px;
            overflow: hidden;
          }
          .buttonSegment {
            display: grid;
            grid-template-columns: 56% 44%;
            padding: 0px 0px 0px 15px;
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
          .appliedbefore {
            color: #e40000;
            font-size: 16px;
            height: 28px;
            line-height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-left: 10px;
          }

          .wrapper-ads .ads {
            height: 150px;
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

          .rightmessage figure {
            position: relative;
            display: block;
          }
          .rightmessage .smallPhoto {
            position: absolute;
            display: inline-block;
            margin: 0px 8px 0px 0px;
          }

          .applicant-ads .ads {
            height: 110px;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #ebebeb;
            background-color: rgba(35, 35, 35, 0.2);
            margin: 15px 10px 10px 0px;
            position: relative;
            overflow: hidden;
          }

          .wrapper-ads .rightmessage {
            margin-left: 0px;
            cursor: pointer;
            position: relative;
            padding: 10px 15px;
            display: block;
            margin-right: 15px;
            width: 97%;
            height: 100%;
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
          @media screen and (max-width: 768px) {
            .wrap .listContent .adList {
              width: 100%;
            }
          }
          @media only screen and (min-width: 768px) {
            .wrapper {
              grid-template-columns: 56% 44%;
              padding: 0px 0px 0px 15px;
            }
            .wrapper-ads .rightmessage {
              margin-left: 0px;
              width: 100%;
            }
          }

          .filter {
            height: 56px;
            display: block;
            background: #fff;
            border-bottom: 1px solid #ebebeb;
            position: fixed;
            margin-top: 0px;
            width: 100%;
            z-index: 2000;
            position: relative;
          }
          .fix-Container {
            width: 100%;
            height: 56px;
            position: relative;
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
          }

          .wrap .modal-box-contract {
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
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

          .filterCard .btn-search:active,
          .filterCard .btn-search:focus {
            outline: none;
            border: none;
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 500;
            display: block;
            line-height: 40px;
          }
          #arrow-down a {
            height: 100%;
            width: 100%;
            color: #484848;
            position: relative;
            font-family: "Noto Sans TC", sans-serif;
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
          @media only screen and (min-width: 768px) {
            .wrap .filterCard {
              width: 680px;
              padding: 30px 16px;
              z-index: 3500;
            }
            .results {
              display: block;
            }
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
            font-family: "Noto Sans TC", sans-serif;
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

          .fixMap {
            display: none;
            width: 100%;
            height: 100%;
          }
          #map {
            position: center;
            width: 100%;
            height: 100%;
            display: block;
          }

          @media screen and (min-width: 768px) {
            .fixMap {
              display: block;
            }
          }

          .paginate {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            border: none;
            z-index: 500;
            margin: 22px auto;
            background-color: #f0eff5;
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
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default SearchList;
