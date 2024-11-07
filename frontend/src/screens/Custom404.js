import { useEffect } from "react";
import Footer_en from "../components_en/Footer";
import Footer from "../components/Footer";
import Navbar_en from "../components_en/Navbar";
import Navbar from "../components/Navbar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cookies } from "react-cookie";

// set up cookies
const cookies = new Cookies();

export default function Custom404() {
  const history = useNavigate();
  const cookie = cookies.get("i18next");
  const { t } = useTranslation();
  useEffect(() => {
    setTimeout(() => {
      cookie === "en" ? history("/en") : history("/");
    }, 6000);
  }, [history]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="愛課網" />
        </Helmet>
        {cookie === "en" ? <Navbar_en /> : <Navbar />}

        <div className="wrap">
          <div className="backHome">
            <Link to={cookie === "en" ? "/en" : "/"}>
              {cookie === "en" ? "Return to Homepage" : "返回主"}
            </Link>
          </div>
          {cookie === "en" ? <Footer_en /> : <Footer />}
        </div>
        <style jsx="true">{`
          .wrap {
            background-image: url("/images/404.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: contain;
            background-color: #a4cd0f;
          }
          .backHome {
            height: 780px;
          }

          .backHome a {
            color: white;
            background-color: #a4cd0f;
            border: 2px solid white;
            text-align: center;
            height: 70px;
            line-height: 66px;
            border-radius: 4px;
            font-size: 22px;
            width: 240px;
            display: block;
            position: relative;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 85%;
          }
          @media only screen and (min-width: 768px) {
            .wrap {
              background-image: url("/images/404.png");
              background-position: center;
              background-size: contain;
            }
            .backHome a {
              transform: translate(-50%, -50%);
              left: 60%;
              top: 60%;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
}
