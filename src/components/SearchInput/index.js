import React, { useState } from "react";
import "./index.css";
import { STRINGS } from "../../utils/strings";

export const SearchInput = ({ handleSearch }) => {
  const [keyword, setKeyword] = useState(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (handleSearch) {
        handleSearch(keyword);
      }
    }
  };

  const handleChange = (e) => {
    setKeyword(e.current.target);
  };

  return (
    <div className="search-input">
      <i className="fa fa-search"></i>
      <input
        type="text"
        placeholder={STRINGS.companySearch}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};
