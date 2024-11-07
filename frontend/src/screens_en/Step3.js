import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Footer from "../components_en/Footer";
import LoggedInNavbar from "../components_en/LoggedInNavbar";

const Step3 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");
  const [country, setCountry] = useState("");
  const [workhistory, setWorkhistory] = useState("Tutoring Experiences");
  const [resume, setResume] = useState("");
  const [honourTitle, setHonourTitle] = useState("Teaching Honours & Awards");
  const [honourAwards, setHonourAwards] = useState("");

  // ========= POPULATE SESSION DATA ==============
  useEffect(() => {
    setCountry(ReactSession.get("teacher_country"));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("resume", resume);
    ReactSession.set("workhistory", workhistory);
    ReactSession.set("honourTitle", honourTitle);
    ReactSession.set("honourAwards", honourAwards);

    navigate("/step4/en");
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Tutor Registration Step 3 | Acabook</title>
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
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: ReactSession.get("teacher_residence")
                      ? "pointer"
                      : "default",
                  }}
                  to={ReactSession.get("teacher_residence") ? "/step1/en" : "#"}
                >
                  <span className="badge">1</span>
                  <span>My Details</span>
                </Link>
              </li>
              <li>
                <Link className="active" style={{ fontWeight: "bold" }} to="#">
                  <span className="badge-highlight">2</span>
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
                  style={{
                    fontWeight: "bold",
                    cursor: ReactSession.get("resume") ? "pointer" : "default",
                  }}
                  to={ReactSession.get("resume") ? "/step3/en" : "#"}
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
          <form id="formTwo" onSubmit={onSubmit}>
            <div className="personContent">
              <section className="questionCard container-fluid">
                <div className="container-fluid regCon"></div>
              </section>
            </div>
            <div className="personContent"></div>
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
            padding: 0;
            background-color: #333;
          }
          @media screen and (max-width: 768px) {
            .wrap {
              padding: 0;
            }
          }
          /* ========== 履歷表製作 按鈕 ==========*/
          .wrap .buttonCard {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            background-color: #333;
            width: 80%;
            margin: 30px auto 30px;
            text-align: center;
          }

          .btn-vori {
            position: relative;
            background-color: #a5ce0f;
            color: white;
            border: none;
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

          @media only screen and (min-width: 768px) {
            .btn-vori {
              width: 200px;
            }
          }

          @media screen and (max-width: 768px) {
            .wrap .buttonCard {
              width: 410px;
              margin: 25px auto;
            }
            input[type="submit"] {
              width: 100%;
            }
          }

          /* ============== QUESTION CARD RESUME =========== */

          .wrap .personContent {
            width: 90%;
            margin: 0 auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
          }

          .wrap .questionCard {
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
          .wrap .questionCard h2 {
            font-weight: 800;
            font-size: 28px;
            width: 440px;
            margin-top: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .form-group .workhistory textarea,
          .form-group .workhistory iframe {
            display: block;
            width: 100%;
            height: 500px;
            padding: 0.375rem 0.75rem;
            font-size: 16px;
            line-height: 1.5;
            color: #2b2b2b;
            font-weight: 500;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            outline: 0;
          }

          .form-group .honour-awards textarea {
            display: block;
            width: 100%;
            height: 200px;
            padding: 0.375rem 0.75rem;
            font-size: 16px;
            line-height: 1.5;
            color: #2b2b2b;
            font-weight: 500;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            outline: 0;
          }

          input[type="text"] {
            height: 42px;
            text-decoration: none;
            outline: none;
            background: none;
            border: none;
            border-bottom: 2px solid #dadada;
            font-weight: 500;
            width: 265px;
            font-size: 14px;
            color: #2b2b2b;
            font-family: sans-serif;
            font-weight: 800;
          }

          .form-group .education input[type="text"] {
            width: 225px;
          }
          .form-group .education input[type="text"]:last-child {
            width: 110px;
          }

          .education .row {
            display: flex;
            justify-content: space-around;
          }

          .pencil {
            background-image: url("./../../images/pencil.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 26px;
          }

          .form-group span {
            height: 27px;
            width: 27px;
            display: inline-block;
          }

          .row label {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            left: 0%;
            font-family: sans-serif;
            font-size: 14px;
            color: #777;
            font-weight: 500;
            padding: 0px 0px;
            pointer-events: none;
            transition: all 300ms ease-in-out 0ms;
          }

          .questionCard .form-group h2 {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
          }

          .languages .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .questionCard .form-group #workhistory {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }
          #resume {
            white-space: pre-wrap;
          }

          #honourAwards {
            white-space: pre-wrap;
          }

          .questionCard .form-group #honourTitle {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .questionCard .form-group #education {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .questionCard .form-group #languages {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .container1,
          .container2,
          .container3,
          .container4 {
            position: relative;
          }

          .language1,
          .languageLevel1,
          .language2,
          .languageLevel2,
          .language3,
          .languageLevel3 {
            position: absolute;
            z-index: 2000;
            width: 100%;
            display: block;
            overflow: scroll;
            height: 200px;
          }

          .language1 ul,
          .languageLevel1 ul,
          .language2 ul,
          .languageLevel2 ul,
          .language3 ul,
          .languageLevel3 ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }

          .languageLevel1 ul li,
          .language1 ul li,
          .languageLevel2 ul li,
          .language2 ul li,
          .languageLevel3 ul li,
          .language3 ul li {
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

          .language1 ul li:hover,
          .languageLevel1 ul li:hover,
          .language2 ul li:hover,
          .languageLevel2 ul li:hover,
          .language3 ul li:hover,
          .languageLevel3 ul li:hover {
            background-color: white;
            border-left: 3px solid #a5ce0f;
            padding-left: 17px;
          }
          .regCon {
            width: 90% !important;
            padding: 20px 0;
          }

          @media screen and (max-width: 768px) {
            .form-group .education input[type="text"] {
              width: 185px;
            }
            .form-group .education input[type="text"]:last-child {
              width: 110px;
            }

            .wrap .questionCard {
              margin: 0 auto;
              width: 440px;
            }
            .wrap .personContent {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
            }

            .languageLevel1 ul li,
            .language1 ul li,
            .languageLevel2 ul li,
            .language2 ul li,
            .languageLevel3 ul li,
            .language3 ul li {
              font-size: 12px;
              width: 120%;
            }
          }

          .btn-vori:active,
          .btn-vori:focus {
            color: white;
            border: 1px solid #a5ce0f;
            outline: none;
            border: none;
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
            width: 22px;
            border: 1px solid white;
            height: 22px;
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

          @media screen and (max-width: 768px) {
            .form-group .education input[type="text"] {
              width: 185px;
            }
            .form-group .education input[type="text"] {
              width: 185px;
            }
            .form-group .education input[type="text"]:last-child {
              width: 110px;
            }
            .wrap .questionCard {
              margin: 0;
              width: 450px;
              margin: 0px auto;
              display: block;
            }
            input[type="text"] {
              width: 170px;
              font-size: 13px;
            }

            #workhistory,
            #honourTitle,
            #languages {
              width: 265px;
            }

            form .btn-save {
              width: 450px;
              margin: 25px;
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
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Step3;
