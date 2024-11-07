import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import $ from "jquery";
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

const Question9 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");
  const [userInfo, setUserInfo] = useState({});
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

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

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setCountry(ReactSession.get("country"));
    setState(ReactSession.get("state"));
    setCity(ReactSession.get("city"));
    setPostalCode(ReactSession.get("postalCode"));
    setSuburb(ReactSession.get("suburb"));
    setStreet(ReactSession.get("street"));
    setStreetNo(ReactSession.get("streetNo"));
    setLongitude(ReactSession.get("longitude"));
    setLatitude(ReactSession.get("latitude"));
  }, []);

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInQuestionNine(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 30,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  // ============= POST ==============
  const onSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BACKEND_URL + "api/intllistings/question9", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        street,
        country,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInQuestionNine(data.invalid);
        } else {
          ReactSession.set("country", country);
          ReactSession.set("todaysDate", data.todaysDate);
          ReactSession.set("city", city);
          ReactSession.set("state", state);
          ReactSession.set("suburb", suburb);
          ReactSession.set("street", street);
          ReactSession.set("streetNo", streetNo);
          ReactSession.set("postalCode", postalCode);
          ReactSession.set("latitude", latitude);
          ReactSession.set("longitude", longitude);
          navigate("/question10/en");
        }
      })
      .catch((err) => {
        if (err) {
          const errorMessage = `You must include a street name.`;
          outPutErrorMessagesInQuestionNine(errorMessage);
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
    ReactSession.set("streetNo", "");
    ReactSession.set("street", "");
    ReactSession.set("suburb", "");
    ReactSession.set("postalCode", "");
    ReactSession.set("city", "");
    ReactSession.set("state", "");
    ReactSession.set("country", "");
    ReactSession.set("latitude", "");
    ReactSession.set("longitude", "");
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
        <div className="wrap">
          <form action="" id="formNine" onSubmit={onSubmit}>
            <section className="questionCard container">
              <figure>
                <Link to="/dashboard/en">
                  <img
                    src="/images/mainLogo.png"
                    alt="LOGO"
                    className="img-fluid"
                  />
                </Link>
              </figure>
              <h2>Location</h2>
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

              <Autocomplete
                className={"googleAutoComplete"}
                restrictions={{ country: "tw" }}
                fields={["address_components", "geometry", "icon", "name"]}
              >
                {latitude && longitude ? (
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    id="search"
                    onSelect={handleSelect}
                    placeholder="Type your address here..."
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
                    placeholder="Type your address here..."
                    onSelect={handleSelect}
                    id="search"
                    value={address ? address : ""}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                )}
              </Autocomplete>
              <Map
                address={address}
                latitude={latitude}
                longitude={longitude}
                geoLocate={geoLocate}
              />
              <div className="bottomBtn">
                <button className="btn-previous">
                  <Link to="/question8/en">Previous</Link>
                </button>
                <button type="submit" className="btn-volg">
                  Review Listing
                </button>
              </div>
            </section>
          </form>
        </div>
        <style jsx="true">{`
          .wrap {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100vh;
            background-image: url("./../../images/languages.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            padding-bottom: 60px;
            padding-top: 60px;
          }
          .wrap .questionCard {
            width: 475px;
            min-height: 100vh;
            padding: 20px 10px;
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
            background: #fff;
            border: 1px solid #ebebeb;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          .wrap .questionCard > figure {
            width: 200px;
            margin-bottom: 40px;
          }
          .wrap .questionCard > figure > a {
            display: block;
          }

          .wrap .questionCard h2 {
            font-family: sans-serif;
            text-align: center;
            font-weight: 800;
            font-size: 22px;
            width: 100%;
            margin: 0px auto 24px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .wrap .questionCard > button {
            background: #fff;
            color: #6b7c93;
            padding: 0;
            margin-bottom: 20px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
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
          .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            margin-top: 20px;
            justify-content: space-around;
          }
          .bottomBtn > button:active {
            border: none;
            outline: none;
          }
          .bottomBtn > button:focus {
            border: none;
            outline: none;
          }
          .btn-volg,
          .btn-previous {
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

          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 100%;
          }

          input[type="text"] {
            outline: none;
            padding: 4px 10px 4px 13px;
            height: 50px;
            width: 100%;
            color: #2b2b2b;
            font-size: 16px;
            font-weight: 500;
            font-family: sans-serif;
            margin: 0px auto 20px;
            border: 1px solid #ebebeb;
          }

          .googleAutoComplete {
            width: 100%;
          }

          .googlePlacesAutocomplete {
            width: 100%;
          }
          .react-select-container {
            outline: none;
            width: 100%;
            height: 50px;
            line-height: 50px;
          }
          .react-select__control {
            outline: none;
            border: 1px solid #ebebeb;
            margin-bottom: 20px;
            width: 100%;
            color: #2b2b2b;
            font-size: 16px;
            border-radius: 0;
            position: relative;
            height: 50px;
            line-height: 50px;
          }

          .react-select__value-container {
            width: 100%;
            color: #2b2b2b;
            font-size: 16px;
            border: none;
            margin-bottom: 20px;
            font-weight: 400;
            border-radius: 0;
            padding: 0 0 0 13px;
            transform: translateY(-6%);
            border: none;
          }

          .react-select__single-value {
            height: 50px;
            line-height: 50px;
            top: 50%;
            color: #2b2b2b;
            font-weight: 500;
          }

          .react-select__placeholder {
            font-weight: 500;
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
          }

          .react-select__input {
            height: 50px;
            line-height: 50px;
            font-weight: 500;
          }

          .react-select__control:hover {
            border: 1px solid #ebebeb;
            outline: none;
          }

          .react-select__indicators {
            display: none;
          }

          .btn-previous a {
            color: white;
            font-weight: 800;
            width: 100%;
            height: 100%;
            font-family: sans-serif;
            position: relative;
            display: block;
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .btn-volg,
            .btn-previous {
              width: 200px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question9;
