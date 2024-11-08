import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

function Map({ address, latitude, longitude, geoLocate }) {
  const defaultProps = {
    center: {
      lat: 23.6978,
      lng: 120.9605,
    },
    zoom: 6,
    latLngBounds: {
      north: 30.36,
      south: 15.35,
      east: 175.81,
      west: 10.28,
    },
  };

  const option = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 17,
  };

  return (
    <>
      {latitude && longitude ? (
        <GoogleMap
          zoom={17}
          center={address ? option.center : { lat: latitude, lng: longitude }}
          mapContainerStyle={{
            width: "100%",
            height: "400px",
            marginBottom: "20px",
          }}
          options={{
            disableDefaultUI: true,
            gestureHandling: "none",
            restriction: {
              strictBounds: false,
              latLngBounds: defaultProps.latLngBounds,
            },
          }}
        >
          <button className="useCurrentButton" onClick={geoLocate}>
            Use Current Location
          </button>

          {latitude ? (
            <Marker
              position={
                address ? option.center : { lat: latitude, lng: longitude }
              }
              animation={window.google.maps.Animation.DROP}
              icon={{
                url: "/images/pencilmarker.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(35, -35),
                scaledSize: new window.google.maps.Size(35, 35),
                anchorPoint: window.google.maps.Point(50, -29),
              }}
            />
          ) : null}
        </GoogleMap>
      ) : (
        <GoogleMap
          center={latitude ? option.center : defaultProps.center}
          zoom={defaultProps.zoom}
          mapContainerStyle={{
            width: "100%",
            height: "400px",
            marginBottom: "20px",
          }}
          options={{
            disableDefaultUI: true,
            gestureHandling: "none",
            restriction: {
              strictBounds: false,
              latLngBounds: defaultProps.latLngBounds,
            },
          }}
        >
          <button className="useCurrentButton" onClick={geoLocate}>
            Use Current Location
          </button>

          {latitude ? (
            <Marker
              position={option.center}
              animation={window.google.maps.Animation.DROP}
              icon={{
                url: "/images/pencilmarker.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(35, -35),
                scaledSize: new window.google.maps.Size(35, 35),
                anchorPoint: window.google.maps.Point(50, -29),
              }}
            />
          ) : null}
        </GoogleMap>
      )}
    </>
  );
}

