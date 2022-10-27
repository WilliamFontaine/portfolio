import React from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="footer-social">
        <a href="https://github.com/WilliamFontaine">
          <FaGithub className="icon" />
        </a>
        <a href="https://www.linkedin.com/in/williamftn/">
          <FaLinkedin className="icon" />
        </a>
        <a href="mailto:william.fontaine0308@gmail.com">
          <FaEnvelope className="icon" />
        </a>
      </div>
      <p>{t("footer_title")}</p>
    </div>
  );
}
