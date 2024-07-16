import React, { Component } from "react";
import "./index.css";
import { STRINGS } from "../../utils/strings";
import { LangConsumer } from "../../utils/LanguageContext";

export default class PostItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMobile: false,
            // preview: false
        };
    }

    componentDidMount = () => {
        this.handleWindowResize();
        window.addEventListener("resize", this.handleWindowResize);
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.handleWindowResize);
    };

    handleWindowResize = () => {
        this.setState({ isMobile: window.innerWidth <= 576 });
    };

    getPublished(date) {
        let date_ob = new Date(date);
        let day = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        return day + "/" + month + "/" + year;
    }

    render() {
        const { isMobile } = this.state;
        const { data, handleDelete, bg } = this.props;

        const imagePanel = data.photo && (
            // <div className="image-panel">
            <img src={process.env.REACT_APP_AWS_PREFIX + data.photo} alt="" />
            // </div>
        );
        const btnDelete = handleDelete && (
            <button onClick={handleDelete}>
                <i className="fa fa-close" />
            </button>
        );

        const contentPanel = isMobile ? (
            <div>
                {btnDelete}

                <div className="d-flex align-items-center">
                    {imagePanel}
                    <LangConsumer>
                        {(context) => (
                            <p className="text-uppercase text-bold text-dark-light">
                                {data.title && (context.lang === "en" ? (data.title.en ? data.title.en : data.title.it) : data.title.it ? data.title.it : data.title.en)}
                            </p>
                        )}
                    </LangConsumer>
                </div>
                <LangConsumer>
                    {(context) => (
                        <p className="mt-2 text-gray">
                            {data.description &&
                                (context.lang === "en"
                                    ? data.description.en
                                        ? data.description.en
                                        : data.description.it
                                    : data.description.it
                                    ? data.description.it
                                    : data.description.en)}
                        </p>
                    )}
                </LangConsumer>

                <p className="publish-date">
                    {STRINGS.publishedOn} {this.getPublished(data.id)}
                </p>
            </div>
        ) : (
            <div className="content-panel">
                {btnDelete}
                <LangConsumer>
                    {(context) => (
                        <div>
                            <p className="text-uppercase text-bold text-dark-light">
                                {data.title && (context.lang === "en" ? (data.title.en ? data.title.en : data.title.it) : data.title.it ? data.title.it : data.title.en)}
                            </p>
                            <p className="text-gray">
                                {data.description &&
                                    (context.lang === "en"
                                        ? data.description.en
                                            ? data.description.en
                                            : data.description.it
                                        : data.description.it
                                        ? data.description.it
                                        : data.description.en)}
                            </p>
                        </div>
                    )}
                </LangConsumer>
                <p className="publish-date">
                    {STRINGS.publishedOn} {this.getPublished(data.id)}
                </p>
            </div>
        );
        return (
            <div>
                <div className="post-item" style={{ background: bg ? bg : "white" }}>
                    {!isMobile && imagePanel}
                    {contentPanel}
                </div>
            </div>
        );
    }
}
