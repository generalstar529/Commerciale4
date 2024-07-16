import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Dashboard from "./admin/pages/dashboard";
import Pending from "./admin/pages/pending";
import Verified from "./admin/pages/verified";
import Account from "./admin/pages/account";
import SideBar from "./admin/components/Sidebar";
import Header from "./admin/components/Header";
import Login from "./admin/pages/login";
import "./Admin.css";
import { SESSION_ADMIN } from "./utils";

function Admin() {
    let isSession = sessionStorage.getItem(SESSION_ADMIN);
    return (
        <div className="admin-panel">
            {isSession ? (
                <div className="d-flex">
                    <BrowserRouter>
                        <div className="left-panel">
                            <SideBar />
                        </div>
                        <div className="right-panel">
                            <Header />
                            <Switch>
                                {/* <Route exact path="/admin/dashboard" component={Dashboard} /> */}
                                <Route exact path="/admin" component={Pending} />
                                <Route exact path="/admin/verified" component={Verified} />
                                <Route exact path="/admin/account" component={Account} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default Admin;
