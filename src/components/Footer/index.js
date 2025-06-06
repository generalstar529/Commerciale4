import React from "react";
import "./index.css";
import { STRINGS } from "../../utils/strings";

const Footer = () => {
    return (
        <div className="footer row">
            <div className="col-md-4">
                <a className="normal" href="/terms">
                    {STRINGS.terms}
                </a>
            </div>
            <div className="col-md-4">
                <a className="normal" href="policy">
                    {STRINGS.policy}
                </a>
            </div>
            <div className="col-md-4">
                {STRINGS.contactUs}: <a href="mailto:info@commerciale.it">info@commerciale40.it</a>
            </div>
        </div>
    );
}

export default Footer;