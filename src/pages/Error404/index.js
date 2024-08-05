import React from "react";
import "./index.css";
import { STRINGS } from "../../utils/strings";

const Error404 = () => {
  return (
    <div className="except d-flex align-items-center justify-content-center">
      <div className="except-content text-center p-5">
        <p className="title">404</p>
        <p className="error">{STRINGS.pageNotFound}</p>
        <hr className="my-5" />
        <p className="check mb-3">{STRINGS.checkUrl}</p>
        <p className="click">
          {STRINGS.otherwise}, <a href="/">{STRINGS.clickHere}</a>{" "}
          {STRINGS.redirectHome}
        </p>
      </div>
    </div>
  );
};

export default Error404;
