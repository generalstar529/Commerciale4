import React, { Component } from "react";
import "./index.css";
import { Row, Col, Alert } from "react-bootstrap";

import { REGIONS, citiesByAsc, encrypt } from "../../utils";

import * as Validate from "../../utils/Validate";

import MySelect from "../Custom/MySelect";
import { requestAPI, geocodeByAddress } from "../../utils/api";
import SpinnerView from "../SpinnerView";
import { STRINGS } from "../../utils/strings";

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            selectedCity: null,
            selectedCode: null,
            checkValidCity: false,
            checkValidCode: false,
            alertData: null,
            policyChecked: false,
            isProcessing: false,
            cities: citiesByAsc(),
        };

        this.refName = React.createRef();
        this.refVAT = React.createRef();
        this.refPEC = React.createRef();
        this.refEmail = React.createRef();
        this.refPassword = React.createRef();
        this.refConfirm = React.createRef();
    }

    componentWillReceiveProps = (props) => {
        let atecoCodes = STRINGS.atecoList;
        atecoCodes.forEach((elem) => {
            if (this.state.selectedCode && elem.value === this.state.selectedCode.value) {
                this.setState({ selectedCode: elem });
            }
        });
    };

    setAlertData = (success, messages) => {
        this.setState({
            alertData: {
                variant: success ? "success" : "danger",
                messages: messages,
            },
        });
    };

    // setAlertData = (success, text) => {
    //     this.setState({
    //         alertData: {
    //             variant: success ? "success" : "danger",
    //             text: text,
    //         },
    //     });
    // };

    validateStepOne = () => {
        let valid = Validate.checkEmpty(this.refName.current.value);
        Validate.applyToInput(this.refName.current, valid.code);
        if (valid.code !== Validate.VALID) {
            // this.setAlertData(0, STRINGS.officialName + valid.msg);
            this.setAlertData(0, [{ langKey: "officialName" }, { validCode: valid.code }]);
            return false;
        }

        if (!this.state.selectedCity) {
            this.setState({
                checkValidCity: true,
            });
            // this.setAlertData(0, STRINGS.pleaseSelectCity);
            this.setAlertData(0, [{ langKey: "pleaseSelectCity" }]);
            return false;
        }

        valid = Validate.checkVAT(this.refVAT.current.value);
        Validate.applyToInput(this.refVAT.current, valid.code);
        if (valid.code !== Validate.VALID) {
            // this.setAlertData(0, STRINGS.vatNumber + valid.msg);
            this.setAlertData(0, [{ langKey: "vatNumber" }, { validCode: valid.code }]);
            return false;
        }

        if (!this.state.selectedCode) {
            this.setState({
                checkValidCode: true,
            });
            // this.setAlertData(0, STRINGS.pleaseSelectAteco);
            this.setAlertData(0, [{ langKey: "pleaseSelectAteco" }]);
            return false;
        }

        valid = Validate.checkEmail(this.refPEC.current.value);
        Validate.applyToInput(this.refPEC.current, valid.code);
        if (valid.code !== Validate.VALID) {
            // this.setAlertData(0, STRINGS.pec + valid.msg);
            this.setAlertData(0, [{ langKey: "pec" }, { validCode: valid.code }]);
            return false;
        }

        return true;
    };

    validateStepTwo = () => {
        let valid = Validate.checkEmail(this.refEmail.current.value);
        Validate.applyToInput(this.refEmail.current, valid.code);
        if (valid.code !== Validate.VALID) {
            // this.setAlertData(0, STRINGS.emailAddress + valid.msg);
            this.setAlertData(0, [{ langKey: "emailAddress" }, { validCode: valid.code }]);
            return false;
        }

        valid = Validate.checkPassword(this.refPassword.current.value);
        Validate.applyToInput(this.refPassword.current, valid.code);
        if (valid.code !== Validate.VALID) {
            // this.setAlertData(0, STRINGS.password + valid.msg);
            this.setAlertData(0, [{ langKey: "password" }, { validCode: valid.code }]);
            return false;
        }

        valid = Validate.checkConfirmPassword(this.refPassword.current.value, this.refConfirm.current.value);
        Validate.applyToInput(this.refConfirm.current, valid.code);
        if (valid.code !== Validate.VALID) {
            // this.setAlertData(0, valid.msg);
            this.setAlertData(0, [{ validCode: valid.code }]);
            return false;
        }

        if (!this.state.policyChecked) {
            // this.setAlertData(0, STRINGS.pleaseCheckPrivacy);
            this.setAlertData(0, [{ langKey: "pleaseCheckPrivacy" }]);
            return false;
        }

        return true;
    };

    handleCityChange = (selectedCity) => {
        this.setState({ selectedCity });
    };

    handleCodeChange = (selectedCode) => {
        this.setState({ selectedCode });
    };

    handleClickNext = (e) => {
        e.preventDefault();
        this.setState({
            alertData: null,
        });

        if (this.validateStepOne()) {
            this.setState({
                step: 2,
            });

            this.refEmail.current.style.border = 0;
            this.refPassword.current.style.border = 0;
            this.refConfirm.current.style.border = 0;
        }
    };

    handleClickBack = (e) => {
        e.preventDefault();
        this.setState({
            alertData: null,
            checkValidCity: false,
            checkValidCode: false,
        });

        this.setState({
            step: 1,
        });
    };

    handleClickDone = async (e) => {
        e.preventDefault();
        if (!this.validateStepTwo()) {
            return;
        }

        this.setState({ isProcessing: true });

        let region = REGIONS.find((elem) => elem.value === this.state.selectedCity.region);
        region = region ? region.label : "";
        let latitude = 0.0;
        let longitude = 0.0;
        await geocodeByAddress(`${this.state.selectedCity.label}, ${region}`).then((res) => {
            if (res) {
                latitude = res.lat;
                longitude = res.lng;
            }
        });

        let data = {
            account: {
                email: this.refEmail.current.value,
                password: encrypt(this.refPassword.current.value),
            },
            profile: {
                officialName: this.refName.current.value,
                vat: this.refVAT.current.value,
                ateco: this.state.selectedCode.value,
                pec: this.refPEC.current.value,
                contact: {
                    region: region,
                    city: this.state.selectedCity.label,
                    location: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                },
            },
        };

        let response = await requestAPI("/companies/auth/register", "POST", data);
        let result = await response.json();
        // console.log(result);
        if (result.error) {
            this.setAlertData(0, [{ langKey: result.error }]);
            this.setState({ isProcessing: false });
            return;
        }

        response = await requestAPI(`/companies/auth/email-to-user/${this.refPEC.current.value}`, "GET");
        result = await response.json();
        // console.log(result);
        if (result.error) {
            this.setAlertData(0, [{ langKey: result.error }]);
            this.setState({ isProcessing: false });
            return;
        }

        response = await requestAPI("/companies/auth/email-to-admin", "POST", data);
        result = await response.json();
        // console.log(result);
        if (result.error) {
            this.setAlertData(0, [{ langKey: result.error }]);
            this.setState({ isProcessing: false });
            return;
        }

        this.setState({ step: 3, isProcessing: false });
        this.setAlertData(1, [{ langKey: "sentEmail" }, ` ${data.pec} `, { langKey: "toVerifyYourAccount" }]);
    };

    handleCheck(e) {
        this.setState({
            policyChecked: e.target.checked,
        });
    }

    handleClickGoHome() {
        window.location.href = "/";
    }

    render() {
        const { step, selectedCity, selectedCode, checkValidCity, checkValidCode, alertData, isProcessing, cities } = this.state;

        const stepOne = (
            <div
                style={{
                    display: step === 2 ? "none" : "block",
                }}
            >
                <span className="title text-center">{STRINGS.step} 1/2</span>
                <Row className="justify-content-center mb-3">
                    <Col md={6}>
                        <input type="text" name="officialName" placeholder={STRINGS.officialName} ref={this.refName} />
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col md={6}>
                        <MySelect value={selectedCity} onChange={this.handleCityChange} options={cities} placeholder={STRINGS.city} checkValid={checkValidCity} />
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col md={6}>
                        <input type="text" name="vatNumber" placeholder={STRINGS.vatNumber} ref={this.refVAT} />
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col md={6}>
                        <MySelect
                            value={selectedCode}
                            onChange={this.handleCodeChange}
                            options={STRINGS.atecoList}
                            placeholder={STRINGS.atecoCode}
                            checkValid={checkValidCode}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={{ span: 6, offset: 3 }}>
                        <input type="text" name="vatNumber" placeholder={STRINGS.pec} ref={this.refPEC} />
                    </Col>
                    <Col md={3} className="info-hint">
                        <i className="fa fa-info-circle pr-1" />
                        {STRINGS.pecHint}
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col sm={3} xs={12}>
                        <button className="txt-upper w-100" onClick={this.handleClickNext}>
                            {STRINGS.nextStep}
                        </button>
                    </Col>
                </Row>
            </div>
        );

        const stepTwo = (
            <div
                style={{
                    display: step === 1 ? "none" : "block",
                }}
            >
                <button className="back" onClick={this.handleClickBack}>
                    <i className="fa fa-angle-left" />
                </button>
                <span className="title text-center">{STRINGS.step} 2/2</span>
                <Row className="mb-3">
                    <Col md={{ span: 6, offset: 3 }}>
                        <input type="text" name="email" placeholder={STRINGS.emailAddress} ref={this.refEmail} />
                    </Col>
                    <Col md={3} className="info-hint">
                        <i className="fa fa-info-circle pr-1" />
                        {STRINGS.emailHint}
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col md={6}>
                        <input type="password" name="password" placeholder={STRINGS.password} ref={this.refPassword} />
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col md={6}>
                        <input type="password" placeholder={STRINGS.confirmPassword} ref={this.refConfirm} />
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col md={6}>
                        <input id="rememberme" type="checkbox" name="remember-me" className="input-checkbox" onClick={(e) => this.handleCheck(e)} />
                        <label className="label-checkbox" htmlFor="rememberme">
                            {STRINGS.registerHint}
                        </label>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col md={5}>
                        <button className="txt-upper w-100" onClick={this.handleClickDone}>
                            {STRINGS.completeRegistration}
                        </button>
                    </Col>
                </Row>
                <div className="text-center mb-3">{STRINGS.completeHint}</div>
            </div>
        );

        const stepThree = (
            <div className="d-flex justify-content-center">
                <button onClick={() => this.handleClickGoHome()}>{STRINGS.goToHome}</button>
            </div>
        );

        return (
            <div className="my-form register-form">
                {alertData && <Alert variant={alertData.variant}>{Validate.getAlertMsg(alertData.messages)}</Alert>}

                {step < 3 ? (
                    <div>
                        {stepOne}
                        {stepTwo}
                    </div>
                ) : (
                    stepThree
                )}
                {isProcessing && <SpinnerView />}
            </div>
        );
    }
}
