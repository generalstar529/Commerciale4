import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/Landing";
import RegisterPage from "./pages/Register";
import TermsAndConditions from "./pages/Terms";
import PrivacyPolicy from "./pages/Policy";
import Dashboard from "./pages/Dashboard";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import CompanyDetail from "./pages/CompanyDetail";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import { LangProvider } from "./utils/LanguageContext";
import { STRINGS } from "./utils/strings";
import { SESSION_LANG } from "./utils";
import ReactGA from "react-ga";

const App = () => {
  const [headerTransparent, setHeaderTransparent] = useState(false);
  const [headerAutoHide, setHeaderAutoHide] = useState(true);
  const [selectedLang, setSelectedLang] = useState(
    sessionStorage.getItem(SESSION_LANG)
  );
  const [needSearchBar, setNeedSearchBar] = useState(true);
  const [needFooter, setNeedFooter] = useState(true);

  const setLocalization = () => {
    let lang = sessionStorage.getItem(SESSION_LANG);
    if (!lang) {
      sessionStorage.setItem(SESSION_LANG, "it");
    }
    STRINGS.setLanguage(lang ? lang : "it");
  };

  useEffect(() => {
    ReactGA.initialize("UA-167422154-1");
    ReactGA.pageview(window.location.pathname);

    if (window.location.pathname === "/") {
      setHeaderTransparent(true);
    }
    if (window.location.pathname.search("/company/") !== -1) {
      setHeaderAutoHide(false);
      setNeedFooter(false);
    }
    if (window.location.pathname === "/user-edit") {
      setNeedFooter(false);
    }
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/forgot-password"
    ) {
      setNeedSearchBar(false);
      setNeedFooter(false);
      setHeaderTransparent(true);
    }
    setLocalization();
  }, []);

  const selectLang = (lang) => {
    setSelectedLang(lang);
    sessionStorage.setItem(SESSION_LANG, lang);
    setLocalization();
  };

  return (
    <div>
      <LangProvider value={{ lang: selectedLang }}>
        <Router>
          <Header
            needSearchBar={needSearchBar}
            isTransparent={headerTransparent}
            autoHide={headerAutoHide}
            onSelectedLang={selectLang}
          />
          <div className="body">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route path="/reset-password/:id" component={ResetPasswordPage} />
              <Route exact path="/terms" component={TermsAndConditions} />
              <Route exact path="/policy" component={PrivacyPolicy} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/company/:id" component={CompanyDetail} />
              <Route exact path="/user-edit" component={Profile} />
              <Route component={Error404} />
            </Switch>
          </div>
          {needFooter && <Footer />}
        </Router>
      </LangProvider>
    </div>
  );
};

export default App;
