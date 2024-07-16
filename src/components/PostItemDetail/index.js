import React, { Component } from "react";
import "./index.css";
import { STRINGS } from "../../utils/strings";
import { LangConsumer } from "../../utils/LanguageContext";

export default class PostItemDetail extends Component {
    render() {
        const { post, onClose } = this.props;
        return (
            <div className="post-item-detail">
                {post && (
                    <div className="-content">
                        <button className="secondary round no-min" onClick={onClose}>
                            <i className="fa fa-close" />
                        </button>
                        <div className="d-flex justify-content-between mb-3">
                            <LangConsumer>
                                {(context) => (
                                    <h5 className="pr-4">
                                        {post.title &&
                                            (context.lang === "en" ? (post.title.en ? post.title.en : post.title.it) : post.title.it ? post.title.it : post.title.en)}
                                    </h5>
                                )}
                            </LangConsumer>
                        </div>
                        <div className="px-4 d-flex justify-content-center">{post.photo && <img src={process.env.REACT_APP_AWS_PREFIX + post.photo} alt="" />}</div>
                        <LangConsumer>
                            {(context) => (
                                <p className="mt-3">
                                    {post.description &&
                                        (context.lang === "en"
                                            ? post.description.en
                                                ? post.description.en
                                                : post.description.it
                                            : post.description.it
                                            ? post.description.it
                                            : post.description.en)}
                                </p>
                            )}
                        </LangConsumer>
                        <div className="published">
                            {STRINGS.publishedOn} {new Date(post.id).toLocaleDateString()}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
