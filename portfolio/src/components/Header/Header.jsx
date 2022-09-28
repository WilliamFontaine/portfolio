import React from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";

export function Header() {
  const { t } = useTranslation();
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-content__title">{t("title")}</h1>
        <p className="header-content__desc">{t("title_desc")}</p>
      </div>
    </div>
  );
}
