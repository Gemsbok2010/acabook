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
              <Link to="/findTutor">找家教</Link>
              <Link to="/becomeTutor">當家教</Link>
              <Link to="/contact">聯絡我們</Link>
              {user.isLoggedIn ? (
                <>
                  <ExternalLink href="/logout" target="_self">
                    登出
                  </ExternalLink>
                </>
              ) : (
                <>
                  <Link to="/signup">註冊</Link>
                  <Link to="/login">登入</Link>
                </>
              )}
            </div>
          </div>
          <p className="title mb-4">導師按科目</p>
          <div
            style={{ borderBottom: "1px solid #fff" }}
            className="container pb-4"
          >
            <div className="row">
              <div className="col-md-3">
                <div className="bigClass">
                  <Link to="/searchlist">數學</Link>
                  <Link to="/searchlist">科學</Link>
                  <Link to="/searchlist">會計</Link>
                  <Link to="/searchlist">歷史</Link>
                  <Link to="/searchlist">化學</Link>
                  <Link to="/searchlist">社會</Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass">
                  <Link to="/searchlist">化學</Link>
                  <Link to="/searchlist">經濟學</Link>
                  <Link to="/searchlist">工程</Link>
                  <Link to="/searchlist">媒體</Link>
                  <Link to="/searchlist">物理</Link>
                  <Link to="/searchlist">統計</Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass">
                  <Link to="/searchlist">大提琴</Link>
                  <Link to="/searchlist">鼓</Link>
                  <Link to="/searchlist">吉他</Link>
                  <Link to="/searchlist">鋼琴</Link>
                  <Link to="/searchlist">唱歌</Link>
                  <Link to="/searchlist">小提琴</Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass last">
                  <Link to="/searchlist">英語</Link>
                  <Link to="/searchlist">法語</Link>
                  <Link to="/searchlist">西班牙語</Link>
                  <Link to="/searchlist">日文</Link>
                  <Link to="/searchlist">韓語</Link>
                  <Link to="/searchlist">義大利語</Link>
                </div>
              </div>
            </div>
          </div>
          <p className="title my-4">依地區找家教</p>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="bigClass">
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市中正區
                  </Link>

                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市大同區
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市中山區
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市松山區
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市大安區
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市萬華區
                  </Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass">
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市信義區
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市士林區
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市北投區
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市內湖區
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市南港區
                  </Link>
                  <Link
                    to="/searchlist?location=taipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台北市文山區
                  </Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass">
                  <Link
                    to="/searchlist?location=newTaipei"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    新北市
                  </Link>
                  <Link
                    to="/searchlist?location=taoyuan"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    桃園市
                  </Link>
                  <Link
                    to="/searchlist?location=taichung"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台中市
                  </Link>
                  <Link
                    to="/searchlist?location=tainan"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    台南市
                  </Link>
                  <Link
                    to="/searchlist?location=kaohsiung"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    高雄市
                  </Link>
                  <Link
                    to="/searchlist?city=keelung"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    基隆市
                  </Link>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bigClass last">
                  <Link
                    to="/searchlist?city=hsinchuCity"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    新竹市
                  </Link>
                  <Link
                    to="/searchlist?city=changhwa"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    彰化縣
                  </Link>
                  <Link
                    to="/searchlist?city=chiayiCity"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    嘉義市
                  </Link>
                  <Link
                    to="/searchlist?city=pingtung"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    屏東縣
                  </Link>
                  <Link
                    to="/searchlist?city=yilan"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    宜蘭縣
                  </Link>
                  <Link
                    to="/searchlist?city=hualien"
                    onClick={(e) => {
                      asx(e);
                    }}
                  >
                    花蓮縣
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sub-footer">
        <div className="buffer"></div>
        <footer className="container-footer">
          <div
            className="container"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span className="font-weight">
              版權所有{" "}
              <span>{year} © Orange Tech Pty Limited ABN 49 649 839 609</span>
            </span>
            <Link to="/privacy">隱私政策</Link>
            <Link to="/termsAndConditions">使用條款</Link>
            <Link to="/security">安全政策</Link>
            <ExternalLink href="https://www.facebook.com" target="_blank">
              <div id="fbicon">
                <img src="/images/facebook.png" alt="" width="22px" />
                Facebook
              </div>
            </ExternalLink>
          </div>
          <span
            className="font-weight-light-mobile"
            style={{ marginTop: "20px", fontWeight: "200" }}
          >
            版權所有{" "}
            <span>{year} © Orange Tech Pty Limited ABN 49 649 839 609</span>
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
