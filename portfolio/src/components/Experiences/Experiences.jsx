import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Experiences.css";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export function Experiences() {
  const { t } = useTranslation();
  return (
    <div className="experience">
      <div className="experience-header">
        <p>{t("exp_title")}</p>
      </div>
      <div className="experience-content">
        <div className="experience-content__first">
          <p className="experience-content__first-date">
            {t("first_exp_date")}
          </p>
          <p className="experience-content__first-job">{t("first_exp_job")}</p>
          <p className="experience-content__first-location">
            <FontAwesomeIcon icon={faLocationPin} className="FontAwesomeIcon" />
            {t("first_exp_location")}
          </p>
        </div>
        <div className="experience-content__second">
          <p className="experience-content__second-date">
            {t("second_exp_date")}
          </p>
          <p className="experience-content__second-job">
            {t("second_exp_job")}
          </p>
          <p className="experience-content__second-location">
            <FontAwesomeIcon icon={faLocationPin} className="FontAwesomeIcon" />
            {t("second_exp_location")}
          </p>
        </div>
      </div>
    </div>
  );
}
