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
          <title>Acabook</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Acabook" />
        </Helmet>
        <div className="wrap">
          <section className="questionCard container">
            <figure>
              <Link to="/dashboard/en">
                <img
                  src="/images/mainLogo.png"
                  alt="LOGO"
                  className="img-fluid"
                />
              </Link>
            </figure>
            <h2>Return where you left off?</h2>
            <div className="btnGroup">
              <button className="btn">
                {contractType === "University" && !level ? (
                  <Link to="/question2University/en">Continue</Link>
                ) : contractType === "University" && !subjects ? (
                  <Link to="/question3Subjects/en">Continue</Link>
                ) : contractType === "University" && !frequency ? (
                  <Link to="/question4/en">Continue</Link>
                ) : contractType === "University" && !duration ? (
                  <Link to="/question5/en">Continue</Link>
                ) : contractType === "University" && !normal_rate ? (
                  <Link to="/question6/en">Continue</Link>
                ) : contractType === "University" && !about ? (
                  <Link to="/question7/en">Continue</Link>
                ) : contractType === "University" && !finishDate ? (
                  <Link to="/question8/en">Continue</Link>
                ) : contractType === "University" && !street ? (
                  <Link to="/question9/en">Continue</Link>
                ) : (
                  contractType === "University" && (
                    <Link to="/question10/en">Continue</Link>
                  )
                )}

                {contractType === "School" && !level ? (
                  <Link to="/question2Primary/en">Continue</Link>
                ) : contractType === "School" && !subjects ? (
                  <Link to="/question3Subjects/en">Continue</Link>
                ) : contractType === "School" && !frequency ? (
                  <Link to="/question4/en">Continue</Link>
                ) : contractType === "School" && !duration ? (
                  <Link to="/question5/en">Continue</Link>
                ) : contractType === "School" && !normal_rate ? (
                  <Link to="/question6/en">Continue</Link>
                ) : contractType === "School" && !about ? (
                  <Link to="/question7/en">Continue</Link>
                ) : contractType === "School" && !finishDate ? (
                  <Link to="/question8/en">Continue</Link>
                ) : contractType === "School" && !street ? (
                  <Link to="/question9/en">Continue</Link>
                ) : (
                  contractType === "School" && (
                    <Link to="/question10/en">Continue</Link>
                  )
                )}

                {contractType === "Other" && !subjects ? (
                  <Link to="/question3Subjects/en">Continue</Link>
                ) : contractType === "Other" && !level ? (
                  <Link to="/question3Level/en">Continue</Link>
                ) : contractType === "Other" && !frequency ? (
                  <Link to="/question4/en">Continue</Link>
                ) : contractType === "Other" && !duration ? (
                  <Link to="/question5/en">Continue</Link>
                ) : contractType === "Other" && !normal_rate ? (
                  <Link to="/question6/en">Continue</Link>
                ) : contractType === "Other" && !about ? (
                  <Link to="/question7/en">Continue</Link>
                ) : contractType === "Other" && !finishDate ? (
                  <Link to="/question8/en">Continue</Link>
                ) : contractType === "Other" && !street ? (
                  <Link to="/question9/en">Continue</Link>
                ) : (
                  contractType === "Other" && (
                    <Link to="/question10/en">Continue</Link>
                  )
                )}

                {contractType === "Languages" && !subjects ? (
                  <Link to="/question3Subjects/en">Continue</Link>
                ) : contractType === "Languages" && !level ? (
                  <Link to="/question3Level/en">Continue</Link>
                ) : contractType === "Languages" && !frequency ? (
                  <Link to="/question4/en">Continue</Link>
                ) : contractType === "Languages" && !duration ? (
                  <Link to="/question5/en">Continue</Link>
                ) : contractType === "Languages" && !normal_rate ? (
                  <Link to="/question6/en">Continue</Link>
                ) : contractType === "Languages" && !about ? (
                  <Link to="/question7/en">Continue</Link>
                ) : contractType === "Languages" && !finishDate ? (
                  <Link to="/question8/en">Continue</Link>
                ) : contractType === "Languages" && !street ? (
                  <Link to="/question9/en">Continue</Link>
                ) : (
                  contractType === "Languages" && (
                    <Link to="/question10/en">Continue</Link>
                  )
                )}

                {contractType === "Musical" && !subjects ? (
                  <Link to="/question3Subjects/en">Continue</Link>
                ) : contractType === "Musical" && !level ? (
                  <Link to="/question3Level/en">Continue</Link>
                ) : contractType === "Musical" && !frequency ? (
                  <Link to="/question4/en">Continue</Link>
                ) : contractType === "Musical" && !duration ? (
                  <Link to="/question5/en">Continue</Link>
                ) : contractType === "Musical" && !normal_rate ? (
                  <Link to="/question6/en">Continue</Link>
                ) : contractType === "Musical" && !about ? (
                  <Link to="/question7/en">Continue</Link>
                ) : contractType === "Musical" && !finishDate ? (
                  <Link to="/question8/en">Continue</Link>
                ) : contractType === "Musical" && !street ? (
                  <Link to="/question9/en">Continue</Link>
                ) : (
                  contractType === "Musical" && (
                    <Link to="/question10/en">Continue</Link>
                  )
                )}
              </button>

              <button className="btn" onClick={clearSession}>
                <Link to="/question1/en">Start over</Link>
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
            width: 375px;
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
