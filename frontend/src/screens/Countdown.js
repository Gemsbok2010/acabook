import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

const Countdown = () => {
  function cdtd() {
    var xmas = new Date("June 30, 2023 00:01:00");
    var now = new Date();
    var timeDiff = xmas.getTime() - now.getTime();

    var seconds = Math.floor(timeDiff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    var hoursX = (hours %= 24);
    var minutesX = (minutes %= 60);
    var secondsX = (seconds %= 60);

    document.getElementById("daysBox").innerHTML = days;
    document.getElementById("hoursBox").innerHTML = hoursX;
    document.getElementById("minsBox").innerHTML = minutesX;
    document.getElementById("secsBox").innerHTML = secondsX;
  }

  setInterval(cdtd, 1000);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>

        <div id="del-countdown">
          <figure style={{ textAlign: "center" }}>
            <Link to="/en">
              <span className="navbar-brand">
                <img
                  src="/images/mainLogo.png"
                  alt=""
                  style={{ width: "200px" }}
                />
              </span>
            </Link>
          </figure>
          <h1>COMING SOON</h1>
          <div id="clock"></div>
          <div id="units">
            <div id="daysBox"></div>
            <div id="hoursBox"></div>
            <div id="minsBox"></div>
            <div id="secsBox"></div>
          </div>
        </div>

        <div id="experiment">
          <div>Days</div>
          <div>Hours</div>
          <div>Minutes</div>
          <div>Seconds</div>
        </div>

        <style jsx="true">{`
          @charset "UTF-8";

          html,
          body {
            width: 100%;
            height: 100%;
            background-color: #a5cd1e;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          h1 {
            color: white;
            text-align: center;
            font-size: 74px;
            letter-spacing: 10px;
            transform: translateX(-3%);
          }

          #del-countdown {
            width: 845px;
            margin: 15% auto;
          }

          #units div {
            float: left;
            text-align: center;
            font-size: 84px;
            color: white;
            padding: 10px;
            width: 20%;
            border-radius: 20px;
            box-sizing: border-box;
            margin: 20px 10px;
          }

          #experiment div {
            float: left;
            color: white;
            text-align: center;
            margin-right: 10px;
            font-size: 32px;
            height: 20px;
            width: 180px;
            transform: translatex(286px);
          }

          #units div:nth-child(1) {
            background: white;
            color: #333;
          }

          #units div:nth-child(2) {
            background: white;
            color: #333;
          }

          #units div:nth-child(3) {
            background: white;
            color: #333;
          }
          #units div:nth-child(4) {
            background: white;
            color: #333;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Countdown;
