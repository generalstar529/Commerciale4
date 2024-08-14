import React from "react";
import "./index.css";

export const Sidebar = (props) => {
  const state = {
    background: "#eee",
    offsetTop: 46,
    contentWidth: 50,
  };

  const offsetTop = props.offsetTop ? props.offsetTop : state.offsetTop;
  const contentWidth = props.contentWidth
    ? props.contentWidth
    : state.contentWidth;
  const background = props.background ? props.background : state.background;

  return (
    <div
      className={`sidebar ${props.isExpanded ? "expanded" : "normal"}`}
      style={{
        top: offsetTop,
        height: `calc(100vh - ${offsetTop}px)`,
      }}
    >
      <div
        style={{
          width: `${contentWidth}%`,
          background: background,
        }}
      >
        {props.children}
      </div>
      <div
        style={{ width: `${100 - contentWidth}%` }}
        onClick={props.handleCollapse}
      >
        {props.isCloseButton ? (
          <button className="secondary btn-close">
            <i className="fa fa-close" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
