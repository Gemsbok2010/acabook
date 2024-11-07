import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";


const BecomeTutor = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");

  useEffect(() => {
    // ============= FACEBOOK & GOOGLE LOGIN DATA ==============
    if (id) {
      window.history.pushState({}, document.title, "/becomeTutor");
    }
  }, [id]);
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
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h3>
                    現在就加入
                    <br />
                    愛客網的團隊吧
                  </h3>
                  <p>
                    加入台灣最先進的家教網平台 <br /> 改變一個下一代以提升國家{" "}
                    <br /> 未來的競爭力
                  </p>
                  <button className="btn btn-aca">註冊家教帳戶</button>
                </div>
                <div className="col-md-6"></div>
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
                      src="./images/logo-6.png"
                      alt=""
                    />
                  </figure>
                  <h4>餵飽存錢</h4>
                  <p>
                    高薪打工，工時短，而同時幫助學生課業，有成就感也有意義的工作。
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="./images/logo-5.png"
                      alt=""
                    />
                  </figure>
                  <h4>在家附近找CASE</h4>
                  <p>一天新增多個工作機會使用我們谷歌地圖找附近的工作。</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="./images/logo-4.png"
                      alt=""
                    />
                  </figure>
                  <h4>帳戶工具管理</h4>
                  <p>一天新增多個工作機會，使用我們谷歌地圖找附近的工作。</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="./images/logo-3.png"
                      alt=""
                    />
                  </figure>
                  <h4>全國網路服務</h4>
                  <p>
                    無論在台北、台中或是高雄，我們都有CASE推薦給我們的家教團隊。
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="./images/logo-2.png"
                      alt=""
                    />
                  </figure>
                  <h4>家長學員關係管理</h4>
                  <p>
                    我們做為學員跟老師的溝通橋樑，保障家教權益
                    保持良好的合作關係。
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="./images/logo-1.png"
                      alt=""
                    />
                  </figure>
                  <h4>工作CASE來找你</h4>
                  <p>
                    我們會時常推薦學員給我們優質家教們。另外，評比良好也很重要喔。
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="operation container-fluid">
            <div className="container">
              <h3>愛課網平台如何運作？</h3>
              <p className="mb-5">非常簡單 – 在學生的家裡賺錢。</p>
              <p className="font-weight-normal">
                教任何科目，包括學校科目、大學課程、語言教學或音樂器材輔導。
                我們的團隊及線上平台將提供所你不
                需顧慮的管理煩惱。上的時數越多，則賺得越多。
              </p>
            </div>
          </section>
          <section className="phoneBg container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h3>愛課網平台</h3>
                  <p>我們負責管理</p>
                  <p>
                    我們建造了簡單而高功能的網路平台協助老師迅速找到家教工作機會
                  </p>
                  <ul>
                    <li>搜尋附近的CASE</li>
                    <li>線上申請工作</li>
                    <li>免費刊登廣告</li>
                    <li>編輯個人資料</li>
                    <li>新增刪減教學科目</li>
                  </ul>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
          </section>
          <section className="qa container-fluid">
            <div className="container">
              <h3>常見問與答</h3>
              <div className="row">
                <div className="col-md-4">
                  <h4>當家教可以有多少收入?</h4>
                  <p>
                    家教的時薪依照科目的類別、科目的難度、上課的學生人数（常見為一對一授课）和上課的時數而別。不過一般而言，愛客網的家教一小時平均可達至少250元到400元的時薪，大多CASE會更多。
                  </p>
                </div>
                <div className="col-md-4">
                  <h4>我需要通勤嗎?</h4>
                  <p>
                    我們盡量安排的CASE將在離家教住所約10公里以内做推薦。時間寶貴，當然也不會讓家教們浪費寶貴的時間在公車和捷運上囉。
                  </p>
                </div>
                <div className="col-md-4">
                  <h4>愛客網有媒合費用嗎?</h4>
                  <p>
                    愛客網將做老師和學生的媒合服務，也負責管理家教的收入和金流。愛客網的服務費是編在學生方，因此對家教老師沒有額外的費用。
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <h4>家教可以接其他外面的CASE嗎？</h4>
                  <p>
                    可以的。家教們可以自由接其他家教網平的CASE。不過凡是透過愛課網媒合的CASE必須由愛課之網管理和符合規定及條款。
                  </p>
                </div>
                <div className="col-md-4">
                  <h4>做家教老師安全嗎?</h4>
                  <p>
                    我們無法評論其他的家教平台，但愛客網實施相關措施提供老師跟學生最安全的保障。點擊此閱讀我們的安全政策暸解更多。
                  </p>
                </div>
                <div className="col-md-4">
                  <h4>愛客網的服務地區有哪一些?</h4>
                  <p>
                    愛客網服務地區有包含台灣，澎湖，金門及馬祖外島地區，不過大多的CASE比較多集中在台灣省大都市地區為主。
                  </p>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>

        <style jsx="true">{`
          .wrap .content1 {
            padding: 10% 16%;
            position: relative;
            height: 600px;
            background: url("/images/joingBG.jpg") no-repeat center center;
            background-size: cover;
          }

          .wrap .content1 h3 {
            font-weight: bold;
            font-size: 2.8em;
          }

          .wrap .content1 p {
            font-size: 1.4em;
            font-weight: normal;
          }

          .wrap .content2 figure {
            width: 30%;
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
          .wrap .operation {
            padding: 40px 0;
            background: #10b5eb;
            color: #fff;
          }

          .wrap .operation h3 {
            font-size: 2.8em;
            font-weight: bold;
          }

          .wrap .operation p {
            font-size: 1.4em;
          }

          .wrap .phoneBg {
            padding: 50px 0;
            background: url("/images/phone.jpg") no-repeat 50% center;
            background-size: cover;
          }

          .wrap .phoneBg h3 {
            font-size: 2.8em;
            font-weight: bold;
          }

          .wrap .phoneBg p {
            font-size: 1.4em;
          }

          .wrap .phoneBg ul {
            margin-top: 10px;
            padding-left: 20px;
          }

          .wrap .phoneBg ul > li {
            margin-bottom: 15px;
          }

          .wrap .qa {
            padding-top: 40px;
            padding-bottom: 40px;
          }

          .wrap .qa .col-md-4 {
            padding: 0 25px;
          }

          .wrap .qa h3 {
            margin-bottom: 30px;
            padding-left: 5px;
            font-size: 2.8em;
            font-weight: bold;
          }

          .wrap .qa h4 {
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 25px;
          }

          .wrap .qa p {
            font-weight: 1.8;
            font-size: 18px;
          }

          @media screen and (max-width: 768px) {
            .wrap .col-md-4 {
              padding: 0;
            }
            .wrap .content2 {
              padding: 0;
            }
            .wrap .content1 {
              padding: 10% 2%;
              height: 400px;
            }
            .wrap .content1 h3 {
              font-size: 2em;
              margin-bottom: 20px;
            }
            .wrap .content1 p {
              font-size: 1em;
              margin-bottom: 20px;
            }
            .wrap .operation {
              padding: 40px 20px;
              text-align: center;
            }
            .wrap .operation h3 {
              font-size: 2em;
            }
            .wrap .operation p {
              font-size: 1.2em;
            }
            .wrap .phoneBg {
              padding: 50px 20px;
              background: url("/images/phone2.jpg") no-repeat 50% 50%;
            }
            .wrap .phoneBg h3 {
              text-align: center;
              font-size: 2em;
            }
            .wrap .phoneBg p {
              text-align: center;
              font-size: 1.2em;
            }
            .wrap .phoneBg ul {
              margin-left: 100px;
            }
            .wrap .qa h3 {
              text-align: center;
              font-size: 2em;
            }
            .wrap .qa h4 {
              font-size: 18px;
              text-align: center;
              margin-bottom: 10px;
            }
            .wrap .qa p {
              font-size: 16px;
              margin-bottom: 20px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default BecomeTutor;
