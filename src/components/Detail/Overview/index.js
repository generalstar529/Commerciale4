import React, { Component } from "react";
import "./index.css";
import PostItem from "../../PostItem";
import PostItemDetail from "../../PostItemDetail";
import { LangConsumer } from "../../../utils/LanguageContext";
import { STRINGS } from "../../../utils/strings";

export default class DetailOverView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPost: null,
        };

        this.newsPanel = React.createRef();
    }

    handleClickGotoNews = (e) => {
        window.scrollTo({
            top: this.newsPanel.current.offsetTop - 133,
            behavior: "smooth",
        });
    };

    render() {
        const { company } = this.props;
        const { selectedPost } = this.state;
        let posts = company && company.posts && company.posts.slice(0);
        if (posts) {
            posts = posts.sort((a, b) => {
                return b.published - a.published;
            });
        }

        return (
            <div className="detail-overview">
                {/* <div className="d-flex justify-content-end"> */}
                <button className="more-less" onClick={this.handleClickGotoNews}>
                    {STRINGS.goToNews}
                    <i className="pl-1 fa fa-chevron-down" />
                </button>
                {/* </div> */}
                <LangConsumer>
                    {(context) => (
                        <div>
                            <div className="text-uppercase text-bold text-dark-light mb-2 d-flex align-items-center">
                                <i className="fa fa-address-card-o font-22 pr-3" />
                                {STRINGS.introduction}
                            </div>
                            <p className="font-15 text-gray">
                                {company &&
                                    company.profile &&
                                    company.profile.introduction &&
                                    (context.lang === "en"
                                        ? company.profile.introduction.en
                                            ? company.profile.introduction.en
                                            : company.profile.introduction.it
                                        : company.profile.introduction.it
                                        ? company.profile.introduction.it
                                        : company.profile.introduction.en)}
                            </p>
                            <div className="text-uppercase text-bold text-dark-light mb-2 pt-2 d-flex align-items-center">
                                <i className="fa fa-industry font-22 pr-3" />
                                {STRINGS.whatWeDo}
                            </div>
                            <p className="font-15 text-gray">
                                {company &&
                                    company.profile &&
                                    company.profile.whatWeDo &&
                                    (context.lang === "en"
                                        ? company.profile.whatWeDo.en
                                            ? company.profile.whatWeDo.en
                                            : company.profile.whatWeDo.it
                                        : company.profile.whatWeDo.it
                                        ? company.profile.whatWeDo.it
                                        : company.profile.whatWeDo.en)}
                            </p>
                        </div>
                    )}
                </LangConsumer>
                <div className="d-flex align-items-center text-uppercase text-bold text-dark-light pt-2 my-2" ref={this.newsPanel}>
                    <i className="fa fa-newspaper-o font-22 pr-3" />
                    <span>{STRINGS.news}</span>
                </div>
                {posts && posts.length ? (
                    <div className="post-list">
                        {posts.map((post) => (
                            <div key={post.id} onClick={() => this.setState({ selectedPost: post })}>
                                <PostItem data={post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center pt-2 pb-4">{STRINGS.noNews}</div>
                )}
                {selectedPost && <PostItemDetail post={selectedPost} onClose={() => this.setState({ selectedPost: null })} />}
            </div>
        );
    }
}
