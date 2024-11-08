import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";

const QuestionContinue = () => {
  ReactSession.setStoreType("sessionStorage");

  const [contractType, setContractType] = useState("");
  const [level, setLevel] = useState("");
  const [subjects, setSubjects] = useState("");
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("");
  const [normal_rate, setNormalRate] = useState("");
  const [about, setAbout] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [street, setStreet] = useState("");

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setContractType(ReactSession.get("contractType"));
    setLevel(ReactSession.get("level"));
    setSubjects(ReactSession.get("subjects"));
    setDuration(ReactSession.get("duration"));
    setFrequency(ReactSession.get("frequency"));
    setAbout(ReactSession.get("about"));
    setNormalRate(ReactSession.get("normal_rate"));
    setFinishDate(ReactSession.get("finishDate"));
    setStreet(ReactSession.get("street"));
  }, []);

  // ========= CLEAR SESSION WHEN 重新開始 IS CLICKED =======
  const clearSession = () => {
    sessionStorage.clear();
  };

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
              <Link to="/dashboard">
                <img
                  src="/images/mainLogo.png"
                  alt="LOGO"
                  className="img-fluid"
                />
              </Link>
            </figure>

            <h2>回到上次的進度？</h2>
            <div className="btnGroup">
              <button className="btn">
                {contractType === "大學" && !level ? (
                  <Link to="/question2University">還原進度</Link>
                ) : contractType === "大學" && !subjects ? (
                  <Link to="/question3Subjects">還原進度</Link>
                ) : contractType === "大學" && !frequency ? (
                  <Link to="/question4">還原進度</Link>
                ) : contractType === "大學" && !duration ? (
                  <Link to="/question5">還原進度</Link>
                ) : contractType === "大學" && !normal_rate ? (
                  <Link to="/question6">還原進度</Link>
                ) : contractType === "大學" && !about ? (
                  <Link to="/question7">還原進度</Link>
                ) : contractType === "大學" && !finishDate ? (
                  <Link to="/question8">還原進度</Link>
                ) : contractType === "大學" && !street ? (
                  <Link to="/question9">還原進度</Link>
                ) : (
                  contractType === "大學" && (
                    <Link to="/question10">還原進度</Link>
                  )
                )}

                {contractType === "學校" && !level ? (
                  <Link to="/question2Primary">還原進度</Link>
                ) : contractType === "學校" && !subjects ? (
                  <Link to="/question3Subjects">還原進度</Link>
                ) : contractType === "學校" && !frequency ? (
                  <Link to="/question4">還原進度</Link>
                ) : contractType === "學校" && !duration ? (
                  <Link to="/question5">還原進度</Link>
                ) : contractType === "學校" && !normal_rate ? (
                  <Link to="/question6">還原進度</Link>
                ) : contractType === "學校" && !about ? (
                  <Link to="/question7">還原進度</Link>
                ) : contractType === "學校" && !finishDate ? (
                  <Link to="/question8">還原進度</Link>
                ) : contractType === "學校" && !street ? (
                  <Link to="/question9">還原進度</Link>
                ) : (
                  contractType === "學校" && (
                    <Link to="/question10">還原進度</Link>
                  )
                )}

                {contractType === "一般課程" && !subjects ? (
                  <Link to="/question3Subjects">還原進度</Link>
                ) : contractType === "一般課程" && !level ? (
                  <Link to="/question3Level">還原進度</Link>
                ) : contractType === "一般課程" && !frequency ? (
                  <Link to="/question4">還原進度</Link>
                ) : contractType === "一般課程" && !duration ? (
                  <Link to="/question5">還原進度</Link>
                ) : contractType === "一般課程" && !normal_rate ? (
                  <Link to="/question6">還原進度</Link>
                ) : contractType === "一般課程" && !about ? (
                  <Link to="/question7">還原進度</Link>
                ) : contractType === "一般課程" && !finishDate ? (
                  <Link to="/question8">還原進度</Link>
                ) : contractType === "一般課程" && !street ? (
                  <Link to="/question9">還原進度</Link>
                ) : (
                  contractType === "一般課程" && (
                    <Link to="/question10">還原進度</Link>
                  )
                )}

                {contractType === "語言" && !subjects ? (
                  <Link to="/question3Subjects">還原進度</Link>
                ) : contractType === "語言" && !level ? (
                  <Link to="/question3Level">還原進度</Link>
                ) : contractType === "語言" && !frequency ? (
                  <Link to="/question4">還原進度</Link>
                ) : contractType === "語言" && !duration ? (
                  <Link to="/question5">還原進度</Link>
                ) : contractType === "語言" && !normal_rate ? (
                  <Link to="/question6">還原進度</Link>
                ) : contractType === "語言" && !about ? (
                  <Link to="/question7">還原進度</Link>
                ) : contractType === "語言" && !finishDate ? (
                  <Link to="/question8">還原進度</Link>
                ) : contractType === "語言" && !street ? (
                  <Link to="/question9">還原進度</Link>
                ) : (
                  contractType === "語言" && (
                    <Link to="/question10">還原進度</Link>
                  )
                )}

                {contractType === "樂器" && !subjects ? (
                  <Link to="/question3Subjects">還原進度</Link>
                ) : contractType === "樂器" && !level ? (
                  <Link to="/question3Level">還原進度</Link>
                ) : contractType === "樂器" && !frequency ? (
                  <Link to="/question4">還原進度</Link>
                ) : contractType === "樂器" && !duration ? (
                  <Link to="/question5">還原進度</Link>
                ) : contractType === "樂器" && !normal_rate ? (
                  <Link to="/question6">還原進度</Link>
                ) : contractType === "樂器" && !about ? (
                  <Link to="/question7">還原進度</Link>
                ) : contractType === "樂器" && !finishDate ? (
                  <Link to="/question8">還原進度</Link>
                ) : contractType === "樂器" && !street ? (
                  <Link to="/question9">還原進度</Link>
                ) : (
                  contractType === "樂器" && (
                    <Link to="/question10">還原進度</Link>
                  )
                )}
              </button>

              <button className="btn" onClick={clearSession}>
                <Link to="/question1">重新開始</Link>
              </button>
            </div>
          </section>
        </div>

        <style jsx="true">{`
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
            background: #121313;
          }

          .wrap .questionCard {
            width: 340px;
            min-height: 50vh;
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
            background: #fff;
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
            font-size: 22px;
            width: 100%;
            margin: 24px auto;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .wrap .questionCard .btnGroup {
            width: 90%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }

          .wrap .questionCard .btnGroup > button {
            background: #fff;
            color: #2b2b2b;
            padding: 0;
            margin-bottom: 20px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }

          .wrap .questionCard .btnGroup > button:hover {
            background: #a5ce0f;
            color: #fff;
          }

          .wrap .questionCard .btnGroup > button:active {
            background: #a5ce0f;
            color: #fff;
          }

          .wrap .questionCard .btnGroup > button > a {
            display: block;
            padding: 12px 20px;
            color: #2b2b2b;
          }

          .wrap .questionCard .btnGroup > button > a:hover {
            color: #fff;
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default QuestionContinue;
