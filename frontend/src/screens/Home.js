import { Helmet, HelmetProvider } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [teacherNo, setTeacherNo] = useState("");
  const [noOfCases, setNoOfCases] = useState("");
  const [noOfUsers, setNoOfUsers] = useState("");
  const [isLoaded, setIsloaded] = useState(false);
  const user = useSelector((state) => state.userInfo.value);

  // ============ TEACHER DATA ===========

  const fetchData = async () => {
    setIsloaded(false);
    axios
      .get(process.env.BACKEND_URL + "api/admin/homepage")
      .then((response) => {
        if (response.status === 200) {
          setTeacherNo(response.data.total);
          setNoOfCases(response.data.num);
          setNoOfUsers(response.data.noOfUsers);
          setIsloaded(true);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>
        <Navbar />
        <div className="wrap">
          <section className="content1 container-fluid">
            <div className="findTeacher">
              <div className="findInfo">
                <h2>註冊成為會員</h2>
                <p>
                  愛課網會員可以搜尋家教資料庫,
                  同時也可以申請所有在台灣和澎湖的工作機會. 現在免費加入會員！
                </p>

                {user.isLoggedIn ? (
                  user.isTeacher ? (
                    <Link className="btn" to="/teacher_profile">
                      我的老師專頁
                    </Link>
                  ) : (
                    <Link className="btn" to="/step1">
                      現在去註冊
                    </Link>
                  )
                ) : (
                  <Link className="btn" to="/signup">
                    現在去註冊
                  </Link>
                )}
              </div>
            </div>
          </section>
          <section className="content2 mt-5 container">
            <div className="row">
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="/images/icons-1.png"
                      alt=""
                    />
                  </figure>
                  <h4>安全可靠</h4>
                  {isLoaded ? (
                    <p>
                      我們為目前有{" "}
                      <span style={{ fontSize: "32px" }}>{noOfCases} </span>
                      工作Case。愛課網持續極力招集各領域的優秀老師加入。
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="/images/icons-2.png"
                      alt=""
                    />
                  </figure>
                  <h4>老師的最佳來源</h4>
                  {isLoaded ? (
                    <p>
                      我們目前已有
                      <span style={{ fontSize: "32px" }}> {teacherNo} </span>
                      名註冊的老師。老師的教學品質並會做紀錄, 以保證師資的水平。
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="/images/icons-3.png"
                      alt=""
                    />
                  </figure>
                  <h4>搜尋你的理想老師</h4>
                  {isLoaded ? (
                    <p>
                      愛課網目前的
                      <span style={{ fontSize: "32px" }}>
                        {" "}
                        {noOfUsers}{" "}
                      </span>{" "}
                      位會員擁有所有登記老師的師資資料庫,
                      可依您的住所附近跟老師的專長做篩選.{" "}
                      <b>註冊會員完全免費.</b>
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="content3 container-fluid">
            <p className="title text-center mb-5">我們提供的教學</p>
            <div className="container">
              <div className="row">
                <div className="cusMd">
                  <div className="bigClass">
                    <h5 className="mb-3">學校</h5>
                    <span>英語</span>
                    <span>數學</span>
                    <span>國語</span>
                    <span>歷史</span>
                    <span>化學</span>
                    <span>社會</span>
                  </div>
                </div>
                <div className="cusMd">
                  <div className="bigClass">
                    <h5 className="mb-3">大學</h5>
                    <span>化學</span>
                    <span>經濟學</span>
                    <span>工程</span>
                    <span>物理</span>
                    <span>統計</span>
                    <span>電子</span>
                  </div>
                </div>
                <div className="cusMd">
                  <div className="bigClass">
                    <h5 className="mb-3">音樂</h5>
                    <span>大提琴</span>
                    <span>鼓</span>
                    <span>吉他</span>
                    <span>鋼琴</span>
                    <span>唱歌</span>
                    <span>小提琴</span>
                  </div>
                </div>
                <div className="cusMd">
                  <div className="bigClass">
                    <h5 className="mb-3">語言</h5>
                    <span>英語</span>
                    <span>法文</span>
                    <span>西班牙語</span>
                    <span>義大利語</span>
                    <span>日文</span>
                    <span>韓語</span>
                  </div>
                </div>
                <div className="cusMd">
                  <div className="bigClass last">
                    <h5 className="mb-3">一般課程</h5>
                    <span>瑜珈</span>
                    <span>游泳</span>
                    <span>健身</span>
                    <span>繪畫</span>
                    <span>籃球</span>
                    <span>網球</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="content4 container-fluid">
            <p className="title text-white text-center mb-3">客戶評價</p>
            <div className="container comment">
              <div className="swiper-wrapper">
                <Swiper
                  // install Swiper modules
                  modules={[Pagination, Navigation, A11y, Autoplay]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  autoplay={{
                    delay: "2000",
                    pauseOnMouseEnter: true,
                    disableOnInteraction: true,
                  }}
                  pagination={{
                    clickable: true,
                    type: "bullets",
                    dynamicBullets: false,
                  }}
                  scrollbar={{ draggable: true }}
                >
                  <SwiperSlide>
                    <div className="swiper-slide">
                      <div className="row" style={{ margin: "0" }}>
                        <div className="people col-md-3">
                          <p className="m-0">台北市信義區-鄭先生</p>
                        </div>
                        <div className="peopleComment col-md-9">
                          <p className="m-0 font-weight-normal">
                            我的兒子直接回應了輔導，並與他的老師基南建立了非常良好的關係。他獲得了良好的教學以及激勵策略和工具來幫助他取得進步。他的成績至少提高了20-30％，他的信心水平有所提高。
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide">
                      <div className="row" style={{ margin: "0" }}>
                        <div className="people col-md-3">
                          <p className="m-0">台北市信義區-鄭先生</p>
                        </div>
                        <div className="peopleComment col-md-9">
                          <p className="m-0 font-weight-normal">
                            我的兒子直接回應了輔導，並與他的老師基南建立了非常良好的關係。他獲得了良好的教學以及激勵策略和工具來幫助他取得進步。他的成績至少提高了20-30％，他的信心水平有所提高。
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide">
                      <div className="row" style={{ margin: "0" }}>
                        <div className="people col-md-3">
                          <p className="m-0">台北市信義區-鄭先生</p>
                        </div>
                        <div className="peopleComment col-md-9">
                          <p className="m-0 font-weight-normal">
                            我的兒子直接回應了輔導，並與他的老師基南建立了非常良好的關係。他獲得了良好的教學以及激勵策略和工具來幫助他取得進步。他的成績至少提高了20-30％，他的信心水平有所提高。
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  ...
                </Swiper>
              </div>
            </div>
          </section>

          <section className="content5 container-fluid"></section>
          <Footer />
        </div>
        <style jsx="true">{`
          /* Contents */
          .wrap .content1 {
            padding: 10% 16%;
            position: relative;
            height: 600px;
            background: url("/images/languages.jpg") no-repeat center center;
            background-size: cover;
          }

          .wrap .content1 > .findTeacher {
            position: relative;
            width: 520px;
            height: 230px;
          }
          .wrap .content1 > .findTeacher:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 520px;
            height: 280px;
            background-color: #a5ce0f;
            opacity: 0.9;
          }

          .wrap .content1 > .findTeacher > .findInfo {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            color: #fff;
            padding: 20px 50px;
            position: relative;
            z-index: 3;
          }
          .wrap .content1 > .findTeacher > .findInfo > h2 {
            font-size: 35px;
          }

          .wrap .content1 > .findTeacher > .findInfo > p {
            font-size: 20px;
            font-weight: normal;
          }

          .wrap .content1 > .findTeacher > .findInfo > .btn {
            width: 160px;
            -webkit-box-shadow: 1px 1px 2px 0px rgba(51, 51, 102, 0.5);
            box-shadow: 1px 1px 2px 0px rgba(51, 51, 102, 0.5);
            border-radius: 0px;
            padding: 9px 10px;
            background-color: #28c4db;
            border: 1px solid #28c4db;
          }

          .wrap .content1 > .findTeacher > .findInfo > .btn:hover {
            background-color: #28c4db;
            border: 1px solid #28c4db;
          }

          .wrap .content1 > .findTeacher > .findInfo > a {
            color: white;
          }

          .wrap .content2 figure {
            width: 40%;
          }

          .wrap .content2 .iconArea {
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
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
          }

          .wrap .content2 .iconArea > h4 {
            width: 80%;
            text-align: center;
            padding-bottom: 20px;
            font-weight: bold;
            border-bottom: 1px solid #000;
          }

          .wrap .content2 .iconArea > p {
            width: 80%;
            text-align: center;
            padding: 10px 0;
            font-weight: normal;
          }

          .wrap .content2 .iconArea .img-fluid {
            transform: translateX(0%);
          }

          .wrap .content3 {
            padding: 50px;
            background: #efefef;
          }

          .wrap .content3 .cusMd {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 20%;
            flex: 0 0 20%;
            max-width: 20%;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
          }

          .wrap .content3 > .title {
            font-size: 36px;
            color: #555;
          }

          .wrap .content3 .bigClass {
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            padding-left: 50px;
          }

          .wrap .content3 .bigClass > h5 {
            font-size: 28px;
            font-weight: bold;
          }

          .wrap .content3 .bigClass > span {
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 3px;
            margin-bottom: 5px;
            color: #555;
          }

          .wrap .content3 .bigClass:after {
            content: "";
            position: absolute;
            right: 0;
            top: 20px;
            width: 2px;
            height: 200px;
            background: #a5ce0f;
          }

          .wrap .content3 .bigClass.last:after {
            content: "";
            background: none;
          }

          .wrap .content4 {
            padding: 50px;
            background: #a5ce0f;
          }

          .wrap .content4 > .title {
            font-size: 36px;
            color: #555;
          }

          .wrap .content4 > .comment {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            padding: 20px 40px;
            background: #b7d83f;
            margin: 0 auto;
          }

          .wrap .content4 > .comment .people {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            padding: 25px 15px;
            border: 5px solid #eaea00;
          }

          .wrap .content4 > .comment .people p {
            color: #006934;
            font-size: 1.2em;
          }

          .wrap .content4 > .comment .peopleComment {
            padding: 25px;
          }

          .wrap .content4 > .comment .peopleComment p {
            text-align: justify;
            letter-spacing: 1px;
            font-size: 18px;
            line-height: 1.5;
          }
          .wrap .content5 {
            height: 480px;
            background: url("/images/tutors.jpg") no-repeat center center;
            background-size: cover;
          }

          .wrap .content5 h2 {
            font-size: 40px;
            margin-bottom: 20px;
            margin-top: 40%;
          }

          .comment {
            position: relative;
          }

          .comment .swiper-pagination {
            position: absolute !important;
            bottom: -25px !important;
            right: 0 !important;
            left: 0 !important;
            z-index: 500 !important;
          }

          .comment .swiper-pagination > li {
            margin-right: 20px;
            background: #888 !important;
          }

          @media screen and (max-width: 670px) {
            .wrap .content1 > .findTeacher {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              position: relative;
              width: 100%;
              height: 250px;
              margin-top: 100px;
            }
            .wrap .content1 > .findTeacher:after {
              content: "";
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 250px;
              background-color: #a5ce0f;
              opacity: 0.9;
            }
            .wrap .content1 > .findTeacher > .findInfo {
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
              text-align: center;
              padding: 20px 30px;
            }
            .wrap .content1 > .findTeacher > .findInfo > h2 {
              font-size: 32px;
            }
            .wrap .content1 > .findTeacher > .findInfo > p {
              font-size: 20px;
              font-weight: normal;
            }
          }
          @media screen and (max-width: 768px) {
            .wrap .content3 {
              padding: 50px;
              background: #efefef;
            }
            .wrap .content3 .cusMd {
              -webkit-box-flex: 0;
              -ms-flex: 0 0 100%;
              flex: 0 0 100%;
              max-width: 100%;
            }
            .wrap .content3 > .title {
              font-size: 36px;
              color: #555;
            }
            .wrap .content3 .bigClass {
              padding: 0;
              text-align: center;
              margin-bottom: 20px;
            }
            .wrap .content3 .bigClass:after {
              content: "";
              display: none;
            }
            .wrap .content5 .col-md-5 {
              padding-left: 10rem;
            }
            .wrap .content5 h2 {
              font-size: 32px;
              margin-bottom: 30px;
              margin-top: 50%;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Home;
