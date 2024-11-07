import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import axios from "axios";
// useSelector is accessing value of states
import { useSelector } from "react-redux";

const Security = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");

  // ============= FACEBOOK & GOOGLE LOGIN DATA ==============
  useEffect(() => {
    if (id) {
      window.history.pushState({}, document.title, "/security");
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
          <div className="security">
            <h2 className="nonselect">安全政策及導師安全</h2>
          </div>
          <section className="agreeContent container">
            <p>
              本安全政策符合國家兒童保護立法（“刑法（性犯罪和相關事項）修正法案”（2007年第32號）），並得到Connect
              Network的認可，Connect
              Network是一家致力於安全的非營利組織。有風險的婦女和兒童。
            </p>
            <p>我們如何確保我們的導師和客戶安全</p>

            <h4>1.篩選我們的客戶（保護我們的導師）</h4>
            <ul>
              <li>要求所有客戶提供他們的實際地址和身份證號碼。</li>
              <li>我們還需要預付款以確保我們的客戶合法。</li>
            </ul>
            <h4>2.篩選我們的導師（以保護我們的客戶）</h4>
            <ul>
              <li>
                我們收集每個申請人的聯繫方式，實際地址，教育歷史和兩個參考
              </li>
              <li>
                我們審核每個申請人的文件：身份證/工作許可證（如果是外國人），Matric證書和/或大學成績單{" "}
              </li>
              <li>
                輔導員通過合作組織 - 衛報 -
                對國家性犯罪者登記簿（NRSO）進行篩選，或者到當地警察局獲取警察通關證書。這僅適用於未成年人的輔導（18歲以下）。
              </li>
            </ul>
            <h4>3.為工作選擇輔導員</h4>
            <ul>
              <li>
                我們的學費管理者審核每項工作的輔導申請，選擇最合適的（基於性別，年齡，地點和其他相關因素）
              </li>
              <li>
                如果您是一名輔導男性成年人（18歲以上）的女性導師，您將在被要求接受該工作之前了解情況。如果您決定接受該工作，您還必須通知您的近親，每節課的課時和下落。{" "}
              </li>
              <li>我們努力確保客戶住在您家10-15公里範圍內。</li>
            </ul>
            <h4>4.輔導過程的管理</h4>
            <ul>
              <li>
                我們僅在您接受工作並且課程表發送給客戶後才向客戶披露您的聯繫方式。
              </li>
              <li>
                在第一課後，我們將與您和客戶聯繫，以確保每個人都對課程感到滿意。{" "}
              </li>
              <li>
                如果客戶對導師不滿意，反之亦然，我們會先努力改變導師，否則我們會停止未來課程並退還客戶
              </li>
            </ul>
            <h4>你可以做些什麼來保證安全</h4>
            <h4>首先，登錄http://www.acabook.com/簽署合規聲明</h4>
            <p>
              通過電子郵件（參考您身上的身份證號碼）將您的付款證明和身份證的掃描件發送至http://www.acabook.com/
            </p>
            <p>您將在3至5天內通過電子郵件將證書發送給您 </p>
            <p>將您的許可上傳到您的導師資料 </p>
            <p>如何通過SAPS申請警察通關證書： </p>
            <p>
              前往離您最近的警察局，填寫警察通關申請表。您需要提供一整套指紋，全名，姓氏，出生日期和地點，原始身份證件，身份證複印件和R110現金。{" "}
            </p>
            <p>
              然後，您的完整申請將被發佈到比勒陀利亞的犯罪記錄中心（一些警察局將堅持您自己將完成的申請發佈到比勒陀利亞。如果是這樣，請通過普通郵件發送跟踪號碼。{" "}
            </p>
            <p>保留現金收據作為您申請PCC的證明。 </p>
            <p>
              當您在帖子中收到證書時（最多可能需要6週），請將其上傳到您的個人資料中。{" "}
            </p>
            <p>（2018年10月8號） </p>
          </section>
          <Footer />
        </div>

        <style jsx="true">{`
          .security h2 {
            font-weight: bold;
            font-size: 2.5em;
            margin-bottom: 30px;
            color: #fff;
            background-color: #323232;
            padding: 10px 0px;
            text-align: center;
            border: none;
            z-index: -1;
          }

          .wrap .agreeContent {
            padding: 40px 10px;
          }

          .wrap .agreeContent h2 {
            font-weight: bold;
            font-size: 2.5em;
            margin-bottom: 30px;
          }
          .wrap .agreeContent a {
            color: #008489;
            text-decoration: none;
            font-weight: 700;
          }

          .wrap .agreeContent h3 {
            font-weight: bold;
            margin: 30px 0 10px 0;
          }

          .wrap .agreeContent h4 {
            font-weight: bold;
            margin: 30px 0 10px 0;
          }

          .wrap .agreeContent p {
            font-size: 14px;
            margin-bottom: 0;
          }
          .wrap .container {
            text-align: left;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Security;
