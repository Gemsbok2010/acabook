import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import zh from "date-fns/locale/zh-TW";
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
      north: 25.36,
      south: 21.35,
      //  TEST GEOLOCATE TO ALLOW AUSTRALIA
      // north: 30,
      // south: -80,
      east: 155.81,
      west: 110.28,
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
            使用當前位置
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
            使用當前位置
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

const Aedituser = () => {
  const { pathname } = useLocation();

  const userid = pathname.split("/")[2];

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
  const [idPhoto, setIdPhoto] = useState("");

  useEffect(() => {
    // ============ PROFILE DATA ===========
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "api/users/allusers/" + userid)
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
          setCountry(response.data.country);
          setCity(response.data.city);
          setState(response.data.state);
          setSuburb(response.data.suburb);
          setStreet(response.data.street);
          setStreetNo(response.data.streetNo);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
          setIdPhoto(response.data.filename);
        }
      });
  }, []);

  // ============ GENDER (Disable and enable submit) =========

  const [showGender, setShowGender] = useState(false);
  const handleShowGender = () => {
    setShowGender(false);
  };
  const handleSetGender = (e) => {
    const innerHTML = e.target.innerHTML;
    setUserInfo({ ...userInfo, gender: innerHTML });
  };

  // ========== SURVEY (Disable and enable submit) ===========
  const [showSurvey, setShowSurvey] = useState(false);
  const handleShowSurvey = () => {
    setShowSurvey(false);
  };
  const handleSetSurvey = (e) => {
    const innerHTML = e.target.innerHTML;
    setUserInfo({ ...userInfo, survey: innerHTML });
  };

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInAllusers(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 60,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

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

  //==== ID PHOTO (disable and enable save photo button) ====
  const [savePhoto, setSavePhoto] = useState(false);

  function imageUploadActivateButton() {
    setSavePhoto(true);
  }

  // =============== UPLOAD PHOTO ===============
  const [previewImage, setPreviewImage] = useState(false);
  const [previewText, setPreviewText] = useState(false);
  const [imageFacebook, setImageFacebook] = useState(false);
  const [imageHere, setImageHere] = useState("");

  const imageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      setPreviewText(true);
      setImageFacebook(true);
      setPreviewImage(true);
      reader.onload = function (event) {
        setImageHere(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // =========== DELETE PHOTO ==================
  const deletePhoto = async (id) => {
    await fetch(
      process.env.REACT_APP_BACKEND_URL + "api/users/allusers/" + id,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok === true) {
        setIdPhoto("");
      }
    });
  };

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
                setState("");
              }

              if (
                results[0].address_components[i].types[0] ===
                "administrative_area_level_1"
              ) {
                setState(results[0].address_components[i].long_name);
                setCity("");
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

  // ======= PUT REQUEST TO UPDATE TO AUTH.JS ======
  const onSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_BACKEND_URL + "api/users/allusers", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        survey: userInfo.survey,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        nationalId: userInfo.nationalId,
        gender: userInfo.gender,
        birth: userInfo.birth,
        email: userInfo.email,
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
          outPutErrorMessagesInAllusers(data.invalid);
        } else {
          setUpdateNote(true);
          setAlert(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setTimeout(function () {
            setUpdateNote(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // =========== BACKDROP ============//

  const [backdrop, setBackdrop] = useState(true);
  const [alertBanner, setAlertBanner] = useState(true);

  // ============ BIRTH DAY CALENDAR ================
  const [startDate, setStartDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const initialDate = new Date(1991, 0, 1);
  const today = new Date();
  const maxAgeLimit = new Date(
    today.getFullYear() - 3,
    today.getMonth(),
    today.getDate()
  );
  const [selectedDay, setSelectedDay] = useState(initialDate);

  const selectionner = (selectedDay) => {
    setShowCalendar(false);
    setSelectedDay(selectedDay);
    setStartDate(selectedDay);
    setUserInfo({
      ...userInfo,
      birth: `${selectedDay.getFullYear()}年 ${
        selectedDay.getMonth() + 1
      }月 ${selectedDay.getDate()}日`,
    });
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
        setState("");
      }
      if (
        places.address_components[i].types[0] === "administrative_area_level_1"
      ) {
        setState(places.address_components[i].long_name);
        setCity("");
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

  useEffect(() => {
    setAddress(`${country}${state}${city}${suburb}${street}${streetNo}`);
    setUserInfo({ ...userInfo, country: country });
  }, [latitude, country, state, city, suburb, street, streetNo]);

  // ================= LOAD GOOGLE MAP ==================
  const [libraries] = useState(["drawing", "places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // LANGUAGE AND PLACES
    language: "zh-TW",
    region: "TW",
    libraries: libraries,
  });

  if (!isLoaded) return <div>請稍待...</div>;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>

        <div className="wrap">
          <div className="personContent">
            {updateNote ? (
              <section className="updateNote container-fluid">
                <div className="container-fluid ">
                  <img
                    src="/images/tick.png"
                    style={{ width: "12px" }}
                    alt=""
                  />
                  <span>儲存完畢</span>
                </div>
              </section>
            ) : null}
          </div>

          <form
            id="formZero"
            action={
              process.env.REACT_APP_BACKEND_URL +
              `api/users/adminUpload?email=${userInfo.email}`
            }
            method="POST"
            encType="multipart/form-data"
          >
            <div className="personContent">
              <section className="questionCard container-fluid">
                <h2>頭像照片</h2>
                <div className="container-fluid regCon">
                  <div className="bigHead">
                    <figure id="imagePreview">
                      <div id="bin" onClick={() => deletePhoto(userInfo._id)}>
                        <input
                          type="submit"
                          id="embedBin"
                          style={{ visibility: "hidden" }}
                        />
                      </div>
                      {imageFacebook ? (
                        ""
                      ) : (
                        <>
                          <img
                            src={idPhoto}
                            alt=""
                            name="image-File"
                            id="image-facebook"
                          />
                          <img
                            src={`/uploads/${idPhoto}`}
                            alt=""
                            name="image-File"
                            id="image-facebook"
                          />
                        </>
                      )}
                      {previewImage ? (
                        <img
                          src={imageHere}
                          alt=""
                          name="imageFile"
                          id="image-preview"
                        />
                      ) : (
                        ""
                      )}

                      {previewText ? "" : <span id="text-preview"></span>}
                    </figure>
                    <div className="rp">
                      <span className="ex">
                        可接受 JPG, JPEG, PNG 和 GIF 檔. 最大檔案限制需小於:
                        600kb.
                      </span>
                      <br />
                      <div className="buttonsEven">
                        <label htmlFor="photoUpload" className="upload-btn">
                          上傳照片
                        </label>
                        <input
                          type="file"
                          accept="image/gif, image/jpeg, image/jpg, image/png"
                          className="form-control-file headUp"
                          id="photoUpload"
                          onChange={(event) => {
                            imageUpload(event);
                            imageUploadActivateButton();
                          }}
                          name="gameFile"
                        />

                        {savePhoto ? (
                          <button
                            style={{
                              backgroundColor: "#a5ce0f",
                              cursor: "pointer",
                              color: "#fff",
                              border: "1px solid #a5ce0f",
                            }}
                            type="submit"
                            id="savePhoto"
                          >
                            儲存照片
                          </button>
                        ) : (
                          <button type="button" disabled id="savePhoto">
                            儲存照片
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </form>
          <form id="formOne" onSubmit={onSubmit}>
            <div className="personContent">
              <section className="middleQuestionCard container-fluid">
                <h2>基本資料</h2>
                <div className="container-fluid regCon">
                  <div className="errorMessageHere">
                    {alert ? (
                      <div className="alert">
                        <img
                          src="/images/cross-black.png"
                          style={{ width: "12px" }}
                          alt=""
                        />
                        <span
                          dangerouslySetInnerHTML={{ __html: alertMsg }}
                        ></span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label
                          htmlFor="lastName"
                          className="col-sm-3 col-form-label"
                        >
                          姓氏
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control-lg"
                            id="lastName"
                            name="lastName"
                            autoComplete="off"
                            value={userInfo.lastName ? userInfo.lastName : ""}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-3 col-form-label"
                        >
                          名字
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control-lg"
                            id="firstName"
                            name="firstName"
                            autoComplete="none"
                            value={userInfo.firstName ? userInfo.firstName : ""}
                            onChange={handleOnChange}
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
                            value={userInfo.email ? userInfo.email : ""}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="phone"
                          className="col-sm-3 col-form-label"
                        >
                          行動電話
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            required
                            className="form-control-lg"
                            autoComplete="nope"
                            maxLength="10"
                            minLength="10"
                            placeholder="例如：0938 666 888"
                            value={userInfo.phone ? userInfo.phone : ""}
                            id="phone"
                            name="phone"
                            onChange={handleOnChange}
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
                          身分證字號
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            required
                            className="form-control-lg"
                            id="nationalId"
                            name="nationalId"
                            autoComplete="nope"
                            maxLength="10"
                            value={
                              userInfo.nationalId ? userInfo.nationalId : ""
                            }
                            placeholder="例如：E123456789"
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="gender"
                          className="col-sm-3 col-form-label"
                        >
                          性別
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            required
                            className="form-control-lg"
                            id="gender"
                            name="gender"
                            autoComplete="off"
                            defaultValue={
                              userInfo.gender ? userInfo.gender : ""
                            }
                            onFocus={() => setShowGender(true)}
                          />
                          {showGender && (
                            <div className="genderList">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    handleSetGender(e);
                                    handleShowGender();
                                  }}
                                >
                                  男
                                </li>
                                <li
                                  onClick={(e) => {
                                    handleSetGender(e);
                                    handleShowGender();
                                  }}
                                >
                                  女
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="birth"
                          className="col-sm-3 col-form-label"
                        >
                          出生日期
                        </label>
                        <div
                          className="col-sm-9 day_picker"
                          style={{ position: "relative" }}
                        >
                          <input
                            type="text"
                            required
                            className="form-control-lg"
                            autoComplete="off"
                            id="birth"
                            name="birth"
                            defaultValue={
                              startDate
                                ? `${selectedDay.getFullYear()}年 ${
                                    selectedDay.getMonth() + 1
                                  }月 ${selectedDay.getDate()}日`
                                : userInfo.birth
                            }
                            onClick={() => {
                              setShowCalendar(!showCalendar);
                            }}
                          />

                          {showCalendar ? (
                            <DayPicker
                              required
                              defaultMonth={
                                new Date(
                                  selectedDay.getFullYear(),
                                  selectedDay.getMonth()
                                )
                              }
                              captionLayout="dropdown"
                              selected={selectedDay}
                              locale={zh}
                              onSelect={selectionner}
                              showOutsideDays
                              numberOfMonths={1}
                              mode="single"
                              toDate={maxAgeLimit}
                              fromDate={
                                (today.getFullYear() - 70,
                                today.getMonth(),
                                today.getDate())
                              }
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="survey"
                          className="col-sm-3 col-form-label"
                        >
                          問卷調查
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            required
                            className="form-control-lg"
                            id="survey"
                            name="survey"
                            autoComplete="off"
                            defaultValue={
                              userInfo.survey ? userInfo.survey : ""
                            }
                            onFocus={() => setShowSurvey(true)}
                          />
                          {showSurvey && (
                            <div className="surveyList">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    handleSetSurvey(e);
                                    handleShowSurvey();
                                  }}
                                >
                                  搜索引擎
                                </li>
                                <li
                                  onClick={(e) => {
                                    handleSetSurvey(e);
                                    handleShowSurvey();
                                  }}
                                >
                                  廣告刊登
                                </li>
                                <li
                                  onClick={(e) => {
                                    handleSetSurvey(e);
                                    handleShowSurvey();
                                  }}
                                >
                                  Facebook
                                </li>
                                <li
                                  onClick={(e) => {
                                    handleSetSurvey(e);
                                    handleShowSurvey();
                                  }}
                                >
                                  口耳交接
                                </li>
                                <li
                                  onClick={(e) => {
                                    handleSetSurvey(e);
                                    handleShowSurvey();
                                  }}
                                >
                                  其他
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="personContent">
              <section className="bottomQuestionCard container-fluid">
                <h2>居住位置</h2>
                <div className="container-fluid regCon">
                  <div className="location">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="search">
                          搜索您的街道地址，附近的熱門地標或下面的一般區域.
                        </label>

                        <Autocomplete
                          className={"form-control-lg"}
                          restrictions={{ country: "tw" }}
                          fields={[
                            "address_components",
                            "geometry",
                            "icon",
                            "name",
                          ]}
                        >
                          {latitude && longitude ? (
                            <input
                              required
                              autoComplete="off"
                              type="text"
                              id="search"
                              placeholder="請輸入地址"
                              onSelect={handleSelect}
                              defaultValue={`${country}${state}${city}${suburb}${street}${streetNo}`}
                              onInput={() => {
                                setLatitude("");
                              }}
                            />
                          ) : (
                            <input
                              required
                              autoComplete="off"
                              type="text"
                              placeholder="請輸入地址"
                              onSelect={handleSelect}
                              id="search"
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                            />
                          )}
                        </Autocomplete>

                        <div className="bottomTips">
                          <p>
                            <b>找不到地址?</b>
                          </p>
                          <span>
                            搜索您的街道或點擊地圖右上角的{" "}
                            <b>「使用當前位置」</b>.
                          </span>
                        </div>
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
                  </div>
                </div>
              </section>
            </div>

            <div className="personContent">
              <section className="buttonCard container-fluid">
                {userInfo.lastName &&
                userInfo.firstName &&
                userInfo.nationalId &&
                userInfo.birth &&
                userInfo.phone &&
                userInfo.gender &&
                userInfo.survey &&
                userInfo.country ? (
                  <input
                    type="submit"
                    id="bottom_submit"
                    className="btn-vori"
                    value="儲存"
                  />
                ) : (
                  <button disabled>儲存</button>
                )}
              </section>
            </div>
          </form>
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
            padding: 0;
            background-color: #f4f5f6;
          }

          .btn-vori {
            position: relative;
            background-color: #a5ce0f;
            color: #fff;
            border: 1px solid #a5ce0f;
            font-weight: 800;
            width: 150px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            width: 100%;
            cursor: pointer;
          }

          .buttonCard button {
            position: relative;
            background-color: #ddd;
            color: #888;
            border: 1px solid #ddd;
            font-weight: 800;
            width: 150px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            width: 100%;
          }

          .regCon {
            width: 85% !important;
            padding: 20px 0;
          }
          .regCon h2 {
            margin-bottom: 20px;
          }
          .regCon .form-group {
            margin-bottom: 25px;
          }

          @media only screen and (min-width: 768px) {
            .wrap {
              padding-top: 60px;
            }
            .btn-vori {
              width: 200px;
            }
            .buttonCard button {
              width: 200px;
            }
          }

          /* ======== POST-SAVE MESSAGE ========== */
          .wrap .personContent {
            width: 90%;
            margin: 0 auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            position: relative;
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

          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 80%;
          }

          /* ========= 頭像照片 =========== */
          .wrap .questionCard {
            width: 80%;
            min-height: 270px;
            padding: 30px 20px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            margin-top: 40px;
            border-radius: 0px;
            background: #fff;
          }

          .wrap .questionCard h2 {
            position: absolute;
            transform: translate(0%, -200%);
            font-weight: 800;
            font-size: 24px;
            width: 440px;
            margin-top: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 40px;
            color: #2b2b2b;
          }
          .bigHead {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 85%;
            margin: 0 auto;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #ebebeb;
          }
          .bigHead #savePhoto {
            background-color: #ddd;
            color: #888;
            border: 1px solid #ddd;
            height: 40px;
            margin: 0px auto;
            width: 130px;
            margin-left: 5px;
          }
          .bigHead #savePhoto:focus,
          .bigHead #savePhoto:active {
            outline: none;
            border: none;
          }

          .bigHead #imagePreview {
            width: 150px;
            height: 150px;
            border: 1px solid #ddd;
            margin-top: 15px;
            display: flex;
            justify-content: center;
            background-color: #eee;
            color: #ccc;
            align-items: center;
            overflow: hidden;
            position: relative;
          }
          .bigHead #imagePreview img {
            position: absolute;
            height: 150px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }

          .bigHead #bin {
            margin: 4px 0px 0px 1px;
            height: 24px;
            width: 24px;
            cursor: pointer;
            position: relative;
            left: -42%;
            top: -43%;
            border-radius: 2px;
            background-color: #484848;
            background-image: url(./../../images/bin.png);
            background-position: center;
            background-size: 12px;
            background-repeat: no-repeat;
            z-index: 200;
          }

          .bigHead #bin:hover {
            background-color: #2b2b2b;
            cursor: pointer;
          }

          .bigHead #bin:active,
          .bigHead #bin:focus {
            border: none;
            background-color: #2b2b2b;
          }

          .bigHead .rp {
            margin-left: 50px;
          }
          .bigHead .ex {
            margin-bottom: 16px;
            display: inline-block;
          }

          #photoUpload {
            display: none;
          }
          .upload-btn,
          .photo-btn {
            color: #484848;
            width: 130px;
            height: 40px;
            text-align: center;
            line-height: 36px;
            cursor: pointer;
            border: 2px solid #dadada;
            background-color: white;
          }

          .bigHead .buttonsEven {
            display: flex;
            justifycontent: space-evenly;
            width: 60%;
          }

          @media screen and (max-width: 768px) {
            .wrap .questionCard {
              margin: 90px 0px 0px;
              width: 100%;
            }

            .bigHead .buttonsEven {
              display: block;
            }
            .bigHead #savePhoto {
              margin-left: 0px;
            }

            .bigHead {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
            }
            .bigHead > .rp {
              margin: 0 auto;
              text-align: center;
            }
            .bigHead > .rp .headUp {
              padding-left: 40px;
              margin-top: 10px;
            }
            .bigHead > .rp label {
              display: block;
            }
            .bigHead > .rp .ex {
              display: none;
            }
          }

          /* ============= 基本資料 居住位置 ============== */
          .wrap .bottomQuestionCard,
          .wrap .middleQuestionCard {
            width: 80%;
            min-height: 325px;
            padding: 30px 20px;
            margin-top: 90px;
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
          .wrap .middleQuestionCard h2 {
            position: absolute;
            font-size: 24px;
            font-weight: 800;
            transform: translate(10%, -260%);
            color: #2b2b2b;
          }
          .wrap .middleQuestionCard {
            min-height: 240px;
          }

          .middleQuestionCard .row {
            position: relative;
            top: 5%;
            width: 100%;
            left: 3%;
          }

          #email:disabled {
            background-color: #ebebeb;
          }
          input[type="text"],
          input[type="date"],
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
            font-family: "Noto Sans TC", sans-serif;
          }

          .genderList {
            position: absolute;
            z-index: 2000;
            width: 93%;
            display: block;
          }
          .genderList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .genderList ul li {
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

          .genderList ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }

          .surveyList {
            position: absolute;
            z-index: 2000;
            width: 94%;
            display: block;
          }
          .surveyList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .surveyList ul li {
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
          .surveyList ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }
          .wrap .buttonCard {
            width: 80%;
            margin: 30px auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 0px;
            background: #fff;
            background-color: #f4f5f6;
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

          .regCon .location > p {
            color: #777;
            font-size: 22px;
          }
          .regCon .location .bottomTips span {
            color: #2b2b2b;
            font-size: 14px;
            font-weight: 500;
          }
          .regCon .location .bottomTips p {
            color: #2b2b2b;
            margin: 10px auto;
            font-size: 16px;
            font-weight: 800;
          }

          @media screen and (max-width: 768px) {
            .wrap .bottomQuestionCard,
            .wrap .middleQuestionCard {
              margin: 90px 0px 0px;
              width: 100%;
            }
            .wrap .personContent {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
            }
            .wrap .buttonCard {
              width: 410px;
              margin: 25px auto;
            }
            .genderList {
              width: 95%;
            }
            .container {
              text-align: center;
            }
          }

          /* ========== BIRTHDAY CALENDAR ========== */
          .day_picker .rdp {
            position: absolute;
            z-index: 2000;
            transform: translate(-5%, -3%);
          }

          .day_picker .rdp-month {
            background-color: white;
            padding: 10px 15px;
            border: 1px solid black;
          }
          day_picker .rdp-day.rdp-day_selected {
            background-color: #a5ce0f;
          }

          .day_picker .rdp-day {
            height: 40px;
            width: 40px;
            border-radius: 0%;
          }

          .day_picker .rdp-day_outside {
            opacity: 0.25;
          }

          .wrap .middleQuestionCard .day_picker h2 {
            transform: translate(0, 0);
            position: relative;
          }

          .day_picker .rdp-day.rdp-day_selected {
            background-color: #a5ce0f;
          }

          /* ======= INCOMPLETE PROFILE ALERT POP UP ======== */

          .backdrop {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: #3f3f3f;
            z-index: 100;
            opacity: 0.8;
            cursor: auto;
            z-index: 2000;
          }
          .alertCard {
            position: fixed;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            width: 1140px;
            padding: 28px 30px;
            display: -webkit-box;
            display: -ms-flexbox;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 0px;
            background: rgba(255, 255, 255, 0.9);
            z-index: 2000;
          }
          .alertCard img {
            margin-left: -50%;
            width: 25px;
            cursor: pointer;
          }

          .alertCard h3 {
            color: #333;
            font-size: 42px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 900;
            margin-bottom: 40px;
            text-align: center;
          }

          .alertCard p {
            color: #333;
            font-size: 33px;
            font-family: "Noto Sans TC", sans-serif;
            text-align: left;
          }

          @media screen and (max-width: 768px) {
            .alertCard {
              width: 500px;
              margin: 0 auto;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};
export default Aedituser;
