import React, { Component } from "react";
import "./index.css";

export default class Sidebar extends Component {
    state = {
        background: "#eee",
        offsetTop: 46,
        contentWidth: 50,
    };

    render() {
        let offsetTop = this.props.offsetTop ? this.props.offsetTop : this.state.offsetTop;
        let contentWidth = this.props.contentWidth ? this.props.contentWidth : this.state.contentWidth;
        let background = this.props.background ? this.props.background : this.state.background;
        return (
            <div
                className={`sidebar ${this.props.isExpanded ? "expanded" : "normal"}`}
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
                    {this.props.children}
                </div>
                <div style={{ width: `${100 - contentWidth}%` }} onClick={this.props.handleCollapse}>
                    {this.props.isCloseButton ? (
                        <button className="secondary btn-close">
                            <i className="fa fa-close" />
                        </button>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        );
    }
}
