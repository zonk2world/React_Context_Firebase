import {useTranslation} from "react-i18next";

const Timestamp = ({ value }) => {
  const { t } = useTranslation();
  if (value.toDate) {
    return t("meta.timestamp", {value: value.toDate()});
  }
  return t("meta.timestamp", {value});
}

export default Timestamp;