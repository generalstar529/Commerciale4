import React, { useState } from "react";
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

export const Lang = ({ onChange }) => {
  const lang = sessionStorage.getItem(SESSION_LANG);
  const [selectedLang, setSelectedLang] = useState(lang ? lang : "en");

  const handleChangeLang = (_selectedLang) => {
    setSelectedLang(_selectedLang);
    if (onChange) {
      onChange(_selectedLang);
    }
  };

  return (
    <div className="lang d-flex">
      {LANGUAGES.map((lang, index) => (
        <img
          key={index}
          className={selectedLang === lang.value ? "active" : ""}
          src={lang.imgUrl}
          alt=""
          onClick={() => handleChangeLang(lang.value)}
        />
      ))}
    </div>
  );
};
