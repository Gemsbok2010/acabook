import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ExternalLink } from "react-external-link";
// Three dots
import { ThreeDots } from "react-loader-spinner";

const Adashboard = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [dropdown, setDropdown] = useState(false);
  const [isloaded, setIsloaded] = useState(false);

  const [close, setClose] = useState(false);
  const [applications, setApplications] = useState("");
  const [taipei, setTaipei] = useState("");
  const [newTaipei, setNewTaipei] = useState("");
  const [kaohsiung, setKaohsiung] = useState("");
  const [pingtung, setPingtung] = useState("");
  const [tainan, setTainan] = useState("");
  const [changhwa, setChanghwa] = useState("");
  const [hsinchu, setHsinchu] = useState("");
  const [hualien, setHualien] = useState("");
  const [taoyuan, setTaoyuan] = useState("");
  const [taichung, setTaichung] = useState("");
  const [noOfCases, setNoOfCases] = useState("");
  const [inactiveList, setInactiveList] = useState("");
  const [activeList, setActiveList] = useState("");
  const [taipeitch, setTaipeitch] = useState("");
  const [tainantch, setTainantch] = useState("");
  const [taichungtch, setTaichungtch] = useState("");
  const [kaohsiungtch, setKaohsiungtch] = useState("");
  const [newTaipeitch, setNewTaipeitch] = useState("");
  const [pingtungtch, setPingtungtch] = useState("");
  const [hualientch, setHualientch] = useState("");
  const [changhwatch, setChanghwatch] = useState("");
  const [hsinchutch, setHsinchutch] = useState("");
  const [taoyuantch, setTaoyuantch] = useState("");
  const [totalTeacher, setTotalTeacher] = useState("");
  const [inactiveTeacher, setInactiveTeacher] = useState("");
  const [activeTeacher, setActiveTeacher] = useState("");
  const [noOfUsers, setNoOfUsers] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let isCancelled = false;
    setIsloaded(false);
    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/dashboard/" +
          localStorage.getItem("username")
      );
      const data = await res.json();

      if (isCancelled === false) {
        setUserInfo(data.admin);
        setApplications(data.applications);
        setNoOfUsers(data.noOfUsers);
        setTaipei(data.taipei);
        setNewTaipei(data.newTaipei);
        setKaohsiung(data.kaohsiung);
        setPingtung(data.pingtung);
        setHualien(data.hualien);
        setTainan(data.tainan);
        setChanghwa(data.changhwa);
        setTaichung(data.taichung);
        setTaoyuan(data.taoyuan);
        setHsinchu(data.hsinchu);
        setNoOfCases(data.total);
        setActiveList(data.activeList);
        setInactiveList(data.inactiveList);
        setTaipeitch(data.taipeitch);
        setNewTaipeitch(data.newTaipeitch);
        setKaohsiungtch(data.kaohsiungtch);
        setTaichungtch(data.taichungtch);
        setTainantch(data.tainantch);
        setTaoyuantch(data.taoyuantch);
        setHsinchutch(data.hsinchutch);
        setHualientch(data.hualientch);
        setChanghwatch(data.changhwatch);
        setPingtungtch(data.pingtungtch);
        setInactiveTeacher(data.inactiveTeacher);
        setActiveTeacher(data.activeTeacher);
        setTotalTeacher(data.totalTeacher);
        setIsloaded(true);
      }
    };
    if (isCancelled === false) {
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>愛課網</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
            rel="stylesheet"
          />

          <meta name="description" content="愛課網" />
        </Helmet>
        <nav>
          <div className="dashboard">
            <Link to="/">
              <div className="logo">
                <img src="/images/mainLogo.png" className="logo" alt="" />
              </div>
            </Link>

            <div className="profile-area">
              <div className="nav-box">
                <figure
                  className="smallPhoto"
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                >
                  <img src={"/images/pencilmarker.png"} alt="" />
                </figure>
                {dropdown ? (
                  <div id="dropItem">
                    <div className="dropwrap">
                      <Link to="/dashboard">
                        <h4>控制台</h4>
                      </Link>
                      <Link to="/message">
                        <h4>公佈欄管理</h4>
                      </Link>
                      <Link to="/admin/users">
                        <h4>會員管理</h4>
                      </Link>
                      <Link to="/admin/teachers">
                        <h4>老師管理</h4>
                      </Link>
                      <Link to="/admin/listings">
                        <h4>Case管理</h4>
                      </Link>
                      <Link to="/admin/subjects">
                        <h4>科目管理</h4>
                      </Link>
                      <Link to="/admin/security">
                        <h4>安全設定</h4>
                      </Link>
                      <ExternalLink target="_self" href="/admin/logout">
                        <h4>登出</h4>
                      </ExternalLink>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="wrap">
          <main>
            <aside className={close ? "moveback" : "movehere"}>
              {close ? (
                <button id="close-btn" onClick={() => setClose(false)}>
                  <span className="material-icons-sharp">menu_open</span>
                </button>
              ) : (
                <button id="close-btn" onClick={() => setClose(true)}>
                  <span className="material-icons-sharp">close</span>
                </button>
              )}

              <div className="sidebar">
                <Link to="/dashboard" className="active">
                  <span className="material-icons-sharp">dashboard</span>
                  <h4>控制台</h4>
                </Link>
                <Link to="/message">
                  <span className="material-icons-sharp">settings</span>
                  <h4>公布欄管理</h4>
                </Link>

                <Link to="/admin/users">
                  <span className="material-icons-sharp">person_search</span>
                  <h4>會員管理</h4>
                </Link>
                <Link to="/admin/teachers">
                  <span className="material-icons-sharp">person_search</span>
                  <h4>老師管理</h4>
                </Link>
                <Link to="/admin/listings">
                  <span className="material-icons-sharp">search</span>
                  <h4>Case管理</h4>
                </Link>
                <Link to="/admin/subjects">
                  <span className="material-icons-sharp">translate</span>
                  <h4>科目管理</h4>
                </Link>
                <Link to="/admin/security">
                  <span className="material-icons-sharp">settings</span>
                  <h4>安全設定</h4>
                </Link>

                <Link to="/admin/logout">
                  <span className="material-icons-sharp">logout</span>
                  <h4>登出</h4>
                </Link>
              </div>

              {/* END OF SIDEBAR */}
            </aside>

            <section className="middle">
              <div className="myaccountbox">
                <div className="leftBox">
                  <div className="topBox">
                    <div>
                      <h2>管理員</h2>
                      <h4>會員編號: {user.nanoId}</h4>
                      <h3>姓名</h3>
                      <p>
                        {user.lastName}
                        {user.firstName}
                      </p>
                    </div>
                    <div className="controlButton">
                      <button className="controlpanel">
                        <Link style={{ wdith: "100px" }} to="/dashboard">
                          前往會員帳號
                        </Link>
                      </button>

                      <button>
                        <Link to="/personal-details">個人資料</Link>
                      </button>
                    </div>
                  </div>
                  <div className="middleBox">
                    <h2 style={{ textAlign: "center" }}>會員數</h2>

                    <p>{noOfUsers} 人</p>
                  </div>
                  <div className="bottomBox">
                    <h2 style={{ textAlign: "center" }}>應徵數</h2>

                    <p>{applications} 件</p>
                  </div>
                </div>
                <div className="gridBox">
                  <div className="grid">
                    <div className="heading">
                      <h3>工作Case 地點</h3>
                    </div>

                    <div className="city">
                      <div>
                        <p>台北市</p>
                        <p>新北市</p>
                        <p>桃園市</p>
                        <p>新竹縣</p>
                        <p>台中市</p>
                        <p>彰化縣</p>
                        <p>台南市</p>
                        <p>高雄市</p>
                        <p>屏東縣</p>
                        <p>花蓮縣</p>
                        <p>全國總數</p>
                      </div>
                      <div>
                        <p>{taipei} 個</p>
                        <p>{newTaipei} 個</p>
                        <p>{taoyuan} 個</p>
                        <p>{hsinchu} 個</p>

                        <p>{taichung} 個</p>

                        <p>{changhwa} 個</p>

                        <p>{tainan} 個</p>
                        <p>{kaohsiung} 個</p>
                        <p>{pingtung} 個</p>

                        <p>{hualien} 個</p>

                        <p>{noOfCases} 個</p>
                      </div>
                    </div>
                    <div className="city-result">
                      <div>
                        <p className="appliedbefore">暫歇中</p>
                        <p className="seen">開放中</p>
                      </div>
                      <div>
                        <p>{inactiveList} 個</p>
                        <p>{activeList} 個</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid">
                    <div className="heading">
                      <h3>家教人數</h3>
                    </div>
                    <div className="tutor">
                      <div>
                        <p>台北市</p>
                        <p>新北市</p>
                        <p>桃園市</p>
                        <p>新竹縣</p>

                        <p>台中市</p>

                        <p>彰化縣</p>

                        <p>台南市</p>
                        <p>高雄市</p>
                        <p>屏東縣</p>

                        <p>花蓮縣</p>

                        <p>全國總數</p>
                      </div>
                      <div>
                        <p>{taipeitch} 人</p>
                        <p>{newTaipeitch} 人</p>
                        <p>{taoyuantch} 人</p>
                        <p>{hsinchutch} 人</p>

                        <p>{taichungtch} 人</p>

                        <p>{changhwatch} 人</p>

                        <p>{tainantch} 人</p>
                        <p>{kaohsiungtch} 人</p>
                        <p>{pingtungtch} 人</p>

                        <p>{hualientch} 人</p>

                        <p>{totalTeacher} 人</p>
                      </div>
                    </div>
                    <div className="tutor-result">
                      <div>
                        <p className="appliedbefore">關閉中</p>
                        <p className="seen">開放中</p>
                      </div>
                      <div>
                        <p>{inactiveTeacher} 人</p>
                        <p>{activeTeacher} 人</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* END OF MIDDLE */}
          </main>
        </div>
        <style jsx="true">{`
          .wrap {
            height: 650px;
          }
          .backdrop {
            position: fixed;
            display: block;
            background-color: rgba(33, 40, 46, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2500;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }

          .myaccountbox {
            margin-top: 0px;
            display: flex;
            justify-content: space-bewtween;
            width: 1280px;
          }

          .leftBox {
            background-color: white;
            background: transparent;
            width: 430px;
            height: 500px;
            display: grid;

            grid-template-row: 3fr 3fr 3fr;
            grid-row-gap: 12px;
            grid-column-gap: 12px;

            margin-right: 10px;
            border-radius: 5px;
          }

          .leftBox h2 {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 400;
            letter-spacing: -0.02em;
            margin-bottom: 18px;
          }
          .leftBox h4 {
            color: rgba(99, 106, 109);
            font-weight: 100;
            font-family: "Noto Sans TC", sans-serif;
            font-size: 14px;
            margin-bottom: 16px;
          }

          .leftBox h3 {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 400;
            letter-spacing: -0.02em;
            margin-bottom: 0px;
          }

          .leftBox p {
            font-size: 28px;
            font-weight: 600;
          }

          .topBox {
            display: flex;
            border-top: 5px solid #a5ce0f;
            justify-content: space-between;
            background-color: #fff;
            padding: 16px 20px 0px 20px;
            margin: 0;
            border-radius: 5px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.18);
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          .topBox .controlButton {
            position: relative;
            height: 100px;
            width: 130px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-betweeb;
          }

          .topBox .controlButton .controlpanel a {
            width: 130px;
            background: linear-gradient(210deg, #006098, rgba(0, 96, 152, 0));
            background-color: #54c8e8;
            border-radius: 4px;
          }

          .controlButton button {
            margin-top: 0px;
            top-right: 0px;
            top: 0;
            position: relative;
          }

          .middleBox {
            display: block;
            border-top: 5px solid #a5ce0f;
            background-color: #fff;
            padding: 16px 20px 0px 20px;
            margin: 0;

            border-radius: 5px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.18);
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          .bottomBox h2,
          .middleBox h2 {
            font-weight: 600;
            font-size: 28px;
            color: var(--color-gray-dark);
            margin-bottom: 3px;
          }

          .bottomBox p,
          .middleBox p {
            font-weight: 600;
            font-size: 48px;
            color: var(--color-gray-dark);
            text-align: center;
            margin-bottom: 0;
          }

          .bottomBox {
            display: block;
            border-top: 5px solid #a5ce0f;

            background-color: #fff;
            padding: 16px 20px 0px 20px;
            margin: 0;

            border-radius: 5px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.18);
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }

          .topBox button {
            background-color: #a5ce0f;
            position: relative;
            color: white;
            cursor: pointer;
            font-weight: 500;
            width: 80px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 15px;
            border-radius: 4px;
            padding: 0;
            margin-top: 20px;
          }

          .topBox a {
            color: white;
            height: 100%;
            width: 100%;
            display: block;
            font-size: 14px;
          }

          .gridBox {
            background-color: transparent;
            height: 500px;
            width: 630px;
            border-radius: 5px;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-row-gap: 12px;
            grid-column-gap: 12px;
            margin-top: 0px;
          }
          .grid {
            background-color: white;
            border-radius: 5px;
            cursor: pointer;
            height: 100%;
            padding-bottom: 20px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          .grid .heading {
            margin-top: 20px;
          }
          .gridBox .grid h3 {
            text-align: center;
            font-size: 23px;
            font-weight: 600px;
            position: relative;
            color: #2f383c;
          }
          .grid p {
            width: 100%;
            text-align: center;
            font-size: 38px;
            top: 23%;
            position: relative;
          }
          .grid span {
            font-size: 18px;
          }
          .grid .city-result,
          .grid .tutor-result {
            display: flex;
            justify-content: space-around;
            position: relative;
            top: 10%;
          }
          .grid .city-result p,
          .grid .tutor-result p {
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 5px;
            font-weight: 900;
          }
          .grid .city {
            display: grid;
            top: -3%;
            grid-template-columns: 4fr 4fr;
            gap: 2rem;
            width: 100%;
            position: relative;
          }
          .grid .city p {
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 5px;
          }
          .grid .tutor {
            display: grid;
            top: -3%;
            grid-template-columns: 4fr 4fr;
            gap: 2rem;
            width: 100%;
            position: relative;
          }
          .grid .tutor p {
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 5px;
          }
          .grid .applied p {
            font-size: 16px;
            height: 28px;
          }

          .grid .seen {
            color: green;
            font-size: 16px;
            height: 28px;
            line-height: 26px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid green;
            margin-left: 10px;
          }

          .grid .appliedbefore {
            color: #e40000;
            font-size: 16px;
            height: 28px;
            line-height: 26px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-left: 10px;
          }

          /* ROOT CSS VARIABLES */

          :root {
            --color-white: white;
            --color-light: #f0eff5;
            --color-gray-light: #89848c;
            --color-gray-dark: #56555e;
            --color-dark: #27282f;
            --color-primary: #a5ce0f;
            --color-success: rgb(34, 202, 75);
            --color-danger: rgb(255, 67, 54);
            --color-warning: rgb(234, 181, 7);
            --color-purple: rgb(160, 99, 245);

            --color-primary-light: rgba(71, 7, 234, 0.2);
            --color-success-light: rgba(34, 202, 75, 0.2);
            --color-danger-light: rgba(255, 67, 54, 0.2);
            --color-purple-light: rgba(160, 99, 245, 0.2);

            --card-padding: 1.6rem;
            --padding-1: 1rem;
            --padding-2: 8px;

            --card-border-radius: 1.6rem;
            --border-radius-1: 1rem;
            --border-radius-2: 6px;
          }

          .dark-theme {
            --color-white: #131316;
            --color-light: #23232a;
            --color-dark: #ddd;
            --color-gray-dark: #adacb5;
          }

          * {
            margin: 0;
            padding: 0;
            outline: 0;
            border: 0;
            appearance: none;
            list-style: none;
            text-decoration: none;
            box-sizing: border-box;
          }
          html {
            font-size: 12px;
          }

          body {
            background-color: var(--color-light);
            font-family: "Noto Sans TC", sans-serif;
            min-height: 100vh;
            color: var(--color-dark);
          }

          img {
            width: 100%;
          }

          h1 {
            font-size: 2.2rem;
          }
          h2 {
            font-size: 1.5rem;
          }
          h3 {
            font-size: 1.2rem;
          }
          h4 {
            font-size: 1rem;
          }
          h5 {
            font-size: 0.86rem;
            font-weight: 500;
          }

          h6 {
            font-size: 0.76rem;
          }

          p {
            font-size: 0.86rem;
            color: var(--color-gray-dark);
          }

          small {
            font-weight: 300;
            font-size: 0.77rem;
          }

          .text-muted {
            color: var(--color-gray-light);
          }
          .primary {
            color: var(--color-primary);
          }
          .success {
            color: var(--color-success);
          }
          .danger {
            color: var(--color-danger);
          }
          .purple {
            color: var(--color-purple);
          }

          .bg-primary {
            background-color: var(--color-primary);
            box-shadow: 0 0.8rem 0.8rem var(--color-primary-light);
          }
          .bg-success {
            background-color: var(--color-success);
            box-shadow: 0 0.8rem 0.8rem var(--color-success-light);
          }
          .bg-danger {
            background-color: var(--color-danger);
            box-shadow: 0 0.8rem 0.8rem var(--color-danger-light);
          }
          .bg-purple {
            background-color: var(--color-purple);
            box-shadow: 0 0.8rem 0.8rem var(--color-purple-light);
          }
          .bg-dark {
            background-color: #27282f;
            box-shadow: 0 0.8rem 0.8rem rgba(0, 0, 0, 0.2);
          }
          /* ============== NAV BAR ============= */

          nav {
            width: 100%;
            background-color: var(--color-white);
            padding: 1rem 0;
          }

          nav .dashboard {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            width: 96%;
            margin: 0 auto;
          }

          nav {
            height: 65px;
          }

          nav img.logo {
            width: 10rem;
            display: block;
          }

          nav .logo.active {
            display: block;
          }

          nav .search-bar {
            background: var(--color-light);
            padding: var(--padding-2) var(--card-padding);
            width: 32vw;
            border-radius: var(--border-radius-2);
            display: flex;
            align-items: center;
            gap: 1rem;
            color: var(--color-gray-light);
            position: absolute;
            left: 15%;
          }

          nav .search-bar input[type="search"] {
            color: var(--color-dark);
            width: 100%;
            background: transparent;
          }

          nav .search-bar input[type="search"]::placeholder {
            color: var(--color-gray-dark);
          }

          nav .profile-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4rem;
          }

          nav .profile-area .theme-btn {
            display: flex;
            background: var(--color-light);
            width: 5rem;
            height: 2rem;
            cursor: pointer;
            border-radius: var(--border-radius-2);
          }

          nav .profile-area .theme-btn span {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
          }
          nav .profile-area .theme-btn .active {
            background: var(--color-dark);
            border-radius: var(--border-radius-2);
            color: var(--color-white);
          }

          nav .profile-area .profile {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .nav-box {
            width: 35px;
            height: 35px;
            left: 90%;
            top: 50%;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
          }
          nav > figure {
            width: 200px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 10%;
            top: 50%;
          }
          .smallPhoto {
            overflow: hidden;
            position: relative;
            width: 39px;
            height: 39px;
            border: 2px solid white;
            cursor: pointer;
          }
          .smallPhoto img {
            position: absolute;
            width: 30px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }

          .nav-box #dropItem {
            width: 280px;
            background: var(--color-white);
            position: absolute;
            border: 1px solid #ebebeb;
            border-top: none;
            transform: translateX(-84%);
            display: block;
          }

          .nav-box #dropItem.open {
            display: block;
          }

          .nav-box .dropwrap {
            padding-bottom: 0px;
            width: 88%;
            background: var(--color-white);
            margin-top: 3%;
            margin-left: 6%;
          }

          .nav-box .dropwrap a {
            color: #777;
            font-weight: 500;
            font-size: 13px;
            font-family: "Noto Sans TC", sans-serif;
            height: 45px;
            line-height: 45px;
            width: 100%;
            position: relative;
            display: block;
          }

          .nav-box .dropwrap a h4 {
            margin-bottom: 0px;
            width: 100%;
            position: relative;
            display: block;
            height: 45px;
            line-height: 45px;
          }

          .nav-box .dropwrap a:hover {
            border-bottom: 1px solid #484848;
          }

          nav .profile-area .profile-photo {
            display: block;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            overflow: hidden;
          }

          nav .profile-area button {
            display: none;
          }

          /* ============ ASIDE & SIDEBAR ============ */
          main {
            display: grid;
            grid-template-columns: 16rem auto 30rem;
            gap: 2rem;
            width: 96%;
            margin: 1rem auto 4rem;
          }

          main aside {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 88vh;
            transform: translateX(0%);
          }

          main aside button#close-btn:focus,
          main aside button#close-btn:active {
            outline: none;
          }

          /* will be shown only on mobile and tablets */
          main aside button#close-btn {
            display: none;
          }

          main aside .sidebar a {
            display: flex;
            align-items: center;
            gap: 1.2rem;
            height: 4.2rem;
            color: var(--color-gray-light);
            position: relative;
          }
          main aside .sidebar {
            background-color: white;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          main aside .sidebar a:hover {
            background-color: var(--color-light);
          }

          main aside .sidebar a span {
            font-size: 1.7rem;
            margin-left: 3rem;

            transition: all 300ms ease;
          }

          main aside .sidebar a.active {
            background: var(--color-white);
            color: var(--color-primary);
          }

          main aside .sidebar a.active:before {
            content: "";
            width: 6px;
            height: 100%;
            position: absolute;
            background: var(--color-primary);
          }

          main aside .sidebar a:hover {
            color: var(--color-primary);
          }

          main aside .sidebar a:hover span {
            margin-left: 2rem;
          }

          main aside .sidebar h4 {
            font-weight: 500;
          }

          /* ============== updates =============== */

          main aside .updates {
            background: var(--color-white);
            border-radius: var(--border-radius-1);
            text-align: center;
            padding: var(--card-padding);
          }

          main aside .updates span {
            font-size: 2.8rem;
          }

          main aside .updates h4 {
            margin: 1rem 0;
          }

          main aside .updates a {
            display: block;
            width: 100%;
            background: var(--color-primary);
            color: var(--color-white);
            border-radius: var(--border-radius-1);
            padding: 0.8rem 0;
            margin-top: 2rem;

            transition: all 300ms ease;
          }

          main aside .updates a:hover {
            box-shadow: 0 1rem 2rem var(--color-primary-light);
          }

          /* ====================== MIDDLE =================== */

          main section.midde .header {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          main section.middle .header input[type="date"] {
            padding: 0.5rem 2rem;
            border-radius: var(--border-radius-2);
            background: var(--color-white);
            color: var(--color-gray-dark);
          }

          main section.middle .cards {
            margin-top: 1rem;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }

          main section.middle .cards .card {
            background: linear-gradient(#ff796f, #bd261b);
            padding: var(--card-padding);
            border-radius: var(--card-border-radius);
            color: #fff;
            height: 16rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 2rem 3rem var(--color-danger-light);
            transition: all 300ms ease;

            min-width: 22rem;
          }

          main section.middle .cards .card:nth-child(2) {
            background: linear-gradient(#7f8191, #27282f);
            box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.2);
          }

          main section.middle .cards .card:nth-child(3) {
            background: linear-gradient(#5d70ff, #5719c2);
            box-shadow: 0 2rem 3rem var(--color-primary-light);
          }
          main section.middle .cards .card:hover {
            box-shadow: none;
          }

          main section.middle .card .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          main section.middle .card .top .left {
            display: flex;
            gap: 0.5rem;
          }
          main section.middle .card .top .left h2 {
            font-weight: 200;
            font-size: 1.4rem;
          }

          main section.middle .card .top .left img {
            width: 2.3rem;
            height: 2.3rem;
            border: 1px solid white;
            border-radius: var(--border-radius-2);
            padding: 0.4rem;
          }

          main section.middle .card .top .right img.right {
            width: 3.5rem;
          }

          main section.middle .card .middle {
            display: flex;
            justify-content: space-between;
          }

          main section.middle .card .middle .chip {
            width: 3.5rem;
          }
          main section.middle .card .bottom {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          main section.middle .card .bottom .right {
            display: flex;
            gap: 2rem;
          }

          /* ========= MONTHLY REPORT ============= */

          main .monthly-report {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            justify-content: space-between;
            margin-top: 2rem;
          }

          main .monthly-report h1 {
            font-weight: 700;
            font-size: 1.8rem;
          }

          /* ========= FAST PAYMENT ============= */

          main .fast-payment {
            margin-top: 2rem;
            display: flex;
            align-self: center;
            gap: 2rem;
          }

          main .fast-payment .badges {
            display: flex;
            gap: 1rem;
            align-self: center;
            flex-wrap: wrap;
            max-width: 100%;
          }

          main .fast-payment .badge span {
            width: 7px;
            height: 7px;
            border-radius: 50%;
          }

          /* =========== FOOTER============ */

          footer .font-weight-light-mobile {
            display: none;
          }
          footer .font-weight-light {
            display: block !important;
            color: #212529;
          }

          /* ============ MEDIA QUERIES FOR TABLETS =========*/
          @media screen and (max-width: 1024px) {
            nav .search-bar {
              display: none;
            }
            nav .profile-area {
              gap: 2rem;
            }

            .myaccountbox {
              display: flex;
              flex-direction: column;

              width: 400px;
              height: 700px;
            }
            .gridBox {
              margin-top: 20px;
            }

            main {
              grid-template-columns: 1fr;
            }

            main .moveback {
              transform: translateX(-80%);
              transition: all 300ms ease;
            }
            main .movehere {
              transform: translateX(0%);
              transition: all 300ms ease;
            }
            main aside {
              position: fixed;
              top: 0;
              left: -100%;
              z-index: 3;
              background: var(--color-white);
              width: 22rem;
              height: 100vh;
              box-shadow: 2rem 0 2rem var(--color-primary-light);
              display: "none";
              animation: showSidebar 500ms ease-in forwards;
            }

            @keyframes showSidebar {
              to {
                left: 0;
              }
            }

            main aside button#close-btn {
              display: inline-block;
              width: 3rem;
              height: 3rem;
              position: absolute;
              top: 1rem;
              right: 1rem;
              z-index: 4;
              background: transparent;
              color: var(--color-dark);
            }
            button:hover {
              cursor: pointer;
            }

            main aside .sidebar {
              margin-top: 4rem;
            }

            main aside .updates {
              display: none;
            }

            main section.middle .cards {
              grid-template-columns: 1fr 1fr;
            }

            main canvas {
              margin: 3rem 0 1rem;
            }

            main section.right .recent.transactions {
              margin-top: 3rem;
            }
          }

          /*  ====== MEDIA QUERIES FOR MOBILE PHONES */

          @media screen and (max-width: 768px) {
            footer .font-weight-light-mobile {
              display: block;
              color: #212529;
            }
            footer .font-weight-light {
              display: none !important;
            }
            main {
              padding-top: 20px;
              padding-bottom: 20px;
            }
            .gridBox {
              width: 430px;
              display: flex;
              flex-wrap: wrap;
              margin: 0 auto;
              justify-content: space-between;
              position: relative;
              transform: translateY(2%);
            }
            .grid {
              width: 500px;
              margin: 0 auto;
            }

            main .moveback {
              transform: translateX(-80%);
              transition: all 300ms ease;
            }
            main .movehere {
              transform: translateX(0%);
              transition: all 300ms ease;
            }

            nav .profile-area {
              gap: 2.6rem;
            }
            nav .profile h5,
            nav .profile span {
              display: none;
            }

            main section.middle .cards {
              grid-template-columns: 1fr;
            }

            main section.middle .fast-payment {
              flex-direction: column;
              align-items: flex-start;
              gap: 1.4rem;
              margin-top: 3rem;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Adashboard;
