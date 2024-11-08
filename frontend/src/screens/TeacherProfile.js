import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { ExternalLink } from "react-external-link";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

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

const TeacherProfile = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [readyToShow, setReadyToShow] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [SMStext, setSMStext] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [idPhoto, setIdPhoto] = useState("");
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    setReadyToShow(false);
    // ============ PROFILE DATA ===========
    const fetchData = async () => {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL +
            "api/teachers/profile/" +
            user.email
        )
        .then((response) => {
          if (response.status === 200) {
            setUserInfo(response.data);
            setSMStext(response.data.SMStext);
            setNewsletter(response.data.newsletter);
            setCountry(response.data.country);
            setCity(response.data.city);
            setState(response.data.state);
            setSuburb(response.data.suburb);
            setStreet(response.data.street);
            setStreetNo(response.data.streetNo);
            setLatitude(response.data.latitude);
            setLongitude(response.data.longitude);
            setPhone(response.data.phone);
            setIdPhoto(response.data.filename);
            setReadyToShow(true);
          }
        });
    };
    fetchData();
  }, []);

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const [updatePhoto, setUpdatePhoto] = useState(false);
  const [alertPhoto, setAlertPhoto] = useState(false);

  function outPutErrorMessagePhoto(errorMessage) {
    setAlertPhoto(true);
    setImageHere("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  function outPutErrorMessagesInAllusers(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 70,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  // ========== SUBMIT DATA ===============
  const onSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    fetch(process.env.REACT_APP_BACKEND_URL + "api/teachers/updateProfile", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: userInfo._id,
        phone: phone,
        street: street,
        streetNo: streetNo,
        postalCode: postalCode,
        suburb: suburb,
        state: state,
        city: city,
        country: country,
        longitude: longitude,
        latitude: latitude,
        isTeacher: true,
        SMStext: SMStext,
        newsletter: newsletter,
        photo: idPhoto,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInAllusers(data.invalid);
          setIsloading(false);
        } else {
          setUpdateNote(true);
          setAlert(false);
          window.scrollTo({
            top: 70,
            behavior: "smooth",
          });
          setIsloading(false);
          setTimeout(function () {
            setUpdateNote(false);
          }, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
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
        "api/teachers/upload?email=" +
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
          setUpdatePhoto(true);
          setAlert(false);
          setAlertPhoto(false);
          setIdPhoto(data.newImage);
          setTimeout(function () {
            setUpdatePhoto(false);
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
      process.env.REACT_APP_BACKEND_URL + "api/teachers/allusers/" + id,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok === true) {
        setIdPhoto("");
        setImageHere("");
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
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>
        <LoggedInNavbar />
        <div className="personal_details">
          <Link to="/dashboard">返回帳戶中心</Link>
          <h2>我當家教管理</h2>
        </div>
        <div className="wrap">
          <div className="divider">
            <div className="personContent">
              <div className="threeItem">
                <div>
                  <Link style={{ color: "#a5ce0f" }} to="#">
                    老師資料
                  </Link>
                </div>
                <div>
                  <Link to="/teacher_cv">修改履歷表</Link>
                </div>
                <div>
                  <ExternalLink
                    href={
                      process.env.REACT_APP_BACKEND_URL +
                      `api/teachers/resume/${userInfo.teacherId}`
                    }
                    target="_self"
                  >
                    預覽履歷表
                  </ExternalLink>
                </div>
              </div>
            </div>
            <div className="allQuestionCards">
              <form id="formZero" onSubmit={photoSubmit}>
                <div className="sectionHeadings">
                  <h2>頭像照片</h2>
                </div>
                <div className="questionCard">
                  <div className="container-fluid regCon">
                    <div className="errorMessageHere">
                      {updatePhoto && (
                        <section className="updateNote container-fluid">
                          <div className="container-fluid ">
                            <img src="/images/tick.png" width="12px" alt="" />
                            <span>儲存完畢</span>
                          </div>
                        </section>
                      )}
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
                              setFile(event.target.files[0]);
                            }}
                            name="file"
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
                            <button type="submit" disabled id="savePhoto">
                              儲存照片
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <form id="formOne" onSubmit={onSubmit}>
                <div className="sectionHeadings">
                  <h2>基本資料</h2>
                </div>

                <section className="middleQuestionCard">
                  <div className="errorMessageHere">
                    {updateNote && (
                      <section className="updateNote container-fluid">
                        <div className="container-fluid ">
                          <img src="/images/tick.png" width="12px" alt="" />
                          <span>儲存完畢 </span>
                        </div>
                      </section>
                    )}
                    {alert ? (
                      <div className="alert">
                        <img
                          onClick={() => {
                            setAlert(false);
                          }}
                          src="/images/cross-black.png"
                          style={{ width: "12px", cursor: "pointer" }}
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
                            defaultValue={user.lastName}
                            disabled
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
                            defaultValue={user.firstName}
                            disabled
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
                            defaultValue={user.email}
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
                          身分證字號
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
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
                          行動電話
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="tel"
                            autoComplete="nope"
                            className="form-control-lg"
                            maxLength={10}
                            id="phone"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="nationality"
                          className="col-sm-3 col-form-label"
                        >
                          國籍
                        </label>
                        <div className="col-sm-9">
                          <input
                            required
                            type="text"
                            disabled
                            className="form-control-lg"
                            id="nationality"
                            defaultValue={userInfo.nationality}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="sectionHeadings">
                  <h2>居住位置</h2>
                </div>
                <section className="bottomQuestionCard">
                  <div className="container-fluid">
                    <div className="address">
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
                            {latitude ? (
                              <input
                                required
                                autoComplete="off"
                                type="text"
                                id="search"
                                placeholder="請輸入地址"
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
                            ) : (
                              <input
                                required
                                autoComplete="off"
                                type="text"
                                placeholder="請輸入地址"
                                onSelect={handleSelect}
                                id="search"
                                value={address ? address : ""}
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
                <div className="sectionHeadings">
                  <h2>訂閱與SMS簡訊通知</h2>
                </div>
                <section className="SMSQuestionCard">
                  <div className="container-fluid regCon">
                    {SMStext ? (
                      <input
                        type="checkbox"
                        id="SMStext"
                        checked={SMStext}
                        onChange={() => {
                          setSMStext(!SMStext);
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        id="SMStext"
                        checked={SMStext}
                        onChange={() => {
                          setSMStext(!SMStext);
                        }}
                      />
                    )}

                    <label htmlFor="SMStext" className="nonselect">
                      我願意收到愛課網SMS家教Case簡訊通知.
                    </label>
                    {newsletter ? (
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={newsletter}
                        onChange={() => setNewsletter(!newsletter)}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={newsletter}
                        onChange={() => setNewsletter(!newsletter)}
                      />
                    )}

                    <label htmlFor="newsletter" className="nonselect">
                      我願意收到愛課網電子郵件家教Case資訊及訊息.
                    </label>
                  </div>
                </section>

                <section className="buttonCard">
                  {isloading ? (
                    <button className="btn-vori">
                      <ThreeDots
                        type="ThreeDots"
                        height={40}
                        width={80}
                        color={"white"}
                      />
                    </button>
                  ) : (
                    <input type="submit" className="btn-vori" value="儲存" />
                  )}
                </section>
              </form>
            </div>
          </div>
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
            padding-top: 60px;
            background-color: #f4f5f6;
          }
          .wrap .divider {
            display: grid;
            grid-template-columns: 30% 70%;
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

          @media screen and (max-width: 768px) {
            .container {
              text-align: center;
            }
            .wrap {
              padding: 10px;
            }

            .wrap .divider {
              display: block;
            }
            .wrap .link-btn {
              margin-top: 16px;
            }
            .row .col-md-6:first-child {
              margin-bottom: 15px;
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
          /* =========== LEFT RAIL ========== */
          .wrap .personContent {
            width: 350px;
            margin: 0 20px;
          }
          .wrap .personContent .threeItem:last-child {
            height: 135px;
          }
          .wrap .personContent .threeItem > div {
            padding: 10px 30px;
            width: 100%;
          }
          .wrap .personContent .threeItem > div:last-child {
            padding: 0px 30px;
            margin-top: 20px;
            border: 1px solid #2b2b2b;
            height: 38px;
            border-radius: 4px;
            line-height: 38px;
            text-align: center;
          }
          .wrap .personContent .threeItem > div:last-child:hover {
            border: 1px solid #777;
          }
          .wrap .personContent .threeItem > div a:hover {
            color: #777;
          }
          .wrap .personContent .threeItem > div a {
            color: #2b2b2b;
            font-weight: 800;
            font-size: 22px;
            font-family: sans-serif;
          }
          .wrap .personContent .threeItem > div:hover {
            cursor: pointer;
          }
          @media screen and (max-width: 768px) {
            .wrap .personContent {
              display: block;
              width: 420px;
              margin: 0 auto 30px;
              height: 200px;
            }
            .wrap .personContent .threeItem {
              margin: 0;
              width: 420px;
              margin-bottom: 20px;
              text-align: center;
            }
            .wrap .personContent .threeItem > div {
              width: 100%;
            }
          }

          /* ========= RIGHT RAIL ========== */
          .wrap .allQuestionCards {
            width: 950px;
            padding: 0px 20px;
          }

          .wrap .sectionHeadings h2 {
            font-weight: 800;
            font-size: 24px;
            color: #2b2b2b;
            margin-top: 35px;
            margin-bottom: 10px;
            margin-left: 30px;
            width: 100%;
          }
          .regCon {
            width: 85% !important;
            padding: 20px 0;
          }
          .regCon .form-group {
            margin-bottom: 25px;
          }

          .regCon .col-form-label {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-top: calc(0.375rem + 1px);
            padding-bottom: calc(0.375rem + 1px);
            padding-right: 0;
            padding-left: 15px;
            font-family: sans-serif;
          }

          @media screen and (max-width: 768px) {
            .allQuestionCards {
              position: relative;
              margin: 0;
              width: 100%;
              display: block;
            }
          }

          /* =========== 頭像照片 =========== */
          .wrap .questionCard {
            position: relative;
            width: 900px;
            min-height: 270px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 7px;
            background: #fff;
            padding: 30px 20px;
          }

          .wrap .questionCard h2 {
            position: absolute;
            transform: translate(0%, -200%);
            font-weight: 500;
            font-size: 24px;
            width: 440px;
            margin-top: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 40px;
            color: #323232;
          }

          .upload-btn {
            color: #484848;
            width: 130px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            border: 2px solid #dadada;
            border-radius: 7px;
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

            .wrap .questionCard {
              width: 450px;
              margin: 0px 30px;
              display: block;
            }
          }

          /* ============== 基本資料 ================ */
          #email:disabled,
          #lastName:disabled,
          #firstName:disabled,
          #nationalId:disabled,
          #nationality:disabled {
            background-color: #ebebeb;
          }

          .professionList {
            position: absolute;
            z-index: 2000;
            width: 96%;
            display: block;
          }
          .professionList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 98%;
          }
          .professionList ul li {
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

          .professionList ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }

          .drivers {
            position: absolute;
            z-index: 2000;
            width: 96%;
            display: block;
            height: 250px;
            overflow: scroll;
            z-index: 5000;
          }
          .drivers ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 98%;
          }

          .drivers ul li {
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

          .drivers ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }
          .link-btn {
            color: #777;
            width: 100%;
            height: 30px;
            text-align: left;
            line-height: 40px;
          }
          .link-btn a {
            color: #008489;
            font-weight: 700;
          }

          input[type="text"],
          input[type="tel"],
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
            font-family: sans-serif;
          }
          .wrap .middleQuestionCard {
            position: relative;
            width: 900px;
            min-height: 260px;
            padding: 30px 20px;
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
          .wrap .col-form-label {
            font-family: Arial;
            font-size: 14px;
            font-weight: 500;
          }

          .middleQuestionCard .row {
            position: relative;
            top: 8%;
            width: 100%;
            left: 3%;
          }
          @media screen and (max-width: 768px) {
            .wrap .middleQuestionCard {
              width: 450px;
              margin: 0px 30px;
              display: block;
            }
          }

          /* ============ 居住位置 ========== */
          .wrap .bottomQuestionCard {
            position: relative;
            width: 900px;
            min-height: 325px;
            padding: 30px 20px;
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

          .wrap .bottomQuestionCard .address > p {
            color: #777;
            font-size: 22px;
          }
          .wrap .bottomQuestionCard .address .bottomTips span {
            color: #2b2b2b;
            font-size: 14px;
            font-weight: 500;
          }
          .wrap .bottomQuestionCard .address .bottomTips p {
            color: #2b2b2b;
            margin: 10px auto;
            font-size: 16px;
            font-weight: 800;
          }

          #address {
            width: 100%;
          }

          .useCurrentButton {
            background-color: #a5ce0f;
            color: white;
            font-weight: 800;
            width: 220px;
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
            .wrap .bottomQuestionCard {
              width: 450px;
              margin: 0px 30px;
              display: block;
            }

            .wrap .allQuestionCards {
              padding: 0px;
              width: none;
            }
          }

          /* ======= 訂閱與SMS簡訊通知 ========== */
          .wrap .SMSQuestionCard {
            min-height: 125px;
            position: relative;
            width: 900px;
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
          input[type="checkbox"] {
            display: none;
          }
          input[type="checkbox"] label {
            color: red;
          }
          input[type="checkbox"] + label {
            position: relative;
            cursor: pointer;
            font-size: 16px;
            font-family: sans-serif;
            font-weight: 800;
            margin: 2px 0px 8px 35px;
            width: 100%;
            display: block;
            color: #2b2b2b;
          }
          input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -33px;
            top: 21px;
            width: 24px;
            height: 24px;
            display: block;
            background: white;
            border-radius: 0px;
            border: 2px solid rgb(218, 218, 218);
          }
          input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -31px;
            top: 24px;
            width: 19px;
            height: 19px;
            display: block;
            z-index: 1;
            background: url("./../../images/tick.png");
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: center;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
            outline: 3px solid #a5ce0f;
            border: none;
          }
          input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
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

          @media screen and (max-width: 768px) {
            .wrap .SMSQuestionCard {
              width: 450px;
              margin: 0px 30px;
              display: block;
            }
          }

          /* ========== SUBMIT BUTTON ========= */
          .btn-vori {
            position: relative;
            background-color: #a5ce0f;
            color: white;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            margin: 20px 0px 20px 0px;
            border: none;
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

          @media screen and (max-width: 768px) {
            .wrap .buttonCard {
              width: 450px;
              margin: 25px 30px;
            }
            input[type="submit"] {
              width: 100%;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default TeacherProfile;
