import React, { useState } from "react";
import "./index.css";
import { stringWithUnitFromNumber } from "../../utils";
import { LangConsumer } from "../../utils/LanguageContext";
import { STRINGS } from "../../utils/strings";
import CompanyReadMore from "../CompanyReadMore";

const CompanyCell = ({ company, viewMode, handleClickProfile }) => {
  const [showReadMore, setShowReadMore] = useState(false);

  const spanDistance = React.createRef();
  const spanISO = React.createRef();
  const spanAddress = React.createRef();

  const handleClickClose = () => {
    setShowReadMore(false);
  };

  return (
    <div className={`company-cell row ${viewMode ? "list" : "grid"}`}>
      <div className={`logo col-xl-2 col-3`}>
        <img
          src={
            company.profile && company.profile.logo
              ? process.env.REACT_APP_AWS_PREFIX + company.profile.logo
              : "images/no-logo.jpg"
          }
          alt=""
        />
      </div>
      <div className="col-9 title pl-2">{company.profile.officialName}</div>
      <div
        className={`${
          viewMode ? "col-xl-10 col-md-9" : "col-md-12"
        } col-12 content`}
      >
        <h5>{company.profile.officialName}</h5>
        <div className="d-flex">
          <span className="address" ref={spanAddress}>
            <i className="fa fa-map-marker" />
            {company.profile.contact.address &&
            company.profile.contact.address.length &&
            company.profile.contact.address !== "null"
              ? company.profile.contact.address
              : company.profile.contact.city && company.profile.contact.region
              ? company.profile.contact.city +
                "," +
                company.profile.contact.region
              : "---"}
          </span>
          {/* <span ref={this.spanDistance} className="distance">
            <i className="fa fa-map-signs" />
            {company.distance ? `${parseFloat(company.distance / 1000).toFixed(2)} km` : "---"}
          </span> */}
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <span>
            <i className="fa fa-line-chart" />
            {stringWithUnitFromNumber(company.profile.revenues)}
          </span>
          <span>
            <i className="fa fa-users" />
            {stringWithUnitFromNumber(company.profile.employees)}
          </span>
          <span ref={spanISO}>
            {STRINGS.iso}: {company.profile.iso && company.profile.iso[0]}
          </span>
        </div>
        <hr />
        <div className="d-flex">
          <i className="fa fa-id-card-o pt-1" />
          <div className="intro">
            <LangConsumer>
              {(value) =>
                company.profile.introduction &&
                (value.lang === "en"
                  ? company.profile.introduction.en
                    ? company.profile.introduction.en
                    : company.profile.introduction.it
                  : company.profile.introduction.it
                  ? company.profile.introduction.it
                  : company.profile.introduction.en)
              }
            </LangConsumer>
          </div>
        </div>
        <hr />
        <div className="d-flex">
          <span>
            <i className="fa fa-tags" />
          </span>
          <div className="tags">
            <LangConsumer>
              {(value) =>
                company.profile.tags &&
                (value.lang === "en"
                  ? company.profile.tags.en &&
                    company.profile.tags.en.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))
                  : company.profile.tags.it &&
                    company.profile.tags.it.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    )))
              }
            </LangConsumer>
          </div>
        </div>
        <div className="d-flex justify-content-end pt-2">
          {company.account.permission === 2 ? (
            <button className="text-uppercase" onClick={handleClickProfile}>
              {STRINGS.profile}
            </button>
          ) : (
            <button
              className="text-uppercase read-more"
              onClick={() => setShowReadMore(true)}
            >
              {STRINGS.readMore}
            </button>
          )}
        </div>
      </div>
      {showReadMore && (
        <CompanyReadMore company={company} onClose={handleClickClose} />
      )}
    </div>
  );
}

export default CompanyCell;