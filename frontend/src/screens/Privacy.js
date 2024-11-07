import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

const Privacy = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");

  useEffect(() => {
    // ============= FACEBOOK & GOOGLE LOGIN DATA ==============
    if (id) {
      window.history.pushState({}, document.title, "/privacy");
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
          <div className="privacy">
            <h2 className="nonselect">隱私政策</h2>
          </div>
          <section className="agreeContent container">
            <p>
              本隱私政策解釋了愛客網如何收集，使用和披露有關您的信息。本隱私政策適用於您向愛客網
              Facebook頁面
            </p>
            <p>
              http://www.acabook.com/發送消息時愛客網收集的信息，請訪問我們的網站並使用鏈接到本隱私政策的其他服務。
            </p>
            <p>
              愛客網應採取一切合理措施保護用戶的所有個人信息，並且就本條款而言，“個人信息”的定義應詳見“2000年信息獲取促進法”（PAIA）。
            </p>
            <h3>信息收集</h3>
            <h4>您提供給我們的信息</h4>
            <p>
              愛客網收集您直接向我們提供的信息。例如：當您將Facebook消息發送到愛客網
              Facebook或以其他方式與我們通信時，愛客網會收集信息。愛客網可能收集的信息類型是您的姓名，年齡，電子郵件地址，照片，視頻，語音備註以及您選擇提供的任何其他信息或內容。
            </p>
            <h4>信息的使用：</h4>
            <p>愛客網可能出於各種目的使用有關您的信息，包括：</p>
            <ul>
              <li>提供，維護和改進服務;</li>
              <li>提供並提供您要求的產品和服務;</li>
              <li>向您發送技術更新，安全警報以及支持和管理消息;</li>
              <li>回應您的意見，問題和要求，並提供客戶服務;</li>
              <li>
                與您溝通有關我教導我和其他人提供的產品，服務，優惠，促銷，獎勵和活動，並提供教學我認為您感興趣的新聞和信息;
              </li>
              <li>監控和分析與我們的服務相關的趨勢，使用和活動;</li>
              <li>個性化和改進我們的服務，並提供內容，功能和建議;</li>
              <li>處理和交付參賽作品和獎勵</li>
              <li>
                編譯有關瀏覽習慣和訪問T愛客網網站和Facebook頁面的非個人統計信息
              </li>
              <li>執行收集信息的任何其他目的。</li>
            </ul>
            <h4>存儲和信息披露：</h4>
            <p>
              詳細信息通過使用cookie以電子方式收集或由用戶自願提供。愛客網可以收集，維護，保存，編輯，分享，披露和出售從用戶收集的任何信息，但須遵守以下規定：
            </p>
            <ul>
              <li>愛客網不得向用戶披露個人信息，除非用戶同意;</li>
              <li>
                愛客網應僅在未經用戶同意的情況下通過適當的法律程序披露信息
              </li>
              <li>愛客網可以編譯，使用和分享任何與任何特定個人無關的信息</li>
            </ul>
            <p>
              愛客網擁有並保留對愛客網收集和編制的非個人統計信息的所有權利。
            </p>
            <h4>安全：</h4>
            <p>
              愛客網採取合理措施幫助保護您的信息免遭丟失，被盜，濫用和未經授權的洩露，更改和破壞。
            </p>
            <h4>愛客網的聯繫方式：</h4>
            <p>
              愛客網或我們的導師和分包商可以通過Facebook信使，電子郵件或電話與您聯繫，詢問您對我們服務的反饋和意見。我們可能還希望向您提供有關我們認為您可能感興趣的我們的Facebook頁面，網站或任何其他服務或產品的特殊功能的信息。如果您不想收到此信息，請發送電子郵件至http://www.acabook.com/確認您的請求。
            </p>
            <p>
              愛客網使用AdWords再營銷來在網絡上推廣我們的網站。我們在瀏覽器上放置一個cookie，然後第三方（Google）會讀取這些Cookie並在第三方網站上投放廣告。您可以在Google的退出頁面上選擇停用此廣告。
            </p>
            <p>
              提交您的信息即表示您同意我們使用本政策中規定的信息。如果我們更改了隱私政策，我們將在此頁面上發布更改，並可能會在網站的其他頁面上發布通知，以便您可以隨時了解我們收集的信息以及我們如何使用它們。繼續使用該服務即表示您同意任何此類更改。
            </p>
            <h4>聯繫我們：</h4>
            <p>
              如果您對本隱私政策有任何疑問，請通過http://www.acabook.com/contact。
            </p>
          </section>
          <Footer />
        </div>

        <style jsx="true">
          {`
            .privacy h2 {
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
              color: #fff;
              background-color: #a5ce0f;
              padding: 10px 20px;
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
              font-family: "Noto Sans TC", sans-serif;
            }
            .wrap .container {
              text-align: left;
            }
          `}
        </style>
      </HelmetProvider>
    </>
  );
};

export default Privacy;
