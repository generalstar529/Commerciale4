import React, { useState } from "react";
import "./index.css";
import * as Validate from "../../utils/Validate";
import { Alert } from "react-bootstrap";
import { requestAPI } from "../../utils/api";
import { STRINGS } from "../../utils/strings";

const ResetPasswordPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [alertText, setAlertText] = useState(null);

    const refPassword = React.createRef();
    const refConfirm = React.createRef();

    const handleClickSave = async (e) => {
        let valid = Validate.checkPassword(refPassword.current.value);
        Validate.applyToInput(refPassword.current, valid.code);
        if (valid.code !== Validate.VALID) {
            setAlertText([{ langKey: "password" }, { validCode: valid.code }]);
            return;
        }

        valid = Validate.checkConfirmPassword(refPassword.current.value, refConfirm.current.value);

        Validate.applyToInput(refConfirm.current, valid.code);
        if (valid.code !== Validate.VALID) {
            setAlertText([{ validCode: valid.code }])
            return;
        }

        let response = await requestAPI(`/companies/${this.props.match.params.id}/password`, "POST", { password: refPassword.current.value });
        let result = await response.json();
        if (result.error) {
            setAlertText([{ langKey: result.error }]);
            return;
        }

        setIsSuccess(true);
        setAlertText([{ langKey: "passwordReset" }]);
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    };

    const successDiv = (
        <div>
            <Alert variant="success">{Validate.getAlertMsg(alertText)}</Alert>
        </div>
    );
    const failDiv = (
        <div>
            {alertText ? <Alert variant="danger">{Validate.getAlertMsg(alertText)}</Alert> : <div></div>}
            <div>
                <div className="text-center">
                    <i className="fa fa-lock" />
                </div>
                <div className="title text-center">{STRINGS.resetYourPassword}</div>
                <div className="text">{STRINGS.createPassword}</div>
                <div className="my-3 d-flex justify-content-center">
                    <input type="password" placeholder={STRINGS.newPassword} ref={refPassword} />
                </div>
                <div className="my-3 d-flex justify-content-center">
                    <input type="password" placeholder={STRINGS.confirmPassword} ref={refConfirm} />
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={handleClickSave.bind(this)}>{STRINGS.save}</button>
                </div>
            </div>
        </div>
    );
    
    return <div className="reset-password">{isSuccess ? successDiv : failDiv}</div>;
}

export default ResetPasswordPage;