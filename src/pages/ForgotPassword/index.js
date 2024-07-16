import React, { Component } from "react";
import "./index.css";
import * as Validate from "../../utils/Validate";
import { Alert } from "react-bootstrap";
import { requestAPI } from "../../utils/api";
import { STRINGS } from "../../utils/strings";
import SpinnerView from "../../components/SpinnerView";

export default class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alertData: null,
            isProgressing: false,
        };

        this.refEmail = React.createRef();
    }

    handleClickDone = async (e) => {
        let valid = Validate.checkEmail(this.refEmail.current.value);
        Validate.applyToInput(this.refEmail.current, valid.code);
        if (valid.code !== Validate.VALID) {
            this.setState({
                alertData: { variant: "danger", messages: [{ langKey: "emailAddress" }, { validCode: valid.code }] },
            });
            return false;
        }

        this.setState({ isProgressing: true });
        let response = await requestAPI(`/companies/auth/forgot-password/${this.refEmail.current.value}`, "GET");
        let result = await response.json();
        this.setState({ isProgressing: false });
        if (result.error) {
            this.setState({ alertData: { variant: "danger", messages: [{ langKey: result.error }] } });
            return;
        }
        this.setState({ alertData: { variant: "success", messages: [{ langKey: "sentResetPassword" }] } });
    };

    render() {
        const { alertData, isProcessing } = this.state;
        return (
            <div className="forgot-password">
                {alertData ? <Alert variant={alertData.variant}>{Validate.getAlertMsg(alertData.messages)}</Alert> : <div></div>}
                <div className="text-center">
                    <i className="fa fa-lock" />
                </div>
                <div className="title text-center">{STRINGS.forgotPassword}</div>
                <div className="text">{STRINGS.forgotPasswordMsg}</div>
                <div className="my-3 d-flex justify-content-center">
                    <input type="text" name="email" placeholder="Email" ref={this.refEmail} />
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={this.handleClickDone.bind(this)}>{STRINGS.sendEmail}</button>
                </div>
                {isProcessing && <SpinnerView />}
            </div>
        );
    }
}
