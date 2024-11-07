import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FindTutor = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");
  const user = useSelector((state) => state.userInfo.value);

  useEffect(() => {
    // ============= FACEBOOK & GOOGLE LOGIN DATA ==============
    if (id) {
      window.history.pushState({}, document.title, "/findTutor");
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
                  <h3 className="text-white">找到你理想的導師</h3>
                  <p className="text-white">
                    加入台灣最先進的家教網平台 <br /> 改變一個下一代以提升國家
                    <br /> 未來的競爭力
                  </p>
                  {user.isLoggedIn ? (
                    <button className="btn btn-aca">
                      <Link to="/teacherdatabase">找老師</Link>
                    </button>
                  ) : (
                    <button className="btn btn-aca">
                      <Link to="/signup">找老師</Link>
                    </button>
                  )}
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
          </section>

          <section className="container-fluid greenBg">
            <div className="container">
              <h3 className="text-center">
                找家教之前，你必須知道的
                <span style={{ fontSize: "60px" }}>5</span>件事
              </h3>
              <div className="row">
                <div className="col-md-6 t0-1">
                  <h4>重複的練習</h4>
                  <p>
                    教學上，家教提供重點式效率複習，讓學員透過重複跟反覆性的溫習方式，重覆的論述方式，能效率找到學習的盲點，順利解決問題。例如：字體要寫得漂亮需要不斷的重複練習，英文要唸得標準也需要重複的練習聽力。如果自己作業遇到困難時，沒有人來協助，那做錯誤的重複練習反而會掉到更深的深淵。
                  </p>
                </div>
                <div className="col-md-6 t0-2">
                  <h4>經驗專屬個人</h4>
                  <p>
                    在團體補習班，由於班上每位學生學習與吸收速度不一。家教的優勢，在於能夠隨時挑整教學速度，依照學生學習狀況靈活進行調整，最重要的是，在一對一教學模式中，學員不用與其他學生比較，明確知道自己的成長，因為經驗專屬於個人。
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 t0-3">
                  <h4>建立良好習慣</h4>
                  <p>
                    許多家教老師出名校，具有優秀成績與品格，來自於良好的學習習慣跟技巧，學員與專業家教互動期間，不僅可以吸收老師的學習精髓，例如時間管理、心智圖增強記憶、整理詳盡筆記。許多學生缺乏的不是不夠努力，而是有效率的學習方法。
                  </p>
                </div>
                <div className="col-md-6 t0-4">
                  <h4>不給自己機會，命運永遠難以改變</h4>
                  <p>
                    每一個人在學習過程中，往往容易往往碰到阻礙，使視野受到侷限。專業家教能把那塊擋住視野的城牆拔掉，給自己一把椅子站上去看望或把孩子放在肩膀上，這樣小小的力量，卻可換來更大的收穫的，改變自己、改變未來就從一瓶礦泉水和一碗滷肉飯出發。
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 t0-5">
                  <h4>研究證實一對一更有學習效率！</h4>
                  <h5>
                    根據美國芝加哥大學研究，一對一教學比團體教室授課，有效提升高達98%的吸收程度！
                  </h5>
                  <p className="text-right mt-3">
                    資料來源：
                    <Link to="http://web.mit.edu/5.95/readings/bloom-two-sigma.pdf">
                      「美國芝加哥大學」
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="content2 mt-5 container">
            <h3 className="text-center">
              選擇我們的<span style={{ fontSize: "60px" }}>6</span>大優勢
            </h3>
            <div className="row">
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img className="img-fluid" src="./images/07-7.png" alt="" />
                  </figure>
                  <h4>嚴格審核</h4>
                  <p>
                    團隊提供高水準、高素質師資，同時嚴格審核教師身分資格與學經歷，打造值得信賴的平臺，為上課品質嚴謹把關。
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img className="img-fluid" src="./images/07-8.png" alt="" />
                  </figure>
                  <h4>到府授課</h4>
                  <p>
                    提供教師到府一對一教學授課服務，省去額外交通費用與時間成本，讓學員全神專注於學習，效率提升成績。
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img className="img-fluid" src="./images/07-9.png" alt="" />
                  </figure>
                  <h4>免費試教</h4>
                  <p>
                    第一堂課提供免費試教服務，讓學生熟悉教師教學風格，感受教師教學特色與魅力，大幅減去長時間的磨合期。
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="./images/07-10.png"
                      alt=""
                    />
                  </figure>
                  <h4>豐富師資群</h4>
                  <p>
                    集結國內、外頂尖大學各科系出身優秀師資群，提供豐富學術背景與實務經歷，讓每位家長仔細篩選，教學品質令人放心。
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="./images/07-11.png"
                      alt=""
                    />
                  </figure>
                  <h4>大量時數優惠</h4>
                  <p>
                    一次購買大量教學時數，享有獨家優惠折扣，徹底滿足您勤學與勤儉的需求，以極優惠的價格，獲得高品質的課程。
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="./images/07-12.png"
                      alt=""
                    />
                  </figure>
                  <h4>客戶溝通服務</h4>
                  <p>
                    如在教學過程中，發生預期外的狀況，有溝通、轉達等需求，團隊將竭盡心力居中協商，致力保障您的上課權益。
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
            background: url("/images/teach.jpg") no-repeat center center;
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

          .wrap .greenBg {
            padding: 50px;
            background: #a5ce0f;
            color: #fff;
          }
          .wrap .greenBg .row {
            border-bottom: 1px solid #fff;
          }

          .wrap .greenBg .row .col-md-6 {
            position: relative;
            padding: 20px 50px 20px 80px;
          }

          .wrap .greenBg .row .col-md-12 {
            position: relative;
            padding: 20px 50px 20px 130px;
          }

          .wrap .greenBg .row .t0-1::before {
            content: "";
            position: absolute;
            top: 10px;
            left: 0;
            width: 70px;
            height: 70px;
            background: url("/images/07-2.png") 50% 50% no-repeat;
            background-size: cover;
          }
          .wrap .greenBg .row .t0-2::before {
            content: "";
            position: absolute;
            top: 10px;
            left: 0;
            width: 70px;
            height: 70px;
            background: url("/images/07-3.png") 50% 50% no-repeat;
            background-size: cover;
          }

          .wrap .greenBg .row .t0-3::before {
            content: "";
            position: absolute;
            top: 10px;
            left: 0;
            width: 70px;
            height: 70px;
            background: url("/images/07-4.png") 50% 50% no-repeat;
            background-size: cover;
          }

          .wrap .greenBg .row .t0-4::before {
            content: "";
            position: absolute;
            top: 10px;
            left: 0;
            width: 70px;
            height: 70px;
            background: url("/images/07-5.png") 50% 50% no-repeat;
            background-size: cover;
          }

          .wrap .greenBg .row .t0-5::before {
            content: "";
            position: absolute;
            top: 10px;
            left: 0;
            width: 100px;
            height: 100px;
            background: url("/images/07-6.png") 50% 50% no-repeat;
            background-size: cover;
          }

          .wrap .greenBg h3 {
            font-weight: bold;
            font-size: 2.5em;
            padding-bottom: 20px;
            border-bottom: 1px solid #fff;
          }

          .wrap .greenBg h4 {
            font-weight: bold;
            margin-bottom: 20px;
            font-size: 1.8em;
          }

          .wrap .greenBg p {
            font-weight: normal;
          }

          .wrap .content2 figure {
            width: 30%;
          }

          .wrap .content2 h3 {
            font-weight: bold;
            font-size: 2.5em;
            padding-bottom: 20px;
            border-bottom: 1px solid #fff;
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

          .wrap button {
            width: 140px;
            height: 55px;
            line-height: 55px;
            padding: 0;
            margin: 0;
            border-radius: 4px;
          }
          .wrap .btn a {
            display: block;
            height: 100%;
            width: 100%;
            color: white;
            font-size: 20px;
          }

          @media screen and (max-width: 768px) {
            .wrap .content1 {
              padding: 10% 2%;
              height: 400px;
              background: url(/images/teachBg2.jpg") no-repeat center center;
            }
            .wrap .content1 h3 {
              font-size: 2em;
              margin-bottom: 20px;
            }
            .wrap .content1 p {
              font-size: 1em;
              margin-bottom: 20px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default FindTutor;
