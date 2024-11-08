import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

import LoggedInNavbar from "../components_en/LoggedInNavbar";
import Footer from "../components_en/Footer";

function Map({ address, latitude, longitude }) {
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
            height: "275px",
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
            height: "275px",
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

const ListingEdit = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[2];
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.value);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [monStart, setMonStart] = useState("");
  const [monFinish, setMonFinish] = useState("");
  const [tueStart, setTueStart] = useState("");
  const [tueFinish, setTueFinish] = useState("");
  const [wedStart, setWedStart] = useState("");
  const [wedFinish, setWedFinish] = useState("");
  const [thuStart, setThuStart] = useState("");
  const [thuFinish, setThuFinish] = useState("");
  const [friStart, setFriStart] = useState("");
  const [friFinish, setFriFinish] = useState("");
  const [satStart, setSatStart] = useState("");
  const [satFinish, setSatFinish] = useState("");
  const [sunStart, setSunStart] = useState("");
  const [sunFinish, setSunFinish] = useState("");

  const [times] = useState([
    { title: "06:00", id: 1 },
    { title: "06:15", id: 2 },
    { title: "06:30", id: 3 },
    { title: "06:45", id: 4 },
    { title: "07:00", id: 5 },
    { title: "07:15", id: 6 },
    { title: "07:30", id: 7 },
    { title: "07:45", id: 8 },
    { title: "08:00", id: 9 },
    { title: "08:15", id: 10 },
    { title: "08:30", id: 11 },
    { title: "08:45", id: 12 },
    { title: "09:00", id: 13 },
    { title: "09:15", id: 14 },
    { title: "09:30", id: 15 },
    { title: "09:45", id: 16 },
    { title: "10:00", id: 17 },
    { title: "10:15", id: 18 },
    { title: "10:30", id: 19 },
    { title: "10:45", id: 20 },
    { title: "11:00", id: 21 },
    { title: "11:15", id: 22 },
    { title: "11:30", id: 23 },
    { title: "11:45", id: 24 },
    { title: "12:00", id: 25 },
    { title: "12:15", id: 26 },
    { title: "12:30", id: 27 },
    { title: "12:45", id: 28 },
    { title: "13:00", id: 29 },
    { title: "13:15", id: 30 },
    { title: "13:30", id: 31 },
    { title: "13:45", id: 32 },
    { title: "14:00", id: 33 },
    { title: "14:15", id: 34 },
    { title: "14:30", id: 35 },
    { title: "14:45", id: 36 },
    { title: "15:00", id: 37 },
    { title: "15:15", id: 38 },
    { title: "15:30", id: 39 },
    { title: "15:45", id: 40 },
    { title: "16:00", id: 41 },
    { title: "16:15", id: 42 },
    { title: "16:30", id: 43 },
    { title: "16:45", id: 44 },
    { title: "17:00", id: 45 },
    { title: "17:15", id: 46 },
    { title: "17:30", id: 47 },
    { title: "17:45", id: 48 },
    { title: "18:00", id: 49 },
    { title: "18:15", id: 50 },
    { title: "18:30", id: 51 },
    { title: "18:45", id: 52 },
    { title: "19:00", id: 53 },
    { title: "19:15", id: 54 },
    { title: "19:30", id: 55 },
    { title: "19:45", id: 56 },
    { title: "20:00", id: 57 },
    { title: "20:15", id: 58 },
    { title: "20:30", id: 59 },
    { title: "20:45", id: 60 },
    { title: "21:00", id: 61 },
    { title: "21:15", id: 62 },
    { title: "21:30", id: 63 },
    { title: "21:45", id: 64 },
    { title: "22:00", id: 65 },
    { title: "22:15", id: 66 },
    { title: "22:30", id: 67 },
    { title: "22:45", id: 68 },
    { title: "23:00", id: 69 },
  ]);

  const [subjects, setSubjects] = useState("");
  const [transport, setTransport] = useState(false);
  const [foreigner, setForeigner] = useState(false);
  const [home_tutoring, setHomeTutoring] = useState(false);
  const [normal_rate, setNormalRate] = useState("");
  const [home_rate, setHomeRate] = useState("");
  const [zoom_rate, setZoomRate] = useState("");
  const [list, setList] = useState({});
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [backdrop, setBackdrop] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [updateNote, setUpdateNote] = useState(false);

  const onConfirmDelete = () => {
    setBackdrop(true);
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  const onDelete = async (e) => {
    e.preventDefault();
    await fetch(
      process.env.REACT_APP_BACKEND_URL + "intllistings/delete/" + list.slug,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isDeletedJob: true, isTeacherJob: true }),
      }
    ).then((res) => {
      if (res.ok === true) {
        navigate("/listingManager/en");
      }
    });
  };

  const onSave = () => {
    setUpdateNote(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(function () {
      setUpdateNote(false);
    }, 2000);
  };

  // ============= PUT ==============
  const onSubmit = (e) => {
    e.preventDefault();

    const email = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const nanoId = localStorage.getItem("nanoId");
    fetch(process.env.REACT_APP_BACKEND_URL + "api/intllistings/edit", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        nanoId,
        country,
        city,
        state,
        suburb,
        street,
        streetNo,
        latitude,
        longitude,
        postalCode,
        duration,
        frequency,
        normal_rate,
        home_rate,
        zoom_rate,
        foreigner,
        transport,
        home_tutoring,
        about,
        startDate: list.startDate,
        finishDate: list.finishDate,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        monStart,
        tueStart,
        wedStart,
        thuStart,
        friStart,
        satStart,
        sunStart,
        monFinish,
        tueFinish,
        wedFinish,
        thuFinish,
        friFinish,
        satFinish,
        sunFinish,
        caseId: list.caseId,
        contractType: list.contractType,
        slug: list.slug,
        level: list.level,
        subjects,
        todaysDate: list.todaysDate,
      }),
    }).catch((err) => {
      console.error(err.message);
    });
  };

  useEffect(() => {
    // ============ LISTINGS DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/intllistings/Ad_details/" +
          slug
      )
      .then((response) => {
        if (response.status === 200) {
          setList(response.data);
          setUserInfo(response.data);
          setSubjects(response.data.subjects);
          setFrequency(response.data.frequency);
          setDuration(response.data.duration);
          setMonday(response.data.monday);
          setTuesday(response.data.tuesday);
          setWednesday(response.data.wednesday);
          setThursday(response.data.thursday);
          setFriday(response.data.friday);
          setSaturday(response.data.saturday);
          setSunday(response.data.sunday);
          setMonStart(response.data.monStart);
          setTueStart(response.data.tueStart);
          setWedStart(response.data.wedStart);
          setThuStart(response.data.thuStart);
          setFriStart(response.data.friStart);
          setSatStart(response.data.satStart);
          setSunStart(response.data.sunStart);
          setMonFinish(response.data.monFinish);
          setTueFinish(response.data.tueFinish);
          setWedFinish(response.data.wedFinish);
          setThuFinish(response.data.thuFinish);
          setFriFinish(response.data.friFinish);
          setSatFinish(response.data.satFinish);
          setSunFinish(response.data.sunFinish);
          setNormalRate(response.data.normal_rate);
          setHomeRate(response.data.home_rate);
          setZoomRate(response.data.zoom_rate);
          setTransport(response.data.transport);
          setAbout(response.data.about);
          setCountry(response.data.country);
          setCity(response.data.city);
          setState(response.data.state);
          setSuburb(response.data.suburb);
          setStreet(response.data.street);
          setStreetNo(response.data.streetNo);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
        }
      });
  }, []);

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

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>
        <LoggedInNavbar />

        {backdrop ? (
          <div
            onClick={() => setBackdrop(false)}
            className="backdrop-delete"
          ></div>
        ) : (
          ""
        )}

        <div className="wrap">
          <div className="edit-description">
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

            <div className="container-intro">
              <h2>
                {list.subjects_en + " "}
                {list.contractType === "大學" ? (
                  <span className="highlight_university">University</span>
                ) : list.contractType === "學校" ? (
                  <span className="highlight_school">School</span>
                ) : list.contractType === "一般課程" ? (
                  <span className="highlight_standard">Other</span>
                ) : list.contractType === "語言" ? (
                  <span className="highlight_language">Languages</span>
                ) : (
                  <span className="highlight_music">Musical</span>
                )}
              </h2>

              <h3
                style={{
                  margin: "15px 10px",
                  fontSize: "15px",
                  fontWeight: "200",
                  color: "#333",
                }}
              >
                Case ID: {list.caseId}
              </h3>
              <h3
                style={{
                  margin: "15px 10px",
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#333",
                }}
              >
                Posted: {list.todaysDate}
              </h3>
            </div>
            <form action="" onSubmit={onSubmit}>
              <div className="flexwrap">
                <div className="groupOne">
                  <div className="checkBoxGroup">
                    <div className="container-times">
                      <h2>Lessons per week</h2>
                    </div>
                    <section className="questionCard container">
                      <div className="btnGroup">
                        <button
                          onClick={(e) => {
                            setFrequency(e.target.innerText);
                          }}
                          className={
                            frequency === "1 次" || frequency === "Once"
                              ? "active"
                              : "btn"
                          }
                        >
                          Once
                        </button>

                        <button
                          onClick={(e) => {
                            setFrequency(e.target.innerText);
                          }}
                          className={
                            frequency === "2 次" || frequency === "Twice"
                              ? "active"
                              : "btn"
                          }
                        >
                          Twice
                        </button>

                        <button
                          onClick={(e) => {
                            setFrequency(e.target.innerText);
                          }}
                          className={
                            frequency === "3 次" || frequency === "3 times"
                              ? "active"
                              : "btn"
                          }
                        >
                          3 times
                        </button>
                        <button
                          onClick={(e) => {
                            setFrequency(e.target.innerText);
                          }}
                          className={
                            frequency === "4 次" || frequency === "4 times"
                              ? "active"
                              : "btn"
                          }
                        >
                          4 times
                        </button>

                        <button
                          onClick={(e) => {
                            setFrequency(e.target.innerText);
                          }}
                          className={
                            frequency === "5 次" || frequency === "5 times"
                              ? "active"
                              : "btn"
                          }
                        >
                          5 times
                        </button>
                        <button
                          onClick={(e) => {
                            setFrequency(e.target.innerText);
                          }}
                          className={
                            frequency === "6 次" || frequency === "6 times"
                              ? "active"
                              : "btn"
                          }
                        >
                          6 times
                        </button>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="groupTwo">
                  <div className="checkBoxGroup">
                    <div className="container-title">
                      <h2>Duration of each lesson</h2>
                    </div>
                    <section className="questionCard container">
                      <div className="btnGroup">
                        <button
                          onClick={(e) => {
                            setDuration(e.target.innerText);
                          }}
                          className={
                            duration === "1 小時" || duration === "1 Hour"
                              ? "active"
                              : "btn"
                          }
                        >
                          1 Hour
                        </button>
                        <button
                          onClick={(e) => {
                            setDuration(e.target.innerText);
                          }}
                          className={
                            duration === "1.5 小時" || duration === "1.5 Hours"
                              ? "active"
                              : "btn"
                          }
                        >
                          1.5 Hours
                        </button>
                        <button
                          onClick={(e) => {
                            setDuration(e.target.innerText);
                          }}
                          className={
                            duration === "2 小時" || duration === "2 Hours"
                              ? "active"
                              : "btn"
                          }
                        >
                          2 Hours
                        </button>
                        <button
                          onClick={(e) => {
                            setDuration(e.target.innerText);
                          }}
                          className={
                            duration === "2.5 小時" || duration === "2.5 Hours"
                              ? "active"
                              : "btn"
                          }
                        >
                          2.5 Hours
                        </button>
                        <button
                          onClick={(e) => {
                            setDuration(e.target.innerText);
                          }}
                          className={
                            duration === "3 小時" || duration === "3 Hours"
                              ? "active"
                              : "btn"
                          }
                        >
                          3 Hours
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              <div className="flexwrap">
                <div className="groupThree">
                  <div className="checkBoxGroup">
                    <div className="container-rate">
                      <h2>On Offer</h2>
                    </div>
                  </div>
                  <div className="container-rate">
                    <div className="align">
                      <input
                        style={{ marginBottom: "10px" }}
                        type="text"
                        required
                        id="normal_rate"
                        className="form-control5"
                        placeholder="Hourly rate"
                        autoComplete="off"
                        maxLength="5"
                        minLength="2"
                        value={normal_rate}
                        onChange={(e) => {
                          setNormalRate(e.target.value);
                        }}
                      />
                    </div>
                    <div className="align">
                      <input
                        style={{ marginBottom: "10px" }}
                        type="text"
                        id="home_rate"
                        className="form-control5"
                        placeholder="Home hrly rate"
                        maxLength="5"
                        minLength="2"
                        autoComplete="off"
                        value={home_rate}
                        onChange={(e) => {
                          setHomeRate(e.target.value);
                        }}
                      />
                    </div>
                    <div className="align">
                      <input
                        style={{ marginBottom: "10px" }}
                        type="text"
                        id="zoom_rate"
                        className="form-control5"
                        placeholder="Online hrly rate"
                        maxLength="5"
                        minLength="2"
                        autoComplete="off"
                        value={zoom_rate}
                        onChange={(e) => {
                          setZoomRate(e.target.value);
                        }}
                      />
                    </div>

                    <div className="align-other">
                      {transport ? (
                        <>
                          <input
                            id="a"
                            type="checkbox"
                            checked={transport}
                            onChange={(e) => {
                              setTransport(e.target.checked);
                            }}
                          />
                          <label htmlFor="a">Own transport</label>
                        </>
                      ) : (
                        <>
                          <input
                            id="a"
                            type="checkbox"
                            checked={false}
                            onChange={(e) => {
                              setTransport(e.target.checked);
                            }}
                          />
                          <label htmlFor="a">Own transport</label>
                        </>
                      )}
                      {foreigner ? (
                        <>
                          <input
                            id="b"
                            type="checkbox"
                            checked={foreigner}
                            onChange={(e) => {
                              setForeigner(e.target.checked);
                            }}
                          />
                          <label htmlFor="b">Foreign tutor</label>
                        </>
                      ) : (
                        <>
                          <input
                            id="b"
                            type="checkbox"
                            checked={false}
                            onChange={(e) => {
                              setForeigner(e.target.checked);
                            }}
                          />
                          <label htmlFor="b">Foreign tutor</label>
                        </>
                      )}

                      {home_tutoring ? (
                        <>
                          <input
                            id="c"
                            type="checkbox"
                            checked={home_tutoring}
                            onChange={(e) => {
                              setHomeTutoring(e.target.checked);
                            }}
                          />
                          <label htmlFor="c">Home tutoring</label>
                        </>
                      ) : (
                        <>
                          <input
                            id="c"
                            type="checkbox"
                            checked={false}
                            onChange={(e) => {
                              setHomeTutoring(e.target.checked);
                            }}
                          />
                          <label htmlFor="c">Home tutoring</label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="groupFour">
                  <div className="checkBoxGroup">
                    <div className="container-title">
                      <h2>Schedule</h2>
                    </div>
                  </div>
                  <div className="container-times">
                    <div className="container-date">
                      <input
                        id="calstart"
                        type="text"
                        disabled="disabled"
                        value={list.startDate}
                      />
                      <input
                        id="calfinish"
                        type="text"
                        disabled="disabled"
                        value={list.finishDate}
                      />
                    </div>
                  </div>
                  <div className="container-times">
                    <div className="row">
                      <div className="align-days">
                        <input
                          id="mon"
                          checked={monday ? true : false}
                          onChange={(e) => {
                            setMonday(e.target.checked);
                            setMonStart("");
                            setMonFinish("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="mon">Mon</label>

                        <input
                          id="tue"
                          checked={tuesday ? true : false}
                          onChange={(e) => {
                            setTuesday(e.target.checked);
                            setTueStart("");
                            setTueFinish("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="tue">Tue</label>

                        <input
                          id="wed"
                          checked={wednesday ? true : false}
                          onChange={(e) => {
                            setWednesday(e.target.checked);
                            setWedStart("");
                            setWedFinish("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="wed">Wed</label>

                        <input
                          id="thu"
                          checked={thursday ? true : false}
                          onChange={(e) => {
                            setThursday(e.target.checked);
                            setThuStart("");
                            setThuFinish("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="thu">Thu</label>

                        <input
                          id="fri"
                          checked={friday ? true : false}
                          onChange={(e) => {
                            setFriday(e.target.checked);
                            setFriStart("");
                            setFriFinish("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="fri">Fri</label>

                        <input
                          id="sat"
                          checked={saturday ? true : false}
                          onChange={(e) => {
                            setSaturday(e.target.checked);
                            setSatStart("");
                            setSatFinish("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="sat">Sat</label>
                        <input
                          id="sun"
                          checked={sunday ? true : false}
                          onChange={(e) => {
                            setSunday(e.target.checked);
                            setSunStart("");
                            setSunFinish("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="sun">Sun</label>
                      </div>
                      <div className="time-clock">
                        {monday ? (
                          <select
                            className="form-cont"
                            value={monStart}
                            onChange={(e) => {
                              setMonStart(e.target.value);
                            }}
                          >
                            <option>{monStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {tuesday ? (
                          <select
                            className="form-cont"
                            value={tueStart}
                            onChange={(e) => {
                              setTueStart(e.target.value);
                            }}
                          >
                            <option>{tueStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {wednesday ? (
                          <select
                            className="form-cont"
                            value={wedStart}
                            onChange={(e) => {
                              setWedStart(e.target.value);
                            }}
                          >
                            <option>{wedStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {thursday ? (
                          <select
                            className="form-cont"
                            value={thuStart}
                            onChange={(e) => {
                              setThuStart(e.target.value);
                            }}
                          >
                            <option>{thuStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {friday ? (
                          <select
                            className="form-cont"
                            value={friStart}
                            onChange={(e) => {
                              setFriStart(e.target.value);
                            }}
                          >
                            <option>{friStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {saturday ? (
                          <select
                            className="form-cont"
                            value={satStart}
                            onChange={(e) => {
                              setSatStart(e.target.value);
                            }}
                          >
                            <option>{satStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {sunday ? (
                          <select
                            className="form-cont"
                            value={sunStart}
                            onChange={(e) => {
                              setSunStart(e.target.value);
                            }}
                          >
                            <option>{sunStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                      </div>
                      <div className="time-clock">
                        {monStart !== "" ? (
                          <select
                            value={monFinish}
                            onChange={(e) => {
                              setMonFinish(e.target.value);
                            }}
                            className="form-cont"
                          >
                            <option>{monFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {tueStart !== "" ? (
                          <select
                            value={tueFinish}
                            onChange={(e) => {
                              setTueFinish(e.target.value);
                            }}
                            className="form-cont"
                          >
                            <option>{tueFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {wedStart !== "" ? (
                          <select
                            value={wedFinish}
                            onChange={(e) => {
                              setWedFinish(e.target.value);
                            }}
                            className="form-cont"
                          >
                            <option>{wedFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {thuStart !== "" ? (
                          <select
                            value={thuFinish}
                            onChange={(e) => {
                              setThuFinish(e.target.value);
                            }}
                            className="form-cont"
                          >
                            <option>{thuFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {friStart !== "" ? (
                          <select
                            value={friFinish}
                            onChange={(e) => {
                              setFriFinish(e.target.value);
                            }}
                            className="form-cont"
                          >
                            <option>{friFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {satStart !== "" ? (
                          <select
                            value={satFinish}
                            onChange={(e) => {
                              setSatFinish(e.target.value);
                            }}
                            className="form-cont"
                          >
                            <option>{satFinish}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {sunStart !== "" ? (
                          <select
                            value={sunFinish}
                            onChange={(e) => {
                              setSunFinish(e.target.value);
                            }}
                            className="form-cont"
                          >
                            <option>{sunFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flexwrap">
                <div className="groupFive">
                  <div className="checkBoxGroup">
                    <div className="container-rate">
                      <h2>Description</h2>
                    </div>
                  </div>
                  <div className="container-level">
                    <textarea
                      id="about"
                      maxLength="300"
                      placeholder="至少50個文字，最多300個文字"
                      value={about}
                      required
                      onChange={(e) => {
                        setAbout(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="groupSeven">
                  <div className="checkBoxGroup">
                    <div className="container-rate">
                      <h2>Location</h2>
                    </div>
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
                          style={{ width: "100%" }}
                          placeholder="請輸入地址"
                          onSelect={handleSelect}
                          defaultValue={`${state}${city}${suburb}${street}${streetNo}`}
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
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      )}
                    </Autocomplete>
                  </div>
                  <div className="container-map">
                    <Map
                      address={address}
                      latitude={latitude}
                      longitude={longitude}
                    />
                  </div>
                  <div className="container-map"></div>
                </div>
              </div>
              <div className="bottomButtons">
                <input
                  type="button"
                  id="delete-btn"
                  className="delete-btn"
                  value="Delete"
                  onClick={onConfirmDelete}
                />

                {monFinish ||
                tueFinish ||
                wedFinish ||
                thuFinish ||
                friFinish ||
                satFinish ||
                sunFinish ? (
                  normal_rate !== "" ? (
                    monday && monFinish === "" ? (
                      <input disabled className="save-btn" value=" Save" />
                    ) : tuesday && tueFinish === "" ? (
                      <input disabled className="save-btn" value=" Save" />
                    ) : wednesday && wedFinish === "" ? (
                      <input disabled className="save-btn" value=" Save" />
                    ) : thursday && thuFinish === "" ? (
                      <input disabled className="save-btn" value=" Save" />
                    ) : friday && friFinish === "" ? (
                      <input disabled className="save-btn" value=" Save" />
                    ) : saturday && satFinish === "" ? (
                      <input disabled className="save-btn" value=" Save" />
                    ) : sunday && sunFinish === "" ? (
                      <input disabled className="save-btn" value=" Save" />
                    ) : (
                      <input
                        type="submit"
                        className="save-btn"
                        value="Save"
                        onClick={onSave}
                      />
                    )
                  ) : (
                    <input disabled className="save-btn" value=" Save" />
                  )
                ) : (
                  <input disabled className="save-btn" value="Save" />
                )}
              </div>
              {backdrop ? (
                <div className="modal-box-delete">
                  <div className="container">
                    <div className="bin"></div>
                    <h2>Delete this listing?</h2>
                  </div>
                  <div className="nostop" onClick={() => setBackdrop(false)}>
                    Stop!
                  </div>
                  <div onClick={onDelete} className="delete">
                    Delete
                  </div>
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
      <style jsx="true">{`
        .wrap {
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          min-height: 100vh;
          padding-top: 60px;

          background-color: #a5ce0f;
        }
        html,
        body {
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
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

        .wrap .updateNote {
          width: 80%;
          background-color: #bff4f2;
          margin-bottom: 8px;
          height: 40px;
          line-height: 40px;
          padding: 0px 15px 0px 28px;
          display: none;
        }
        .wrap .updateNote span {
          margin-left: 5px;
        }
        .flexwrap {
          padding: 0;
          margin: 0;
          width: 100%;
          height: 31%;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .edit-description {
          width: 410px;
          position: relative;
          display: flex;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: -moz-box;
          flex-wrap: wrap;
          justify-content: center;
          padding: 20px;
          margin: 0px auto 60px;
          border: 1px solid #ebebeb;
          background-color: #fff;
          padding-bottom: 20px;
          -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
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

        .bottomButtons input[type="submit"] {
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
        }
        .bottomButtons input[type="button"] {
          position: relative;
          background-color: #e40000;
          color: white;
          border: 1px solid #e40000;
          cursor: pointer;
          font-weight: 800;
          width: 150px;
          height: 50px;
          line-height: 50px;
          outline: none;
          font-size: 20px;
          border-radius: 4px;
          margin: 0px;
        }
        .bottomButtons {
          margin-top: 90px;
          display: flex;
          width: 100%;
          justify-content: space-around;
        }
        .wrap .save-btn:disabled {
          background-color: #ddd;
          color: #888;
          cursor: default;
          border: #ddd;
          border-radius: 4px;
          text-align: center;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
        }
        .container-intro {
          width: 100%;
          border-bottom: 1px solid #ebebeb;
        }

        .container-intro h2 {
          font-size: 22px;
          color: #333;
          font-weight: 800;
        }
        .container-intro p {
          color: rgb(51, 51, 51);
          line-height: 20px;
          font-size: 15px;
          font-weight: 100;
          font-family: sans-serif;
          width: 100%;
        }

        /* ============= SUBJECTS LEVELS ============= */
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

        /* ============= GROUP TITLES ============= */
        .container-title {
          width: 100%;
          left: 0%;
          padding: 0px 20px 0px;
        }
        .container-title h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }
        @media only screen and (min-width: 768px) {
          .container-title .form-cont {
            margin: 3px 46px 7px 0px;
            width: 80px;
          }
          .container-title h2 {
            width: 440px;
          }
          .container-title {
            width: 480px;
          }
        }

        /* ============= GROUP BUTTONS ============= */
        button,
        button:active,
        button:focus {
          padding: 12px 20px;
          height: 50px;
          background: #fff;
          color: #2b2b2b;
          margin-bottom: 20px;
          border: none;
          outline: none;
          border-radius: 0px;
          cursor: pointer;
          font-size: 16px;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .wrap .questionCard {
          width: 100%;
          padding: 15px 10px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-radius: 0px;
          background: none;
        }

        button:active,
        button:focus {
          height: 35px;
          display: block;
        }

        /* ============ GROUP ONE (每週上多少次課？) ========== */
        .groupOne {
          margin-top: 30px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .groupOne .btnGroup {
          width: 90%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
        }
        .groupOne .btnGroup > button {
          background: #fff;
          color: #2b2b2b;
          padding: 0;
          margin-bottom: 20px;
          display: block;
          padding: 5px 20px;
          color: #2b2b2b;
          font-weight: 900;
          height: 35px;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .groupOne .btnGroup > button:hover {
          background: #a5ce0f;
          color: #fff;
          width: 100%;
          height: 35px;
          cursor: pointer;
        }
        .groupOne .btnGroup > button.active {
          background: #a5ce0f;
          color: #fff;
          width: 100%;
          height: 35px;
        }

        .groupOne .btnGroup > button {
          display: block;
          padding: 5px 20px;
          color: #2b2b2b;
        }

        .groupOne .btnGroup > button > a:hover {
          color: #fff;
        }

        @media only screen and (min-width: 768px) {
          .groupOne {
            width: 480px;
          }
        }

        /* =============== GROUP TWO (一堂課想上多久?) ===============*/
        .groupTwo {
          margin-top: 30px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .groupTwo .btnGroup {
          width: 90%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
        }
        .groupTwo .btnGroup > button {
          background: #fff;
          color: #2b2b2b;
          padding: 0;
          margin-bottom: 20px;
          display: block;
          padding: 5px 20px;
          color: #2b2b2b;
          font-weight: 900;
          height: 35px;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .groupTwo .btnGroup > button:hover {
          background: #a5ce0f;
          color: #fff;
          width: 100%;
          height: 35px;
          cursor: pointer;
        }
        .groupTwo .btnGroup > button.active {
          background: #a5ce0f;
          color: #fff;
          width: 100%;
          height: 35px;
        }

        .groupTwo .btnGroup > button {
          display: block;
          padding: 5px 20px;
          color: #2b2b2b;
        }

        .groupTwo .btnGroup > button > a:hover {
          color: #fff;
        }

        @media only screen and (min-width: 768px) {
          .groupTwo {
            width: 480px;
            margin-left: 28px;
          }
        }

        /* ============= GROUP THREE (我的條件) ============== */
        .groupThree {
          margin-top: 30px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          margin-left: 0px;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .container-rate {
          width: 100%;
          left: 0%;
          padding: 0px 20px;
        }
        .container-rate h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        .align-other {
          margin: 0px;
          width: 120px;
        }

        #comlength select {
          margin: 0px 5px 15px;
          display: inline-block;
          width: 200px !important;
          height: 32px;
          padding: 3px 5px;
          font-size: 14px;
          font-family: sans-serif;
          border-radius: 0px;
          color: #2b2b2b;
          outline: none;
          background-color: white;
          position: relative;
          border-color: #ccc;
          z-index: 500;
          top: -88px;
          left: 15px;
          border: 1px solid #ebebeb;
          transform: translate(72px, -8px);
        }
        .align-other input[type="checkbox"] + label {
          height: 20px;
          position: relative;
          cursor: pointer;
          font-size: 14px;
          font-family: sans-serif;
          font-weight: 500;
          float: left;
          display: block;
          width: 185px;
          color: #2b2b2b;
          margin: 7px 0px 2px 30px;
        }

        .align-other input[type="checkbox"] + label::before {
          content: " ";
          position: relative;
          left: -9px;
          top: 5px;
          width: 20px;
          height: 20px;
          display: inline-block;
          background: white;
          border-radius: 4px;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          color: #2b2b2b;
        }

        .align-other input[type="checkbox"] + label::after {
          content: " ";
          position: absolute;
          left: -13px;
          top: 1px;
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
          color: #2b2b2b;
        }

        .align-other input[type="checkbox"]:checked + label::after {
          -webkit-transform: scale(1);
          transform: scale(1);
          opacity: 1;
        }
        @media only screen and (min-width: 768px) {
          .groupThree {
            width: 480px;
          }
        }

        /* ================= GROUP FOUR ================= */
        .groupFour {
          margin-top: 30px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .container-times {
          width: 100%;
          left: 0%;
          padding: 0px 20px 0px;
        }
        .container-times h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        .day_flex {
          display: -webkit-box;
          display: -ms-flexbox;
          display: block;
          -ms-flex-pack: distribute;
          justify-content: space-around;
          margin: 33px 0px 1px 0px;
        }

        input::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: #2b2b2b !important;
          font-weight: bold;
        }
        input::-moz-placeholder {
          /* Firefox 19+ */
          color: #2b2b2b !important;
          font-weight: bold;
        }
        input :-ms-input-placeholder {
          /* IE 10+ */
          color: #2b2b2b !important;
          font-weight: bold;
        }
        input:-moz-placeholder {
          /* Firefox 18- */
          color: #2b2b2b !important;
          font-weight: bold;
        }
        input[type="checkbox"] {
          opacity: 0;
          float: left;
        }

        .align-days {
          margin: 0px;
          width: 120px;
        }

        .align-days input[type="checkbox"] + label {
          position: relative;
          cursor: pointer;
          font-size: 14px;
          font-family: sans-serif;
          font-weight: 500;
          margin: 7px 0px 2px 30px;
          width: 105px;
          display: block;
          color: #2b2b2b;
          float: left;
          height: 20px;
        }

        .align-days input[type="checkbox"] + label::before {
          content: " ";
          position: relative;
          left: -7px;
          top: 5px;
          width: 20px;
          height: 20px;
          display: inline-block;
          background: white;
          border-radius: 4px;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .align-days input[type="checkbox"] + label::after {
          content: " ";
          position: absolute;
          left: -11px;
          top: 1px;
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

        .align-days input[type="checkbox"]:checked + label::after {
          -webkit-transform: scale(1);
          transform: scale(1);
          opacity: 1;
        }

        .container-times .form-cont {
          margin: 7px 16px 18px 0px;
          display: block;
          width: 80px;
          height: 24px;
          font-size: 14px;
          padding: 2px 8px;
          outline: none;
          background-color: white;
          border-radius: 0px;
          border: 1px solid #ebebeb;
        }
        .time-clock {
          margin: 18px 0px 0px 15px;
        }
        .container-times .form-cont:disabled {
          background-color: #e9ecef;
        }

        @media only screen and (min-width: 768px) {
          .groupFour {
            width: 480px;
            margin-left: 28px;
          }
          .container-times .form-cont {
            margin: 7px 46px 18px 0px;
            width: 85px;
          }
          .container-times > .container-date {
            width: 500px;
            padding-left: 20px;
            padding-right: 20px;
          }

          .container-times input[type="text"] {
            padding: 7px 10px 7px 18px;
            width: 200px;
            font-size: 14px;
            margin-right: 25px;
          }
          .container-times h2 {
            width: 440px;
          }
          .container-times {
            width: 480px;
          }
          .time-clock {
            margin: 18px 0px 0px 25px;
          }
        }
        /* =============== GROUP FIVE (程度說明) ===============*/
        .groupFive {
          margin-top: 50px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .container-level {
          width: 100%;
          left: 0%;
          padding: 0px 20px;
        }
        .container-level h2 {
          font-weight: 800;
          font-size: 22px;
          width: 440px;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }
        textarea {
          height: 330px;
          width: 100%;
          padding: 10px;
          border: 1px solid rgb(238, 238, 238);
        }

        /* ============= GROUP SEVEN (理想上課地點) ============== */

        .groupSeven {
          margin-top: 50px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          margin-left: 0px;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .container-map {
          width: 100%;
          left: 0%;
          padding: 10px 20px;
        }
        .container-map h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        /*Right banner*/
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        input[type="text"] {
          outline: none;
          padding: 6px 10px 6px 13px;
          height: 40px;
          width: 140px;
          color: #2b2b2b;
          font-size: 13px;
          font-weight: 500;
          font-family: sans-serif;
          margin-right: 15px;
          left: 50%;
          border: 1px solid #ebebeb;
        }
        .selectdate input[type="text"]:active,
        .selectdate input[type="text"]:focus {
          outline: 3px solid #a5ce0f;
        }
        .img-fluid {
          transform: translateX(36%);
        }
        /*Match Tutors*/
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
        }

        input[type="button"] {
          color: white;
          background-color: #006098;
          border: 1px solid #006098;
          outline: none;
          cursor: pointer;
          width: 60px;
          height: 32px;
          line-height: 32px;
          font-weight: 900;
          margin-top: 4px;
        }

        /* ======== MODAL BOX DELETE =========== */
        .modal-box-delete h2 {
          font-weight: 800;
          font-size: 22px;
          margin-top: 10px;
          color: #2b2b2b;
        }
        .backdrop-delete {
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
        .modal-box-delete {
          display: block;
          z-index: 2100;
          left: 50%;
          background: white;
          width: 320px;
          height: 180px;
          margin: 10px auto;
          animation: mailframe 600ms ease-in 0ms;
          transform: translate(-50%, -300%);
          position: absolute;
        }
        .modal-box-delete .container {
          margin: 20px auto 20px;
          text-align: center;
          width: 100%;
          font-size: 18px;
          font-family: sans-serif;
          font-weight: 600;
          color: #484848;
          display: flex;
          justify-content: center;
        }
        .nostop,
        .delete {
          width: 110px;
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          border-radius: 4px;
          color: #484848;
          text-align: center;
          position: absolute;
          top: 65%;
          left: 25%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          display: block;
          font-family: sans-serif;
          font-weight: 300;
          border: 1px solid #dce0e0;
        }
        .delete,
        .delete:focus,
        .delete:active {
          left: 75%;
        }

        .nostop:hover,
        .delete:hover {
          background-color: #f7f8f9;
          border-color: #353f47;
        }

        .bin {
          margin-right: 7px;
          height: 40px;
          width: 40px;
          text-align: center;
          border-radius: 2px;
          background-color: #484848;
          background-image: url("./../../images/bin.png");
          background-position: center;
          background-size: 30px;
          background-repeat: no-repeat;
          display: block;
        }
        @keyframes mailframe {
          from {
            transform: translate(-50%, -30%);
            opacity: 0;
          }
          to {
            transform: translateY(-50%, -50%);
            opacity: 1;
          }
        }
        .container {
          text-align: center;
        }
        @media only screen and (min-width: 768px) {
          .container {
            text-align: left;
          }

          .img-fluid {
            transform: translateX(0%);
          }

          input[type="text"] {
            width: 170px;
          }
          input[type="button"] {
            width: 80px;
          }

          .box.box-primary {
            padding: 15px 40px;
          }
          .box .row {
            text-align: left;
          }
          .bottomButtons input[type="button"] {
            width: 200px;
          }
          .bottomButtons input[type="submit"] {
            width: 200px;
          }
          .bottomButtons {
            margin-top: 42px;
          }
          .edit-description {
            width: 1050px;
          }

          .container-duration h2 {
            width: 440px;
          }
          .container-duration {
            width: 480px;
          }
          .container-rate h2 {
            width: 440px;
          }
          .container-rate {
            width: 480px;
          }

          .groupFive {
            width: 480px;
          }
          .align-other {
            margin: -18px 0px;
          }

          .container-level {
            width: 480px;
          }
          .groupSeven {
            width: 480px;
            margin-left: 28px;
          }
          .groupSix {
            width: 480px;
          }

          .container-map h2 {
            width: 440px;
          }
          .container-map {
            width: 480px;
          }

          .container-map input[type="text"] {
            width: 440px;
          }
          #comlength select {
            position: absolute;
            transform: translate(248px, 300px);
          }
        }
      `}</style>
    </>
  );
};

export default ListingEdit;
