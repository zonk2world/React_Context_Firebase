import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import moment from "moment";
import de from "../i18n/de.json";
import en from "../i18n/en.json";

const flatten = (object, accu = {}, path = []) =>
  Object.keys(object).reduce((innerAccu, k) => {
    const xk = path.concat([k]).join(".");
    if (typeof object[k] === "string") {
      return { ...innerAccu, [xk]: object[k] };
    }
    return flatten(object[k], innerAccu, path.concat([k]));
  }, accu);

const resources = {
  de: {
    translation: flatten(de),
  },
  en: {
    translation: flatten(en),
  }
};
const LANG = "de";
const TranslationProvider = ({ children }) => {
  const translations = resources[LANG]["translation"];

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: LANG,
      fallbackLng: LANG,
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: false, // react already safes from xss
        format: (value, format) => {
          console.log(value, translations);
          if (format === "uppercase") return value.toUpperCase();
          if (format === "date") return moment(value).format(translations["meta.format.date"]);
          if (format === "time") return moment(value).format(translations["meta.format.time"]);
          if (format === "timestamp") return moment(value).format(translations["meta.format.timestamp"]);
          return value;
        },
      },
    });

  return children;
}

export default TranslationProvider;