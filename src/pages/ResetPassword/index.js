import React, { Component } from "react";
import "./index.css";
import * as Validate from "../../utils/Validate";
import { Alert } from "react-bootstrap";
import { requestAPI } from "../../utils/api";
import { STRINGS } from "../../utils/strings";

export default class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSuccess: false,
            alertText: null,
        };

        this.refPassword = React.createRef();
        this.refConfirm = React.createRef();
    }

    handleClickSave = async (e) => {
        let valid = Validate.checkPassword(this.refPassword.current.value);
        Validate.applyToInput(this.refPassword.current, valid.code);
        if (valid.code !== Validate.VALID) {
            this.setState({ alertText: [{ langKey: "password" }, { validCode: valid.code }] });
            return;
        }

        valid = Validate.checkConfirmPassword(this.refPassword.current.value, this.refConfirm.current.value);

        Validate.applyToInput(this.refConfirm.current, valid.code);
        if (valid.code !== Validate.VALID) {
            this.setState({ alertText: [{ validCode: valid.code }] });
            return;
        }

        this.setState({ isProcessing: true });
        let response = await requestAPI(`/companies/${this.props.match.params.id}/password`, "POST", { password: this.refPassword.current.value });
        let result = await response.json();
        this.setState({ isProcessing: false });
        if (result.error) {
            this.setState({ alertText: [{ langKey: result.error }] });
            return;
        }

        this.setState({ isSuccess: true, alertText: [{ langKey: "passwordReset" }] });
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    };

    render() {
        const { isSuccess, alertText } = this.state;
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
                        <input type="password" placeholder={STRINGS.newPassword} ref={this.refPassword} />
                    </div>
                    <div className="my-3 d-flex justify-content-center">
                        <input type="password" placeholder={STRINGS.confirmPassword} ref={this.refConfirm} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button onClick={this.handleClickSave.bind(this)}>{STRINGS.save}</button>
                    </div>
                </div>
            </div>
        );
        return <div className="reset-password">{isSuccess ? successDiv : failDiv}</div>;
    }
}
