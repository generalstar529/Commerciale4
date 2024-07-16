import React, { Component } from "react";
import "./index.css";
import { STRINGS } from "../../utils/strings";

export default class CompanyReadMore extends Component {
    render() {
        const { company, onClose } = this.props;
        let lang = sessionStorage.lang ? sessionStorage.lang : "en";

        return (
            <div className="company-read-more">
                <div className="-content">
                    <button className="secondary round no-min" onClick={onClose}>
                        <i className="fa fa-close pr-0" />
                    </button>
                    <h4 style={{ paddingRight: 32 }}>{company.profile.officialName}</h4>
                    <div className="py-2 font-16" style={{ fontWeight: 500 }}>
                        <i className="fa fa-map-marker pr-2" />{" "}
                        {company.profile.contact.address && company.profile.contact.address.length && company.profile.contact.address !== "null"
                            ? company.profile.contact.address
                            : "---"}
                    </div>
                    <div className="py-2 font-15">
                        <b>{STRINGS.ateco}:</b> {company.profile.ateco}
                    </div>
                    <div className="py-2 font-15">
                        {company.profile.introduction &&
                            (lang === "en"
                                ? company.profile.introduction.en
                                    ? company.profile.introduction.en
                                    : company.profile.introduction.it
                                : company.profile.introduction.it
                                ? company.profile.introduction.it
                                : company.profile.introduction.en)}
                    </div>
                </div>
            </div>
        );
    }
}
