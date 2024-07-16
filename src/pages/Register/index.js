import React, { Component } from "react";
import "./index.css";
import RegisterForm from "../../components/RegisterForm";
import { STRINGS } from "../../utils/strings";

export default class RegisterPage extends Component {
    render() {
        return (
            <div className="register-page">
                <div>
                    <div className="my-form intro">
                        {STRINGS.getLanguage() === "en" ? (
                            <p className="text-uppercase">
                                WELCOME TO THE <label>COMMERCIALE4.0</label> COMMUNITY!
                            </p>
                        ) : (
                            <p className="text-uppercase">
                                Benvenuto nella community di <label>Commerciale4.0!</label>
                            </p>
                        )}

                        {STRINGS.stepHint}
                    </div>

                    <RegisterForm />
                </div>
            </div>
        );
    }
}
