import React, { Component } from "react";
import "./index.css";
import { SESSION_LANG } from "../../utils";

const LANGUAGES = [
    {
        value: "it",
        imgUrl: "/images/flag/italy1.png",
    },
    {
        value: "en",
        imgUrl: "/images/flag/uk1.png",
    },
];

export default class Lang extends Component {
    constructor(props) {
        super(props);

        let lang = sessionStorage.getItem(SESSION_LANG);
        this.state = {
            selectedLang: lang ? lang : "en",
        };
    }

    handleChangeLang = (selectedLang) => {
        const { onChange } = this.props;

        this.setState({ selectedLang });
        if (onChange) {
            onChange(selectedLang);
        }
    };

    render() {
        const { selectedLang } = this.state;
        return (
            <div className="lang d-flex">
                {LANGUAGES.map((lang, index) => (
                    <img key={index} className={selectedLang === lang.value ? "active" : ""} src={lang.imgUrl} alt="" onClick={() => this.handleChangeLang(lang.value)} />
                ))}
            </div>
        );
    }
}
