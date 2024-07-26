import React, { useEffect } from "react";
import "./index.css";
import LoginForm from "../../components/LoginForm";
import FilterForm from "../../components/FilterForm";
import { SESSION_LOGGED_COMPANY } from "../../utils";
// import SearchInput from "../../components/SearchInput";
import { STRINGS } from "../../utils/strings";
import { requestAPI } from "../../utils/api";

const LandingPage = () => {
    useEffect(async () => {
        await requestAPI("/init", "GET");
    }, []);

    const handleKeySearch = (key) => {
        sessionStorage.setItem("filter", JSON.stringify({ key: key }));
        window.location.href = "/dashboard";
    };

    const handleClickSearch = (filter) => {
        sessionStorage.setItem("filter", JSON.stringify(filter));
        window.location.href = "/dashboard";
    };

    const loggedUser = JSON.parse(sessionStorage.getItem(SESSION_LOGGED_COMPANY));

    return (
        <div className="landing">
            <div className="slide">
                <div className={`login-panel ${loggedUser ? "logged" : ""}`}>
                    <div>
                        <div className="my-form intro">
                            <span>COMMERCIALE4.0.COM</span> {STRINGS.intro1}
                            <p>{STRINGS.joinUs}</p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
                <div className={`search-panel ${loggedUser ? "logged" : ""}`}>
                    {/* <div className="search-bar">
                        <SearchInput handleSearch={this.handleKeySearch} />
                    </div> */}
                    <FilterForm handleSearch={handleClickSearch} />
                </div>
            </div>
            <div className="about">
                <div className="d-flex py-3">
                    <div>
                        <img src="images/profile.png" alt="" />
                    </div>
                    <div className="pl-4 pt-3">
                        <p className="title">{STRINGS.companyProfile}</p>
                        <p>{STRINGS.createCompanyProfile}</p>
                    </div>
                </div>
                <hr />
                <div className="d-flex py-3">
                    <div>
                        <img src="images/earth.png" alt="" />
                    </div>
                    <div className="pl-4 pt-3">
                        <p className="title">{STRINGS.advancedSearchSystem}</p>
                        <p>{STRINGS.makeDetailResearch}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;