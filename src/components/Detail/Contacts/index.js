import React, { Component } from "react";
import "./index.css";
import { LangConsumer } from "../../../utils/LanguageContext";
import { STRINGS } from "../../../utils/strings";
import { getHttpUrl } from "../../../utils";

export default class DetailContacts extends Component {
    render() {
        const { profile } = this.props;
        return (
            <div className="detail-contacts">
                <div className="top-info">
                    <div className="pb-2">
                        <span className="pr-3">
                            <b>{STRINGS.iso}</b>
                        </span>

                        {profile &&
                            profile.iso &&
                            profile.iso.map((item, index) => (
                                <span key={index} className="pr-3" style={{ textDecoration: "underline" }}>
                                    {item}
                                </span>
                            ))}
                    </div>
                    <div className="d-flex mb-2">
                        <i className="fa fa-tags font-18 pr-4 mt-2" />
                        <div>
                            <LangConsumer>
                                {(value) =>
                                    profile &&
                                    (value.lang === "en"
                                        ? profile.tags.en &&
                                          profile.tags.en.map((tag, index) => (
                                              <span className="tag" key={index}>
                                                  {tag}
                                              </span>
                                          ))
                                        : profile.tags.it &&
                                          profile.tags.it.map((tag, index) => (
                                              <span className="tag" key={index}>
                                                  {tag}
                                              </span>
                                          )))
                                }
                            </LangConsumer>
                        </div>
                    </div>
                </div>
                <hr />
                <h5 className="pt-4 text-dark-light text-uppercase text-center">{STRINGS.contacts}</h5>
                <div className="contact-info">
                    <div>
                        <div className="d-flex align-items-center py-2">
                            <label className="text-dark-light">{STRINGS.address} : </label>
                            <span className="info">{profile && profile.contact.address}</span>
                        </div>
                        <div className="d-flex align-items-center py-2">
                            <label className="text-dark-light">{STRINGS.phone} : </label>
                            <span className="info">{profile && profile.contact.phone}</span>
                        </div>
                        <div className="d-flex align-items-center py-2">
                            <label className="text-dark-light">{STRINGS.website} : </label>
                            <span className="info">
                                <a href={profile && getHttpUrl(profile.contact.website)} className="text-primary" target="blank">
                                    {profile && profile.contact.website}
                                </a>
                            </span>
                        </div>
                        <div className="d-flex align-items-center py-2">
                            <label className="text-dark-light">{STRINGS.email} : </label>
                            <span className="info">{profile && profile.contact.email}</span>
                        </div>
                        <div className="d-flex align-items-center py-2">
                            <label className="text-dark-light">{STRINGS.secondEmail} : </label>
                            <span className="info">{profile && profile.contact.email2nd}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
