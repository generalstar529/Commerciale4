import React, { Component } from "react";
import "./index.css";
import { getHttpUrl } from "../../../utils";
import { STRINGS } from "../../../utils/strings";

export default class DetailHeader extends Component {
    render() {
        const { profile } = this.props;
        const prefix = process.env.REACT_APP_AWS_PREFIX;

        return (
            <div className="detail-header shadow-box">
                <img className="background" src={`${profile && profile.background ? prefix + profile.background : "/images/no-cover.jpg"}`} alt="" />
                <div className="title-bar">
                    <img className="logo" src={`${profile && profile.logo ? prefix + profile.logo : "/images/no-logo.jpg"}`} alt="" />
                    <div className="official-name">
                        <h5>{profile && profile.officialName}</h5>
                        <span>
                            <i className="fa fa-map-marker pr-2" />
                            {profile &&
                                (profile.contact.address && profile.contact.address.length
                                    ? profile.contact.address
                                    : profile.contact.city + ", " + profile.contact.region)}
                        </span>
                    </div>
                    <button>
                        <a href={profile && getHttpUrl(profile.contact.website)} target="blank">
                            {STRINGS.officialWebsite}
                        </a>
                    </button>
                </div>
            </div>
        );
    }
}
