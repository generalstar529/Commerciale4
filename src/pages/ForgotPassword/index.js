import React, { useState } from "react";
import "./index.css";
import * as Validate from "../../utils/Validate";
import { Alert } from "react-bootstrap";
import { requestAPI } from "../../utils/api";
import { STRINGS } from "../../utils/strings";
import SpinnerView from "../../components/SpinnerView";

const ForgotPasswordPage = () => {
    const [alertData, setAlertData] = useState(null);
    const [isProgressing, setIsProgressing] = useState(false);

    const refEmail = React.createRef();

    const handleClickDone = async (e) => {
        let valid = Validate.checkEmail(refEmail.current.value);
        Validate.applyToInput(refEmail.current, valid.code);
        if (valid.code !== Validate.VALID) {
            setAlertData({ variant: "danger", messages: [{ langKey: "emailAddress" }, { validCode: valid.code }] });
            return false;
        }

        setIsProgressing(true);
        let response = await requestAPI(`/companies/auth/forgot-password/${refEmail.current.value}`, "GET");
        let result = await response.json();
        setIsProgressing(false);
        if (result.error) {
            setAlertData({ variant: "danger", messages: [{ langKey: result.error }] });
            return;
        }
        setAlertData({ variant: "success", messages: [{ langKey: "sentResetPassword" }] });
    };

    return (
        <div className="forgot-password">
            {alertData ? <Alert variant={alertData.variant}>{Validate.getAlertMsg(alertData.messages)}</Alert> : <div></div>}
            <div className="text-center">
                <i className="fa fa-lock" />
            </div>
            <div className="title text-center">{STRINGS.forgotPassword}</div>
            <div className="text">{STRINGS.forgotPasswordMsg}</div>
            <div className="my-3 d-flex justify-content-center">
                <input type="text" name="email" placeholder="Email" ref={refEmail} />
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={handleClickDone.bind(this)}>{STRINGS.sendEmail}</button>
            </div>
            {isProgressing && <SpinnerView />}
        </div>
    );
}

export default ForgotPasswordPage;