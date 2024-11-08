import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import $ from "jquery";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";
import axios from "axios";
import i18next from "i18next";
import { ExternalLink } from "react-external-link";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import en from "date-fns/locale/en-AU";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

import { login } from "../redux/userInfo";

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

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.value);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");
  let token = params.get("token");
  let access = params.get("access");
  access = access === "true";

  const [readyToShow, setReadyToShow] = useState(false);
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
  const [isloading, setIsloading] = useState(false);

  // ========= GOOGLE SIGN UP DATA ===========
  useEffect(() => {
    setReadyToShow(false);
    if (id) {
      localStorage.setItem("userId", id);
      localStorage.setItem("token", token);
    }

    // ============ PROFILE DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/intlusers/allusers/" +
          localStorage.getItem("userId")
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("userId", response.data._id);
          setUserInfo(response.data);
          setCountry(response.data.country);

          if (!response.data.postalCode) {
            setPostalCode("");
          } else {
            setPostalCode(response.data.postalCode);
          }
          if (!response.data.state) {
            setState("");
          } else {
            setState(response.data.state);
          }
          if (!response.data.city) {
            setCity("");
          } else {
            setCity(response.data.city);
          }
          if (!response.data.suburb) {
            setSuburb("");
          } else {
            setSuburb(response.data.suburb);
          }

          if (!response.data.street) {
            setStreet("");
          } else {
            setStreet(response.data.street);
          }

          if (!response.data.streetNo) {
            setStreetNo("");
          } else {
            setStreetNo(response.data.streetNo);
          }

          if (!response.data.longitude) {
            setLongitude("");
          } else {
            setLongitude(response.data.longitude);
          }
          if (!response.data.latitude) {
            setLatitude("");
          } else {
            setLatitude(response.data.latitude);
          }
          if (!response.data.birth) {
            setStartDate("");
          } else {
            setStartDate(response.data.birth);
          }
          setIdPhoto(response.data.filename);
          dispatch(
            login({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              isLoggedIn: true,
              email: response.data.email,
              filename: response.data.filename,
              isTeacher: response.data.isTeacher,
              isActive: response.data.isActive,
              nanoId: response.data.nanoId,
              isAdmin: response.data.isAdmin,
              completeAccess:
                response.data.survey !== "" &&
                response.data.gender !== "" &&
                response.data.phone !== "" &&
                response.data.nationalId !== "" &&
                response.data.birth !== ""
                  ? true
                  : false,
            })
          );
          window.history.pushState({}, document.title, "/personal-details/en");
          setReadyToShow(true);
        }
      });
  }, [id]);

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
  const [alertPhoto, setAlertPhoto] = useState(false);

  function outPutErrorMessagePhoto(errorMessage) {
    setAlertPhoto(true);
    setImageHere(user.filename);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

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

  const [file, setFile] = useState("");

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

  const photoSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    fetch(
      process.env.REACT_APP_BACKEND_URL +
        "api/intlusers/upload?email=" +
        userInfo.email,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagePhoto(data.invalid);
        } else {
          setUpdateNote(true);
          setAlert(false);
          setIdPhoto(data.newImage);
          dispatch(
            login({
              firstName: user.firstName,
              lastName: user.lastName,
              isLoggedIn: true,
              email: user.email,
              filename: data.newImage,
              isTeacher: user.isTeacher,
              isActive: user.isActive,
              nanoId: user.nanoId,
              isAdmin: data.isAdmin,
              completeAccess: true,
            })
          );
          setTimeout(function () {
            setUpdateNote(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // =========== DELETE PHOTO ==================
  const deletePhoto = async (id) => {
    await fetch(
      process.env.REACT_APP_BACKEND_URL + "api/intlusers/allusers/" + id,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok === true) {
        setIdPhoto("");
        setImageHere("");
        dispatch(
          login({
            firstName: user.firstName,
            lastName: user.lastName,
            isLoggedIn: true,
            email: user.email,
            filename: "",
            isTeacher: user.isTeacher,
            isActive: user.isActive,
            nanoId: user.nanoId,
            isAdmin: user.isAdmin,
            completeAccess:
              user.survey !== "" &&
              user.gender !== "" &&
              user.phone !== "" &&
              user.nationalId !== "" &&
              user.birth !== ""
                ? true
                : false,
          })
        );
      }
    });
  };

  // ======= PUT REQUEST TO UPDATE TO INTLUSERS.JS ======
  const onSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    fetch(process.env.REACT_APP_BACKEND_URL + "api/intlusers/allusers", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
        nationalId: userInfo.nationalId,
        survey: userInfo.survey,
        gender: userInfo.gender,
        birth: startDate,
        country: country,
        city: city,
        state: state,
        suburb: suburb,
        street: street,
        streetNo: streetNo,
        latitude: latitude,
        longitude: longitude,
        postalCode: postalCode,
        filename: idPhoto,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data.invalid ===
            "<b>First Name</b> must only have <b>alphabetical characters</b>." ||
          data.invalid ===
            "<b>Surname</b> must only have <b>alphabetical characters</b>."
        ) {
          setLangBackdrop(true);
        }

        if (data.invalid) {
          outPutErrorMessagesInAllusers(data.invalid);
          setIsloading(false);
        } else {
          setUpdateNote(true);
          setIsloading(false);
          setAlert(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setUserInfo(data);
          dispatch(
            login({
              firstName: data.firstName,
              lastName: data.lastName,
              isLoggedIn: true,
              email: data.email,
              filename: data.filename,
              isTeacher: data.isTeacher,
              isActive: data.isActive,
              nanoId: data.nanoId,
              isAdmin: data.isAdmin,
              completeAccess: true,
            })
          );
          setTimeout(function () {
            setUpdateNote(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // ========= MONTHS ===========
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
    setStartDate(
      `${selectedDay.getDate()} ${
        months[selectedDay.getMonth()]
      } ${selectedDay.getFullYear()}`
    );
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

  // =========== BACKDROP ============//
  const [backdrop, setBackdrop] = useState(true);
  const [alertBanner, setAlertBanner] = useState(true);
  const [langbackdrop, setLangBackdrop] = useState(false);

  // ============= LOAD GOOGLE MAP ================
  const [libraries] = useState(["drawing", "places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // LANGUAGE AND PLACES
    language: "zh-TW",
    region: "TW",
    libraries: libraries,
  });

  if (readyToShow === false || isLoaded === false)
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
          <title>Personal Details | Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook Personal Details" />
        </Helmet>
        <LoggedInNavbar />
        <div className="personal_details">
          <Link to="/dashboard/en">Back to my Dashboard</Link>
          <h2>Personal information</h2>
        </div>

        {langbackdrop ? (
          <>
            <div className="language_backdrop"></div>
            <div className="language_alertCard">
              <img
                onClick={() => {
                  setLangBackdrop(false);
                }}
                src="/images/cross-black.png"
                alt=""
              />
              <div>
                <img
                  src="/images/twflag.png"
                  alt=""
                  style={{
                    width: "40px",
                    transform: "translateX(50%)",
                    marginBottom: "8px",
                  }}
                />
              </div>
              <p>系統查詢到您是在愛課網中文版做註冊的</p>

              <p>現在前往中文網站</p>
              <button
                onClick={() => {
                  i18next.changeLanguage("zh-Hant-TW");
                }}
              >
                <ExternalLink href="/logout" target="_self">
                  前往
                </ExternalLink>
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        {userInfo.survey === "" ||
        userInfo.gender === "" ||
        userInfo.phone === "" ||
        userInfo.nationalId === "" ? (
          <>
            {backdrop && alertBanner ? (
              <>
                <div className="backdrop"></div>
                <div className="alertCard">
                  <figure>
                    <img
                      className="cross"
                      onClick={() => {
                        setBackdrop(false);
                        setAlertBanner(false);
                      }}
                      src="/images/cross-black.png"
                      alt=""
                    />
                  </figure>
                  <h3>New User's Note</h3>
                  <p>
                    Please fill in the remainder empty fields.
                    <img
                      style={{ width: "390px", marginLeft: "20px" }}
                      src="/images/mobile.png"
                      alt=""
                    />
                  </p>
                  <br />
                  <p>
                    Thereafter, hit the "Save" button at the end.
                    <img
                      style={{ width: "200px", marginLeft: "20px" }}
                      src="/images/save_en.png"
                      alt=""
                    />
                  </p>
                  <br />
                  <p style={{ textAlign: "center" }}>
                    You would have full access to Acabook's services only when
                    your account is completed in full. Thank you.
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

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
                  <span>Updated successfully.</span>
                </div>
              </section>
            ) : null}
          </div>

          <form id="formZero" onSubmit={photoSubmit}>
            <div className="personContent">
              <section className="questionCard container-fluid">
                <h2>Photo</h2>
                <div className="container-fluid regCon">
                  <div className="errorMessageHere">
                    {alertPhoto ? (
                      <div className="alert">
                        <img
                          onClick={() => {
                            setAlertPhoto(false);
                          }}
                          style={{ cursor: "pointer", width: "12px" }}
                          src="/images/cross-black.png"
                          alt=""
                        />{" "}
                        <span
                          dangerouslySetInnerHTML={{ __html: alertMsg }}
                        ></span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
                        JPG, JPEG, PNG and GIF files only, max. file size: 600kb
                      </span>
                      <br />
                      <div className="buttonsEven">
                        <label htmlFor="photoUpload" className="upload-btn">
                          Upload Photo
                        </label>
                        <input
                          type="file"
                          accept="image/gif, image/jpeg, image/jpg, image/png"
                          className="form-control-file headUp"
                          id="photoUpload"
                          onChange={(event) => {
                            imageUpload(event);
                            imageUploadActivateButton();
                            setFile(event.target.files[0]);
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
                            Save Photo
                          </button>
                        ) : (
                          <button type="submit" disabled id="savePhoto">
                            Save Photo
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
                <h2>My Details</h2>
                <div className="container-fluid regCon">
                  <div className="errorMessageHere">
                    {alert ? (
                      <div className="alert">
                        <img
                          onClick={() => {
                            setAlert(false);
                          }}
                          style={{ cursor: "pointer", width: "12px" }}
                          src="/images/cross-black.png"
                          alt=""
                        />{" "}
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
                          htmlFor="firstName"
                          className="col-sm-3 col-form-label"
                        >
                          First Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control-lg"
                            id="firstName"
                            name="firstName"
                            minLength={2}
                            maxLength={35}
                            autoComplete="none"
                            value={userInfo.firstName ? userInfo.firstName : ""}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="lastName"
                          className="col-sm-3 col-form-label"
                        >
                          Surname
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control-lg"
                            minLength={2}
                            maxLength={35}
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
                            disabled
                            defaultValue={userInfo.email}
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
                            required
                            className="form-control-lg"
                            autoComplete="nope"
                            maxLength={10}
                            minLength={10}
                            placeholder="0938 666 888"
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
                          Passport No.
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            required
                            className="form-control-lg"
                            id="nationalId"
                            name="nationalId"
                            autoComplete="nope"
                            minLength={3}
                            maxLength={25}
                            value={
                              userInfo.nationalId ? userInfo.nationalId : ""
                            }
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="gender"
                          className="col-sm-3 col-form-label"
                        >
                          Gender
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            required
                            className="form-control-lg"
                            id="gender"
                            name="gender"
                            autoComplete="off"
                            value={userInfo.gender ? userInfo.gender : ""}
                            onFocus={() => {
                              setShowGender(true);
                              setShowSurvey(false);
                              setShowCalendar(false);
                            }}
                            onChange={() => {
                              setShowGender(true);
                              setShowSurvey(false);
                              setShowCalendar(false);
                            }}
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
                                  Male
                                </li>
                                <li
                                  onClick={(e) => {
                                    handleSetGender(e);
                                    handleShowGender();
                                  }}
                                >
                                  Female
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
                          Birth Date
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
                            value={startDate}
                            onClick={() => {
                              setShowCalendar(!showCalendar);
                              setShowGender(false);
                              setShowSurvey(false);
                            }}
                            onChange={() => {
                              setShowCalendar(!showCalendar);
                              setShowGender(false);
                              setShowSurvey(false);
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
                              locale={en}
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
                      {user.completeAccess === true ? (
                        ""
                      ) : (
                        <div className="form-group row">
                          <label
                            htmlFor="survey"
                            className="col-sm-3 col-form-label"
                          >
                            Survey
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              required
                              className="form-control-lg"
                              id="survey"
                              name="survey"
                              autoComplete="off"
                              value={userInfo.survey ? userInfo.survey : ""}
                              onFocus={() => {
                                setShowSurvey(true);
                                setShowGender(false);
                                setShowCalendar(false);
                              }}
                              onChange={() => {
                                setShowSurvey(true);
                                setShowGender(false);
                                setShowCalendar(false);
                              }}
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
                                    Search Engine
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      handleSetSurvey(e);
                                      handleShowSurvey();
                                    }}
                                  >
                                    Billboards
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      handleSetSurvey(e);
                                      handleShowSurvey();
                                    }}
                                  >
                                    Social Media
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      handleSetSurvey(e);
                                      handleShowSurvey();
                                    }}
                                  >
                                    Word of mouth
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      handleSetSurvey(e);
                                      handleShowSurvey();
                                    }}
                                  >
                                    Other
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="personContent">
              <section className="bottomQuestionCard container-fluid">
                <h2>My Location</h2>

                <div className="container-fluid">
                  <div className="location">
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
                                    : state === "基隆市"
                                    ? "Keelung City"
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
                                    : state === "宜蘭縣"
                                    ? "Yilan County"
                                    : state === "花蓮縣"
                                    ? "Hualien County"
                                    : state === "台東縣"
                                    ? "Taitung County"
                                    : state === "澎湖縣"
                                    ? "Penghu Country"
                                    : ""
                                }
                              />
                            </>
                          ) : (
                            <>
                              <input
                                required
                                autoComplete="off"
                                type="text"
                                placeholder="Type your address here..."
                                onSelect={handleSelect}
                                id="search"
                                value={address ? address : ""}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                              />
                              <div className="bottomTips">
                                <p>
                                  <b>Having difficulty finding your address?</b>
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
                  </div>
                </div>
              </section>
            </div>

            <div className="personContent">
              <section className="buttonCard container-fluid">
                {userInfo.lastName &&
                userInfo.firstName &&
                userInfo.nationalId &&
                startDate &&
                userInfo.phone &&
                userInfo.gender &&
                userInfo.survey &&
                street ? (
                  !isloading ? (
                    <input type="submit" className="btn-vori" value="Save" />
                  ) : (
                    <button className="btn-vori">
                      <ThreeDots
                        type="ThreeDots"
                        height={40}
                        width={80}
                        color={"white"}
                      />
                    </button>
                  )
                ) : (
                  <button disabled>Save</button>
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
            text-align: center;
            align-items: center;
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
            .buttonCard .btn-vori {
              width: 200px;
              text-align: center;
              background-color: #a5ce0f;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
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
            border-radius: 7px;
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

          .wrap .col-form-label {
            font-family: Arial;
            font-size: 14px;
            font-weight: 500;
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
          }
          .bigHead #savePhoto {
            background-color: #ddd;
            color: #888;
            border: 1px solid #ddd;
            height: 40px;
            margin: 0px auto;
            width: 130px;
            border-radius: 7px;
            margin-left: 5px;
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
            width: 150px;
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
            line-height: 38px;
            cursor: pointer;
            border: 1px solid #dadada;
            background-color: white;
            border-radius: 7px;
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
            border-radius: 7px;
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
          input[type="email"] {
            height: 42px;
            border-radius: 7px;
            text-decoration: none;
            outline: none !important;
            background: none;
            border: 1px solid #dadada;
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
              position: relative;
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

          /* ============ CHANGE LANGUAGE ALERT CARD ========== */
          .language_backdrop {
            display: block;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: #3f3f3f;
            z-index: 2005;
            opacity: 0.6;
          }

          .language_alertCard {
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
            background: rgba(255, 255, 255);
            z-index: 3000;
            border-radius: 4px;
          }
          .language_alertCard div img {
            margin-left: -50%;
            width: 25px;
            left: 0px;
            position: relative;
            cursor: default;
          }
          .language_alertCard img {
            width: 25px;
            cursor: pointer;
            left: 20px;
            text-align: left;
            position: absolute;
          }

          .language_alertCard button {
            color: white;
            border: 1px solid #a5ce0f;
            background-color: #a5ce0f;
            width: 200px;
            height: 50px;
            line-height: 48px;
            font-size: 20px;
            border-radius: 4px;
          }

          .language_alertCard button a {
            color: white;
            display: block;
            height: 100%;
            width: 100%;
          }

          .language_alertCard p {
            color: #333;
            font-size: 22px;
            font-family: "Noto Sans TC", sans-serif;
          }

          @media screen and (max-width: 768px) {
            .language_alertCard {
              width: 470px;
              margin: 0 auto;
            }
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
          .alertCard figure {
            position: relative;
            width: 100%;
            display: block;
          }

          .alertCard .cross {
            width: 25px;
            cursor: pointer;
            display: flex;
            align-items: left;
          }

          .alertCard h3 {
            color: #333;
            font-size: 42px;
            font-family: Arial;
            font-weight: 900;
            margin-bottom: 40px;
            text-align: center;
          }

          .alertCard p {
            color: #333;
            font-size: 28px;
            font-family: Arial;
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
export default PersonalDetails;
