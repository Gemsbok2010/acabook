import { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

//Admin
const Admin = lazy(() => import("./busadmin/Admin"));
const Amessage = lazy(() => import("./busadmin/Amessage"));
const Adashboard = lazy(() => import("./busadmin/Adashboard"));
const Ausers = lazy(() => import("./busadmin/Ausers"));
const Alistings = lazy(() => import("./busadmin/Alistings"));
const Ateachers = lazy(() => import("./busadmin/Ateachers"));
const Asecurity = lazy(() => import("./busadmin/Asecurity"));
const Asubjects = lazy(() => import("./busadmin/Asubjects"));
const Aedituser = lazy(() => import("./busadmin/Aedituser"));
const Aeditteacher = lazy(() => import("./busadmin/Aeditteacher"));
const Aeditteachercv = lazy(() => import("./busadmin/Aeditteachercv"));
const Alogout = lazy(() => import("./busadmin/Alogout"));
const Aforgotpassword = lazy(() => import("./busadmin/Aforgotpassword"));
const Aresume = lazy(() => import("./busadmin/Aresume"));
const AemailMessage = lazy(() => import("./busadmin/AemailMessage"));

//Screens
const Home = lazy(() => import("./screens/Home"));
const Fourzerofour = lazy(() => import("./screens/Custom404"));
const Privacy = lazy(() => import("./screens/Privacy"));
const TermsAndConditions = lazy(() => import("./screens/TermsAndConditions"));
const Security = lazy(() => import("./screens/Security"));
const SearchList = lazy(() => import("./screens/SearchList"));
const FindTutor = lazy(() => import("./screens/FindTutor"));
const BecomeTutor = lazy(() => import("./screens/BecomeTutor"));
const Contact = lazy(() => import("./screens/Contact"));
const Login = lazy(() => import("./screens/Login"));
const Logout = lazy(() => import("./screens/Logout"));
const Signup = lazy(() => import("./screens/Signup"));
const Dashboard = lazy(() => import("./screens/Dashboard"));
const PersonalDetails = lazy(() => import("./screens/PersonalDetails"));
const Question1 = lazy(() => import("./screens/Question1"));
const Question2primary = lazy(() => import("./screens/Question2primary"));
const Question2university = lazy(() => import("./screens/Question2university"));
const Question3Level = lazy(() => import("./screens/Question3Level"));
const Question3Subjects = lazy(() => import("./screens/Question3Subjects"));
const Question4 = lazy(() => import("./screens/Question4"));
const Question5 = lazy(() => import("./screens/Question5"));
const Question6 = lazy(() => import("./screens/Question6"));
const Question7 = lazy(() => import("./screens/Question7"));
const Question8 = lazy(() => import("./screens/Question8"));
const Question9 = lazy(() => import("./screens/Question9"));
const Question10 = lazy(() => import("./screens/Question10"));
const Question_Thank_You = lazy(() => import("./screens/Question_Thank_You"));
const QuestionContinue = lazy(() => import("./screens/QuestionContinue"));
const Ad_details = lazy(() => import("./screens/Ad_details"));
const Step1 = lazy(() => import("./screens/Step1"));
const Step2 = lazy(() => import("./screens/Step2"));
const Step3 = lazy(() => import("./screens/Step3"));
const Step4 = lazy(() => import("./screens/Step4"));
const TeacherProfile = lazy(() => import("./screens/TeacherProfile"));
const TeacherCV = lazy(() => import("./screens/TeacherCV"));
const Resume = lazy(() => import("./screens/Resume"));
const ResumeCandidate = lazy(() => import("./screens/ResumeCandidate"));
const ListingManager = lazy(() => import("./screens/ListingManager"));
const ApplicationSent = lazy(() => import("./screens/ApplicationSent"));
const ListingEdit = lazy(() => import("./screens/ListingEdit"));
const SecuritySettings = lazy(() => import("./screens/SecuritySettings"));
const ApplicationsManager = lazy(() => import("./screens/ApplicationsManager"));
const TeacherDb = lazy(() => import("./screens/TeacherDb"));
const ForgotPwd = lazy(() => import("./screens/ForgotPassword"));
const ResetPwd = lazy(() => import("./screens/Resetpassword"));
const EmailMessage = lazy(() => import("./screens/EmailMessage"));
const ContactUsConfirm = lazy(() => import("./screens/ContactUsConfirm"));
const Countdown = lazy(() => import("./screens/Countdown"));

//Screens English
const Home_en = lazy(() => import("./screens_en/Home"));
const Logout_en = lazy(() => import("./screens_en/Logout"));
const Login_en = lazy(() => import("./screens_en/Login"));
const Signup_en = lazy(() => import("./screens_en/Signup"));
const Dashboard_en = lazy(() => import("./screens_en/Dashboard"));
const Calendar_en = lazy(() => import("./screens_en/Calendar"));
const PersonalDetails_en = lazy(() => import("./screens_en/PersonalDetails"));
const ForgotPwd_en = lazy(() => import("./screens_en/ForgotPassword"));
const EmailMessage_en = lazy(() => import("./screens_en/EmailMessage"));
const SearchList_en = lazy(() => import("./screens_en/SearchList"));
const Ad_details_en = lazy(() => import("./screens_en/Ad_details"));
const SecuritySettings_en = lazy(() => import("./screens_en/SecuritySettings"));
const ApplicationsManager_en = lazy(() =>
  import("./screens_en/ApplicationsManager")
);
const Contact_en = lazy(() => import("./screens_en/Contact"));
const ContactUsConfirm_en = lazy(() => import("./screens_en/ContactUsConfirm"));
const ResetPwd_en = lazy(() => import("./screens_en/Resetpassword"));
const ListingManager_en = lazy(() => import("./screens_en/ListingManager"));
const ResumeCandidate_en = lazy(() => import("./screens_en/ResumeCandidate"));
const ListingEdit_en = lazy(() => import("./screens_en/ListingEdit"));
const TeacherDb_en = lazy(() => import("./screens_en/TeacherDb"));
const Step1_en = lazy(() => import("./screens_en/Step1"));
const Step2_en = lazy(() => import("./screens_en/Step2"));
const Step3_en = lazy(() => import("./screens_en/Step3"));
const Step4_en = lazy(() => import("./screens_en/Step4"));
const Step5_en = lazy(() => import("./screens_en/Step5"));
const TeacherProfile_en = lazy(() => import("./screens_en/TeacherProfile"));
const TeacherCV_en = lazy(() => import("./screens_en/TeacherCV"));
const TeacherSubjects_en = lazy(() => import("./screens_en/TeacherSubjects"));
const TeacherSubjectSelect_en = lazy(() =>
  import("./screens_en/TeacherSubjectSelect")
);
const TeacherSubjectEdit_en = lazy(() =>
  import("./screens_en/TeacherSubjectEdit")
);
const TeacherSubjectAbout_en = lazy(() =>
  import("./screens_en/TeacherSubjectAbout")
);
const TeacherSubjectPay_en = lazy(() =>
  import("./screens_en/TeacherSubjectPay")
);
const Resume_en = lazy(() => import("./screens_en/Resume"));
const QuestionContinue_en = lazy(() => import("./screens_en/QuestionContinue"));
const Question1_en = lazy(() => import("./screens_en/Question1"));
const Question2primary_en = lazy(() => import("./screens_en/Question2primary"));
const Question2university_en = lazy(() =>
  import("./screens_en/Question2university")
);
const Question3Level_en = lazy(() => import("./screens_en/Question3Level"));
const Question3Subjects_en = lazy(() =>
  import("./screens_en/Question3Subjects")
);
const Question4_en = lazy(() => import("./screens_en/Question4"));
const Question5_en = lazy(() => import("./screens_en/Question5"));
const Question6_en = lazy(() => import("./screens_en/Question6"));
const Question7_en = lazy(() => import("./screens_en/Question7"));
const Question8_en = lazy(() => import("./screens_en/Question8"));
const Question9_en = lazy(() => import("./screens_en/Question9"));
const Question10_en = lazy(() => import("./screens_en/Question10"));
const Question_Thank_You_en = lazy(() =>
  import("./screens_en/Question_Thank_You")
);
const ApplicationSent_en = lazy(() => import("./screens_en/ApplicationSent"));

//Route Protection
const ProtectedAdmin = lazy(() => import("./ProtectedAdmin"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));
const ProtectedTwo = lazy(() => import("./ProtectedTwo"));
const ProtectedThree = lazy(() => import("./ProtectedThree"));
const ProtectedThreeEn = lazy(() => import("./ProtectedThreeEn"));
const ProtectedThreeLevel = lazy(() => import("./ProtectedThreeLevel"));
const ProtectedFour = lazy(() => import("./ProtectedFour"));
const ProtectedFourEn = lazy(() => import("./ProtectedFourEn"));
const ProtectedFive = lazy(() => import("./ProtectedFive"));
const ProtectedSix = lazy(() => import("./ProtectedSix"));
const ProtectedSeven = lazy(() => import("./ProtectedSeven"));
const ProtectedEight = lazy(() => import("./ProtectedEight"));
const ProtectedNine = lazy(() => import("./ProtectedNine"));
const ProtectedTen = lazy(() => import("./ProtectedTen"));
const ExcludePostLogin = lazy(() => import("./ExcludePostLogin"));
const ProtectedAllusers = lazy(() => import("./ProtectedAllusers"));
const ProtectedAllusersEn = lazy(() => import("./ProtectedAllusersEn"));
const ProtectedTeacher = lazy(() => import("./ProtectedTeacher"));
const ProtectedNotTeacher = lazy(() => import("./ProtectedNotTeacher"));
const BlockInactives = lazy(() => import("./BlockInactives"));
const ProtectedTaal = lazy(() => import("./ProtectedTaal"));
const ProtectedLanguage = lazy(() => import("./ProtectedLanguage"));

//Components

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, [pathname]);
    return null;
  }

  return (
    <Router>
      <ScrollToTop />
      <Suspense
        fallback={
          <div
            style={{
              backgroundColor: "#fff",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
              zIndex: "2500",
              alignItems: "center",
              display: "block",
            }}
          ></div>
        }
      >
        <Routes>
          {/* ADMIN */}
          <Route path="/admin/logout" element={<Alogout />} />
          <Route path="/admin/forgotpassword" element={<Aforgotpassword />} />
          <Route path="/admin/emailMessage" element={<AemailMessage />} />

          <Route path="/admin" element={<Admin />} />
          {/* ADMIN LOGGED IN */}
          <Route element={<ProtectedAdmin />}>
            <Route path="/admin/dashboard" element={<Adashboard />} />
            <Route path="/message" element={<Amessage />} />
            <Route path="/admin/users" element={<Ausers />} />
            <Route path="/admin/listings" element={<Alistings />} />
            <Route path="/admin/teachers" element={<Ateachers />} />
            <Route path="/admin/security" element={<Asecurity />} />
            <Route path="/admin/subjects" element={<Asubjects />} />
            <Route path="/adminusers/:email" element={<Aedituser />} />
            <Route path="/adminteacher/:teacherId" element={<Aeditteacher />} />
            <Route
              path="/adminteachercv/:teacherId"
              element={<Aeditteachercv />}
            />
            <Route path="/adminresume/:teacherId" element={<Aresume />} />
          </Route>

          {/* 1. USER NOT LOGGED IN */}
          <Route path="/question9/en" element={<Question9_en />} />
          <Route path="/" element={<Home />} />
          <Route path="/en" element={<Home_en />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/logout_en" element={<Logout_en />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPwd />} />
          <Route
            path="/resetpassword_en/:id/:token"
            element={<ResetPwd_en />}
          />
          <Route path="*" element={<Fourzerofour />} />
          {/* 2. BLOCK ENGLISH LANGUAGE VERSION */}
          <Route element={<ProtectedLanguage />}>
            <Route path="/tw" element={<Navigate to="/" replace />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route
              path="/termsAndConditions"
              element={<TermsAndConditions />}
            />
            <Route path="/security" element={<Security />} />
            <Route path="/becomeTutor" element={<BecomeTutor />} />
            <Route path="/findTutor" element={<FindTutor />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contactusconfirm" element={<ContactUsConfirm />} />

            <Route path="/emailMessage" element={<EmailMessage />} />
            {/* 3. BLOCK BLACKLISTED USERS */}

            <Route path="/searchlist" element={<SearchList />} />
            <Route path="/Ad_details/:slug" element={<Ad_details />} />
            <Route path="/step4" element={<Step4 />} />

            {/* 3. BLOCKED WHEN USER LOGGED IN */}
            <Route element={<ExcludePostLogin />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPwd />} />
            </Route>
            {/* 3. USERS LOGGED IN */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/securitysettings" element={<SecuritySettings />} />

              <Route path="/personal-details" element={<PersonalDetails />} />
              <Route
                path="/personal-details/:key"
                element={<PersonalDetails />}
              />

              {/* 4. BLOCK INCOMPLETE USERS */}
              <Route element={<ProtectedAllusers />}>
                {/* 5. BLOCK BLACKLISTED USERS */}

                <Route path="/question1" element={<Question1 />} />
                <Route
                  path="/question_continue"
                  element={<QuestionContinue />}
                />
                <Route
                  path="/question_thank_you"
                  element={<Question_Thank_You />}
                />
                <Route
                  path="/resumeCandidate/:nanoId"
                  element={<ResumeCandidate />}
                />
                <Route path="/listingManager" element={<ListingManager />} />
                <Route
                  path="/listingManager/:slug"
                  element={<ListingManager />}
                />

                <Route path="/listingEdit/:slug" element={<ListingEdit />} />
                <Route path="/teacherdatabase" element={<TeacherDb />} />
                <Route
                  path="/applicationsManager"
                  element={<ApplicationsManager />}
                />
                <Route path="/applicationsent" element={<ApplicationSent />} />
                {/* 6. BLOCK NOT TEACHER ACCESS */}
                <Route element={<ProtectedNotTeacher />}>
                  <Route path="/teacher_profile" element={<TeacherProfile />} />
                  <Route
                    path="/teacher_profile/:nanoId"
                    element={<TeacherProfile />}
                  />
                  <Route path="/teacher_cv" element={<TeacherCV />} />
                  <Route path="/resume/:teacherId" element={<Resume />} />
                </Route>
                {/* 6. BLOCK TEACHER REG */}
                <Route element={<ProtectedTeacher />}>
                  <Route path="/step1" element={<Step1 />} />
                  <Route path="/step2" element={<Step2 />} />
                  <Route path="/step3" element={<Step3 />} />
                </Route>
                {/* 6. BLOCK LISTING AD */}
                <Route element={<ProtectedTwo />}>
                  <Route
                    path="/question2primary"
                    element={<Question2primary />}
                  />
                  <Route
                    path="/question2university"
                    element={<Question2university />}
                  />
                </Route>
                <Route element={<ProtectedThree />}>
                  <Route
                    path="/question3Subjects"
                    element={<Question3Subjects />}
                  />
                </Route>
                <Route element={<ProtectedThreeLevel />}>
                  <Route path="/question3Level" element={<Question3Level />} />
                </Route>
                <Route element={<ProtectedFour />}>
                  <Route path="/question4" element={<Question4 />} />
                </Route>
                <Route element={<ProtectedFive />}>
                  <Route path="/question5" element={<Question5 />} />
                </Route>
                <Route element={<ProtectedSix />}>
                  <Route path="/question6" element={<Question6 />} />
                </Route>
                <Route element={<ProtectedSeven />}>
                  <Route path="/question7" element={<Question7 />} />
                </Route>
                <Route element={<ProtectedEight />}>
                  <Route path="/question8" element={<Question8 />} />
                </Route>
                <Route element={<ProtectedNine />}>
                  <Route path="/question9" element={<Question9 />} />
                </Route>
                <Route element={<ProtectedTen />}>
                  <Route path="/question10" element={<Question10 />} />
                </Route>
              </Route>
            </Route>
          </Route>
          {/* 2. BLOCK MANDARIN LANGUAGE VERSION */}
          <Route path="/calendar/en" element={<Calendar_en />} />
          <Route element={<ProtectedTaal />}>
            <Route path="/contact/en" element={<Contact_en />} />
            <Route
              path="/contactusconfirm/en"
              element={<ContactUsConfirm_en />}
            />

            <Route path="/emailMessage/en" element={<EmailMessage_en />} />
            {/* 3. BLOCK BLACKLISTED USERS */}

            <Route path="/searchlist/en" element={<SearchList_en />} />
            <Route path="/Ad_details_en/:slug" element={<Ad_details_en />} />

            <Route path="/step5/en" element={<Step5_en />} />

            {/* 3. BLOCKED WHEN USER LOGGED IN */}
            <Route element={<ExcludePostLogin />}>
              <Route path="/login/en" element={<Login_en />} />
              <Route path="/signup/en" element={<Signup_en />} />
              <Route path="/forgotpassword/en" element={<ForgotPwd_en />} />
            </Route>
            {/* 3. USERS LOGGED IN */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard/en" element={<Dashboard_en />} />

              <Route
                path="/securitysettings/en"
                element={<SecuritySettings_en />}
              />

              {/* 4. BLOCK BLACKLISTED USERS */}

              <Route
                path="/personal-details/en"
                element={<PersonalDetails_en />}
              />

              {/* 4. BLOCK INCOMPLETE USERS */}
              <Route element={<ProtectedAllusersEn />}>
                {/* 5. BLOCK BLACKLISTED USERS */}

                <Route
                  path="/listingManager/en"
                  element={<ListingManager_en />}
                />
                <Route
                  path="/resumeCandidate_en/:nanoId"
                  element={<ResumeCandidate_en />}
                />
                <Route path="/listingEdit/en" element={<ListingEdit_en />} />
                <Route
                  path="/listingEdit_en/:slug"
                  element={<ListingEdit_en />}
                />
                <Route path="/teacherdatabase/en" element={<TeacherDb_en />} />

                <Route
                  path="/question_continue/en"
                  element={<QuestionContinue_en />}
                />
                <Route
                  path="/question_thank_you/en"
                  element={<Question_Thank_You_en />}
                />
                <Route path="/question1/en" element={<Question1_en />} />
                <Route
                  path="/applicationsManager/en"
                  element={<ApplicationsManager_en />}
                />
                <Route
                  path="/applicationsent/en"
                  element={<ApplicationSent_en />}
                />

                {/* 6. BLOCK NOT TEACHER ACCESS */}
                <Route element={<ProtectedNotTeacher />}>
                  <Route
                    path="/teacher_profile/en"
                    element={<TeacherProfile_en />}
                  />
                  <Route
                    path="/teacher_profile/en/:nanoId"
                    element={<TeacherProfile_en />}
                  />
                  <Route
                    path="/mysubjects/en"
                    element={<TeacherSubjects_en />}
                  />
                  <Route
                    path="/selectsubjects/en"
                    element={<TeacherSubjectSelect_en />}
                  />
                  <Route
                    path="/aboutsubject/en"
                    element={<TeacherSubjectAbout_en />}
                  />
                  <Route
                    path="/paysubject/en"
                    element={<TeacherSubjectPay_en />}
                  />
                  <Route
                    path="/subjectEdit/:id"
                    element={<TeacherSubjectEdit_en />}
                  />

                  <Route path="/teacher_cv/en" element={<TeacherCV_en />} />
                  <Route path="/resume_en/:nanoId" element={<Resume_en />} />
                </Route>
                {/* 6. BLOCK TEACHER REG */}
                <Route element={<ProtectedTeacher />}>
                  <Route path="/step1/en" element={<Step1_en />} />
                  <Route path="/step2/en" element={<Step2_en />} />
                  <Route path="/step3/en" element={<Step3_en />} />
                  <Route path="/step4/en" element={<Step4_en />} />
                </Route>
                {/* 6. BLOCK LISTING AD */}
                <Route element={<ProtectedTwo />}>
                  <Route
                    path="/question2primary/en"
                    element={<Question2primary_en />}
                  />
                  <Route
                    path="/question2university/en"
                    element={<Question2university_en />}
                  />
                </Route>
                <Route element={<ProtectedThreeEn />}>
                  <Route
                    path="/question3Subjects/en"
                    element={<Question3Subjects_en />}
                  />
                </Route>
                <Route element={<ProtectedThreeLevel />}>
                  <Route
                    path="/question3Level/en"
                    element={<Question3Level_en />}
                  />
                </Route>
                <Route element={<ProtectedFourEn />}>
                  <Route path="/question4/en" element={<Question4_en />} />
                </Route>
                <Route element={<ProtectedFive />}>
                  <Route path="/question5/en" element={<Question5_en />} />
                </Route>
                <Route element={<ProtectedSix />}>
                  <Route path="/question6/en" element={<Question6_en />} />
                </Route>
                <Route element={<ProtectedSeven />}>
                  <Route path="/question7/en" element={<Question7_en />} />
                </Route>
                <Route element={<ProtectedEight />}>
                  <Route path="/question8/en" element={<Question8_en />} />
                </Route>
                <Route element={<ProtectedNine />}></Route>
                <Route element={<ProtectedTen />}>
                  <Route path="/question10/en" element={<Question10_en />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
