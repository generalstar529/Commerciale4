import React, { useState } from "react";
import "./index.css";
import { requestAPI } from "../../utils/api";
import { SESSION_LOGGED_COMPANY } from "../../utils";
import * as Validate from "../../utils/Validate";
import { Alert } from "react-bootstrap";
import SpinnerView from "../SpinnerView";
import { STRINGS } from "../../utils/strings";

const LoginForm = () => {
    const [remember, setRemember] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const refEmail = React.createRef();
    const refPassword = React.createRef();

    const validate = () => {
        let valid = Validate.checkEmail(this.refEmail.current.value);
        if (valid.code !== Validate.VALID) {
            alert(STRINGS.emailAddress + valid.msg);
            return false;
        }

        return true;
    };

    const handleClickLogin = async (e) => {
        if (!validate()) {
            return;
        }

        setIsProcessing(true);
        let response = await requestAPI("/companies/auth/login", "POST", {
            email: this.refEmail.current.value,
            password: this.refPassword.current.value,
        });
        let result = await response.json();
        setIsProcessing(false);
        if (result.error) {
            alert(STRINGS[result.error]);
            return;
        }

        sessionStorage.setItem(SESSION_LOGGED_COMPANY, JSON.stringify(result));
        window.location.href = "/";
    };

    const handleClickSignup = (e) => {
        window.location.href = "/register";
    };

    const handleClickRemember = (e) => {
        setRemember(!remember);
    };

    const bottomPanelSM = (
        <div className="bottom-panel-sm">
            <div className="mx-auto w-25 mt-4">
                <button className="txt-upper" onClick={handleClickLogin}>
                    {STRINGS.login}
                </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-5">
                <a href="/forgot-password" className="">
                    {STRINGS.forgotPassword}
                </a>
                <button className="txt-upper" onClick={handleClickSignup}>
                    {STRINGS.register}
                </button>
            </div>
        </div>
    );

    const bottomPanelXS = (
        <div className="bottom-panel-xs">
            <div className="d-flex justify-content-center">
                <a href="/forgot-password" className="">
                    {STRINGS.forgotPassword}
                </a>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <input id="rememberme" type="checkbox" name="remember-me" className="input-checkbox" />
                <label className="label-checkbox" htmlFor="rememberme" onClick={handleClickRemember}>
                    {STRINGS.rememberMe}
                </label>
            </div>
            <button className="txt-upper w-100 mt-4" onClick={handleClickLogin}>
                {STRINGS.login}
            </button>
        </div>
    );

    return (
        <div className="my-form login-form">
            {alertData ? <Alert variant={alertData.variant}>{alertData.text}</Alert> : <div></div>}
            <span className="title text-center mt-4">{STRINGS.login}</span>
            <div className="input-row">
                <div className="mx-auto">
                    <img src="images/login/username.png" alt="" />
                    <input type="text" name="email" id="email" placeholder={STRINGS.email} ref={refEmail} />
                </div>
            </div>
            <div className="input-row">
                <div className="mx-auto">
                    <img src="images/login/pass.png" alt="" />
                    <input type="password" name="pwd" id="password" placeholder={STRINGS.password} ref={refPassword} autoComplete="new-password" />
                </div>
            </div>
            {bottomPanelSM}
            {bottomPanelXS}
            {isProcessing && <SpinnerView />}
        </div>
    );
}

export default LoginForm;
