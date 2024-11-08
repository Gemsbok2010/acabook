import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { useSelector } from "react-redux";
import { ExternalLink } from "react-external-link";
import { useLocation } from "react-router-dom";

const LoggedInNavbar = () => {
  const user = useSelector((state) => state.userInfo.value);
  ReactSession.setStoreType("sessionStorage");
  const [dropDown, setDropDown] = useState(false);
  const [blacklist, setBlacklist] = useState(false);
  const [contractType, setContractType] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    pathname === "/step5/en" ? setDropDown(true) : setDropDown(false);
    setContractType(ReactSession.get("contractType"));
  }, []);

  return (
    <>
      <nav>
        <figure>
          <Link to="/en">
            <img
              src="/images/mainLogo.png"
              alt="Acabook LOGO"
              className="img-fluid"
            />
          </Link>
        </figure>
        <div
          className="nav-box"
          onClick={() => {
            user.isActive ? setDropDown(!dropDown) : setBlacklist(!blacklist);
          }}
        >
          <figure className="smallPhoto">
            <img src={user.filename} alt="" />
          </figure>

          {!user.isActive && blacklist ? (
            <div id="dropItem">
              <div className="dropwrap">
                <div>
                  <Link to="/securitySettings/en">Security Settings</Link>
                </div>
                <div>
                  <ExternalLink href="/logout_en" target="_self">
                    Logout
                  </ExternalLink>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {dropDown ? (
            <div id="dropItem">
              <div className="dropwrap">
                <div>
                  <Link to="/dashboard/en">Dashboard</Link>
                </div>
                <div>
                  <Link to="/personal-details/en">My Profile</Link>
                </div>

                <div
                  className={pathname === "/step5/en" ? "teacherActivated" : ""}
                >
                  {user.isTeacher ? (
                    <Link
                      className={
                        user.completeAccess === false ? "disabled" : ""
                      }
                      to={
                        user.completeAccess === false
                          ? "#"
                          : "/teacher_profile/en"
                      }
                    >
                      Manage Tutor Profile
                    </Link>
                  ) : (
                    <Link
                      className={
                        user.completeAccess === false ? "disabled" : ""
                      }
                      to={user.completeAccess === false ? "#" : "/step1/en"}
                    >
                      Create Tutor Profile
                    </Link>
                  )}
                </div>

                <div>
                  <Link
                    className={user.completeAccess === false ? "disabled" : ""}
                    to={user.completeAccess === false ? "#" : "/searchlist/en"}
                  >
                    Browse Job Cases
                  </Link>
                </div>
                <div>
                  <Link
                    className={user.completeAccess === false ? "disabled" : ""}
                    to={
                      user.completeAccess === false
                        ? "#"
                        : "/applicationsManager/en"
                    }
                  >
                    Manage My Applications
                  </Link>
                </div>
                <div>
                  <Link
                    className={user.completeAccess === false ? "disabled" : ""}
                    to={
                      user.completeAccess === false
                        ? "#"
                        : "/teacherdatabase/en"
                    }
                  >
                    Tutor Database
                  </Link>
                </div>
                <div>
                  {!contractType ? (
                    <Link
                      className={
                        user.completeAccess === false ? "disabled" : ""
                      }
                      to={user.completeAccess === false ? "#" : "/question1/en"}
                    >
                      Create Listing
                    </Link>
                  ) : (
                    <Link
                      className={
                        user.completeAccess === false ? "disabled" : ""
                      }
                      to={
                        user.completeAccess === false
                          ? "#"
                          : "/question_continue/en"
                      }
                    >
                      Create Listing
                    </Link>
                  )}
                </div>
                <div>
                  <Link
                    className={user.completeAccess === false ? "disabled" : ""}
                    to={
                      user.completeAccess === false ? "#" : "/listingManager/en"
                    }
                  >
                    Manage My Listings
                  </Link>
                </div>
                <div>
                  <Link to="/securitySettings/en">Security Settings</Link>
                </div>

                <div>
                  <ExternalLink href="/logout_en" target="_self">
                    Logout
                  </ExternalLink>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      <style jsx="true">
        {`
          nav {
            background-color: #fff;
            width: 100%;
            height: 85px;
            margin: 0 auto;
            padding: 0;
            border-bottom: 1px solid #ebebeb;
            position: relative;
          }

          .navbar-nav {
            float: right;
            position: absolute;
            display: block;
          }

          .navbar-nav ul {
            padding: 0;
            margin: 0;
          }

          .navbar-nav ul li {
            text-decoration: none;
            list-style: none;
          }

          .navbar-nav ul li a {
            font-weight: 800;
            font-size: 14px;
            color: #2b2b2b;
          }

          .nav-box {
            width: 35px;
            height: 35px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 90%;
            top: 50%;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
          }

          nav > figure > a {
            display: block;
          }
          nav h2 {
            font-weight: bold;
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
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: #eee;
            border: 2px solid white;
            cursor: pointer;
          }
          .smallPhoto img {
            position: absolute;
            max-width: 48px;
            height: auto;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }
          @media only screen and (min-width: 768px) {
            .nav-box {
              left: 96%;
            }
            nav figure .img-fluid {
              transform: translateX(0%);
            }
          }
          #dropItem {
            width: 280px;
            background-color: white;
            position: absolute;
            margin-top: 6px;
            transform: translateX(-75%);
            border: 1px solid #ebebeb;
            border-top: none;
            display: block;
          }

          #dropItem.open {
            display: block;
          }
          #dropItem .disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }
          .dropwrap {
            padding-bottom: 0px;
            width: 88%;
            background-color: #fff;
            margin-top: 3%;
            margin-left: 6%;
          }
          .dropwrap div {
            border-bottom: 1px solid #ebebeb;
            height: 45px;
            line-height: 45px;
            font-weight: 500;
            color: #777;
            font-size: 13px;
          }
          .dropwrap div a {
            color: #777;
            font-weight: 500;
            font-size: 13px;
            font-family: "Noto Sans TC", sans-serif;
            height: 100%;
            width: 100%;
            position: relative;
            display: block;
          }
          .dropwrap div:hover {
            border-bottom: 1px solid #484848;
          }
          nav .img-fluid {
            transform: translateX(36%);
          }
          .dropwrap .teacherActivated {
            background-color: #a5ce0f;
            animation: mailframe 500ms ease-in 0ms;
            animation-fill-mode: forwards;
          }

          .dropwrap .teacherActivated a {
            color: #fff;
            animation: textframe 500ms ease-in-out 0ms;
          }

          .wrap .location h2 {
            font-weight: 800;
            font-size: 28px;
            width: 440px;
            margin-top: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 40px;
            color: #2b2b2b;
          }

          .noDetails_block {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: white;
            z-index: 3000;
            display: block;
            opacity: 0;
          }

          @keyframes mailframe {
            0% {
              opacity: 0;
              transform: translateX(8%);
            }

            100% {
              opacity: 1;
              transform: translateX(0%);
            }
          }
          @keyframes textframe {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default LoggedInNavbar;
