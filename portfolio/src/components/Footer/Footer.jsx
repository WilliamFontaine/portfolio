import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";

export function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <p>{t("footer_title")}</p>
    </div>
  );
}
