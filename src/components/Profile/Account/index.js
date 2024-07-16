import React, { Component } from "react";
import "./index.css";
import * as Validate from "../../../utils/Validate";
import { Alert } from "react-bootstrap";
import { requestAPI } from "../../../utils/api";
import { SESSION_LOGGED_COMPANY, getAtecoStringWithCode, encrypt } from "../../../utils";
import SpinnerView from "../../SpinnerView";
import { STRINGS } from "../../../utils/strings";

export default class ProfileAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: props.company,
            passwordAlertData: null,
            emailAlertData: null,
            isProcessing: false,
        };

        this.refOldPassword = React.createRef();
        this.refNewPassword = React.createRef();
        this.refConfirmPassword = React.createRef();
        this.refNewEmail = React.createRef();
        this.refConfirmEmail = React.createRef();
        this.refInsertPassword = React.createRef();
        this.refOfficialName = React.createRef();
        this.refCity = React.createRef();
        this.refVat = React.createRef();
        this.refAteco = React.createRef();
        this.refPec = React.createRef();
    }

    setPasswordAlertData = (success, messages) => {
        this.setState({
            passwordAlertData: {
                variant: success ? "success" : "danger",
                messages: messages,
            },
        });
    };

    setEmailAlertData = (success, messages) => {
        this.setState({
            emailAlertData: {
                variant: success ? "success" : "danger",
                messages: messages,
            },
        });
    };

    validatePassword = () => {
        const oldPassword = encrypt(this.refOldPassword.current.value);
        if (oldPassword !== this.state.company.account.password) {
            Validate.applyToInput(this.refOldPassword.current, -1);
            this.setPasswordAlertData(0, [{ langKey: "passwordNotCorrect" }]);
            return false;
        } else {
            Validate.applyToInput(this.refOldPassword.current, Validate.VALID);
        }

        let valid = Validate.checkPassword(this.refNewPassword.current.value);
        Validate.applyToInput(this.refNewPassword.current, valid.code);
        if (valid.code !== Validate.VALID) {
            this.setPasswordAlertData(0, [{ langKey: "password" }, { validCode: valid.code }]);
            return false;
        }

        if (this.refNewPassword.current.value !== this.refConfirmPassword.current.value) {
            this.setPasswordAlertData(0, [{ langKey: "passwordNotMatch" }]);
            return false;
        }

        return true;
    };

    validateEmail = () => {
        let valid = Validate.checkEmail(this.refNewEmail.current.value);
        Validate.applyToInput(this.refNewEmail.current, valid.code);
        if (valid.code !== Validate.VALID) {
            this.setEmailAlertData(0, [{ langKey: "newEmail" }, { validCode: valid.code }]);
            return false;
        }

        if (this.refNewEmail.current.value !== this.refConfirmEmail.current.value) {
            this.setEmailAlertData(0, [{ langKey: "emailNotMatch" }]);
            return false;
        }

        let password = encrypt(this.refInsertPassword.current.value);
        if (this.state.company.account.password !== password) {
            Validate.applyToInput(this.refInsertPassword.current, -1);
            this.setEmailAlertData(0, [{ langKey: "passwordNotMatch" }]);
            return false;
        }

        return true;
    };

    handleClickChangePassword = async (e) => {
        if (!this.validatePassword()) {
            return;
        }

        this.setState({ isProcessing: true });
        let response = await requestAPI(`/companies/${this.state.company._id}/password`, "POST", { password: this.refNewPassword.current.value });
        let result = await response.json();
        this.setState({ isProcessing: false });
        if (result.error) {
            this.setPasswordAlertData(0, [{ langKey: result.error }]);
            return;
        }

        this.setState({ company: result });
        sessionStorage.setItem(SESSION_LOGGED_COMPANY, JSON.stringify(result));
        this.setPasswordAlertData(1, [{ langKey: "passwordChanged" }]);
    };

    handleClickChangeEmail = async (e) => {
        if (!this.validateEmail()) {
            return;
        }

        this.setState({ isProcessing: true });

        let response = await requestAPI(`/companies/${this.state.company._id}/email`, "POST", { email: this.refNewEmail.current.value });
        let result = await response.json();
        this.setState({ isProcessing: false });
        if (result.error) {
            this.setEmailAlertData(0, [{ langKey: result.error }]);
            return;
        }

        this.setState({ company: result });
        sessionStorage.setItem(SESSION_LOGGED_COMPANY, JSON.stringify(result));
        this.setEmailAlertData(1, [{ langKey: "emailChanged" }]);
    };

    handleClickDelete = async (e) => {
        const { company } = this.state;
        if (!company || !company.profile) {
            return;
        }
        let removePhotos = company.profile.product && company.profile.product.photos;
        removePhotos = [...removePhotos, company.profile.background, company.profile.logo];

        company.posts &&
            company.posts.forEach((post) => {
                removePhotos.push(post.photo);
            });

        if (window.confirm(STRINGS.wantToDelete)) {
            this.setState({ isProcessing: true });
            let response = await requestAPI(`/companies/${company._id}`, "DELETE", { photos: removePhotos });
            let result = await response.json();
            this.setState({ isProcessing: false });
            if (result.error) {
                alert(STRINGS[result.error]);
                return;
            }
            sessionStorage.clear();
            window.location.href = "/";
        }
    };

    handleFocusPasswordInput = () => {
        this.refOldPassword.current.style.border = this.refNewPassword.current.style.border = this.refConfirmPassword.current.style.border =
            "1px solid var(--colorBorder)";
        this.setState({ passwordAlertData: null });
    };

    handleFocusEmailInput = () => {
        this.refNewEmail.current.style.border = this.refConfirmEmail.current.style.border = this.refInsertPassword.current.style.border = "1px solid var(--colorBorder)";
        this.setState({ emailAlertData: null });
    };

    render() {
        const { company, passwordAlertData, emailAlertData, isProcessing } = this.state;
        const { tab } = this.props;

        const actionsPanel = (
            <div className={tab === 0 ? "d-block" : "d-none"}>
                <div>
                    {passwordAlertData && <Alert variant={passwordAlertData.variant}>{Validate.getAlertMsg(passwordAlertData.messages)}</Alert>}
                    <h6 className="text-uppercase p-3">{STRINGS.changePassword}</h6>
                    <div className="info-row">
                        <input type="password" placeholder={STRINGS.oldPassword} ref={this.refOldPassword} onFocus={this.handleFocusPasswordInput} />
                    </div>
                    <div className="info-row">
                        <input type="password" placeholder={STRINGS.newPassword} ref={this.refNewPassword} onFocus={this.handleFocusPasswordInput} />
                    </div>
                    <div className="info-row">
                        <input type="password" placeholder={STRINGS.confirmPassword} ref={this.refConfirmPassword} onFocus={this.handleFocusPasswordInput} />
                    </div>
                    <div className="info-row my-4">
                        <button
                            style={{
                                minWidth: 180,
                            }}
                            onClick={this.handleClickChangePassword}
                            className="text-uppercase"
                        >
                            {STRINGS.confirm}
                        </button>
                    </div>
                </div>
                <hr />
                <div>
                    {emailAlertData && <Alert variant={emailAlertData.variant}>{Validate.getAlertMsg(emailAlertData.messages)}</Alert>}
                    <h6 className="text-uppercase p-3">{STRINGS.changeAccountEmail}</h6>
                    <div className="info-row">
                        <input placeholder={STRINGS.newEmail} ref={this.refNewEmail} onFocus={this.handleFocusEmailInput} />
                    </div>
                    <div className="info-row">
                        <input placeholder={STRINGS.confirmEmail} ref={this.refConfirmEmail} onFocus={this.handleFocusEmailInput} />
                    </div>
                    <div className="info-row">
                        <input type="password" placeholder={STRINGS.insertPassword} ref={this.refInsertPassword} onFocus={this.handleFocusEmailInput} />
                    </div>
                    <div className="info-row my-4">
                        <button
                            style={{
                                minWidth: 180,
                            }}
                            onClick={this.handleClickChangeEmail}
                            className="text-uppercase"
                        >
                            {STRINGS.confirm}
                        </button>
                    </div>
                </div>
                <hr />
                <div>
                    <h6 className="text-uppercase p-3">{STRINGS.deleteProfile}</h6>
                    <div className="info-row px-5 text-secondary pb-3">{STRINGS.clickingDelete}</div>
                    <div className="info-row">
                        <button
                            style={{
                                minWidth: 180,
                                background: "#d33",
                            }}
                            onClick={this.handleClickDelete}
                            className="text-uppercase"
                        >
                            {STRINGS.deleteProfile}
                        </button>
                    </div>
                </div>
            </div>
        );

        const infoPanel = (
            <div className={`my-4 ${tab === 1 ? "d-block" : "d-none"}`}>
                <h6 className="text-center mb-4">{STRINGS.infoNotEditable}</h6>
                <div className="info-row">
                    <span>{STRINGS.officialName}:</span>
                    <input disabled ref={this.refOfficialName} defaultValue={company && company.profile && company.profile.officialName} />
                </div>
                <div className="info-row">
                    <span>{STRINGS.city}:</span>
                    <input
                        disabled
                        ref={this.refCity}
                        defaultValue={company && company.profile && company.profile && company.profile.contact && company.profile.contact.city}
                    />
                </div>
                <div className="info-row">
                    <span>{STRINGS.vatNumber}:</span>
                    <input disabled ref={this.refVat} value={company && company.profile && company.profile.vat} />
                </div>
                <div className="info-row">
                    <span>{STRINGS.atecoCode}:</span>
                    <input disabled ref={this.refAteco} value={company && company.profile && getAtecoStringWithCode(company.profile.ateco)} />
                </div>
                <div className="info-row">
                    <span>{STRINGS.pec}:</span>
                    <input disabled ref={this.refPec} value={company && company.profile && company.profile.pec} />
                </div>
            </div>
        );
        return (
            <div className="account-view">
                <div className="tab-body">
                    {actionsPanel}
                    {infoPanel}
                </div>
                {isProcessing && <SpinnerView />}
            </div>
        );
    }
}
