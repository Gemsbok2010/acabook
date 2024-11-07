import { ExternalLink } from "react-external-link";
// useSelector is accessing value of states
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = ({ asx }) => {
  const user = useSelector((state) => state.userInfo.value);

  const ditjaar = new Date();
  const year = ditjaar.getFullYear();

  return (
    <>
      <div
        className="pageBottom container-fluid"
        style={{ position: "relative" }}
      >
        <div className="buffer"></div>
        <div className="container">
          <div className="mainTitle">
            <figure>
              <Link to="/">
                <span className="navbar-brand">
                  <img
                    src="/images/logo-footer.png"
                    className="img-fluid"
                    alt=""
                    style={{ height: "75px", width: "150px" }}
                  />
                </span>
              </Link>
            </figure>
            <div className="tonBtn">
              <Link to="/countdown">Find a Tutor</Link>
              <Link to="/countdown">Become a Tutor</Link>
              <Link to="/contact/en">Contact us</Link>
              {user.isLoggedIn ? (
                <>
                  <ExternalLink href="/logout_en" target="_self">
                    Log out
                  </ExternalLink>
                </>
              ) : (
                <>
                  <Link to="/signup/en">Sign up</Link>
                  <Link to="/login/en">Login</Link>
                </>
              )}
            </div>
          </div>
          <p className="title mb-4">Search Job Cases by Subject</p>
          <div
            style={{ borderBottom: "1px solid #fff" }}
            className="container pb-4"
          >
            <div className="row">
              <div className="col-md-3">
                <div className="bigClass">
                  <Link to="/searchlist/en">Mathematics</Link>
                  <Link to="/searchlist/en">Science</Link>
                  <Link to="/searchlist/en">Accounting</Link>
                  <Link to="/searchlist/en">History</Link>
                  <Link to="/searchlist/en">Chemistry</Link>
                  <Link to="/searchlist/en">Social Studies</Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass">
                  <Link to="/searchlist/en">Biology</Link>
                  <Link to="/searchlist/en">Economics</Link>
                  <Link to="/searchlist/en">Engineering</Link>
                  <Link to="/searchlist/en">Media Studies</Link>
                  <Link to="/searchlist/en">Physics</Link>
                  <Link to="/searchlist/en">Statistics</Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass">
                  <Link to="/searchlist/en">Cello</Link>
                  <Link to="/searchlist/en">Drumming</Link>
                  <Link to="/searchlist/en">Guitar</Link>
                  <Link to="/searchlist/en">Piano</Link>
                  <Link to="/searchlist/en">Singing</Link>
                  <Link to="/searchlist/en">Violin</Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass last">
                  <Link to="/searchlist/en">English</Link>
                  <Link to="/searchlist/en">French</Link>
                  <Link to="/searchlist/en">Spanish</Link>
                  <Link to="/searchlist/en">Japanese</Link>
                  <Link to="/searchlist/en">Korean</Link>
                  <Link to="/searchlist/en">Italian</Link>
                </div>
              </div>
            </div>
          </div>
          <p className="title my-4">Search Job Cases By Location</p>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="bigClass">
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Chungcheng
                  </Link>

                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Datung
                  </Link>
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Chungshan
                  </Link>
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Sungshan
                  </Link>
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Da'An
                  </Link>
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Wanhua
                  </Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass">
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Hsinyi
                  </Link>
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Shilin
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Beitou
                  </Link>
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Neihu
                  </Link>
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Nankang
                  </Link>
                  <Link
                    to="/searchlist/en?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taipei City Wenshan
                  </Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass">
                  <Link
                    to="/searchlist/en?location=newTaipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    New Taipei City
                  </Link>
                  <Link
                    to="/searchlist/en?location=taoyuan"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taoyuan City
                  </Link>
                  <Link
                    to="/searchlist/en?location=taichung"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Taichung City
                  </Link>
                  <Link
                    to="/searchlist/en?location=tainan"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Tainan City
                  </Link>
                  <Link
                    to="/searchlist/en?location=kaohsiung"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Kaohsiung City
                  </Link>
                  <Link
                    to="/searchlist/en?city=keelung"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Keelung City
                  </Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass last">
                  <Link
                    to="/searchlist/en?city=hsinchuCity"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Hsinchu City
                  </Link>
                  <Link
                    to="/searchlist/en?city=changhwa"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Changhwa County
                  </Link>
                  <Link
                    to="/searchlist/en?city=chiayiCity"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Chiayi City
                  </Link>
                  <Link
                    to="/searchlist/en?city=pingtung"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Pingtung County
                  </Link>
                  <Link
                    to="/searchlist/en?city=yilan"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Yilan County
                  </Link>
                  <Link
                    to="/searchlist/en?city=hualien"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    Hualien County
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sub-footer">
        <div className="buffer"></div>
        <footer className="container-footer" style={{ position: "relative" }}>
          <div
            className="container"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="title font-weight">
              <span>
                <span>{year} © Orange Tech Pty Limited ABN 49 649 839 609</span>
              </span>
              <p
                style={{
                  marginBottom: "0",
                  fontSize: "12px",
                  textAlign: "left",
                }}
              >
                All right reserved.
              </p>
            </div>
            <Link to="/countdown">Privacy Policy</Link>
            <Link to="/countdown">Terms & Conditions</Link>
            <Link to="/countdown">Safety Policy</Link>
            <ExternalLink href="https://www.facebook.com" target="_blank">
              <div id="fbicon">
                <img src="/images/facebook.png" alt="" width="22px" />
                Facebook
              </div>
            </ExternalLink>
          </div>
          <span
            className="font-weight-light-mobile"
            style={{ marginTop: "20px" }}
          >
            <span>{year} © Orange Tech Pty Limited ABN 49 649 839 609</span>
            All Rights Reserved.
          </span>
        </footer>
      </div>
      <style jsx="true">{`
        html,
        body {
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .pageBottom a {
          font-weight: 400;
          font-family: Arial;
          font-size: 14px;
        }
        .pageBottom .title {
          font-family: Arial;
          letter-spacing: 0px;
          padding: 0px;
        }

        .pageBottom .bigClass a {
          font-weight: 400;
          font-family: Arial;
          letter-spacing: 0px;
        }

        button a:active,
        button:focus {
          border: none;
          outline: none;
        }

        #subscribe-btn a:hover {
          color: white;
        }
        #subscribe-btn a {
          height: 100%;
          width: 100%;
          display: block;
          color: white;
        }
        footer .font-weight span {
          font-weight: 500;
          font-size: 12px;
        }

        footer .font-weight-light-mobile {
          display: block;
          color: #212529;
        }
        footer span {
          display: block;
          color: #212529;
          font-weight: 200;
          font-size: 12px;
        }

        footer .font-weight {
          display: none !important;
        }

        footer a {
          font-size: 13px;
          font-weight: 500;
        }

        footer #fbicon {
          font-family: Arial;
          font-weight: 500;
        }

        .wrap .container-footer {
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          padding-left: 0;
          padding-right: 0;
        }
        /* ========= FOOTER LOGO ========== */

        .mainTitle .img-fluid {
          transform: translateX(0%);
        }

        @media screen and (min-width: 768px) {
          footer .font-weight-light-mobile {
            display: none;
          }
          footer .font-weight {
            display: block !important;
            color: #212529;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
