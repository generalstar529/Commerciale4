import React, { Component } from "react";
import DetailHeader from "../../components/Detail/Header";
import DetailBody from "../../components/Detail/Body";
import "./index.css";
import { requestAPI } from "../../utils/api";
import SpinnerView from "../../components/SpinnerView";
import { orderTags, SESSION_SELECTED_COMPANY, SESSION_FILTER } from "../../utils";
import { LangConsumer } from "../../utils/LanguageContext";
import { STRINGS } from "../../utils/strings";

let lang = null;

export default class CompanyDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: null,
            isProcessing: false,
        };
    }

    componentDidMount = async () => {
        let id = this.props.match.params.id;
        if (!id) {
            return;
        }

        if (id === "unknown") {
            let selectedCompany = JSON.parse(sessionStorage.getItem(SESSION_SELECTED_COMPANY));
            this.setState({ profile: { user: selectedCompany, posts: [] } });
            return;
        }

        this.setState({ isProcessing: true });
        let response = await requestAPI(`/companies/${id}`, "GET");
        let result = await response.json();
        this.setState({ isProcessing: false });
        if (result.error) {
            console.log(STRINGS[result.error]);
            return;
        }

        let filter = JSON.parse(sessionStorage.getItem(SESSION_FILTER));
        if (filter && filter.tags && filter.tags.length && result.tags) {
            if (lang === "en") {
                result.tags.en = orderTags(result.tags.en, filter.tags);
            } else {
                result.tags.it = orderTags(result.tags.it, filter.tags);
            }
        }

        this.setState({ company: result });

        // .then((res) => {
        //     if (res.status === 1) {
        //         let profile = res.data;
        //         if (profile.user) {
        //             let filter = JSON.parse(sessionStorage.getItem("filter"));
        //             if (filter) {
        //                 if (lang === "en") {
        //                     profile.user.tags = orderTags(profile.user.tags, filter.tags);
        //                 } else {
        //                     profile.user.tagsIt = orderTags(profile.user.tagsIt, filter.tags);
        //                 }
        //             }
        //         }
        //         this.setState({ profile: res.data });
        //     } else {
        //         console.log(STRINGS.connectionFailed);
        //     }
        //     this.setState({ isProcessing: false });
        // })
        // .catch((e) => {
        //     console.log(STRINGS.connectionFailed);
        //     this.setState({ isProcessing: false });
        // });
    };

    render() {
        const { company, isProcessing } = this.state;
        return (
            <div>
                <LangConsumer>
                    {(value) => {
                        lang = value.lang;
                    }}
                </LangConsumer>
                <div className="company-detail container">
                    <DetailHeader profile={company && company.profile} />
                    <DetailBody company={company} />
                </div>
                {isProcessing && <SpinnerView />}
            </div>
        );
    }
}