const Step1 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [, setFirstName] = useState("");
  const [, setLastName] = useState("");
  const [, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [resume, setResume] = useState("");
  const [residence, setResidence] = useState("");

  // ============= COUNTRY LIST =============
  const [nationalities] = useState([
    { title: "Taiwan - 台灣", id: 1 },
    { title: "Afghanistan - 阿富汗", id: 2 },
    { title: "Albania - 阿爾巴尼亞", id: 3 },
    { title: "Argentina - 阿根廷", id: 4 },
    { title: "Australia - 澳洲", id: 5 },
    { title: "Austria - 奧地利", id: 6 },
    { title: "Belarus - 白俄羅斯", id: 7 },
    { title: "Belgium - 比利時", id: 8 },
    { title: "Belize - 貝里斯", id: 9 },
    { title: "Bolivia - 玻利維亞", id: 10 },
    { title: "Brazil - 巴西", id: 11 },
    { title: "Bulgaria - 保加利亞", id: 12 },
    { title: "Cambodia - 柬埔寨", id: 13 },
    { title: "Canada - 加拿大", id: 14 },
    { title: "Chad - 查德", id: 15 },
    { title: "Chile - 智利", id: 16 },
    { title: "China - 中國", id: 17 },
    { title: "Colombia - 哥倫比亞", id: 18 },
    { title: "Costa Rica - 哥斯大黎加", id: 19 },
    { title: "Croatia - 克羅埃西亞", id: 20 },
    { title: "Czechia - 捷克", id: 21 },
    { title: "Denmark - 丹麥", id: 22 },
    { title: "Ecuador - 厄瓜多", id: 23 },
    { title: "Egypt - 埃及", id: 24 },
    { title: "El Salvador - 薩爾瓦多", id: 25 },
    { title: "Estonia - 愛沙尼亞", id: 26 },
    { title: "Eswatini - 史瓦帝尼", id: 27 },
    { title: "Ethiopia - 衣索比亞", id: 28 },
    { title: "Fiji - 斐濟", id: 29 },
    { title: "Finland - 芬蘭", id: 30 },
    { title: "France - 法國", id: 31 },
    { title: "Georgia - 喬治亞", id: 32 },
    { title: "Germany - 德國", id: 33 },
    { title: "Greece - 希臘", id: 34 },
    { title: "Guatemala - 瓜地馬拉", id: 35 },
    { title: "Haiti - 海地", id: 36 },
    { title: "Honduras - 宏都拉斯", id: 37 },
    { title: "Hong Kong - 香港", id: 38 },
    { title: "Hungary - 匈牙利", id: 39 },
    { title: "Iceland - 冰島", id: 40 },
    { title: "India - 印度", id: 41 },
    { title: "Indonesia - 印度尼西亞", id: 42 },
    { title: "Israel - 以色列", id: 43 },
    { title: "Iran - 伊朗", id: 44 },
    { title: "Iraq - 伊拉克", id: 45 },
    { title: "Ireland - 愛爾蘭", id: 46 },
    { title: "Italy - 義大利", id: 47 },
    { title: "Jamaica - 牙買加", id: 48 },
    { title: "Japan - 日本", id: 49 },
    { title: "Jordan - 約旦", id: 50 },
    { title: "Kazakhstan - 哈薩克", id: 51 },
    { title: "Laos - 寮國", id: 52 },
    { title: "Latvia - 拉脫維亞", id: 53 },
    { title: "Lithuania - 立陶宛", id: 54 },
    { title: "Luxembourg - 盧森堡", id: 55 },
    { title: "Macau - 澳門", id: 56 },
    { title: "Macedonia - 馬其頓", id: 57 },
    { title: "Malaysia - 馬來西亞", id: 58 },
    { title: "Mexico - 墨西哥", id: 59 },
    { title: "Mongolia - 蒙古", id: 60 },
    { title: "Morocco - 摩洛哥", id: 61 },
    { title: "Myanmar - 緬甸", id: 62 },
    { title: "Nambia - 那米比亞", id: 63 },
    { title: "Netherlands - 荷蘭", id: 64 },
    { title: "New Zealand - 紐西蘭", id: 65 },
    { title: "Nicaragua - 尼加拉瓜", id: 66 },
    { title: "Norway - 挪威", id: 67 },
    { title: "Pakistan - 巴基斯坦", id: 68 },
    { title: "Philippines - 菲律賓", id: 69 },
    { title: "Panama - 巴拿馬", id: 70 },
    { title: "Paraguay - 巴拉圭", id: 71 },
    { title: "Peru - 秘魯", id: 72 },
    { title: "Poland - 波蘭", id: 73 },
    { title: "Portugal - 葡萄牙", id: 74 },
    { title: "Romania - 羅馬尼亞", id: 75 },
    { title: "Russia - 俄羅斯", id: 76 },
    { title: "Saudi-Arabia - 沙烏地阿拉伯", id: 77 },
    { title: "Serbia - 塞爾維亞", id: 78 },
    { title: "Singapore - 新加坡", id: 79 },
    { title: "Slovakia - 斯洛伐克", id: 80 },
    { title: "South Africa - 南非", id: 81 },
    { title: "South Korea - 南韓", id: 82 },
    { title: "Spain - 西班牙", id: 83 },
    { title: "Sri Lanka - 斯里蘭卡", id: 84 },
    { title: "Sweden - 瑞典", id: 85 },
    { title: "Switzerland - 瑞士", id: 86 },
    { title: "Thailand - 泰國", id: 87 },
    { title: "Tonga - 東加王國", id: 88 },
    { title: "Tunisia - 圖尼西亞", id: 89 },
    { title: "Turkiye - 土耳其", id: 90 },
    { title: "Ukraine - 烏克蘭", id: 91 },
    { title: "United Kingdom - 英國", id: 92 },
    { title: "United States - 美國", id: 93 },
    { title: "Uruguay - 烏拉圭", id: 94 },
    { title: "Vanuatu - 萬那杜", id: 95 },
    { title: "Venezuela - 委內瑞拉", id: 96 },
    { title: "Vietnam - 越南", id: 97 },
    { title: "Zimbabwe - 辛巴威", id: 98 },
    { title: "Others - 其他", id: 99 },
  ]);

  // ====== NATIONALITY (Disable and enable submit) ======

  const [seeNationality, setSeeNationality] = useState(false);
  const handleShowNationalies = () => {
    setSeeNationality(false);
  };

  const handleSetNationality = (e) => {
    const innerHTML = e.target.innerHTML;
    setNationality(innerHTML);
  };

  // ======= NATIONALITY (Disable and enable submit) =======
  const handlePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
  };

  // ============= COUNTRY LIST =============
  const [countries] = useState([
    { title: "Taiwan", id: 1 },
    { title: "Australia", id: 2 },
  ]);

  // ====== RESIDENCE (Disable and enable submit) ======

  const [seeResidence, setSeeResidence] = useState(false);
  const handleShowResidence = () => {
    setSeeResidence(false);
  };

  const handleSetResidence = (e) => {
    const innerHTML = e.target.innerHTML;
    setResidence(innerHTML);
    setStreetNo("");
    setStreet("");
    setSuburb("");
    setPostalCode("");
    setCity("");
    setState("");
    setCountry("");
    setLatitude("");
    setLongitude("");
    setAddress("");
  };

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
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
    if (!ReactSession.get("teacher_nationalId")) {
      setNationalId("");
    } else {
      setNationalId(ReactSession.get("teacher_nationalId"));
    }
    setResidence(ReactSession.get("teacher_residence"));
    setGender(ReactSession.get("teacher_gender"));
    setFirstName(ReactSession.get("teacher_firstName"));
    setLastName(ReactSession.get("teacher_lastName"));
    setCountry(ReactSession.get("teacher_country"));
    setCity(ReactSession.get("teacher_city"));
    setState(ReactSession.get("teacher_state"));
    setSuburb(ReactSession.get("teacher_suburb"));
    setStreet(ReactSession.get("teacher_street"));
    setStreetNo(ReactSession.get("teacher_streetNo"));
    setPostalCode(ReactSession.get("teacher_postalCode"));
    setLatitude(ReactSession.get("teacher_latitude"));
    setLongitude(ReactSession.get("teacher_longitude"));
    setResume(ReactSession.get("resume"));
    // ============ PROFILE DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/intlusers/allusers/" +
          localStorage.getItem("userId")
      )
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setGender(response.data.gender);
        }
      });
  }, []);

  // ========== ALERT MESSAGE ===============
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInStep1(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 60,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  // ======= ONSUBMIT TO NEXT STEP 2 =======
  const onSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_BACKEND_URL + "api/intlteachers/step1", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        phone: phone,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInStep1(data.invalid);
          setAddress("");
        } else {
          ReactSession.set("teacher_firstName", userInfo.firstName);
          ReactSession.set("teacher_lastName", userInfo.lastName);
          ReactSession.set("teacher_gender", userInfo.gender);
          ReactSession.set("teacher_phone", phone);
          ReactSession.set("teacher_nationality", nationality);
          ReactSession.set("teacher_nationalId", nationalId);
          ReactSession.set("teacher_country", country);
          ReactSession.set("teacher_city", city);
          ReactSession.set("teacher_state", state);
          ReactSession.set("teacher_suburb", suburb);
          ReactSession.set("teacher_street", street);
          ReactSession.set("teacher_streetNo", streetNo);
          ReactSession.set("teacher_postalCode", postalCode);
          ReactSession.set("teacher_latitude", latitude);
          ReactSession.set("teacher_longitude", longitude);
          ReactSession.set("teacher_residence", residence);
          navigate("/step2/en");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // ============ HIGHLIGHT ADDRESS SEARCH FIELD ==========
  var has_focus = false;
  $("#search").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });

  $("#search").blur(function (e) {
    has_focus = false;
  });

  // ================= GEOLOCATION ==================
  const geoLocate = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      const geocoder = new window.google.maps.Geocoder();

      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === "OK") {
            setStreetNo("");
            setStreet("");
            setSuburb("");
            setPostalCode("");
            setCity("");
            setState("");
            setCountry("");
            setLatitude("");
            setLongitude("");

            for (var i = 0; i < results[0].address_components.length; i++) {
              if (
                results[0].address_components[i].types[0] === "street_number"
              ) {
                setStreetNo(results[0].address_components[i].long_name);
              }
              if (results[0].address_components[i].types[0] === "route") {
                setStreet(results[0].address_components[i].long_name);
              }
              if (
                results[0].address_components[i].types[0] ===
                "administrative_area_level_3"
              ) {
                setSuburb(results[0].address_components[i].long_name);
              }

              if (results[0].address_components[i].types[0] === "postal_code") {
                setPostalCode(results[0].address_components[i].long_name);
              }
              if (
                results[0].address_components[i].types[0] ===
                "administrative_area_level_2"
              ) {
                setCity(results[0].address_components[i].long_name);
              }

              if (
                results[0].address_components[i].types[0] ===
                "administrative_area_level_1"
              ) {
                setState(results[0].address_components[i].long_name);
              }

              if (results[0].address_components[i].types[0] === "country") {
                setCountry(results[0].address_components[i].long_name);
              }
              setLatitude(pos.lat);
              setLongitude(pos.lng);
            }
          }
        });
      });
    }
  };

  // ============== AUTOCOMPLETE ===============
  const [address, setAddress] = useState("");

  const getAddressObject = async (places) => {
    setStreetNo("");
    setStreet("");
    setSuburb("");
    setPostalCode("");
    setCity("");
    setState("");
    setCountry("");
    setLatitude("");
    setLongitude("");

    for (var i = 0; i < places.address_components.length; i++) {
      if (places.address_components[i].types[0] === "street_number") {
        setStreetNo(places.address_components[i].long_name);
      }
      if (places.address_components[i].types[0] === "route") {
        setStreet(places.address_components[i].long_name);
      }
      if (
        places.address_components[i].types[0] === "administrative_area_level_3"
      ) {
        setSuburb(places.address_components[i].long_name);
      }
      if (places.address_components[i].types[0] === "postal_code") {
        setPostalCode(places.address_components[i].long_name);
      }
      if (
        places.address_components[i].types[0] === "administrative_area_level_2"
      ) {
        setCity(places.address_components[i].long_name);
      }
      if (
        places.address_components[i].types[0] === "administrative_area_level_1"
      ) {
        setState(places.address_components[i].long_name);
      }

      if (places.address_components[i].types[0] === "country") {
        setCountry(places.address_components[i].long_name);
      }
    }
    if (places.geometry.viewport) {
      setLongitude(places.geometry.location.lng());
      setLatitude(places.geometry.location.lat());
    }
  };

  const handleSelect = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("search")
    );
    autocomplete.setComponentRestrictions({
      country: ["tw"],
    });

    autocomplete.addListener("place_changed", async () => {
      const places = autocomplete.getPlace();
      getAddressObject(places);
    });
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

  if (!isLoaded)
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
          <title>Tutor Registration Step 1 | Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>
        <LoggedInNavbar />
        <div className="personal_details">
          <Link to="/dashboard/en">Back to my Dashboard</Link>
          <h2>Create Tutor Profile</h2>
        </div>
        <div className="wrap">
          <div className="Q1title">
            <ul className="stepNav threeWide">
              <li>
                <Link className="active" style={{ fontWeight: "bold" }} to="#">
                  <span className="badge-highlight">1</span>
                  <span className="active">My Details</span>
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor:
                      ReactSession.get("teacher_residence") &&
                      ReactSession.get("teacher_phone") &&
                      ReactSession.get("teacher_nationality")
                        ? "pointer"
                        : "default",
                  }}
                  to={
                    ReactSession.get("teacher_residence") &&
                    ReactSession.get("teacher_phone") &&
                    ReactSession.get("teacher_nationality")
                      ? "/step2/en"
                      : "#"
                  }
                >
                  <span className="badge">2</span>
                  <span>My Experiences</span>
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: ReactSession.get("resume") ? "pointer" : "default",
                  }}
                  to={ReactSession.get("resume") ? "/step3/en" : "#"}
                >
                  <span className="badge">3</span>
                  <span>My Subjects</span>
                </Link>
              </li>
              <li>
                <Link
                  className="active"
                  style={{
                    fontWeight: "bold",
                    cursor: resume ? "pointer" : "default",
                  }}
                  to={resume ? "/step4/en" : "#"}
                >
                  <span className="badge">4</span>
                  <span>CV Review</span>
                </Link>
              </li>

              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: "default",
                  }}
                  to={"#"}
                >
                  <span className="badge">5</span>
                  <span>Complete</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="errorMessageHere">
            {alert ? (
              <div className="alert">
                <img
                  src="/images/cross-black.png"
                  style={{ width: "12px" }}
                  alt=""
                />
                <span dangerouslySetInnerHTML={{ __html: alertMsg }}></span>
              </div>
            ) : (
              ""
            )}
          </div>
          <form id="formOne" onSubmit={onSubmit}>
            <div className="personContent">
              <section className="middlequestionCard">
                <h2>My Details</h2>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label
                        htmlFor="firstName"
                        className="col-sm-3 col-form-label"
                      >
                        First Name
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          autoComplete="nope"
                          disabled
                          className="form-control-lg"
                          id="firstName"
                          defaultValue={userInfo.firstName}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="lastName"
                        className="col-sm-3 col-form-label"
                      >
                        LastName
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          autoComplete="nope"
                          disabled
                          className="form-control-lg"
                          id="lastName"
                          defaultValue={userInfo.lastName}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="email"
                        className="col-sm-3 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="email"
                          className="form-control-lg"
                          id="email"
                          defaultValue={userInfo.email}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label
                        htmlFor="nationalId"
                        className="col-sm-3 col-form-label"
                      >
                        Passport No.
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          autoComplete="nope"
                          disabled
                          className="form-control-lg"
                          id="nationalId"
                          defaultValue={userInfo.nationalId}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="phone"
                        className="col-sm-3 col-form-label"
                      >
                        Mobile
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          autoComplete="nope"
                          required
                          className="form-control-lg"
                          id="phone"
                          maxLength="10"
                          minLength="10"
                          placeholder="Example: 0938 666 888"
                          value={phone}
                          onChange={handlePhone}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="nationality"
                        className="col-sm-3 col-form-label"
                      >
                        Nationality
                      </label>
                      <div className="col-sm-9">
                        <input
                          required
                          autoComplete="nope"
                          type="text"
                          readOnly
                          className="form-control-lg"
                          id="nationality"
                          placeholder="Select Nationality"
                          value={nationality ? nationality : ""}
                          onClick={() => {
                            setSeeNationality(!seeNationality);
                          }}
                        />
                        {seeNationality ? (
                          <div className="nationality">
                            <ul>
                              {nationalities.map((nationality) => {
                                return (
                                  <li
                                    key={nationality.id}
                                    onClick={(e) => {
                                      handleSetNationality(e);
                                      handleShowNationalies();
                                    }}
                                  >
                                    {nationality.title}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="personContent">
              <section className="bottomQuestionCard">
                <h2>My Location</h2>
                <div className="container-fluid">
                  <div className="form-group row">
                    <label
                      htmlFor="residence"
                      className="col-sm-3 col-form-label"
                    >
                      Country of Residence
                    </label>
                    <div className="col-sm-9">
                      <input
                        required
                        autoComplete="nope"
                        type="text"
                        readOnly
                        className="form-control-lg"
                        id="residence"
                        value={residence}
                        onClick={() => {
                          setSeeResidence(!seeResidence);
                        }}
                      />
                      {seeResidence ? (
                        <div className="residence">
                          <ul>
                            {countries.map((country) => {
                              return (
                                <li
                                  key={country.id}
                                  onClick={(e) => {
                                    handleSetResidence(e);
                                    handleShowResidence();
                                  }}
                                >
                                  {country.title}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="address">
                    {residence === "Australia" ? (
                      ""
                    ) : (
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="search">
                            Search for your street address, nearly popular
                            landmark, or general area below.
                          </label>

                          <Autocomplete
                            className={"googleAutoComplete"}
                            restrictions={{ country: "tw" }}
                            fields={[
                              "address_components",
                              "geometry",
                              "icon",
                              "name",
                            ]}
                          >
                            {latitude ? (
                              <>
                                <input
                                  required
                                  autoComplete="off"
                                  type="text"
                                  id="search"
                                  placeholder="Type your address here..."
                                  onSelect={handleSelect}
                                  value={`${state}${city}${suburb}${street}${streetNo}`}
                                  onInput={() => {
                                    setLatitude("");
                                    setAddress("");
                                  }}
                                  onChange={() => {
                                    setLatitude("");
                                    setAddress("");
                                  }}
                                />

                                <input
                                  type="text"
                                  disabled
                                  style={{
                                    marginTop: "6px",
                                    border: "none",
                                    paddingTop: "1px",
                                    paddingBottom: "1px",
                                    height: "24px",
                                    fontWeight: "700",
                                  }}
                                  value={
                                    state === "台北市"
                                      ? "Taipei City"
                                      : state === "新北市"
                                      ? "New Taipei City"
                                      : state === "桃園市"
                                      ? "Taoyuan City"
                                      : state === "新竹市"
                                      ? "Hsinchu City"
                                      : state === "新竹縣"
                                      ? "Hsinchu County"
                                      : state === "苗栗縣"
                                      ? "Miaoli County"
                                      : state === "台中市"
                                      ? "Taichung City"
                                      : state === "南投縣"
                                      ? "Nantou County"
                                      : state === "彰化縣"
                                      ? "Changhwa County"
                                      : state === "雲林縣"
                                      ? "Yunlin County"
                                      : state === "嘉義縣"
                                      ? "Chiayi County"
                                      : state === "嘉義市"
                                      ? "Chiayi City"
                                      : state === "台南市"
                                      ? "Tainan City"
                                      : state === "高雄市"
                                      ? "Kaohsiung City"
                                      : state === "屏東縣"
                                      ? "Pintung County"
                                      : state === "澎湖縣"
                                      ? "Penghu Country"
                                      : state === "宜蘭縣"
                                      ? "Yilan County"
                                      : state === "花蓮縣"
                                      ? "Hualien County"
                                      : state === "台東縣"
                                      ? "Taitung County"
                                      : state === "基隆市"
                                      ? "Keelung City"
                                      : ""
                                  }
                                />
                              </>
                            ) : (
                              <>
                                <input
                                  required
                                  type="text"
                                  placeholder="Type your address here..."
                                  autoComplete="none"
                                  onSelect={handleSelect}
                                  id="search"
                                  value={address ? address : ""}
                                  onChange={(e) => {
                                    setAddress(e.target.value);
                                  }}
                                />
                                <div className="bottomTips">
                                  <p>
                                    <b>
                                      Having difficulty finding your address?
                                    </b>
                                  </p>
                                  <span>
                                    Search for your street or click "Use Current
                                    Location" in the top centre of the map.
                                  </span>
                                </div>
                              </>
                            )}
                          </Autocomplete>
                        </div>
                        <div className="col-md-6">
                          <Map
                            address={address}
                            latitude={latitude}
                            longitude={longitude}
                            geoLocate={geoLocate}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>

            <div className="personContent">
              <section className="buttonCard">
                {residence && nationality && phone ? (
                  <input type="submit" className="btn-vori" value="Next" />
                ) : (
                  <input
                    type="button"
                    disabled
                    className="btn-vori"
                    value="Next"
                  />
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
            min-height: 100vh;
            background-color: #333;
          }
          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 80%;
          }

          @media screen and (max-width: 768px) {
            .wrap {
              padding: 0;
            }
          }
          /* ============= 基本資料 居住位置 ============== */
          input[type="text"],
          input[type="tel"],
          input[type="email"] {
            height: 42px;
            border-radius: 0px;
            text-decoration: none;
            outline: none !important;
            background: none;
            border: 2px solid #dadada;
            padding: 12px 15px;
            font-weight: 500;
            width: 100%;
            font-size: 14px;
            color: #2b2b2b;
            font-family: sans-serif;
          }
          #email:disabled,
          #firstName:disabled,
          #lastName:disabled,
          #nationalId:disabled {
            background-color: #ebebeb;
          }
          .nationality {
            position: absolute;
            z-index: 2000;
            width: 96%;
            display: block;
            height: 250px;
            overflow: scroll;
            z-index: 5000;
          }
          .nationality ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }

          .nationality ul li {
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
            display: block;
          }

          .nationality ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }

          .wrap .personContent {
            width: 90%;
            margin: 0 auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            position: relative;
          }

          hr {
            display: block;
            margin-top: 0em;
            margin-bottom: 2em;
            margin-left: auto;
            margin-right: auto;
            border-width: 1px;
          }

          .wrap .bottomQuestionCard,
          .wrap .middlequestionCard {
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
          .wrap .bottomQuestionCard h2,
          .wrap .middlequestionCard h2 {
            position: absolute;
            font-size: 24px;
            font-weight: 800;
            transform: translate(10%, -260%);
            color: white;
          }
          .bottomQuestionCard #address {
            width: 100%;
          }
          .wrap .middlequestionCard .col-form-label {
            font-size: 14px;
          }

          .wrap .buttonCard {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            background-color: #333;
            width: 80%;
            margin: 30px auto 30px;
            text-align: center;
          }

          .wrap .middlequestionCard {
            min-height: 260px;
          }

          .middlequestionCard .row {
            position: relative;
            top: 8%;
            width: 100%;
            left: 3%;
          }

          .btn-vori {
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
          }

          .btn-vori:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          .useCurrentButton {
            background-color: #a5ce0f;
            color: white;
            font-weight: 800;
            width: 150px;
            height: 36px;
            outline: none;
            border: none;
            font-size: 12px;
            cursor: pointer;
            z-index: 1;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          .useCurrentButton:active,
          .useCurrentButton:focus {
            outline: none;
            border: none;
          }

          @media screen and (max-width: 768px) {
            .wrap .bottomQuestionCard,
            .wrap .middlequestionCard {
              margin: 90px 0px 0px;
              width: 100%;
            }
            .wrap .personContent {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
              position: relative;
            }

            .wrap .buttonCard {
              width: 410px;
              margin: 25px auto;
            }
            input[type="submit"] {
              width: 100%;
            }
          }

          /* ============= COUNTRY OF RESIDENCE ============== */
          .residence {
            position: absolute;
            z-index: 2000;
            width: 98%;
            display: block;
            height: 250px;
            overflow: scroll;
            z-index: 5000;
          }
          .residence ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }

          .residence ul li {
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
            display: block;
          }

          .residence ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
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

export default Step1;
