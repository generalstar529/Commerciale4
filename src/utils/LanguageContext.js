import React from "react";
const LanguageContext = React.createContext({ lang: 2 });
export const LangProvider = LanguageContext.Provider;
export const LangConsumer = LanguageContext.Consumer;
