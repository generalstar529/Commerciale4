import React from "react";
import "./index.css";
import { Spinner } from "react-bootstrap";

export const SpinnerView = () => {
  return (
    <div className="spinner-view">
      <Spinner animation="border" />
    </div>
  );
};
