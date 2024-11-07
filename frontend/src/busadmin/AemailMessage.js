import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

const AemailMessage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>

        <div className="wrap">
          <section className="questionCard container">
            <figure>
              <Link to="/admin">
                <img
                  src="/images/mainLogo.png"
                  alt="LOGO"
                  className="img-fluid"
                />
              </Link>
            </figure>
            <div className="plane"></div>
            <h2>請查收您的Email 電子郵件信箱</h2>
            <p style={{ textAlign: "center" }}>
              如果帳號存在, 系統將會把密碼重設連結發送到您的Email電子郵件信箱.
            </p>
            <p>請注意：</p>
            <p>
              一, 您必須填寫您註冊的Email電子郵件, 而並非任何其他Email電子郵件.
            </p>

            <p>二, 請也檢查垃圾郵件做確認.</p>

            <button className="btn btn-aca">
              <Link to="/admin">返回控制台</Link>
            </button>
          </section>
        </div>

        <style jsx="true">{`
          /* ======== MODAL ========= */

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
            background-image: url("/images/languages.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          .wrap .img-fluid {
            transform: translateX(0%);
          }
          .wrap .plane {
            width: 300px;
            height: 80px;
            background-image: url("../../../images/paperairplane.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          }

          .wrap .questionCard {
            width: 450px;
            /* min-height: 80vh; */
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
            border: 1px solid #ebebeb;
            background: #fff;
            margin-bottom: 60px;
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
            font-size: 28px;
            width: 100%;
            margin: 20px auto 24px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .questionCard p {
            margin: 10px auto;

            color: #777;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
            width: 300px;
          }
          .wrap .questionCard section {
            text-align: left;
            margin-bottom: 10px;
            color: #777;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
            width: 300px;
          }

          .questionCard {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }
          .questionCard figure {
            margin-bottom: 80px !important;
          }

          @media only screen and (min-width: 768px) {
            .questionCard p {
              width: 500px;
            }
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
          }
          /* ========== BUTTON =========== */
          .btn-aca {
            position: relative;
            background-color: #a5ce0f;
            color: white;
            cursor: pointer;
            font-weight: 800;
            width: 270px;
            letter-spacing: 0;
            height: 50px;
            line-height: 50px;
            outline: none;
            border: none;
            font-size: 16px;
            border-radius: 4px;
            padding: 0;
            margin-top: 20px;
          }

          button {
            cursor: pointer;
          }
          button a {
            display: block;
            position: relative;
            color: white;
            height: 100%;
            width: 100%;
          }

          button a:hover {
            color: white;
            cursor: pointer;
          }

          button:focus,
          button:active {
            outline: none;
            border: none;
          }
          @media only screen and (min-width: 768px) {
            button a {
              width: 100%;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default AemailMessage;
