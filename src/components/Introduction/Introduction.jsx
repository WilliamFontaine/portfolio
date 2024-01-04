import React from "react";
import { useTranslation } from "react-i18next";
import "./Introduction.css";

export function Introduction() {
  const { t } = useTranslation();

  return (
    <div className="introduction">
      <div className="introduction-text">
        <div className="introduction-text__first">
          <p>{t("introduction_first")}</p>
        </div>
        <div className="introduction-text__second">
          <p>{t("introduction_second")}</p>
        </div>
      </div>
    </div>
  );
}
