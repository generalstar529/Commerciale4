import React, { Component } from "react";
import "./index.css";
import { STRINGS } from "../../utils/strings";

export default class Error404 extends Component {
    render() {
        return (
            <div className="except d-flex align-items-center justify-content-center">
                <div className="except-content text-center p-5">
                    <p className="title">404</p>
                    <p className="error">{STRINGS.pageNotFound}</p>
                    <hr className="my-5" />
                    <p className="check mb-3">{STRINGS.checkUrl}</p>
                    <p className="click">
                        {STRINGS.otherwise}, <a href="/">{STRINGS.clickHere}</a> {STRINGS.redirectHome}
                    </p>
                </div>
            </div>
        );
    }
}
