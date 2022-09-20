import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Experiences.css";
import {faLocationPin} from "@fortawesome/free-solid-svg-icons";

export function Experiences() {
  return (
    <div className="experience">
      <div className="experience-header">
        <p>Mes expériences</p>
      </div>
      <div className="experience-content">
        <div className="experience-content__first">
          <p className="experience-content__first-date">
            Avril 2022 - Juin 2022
          </p>
          <p className="experience-content__first-job">
            Stagiaire développeur web
          </p>
          <p className="experience-content__first-location">
            <FontAwesomeIcon icon={faLocationPin} className="FontAwesomeIcon"/>
            Volvic, Auvergne-Rhône-Alpes, France
          </p>
        </div>
        <div className="experience-content__second">
          <p className="experience-content__second-date">
            Septembre 2022 - Actuellement
          </p>
          <p className="experience-content__second-job">
            Alternant concepteur et développeur d'applications
          </p>
          <p className="experience-content__second-location">
            <FontAwesomeIcon icon={faLocationPin} className="FontAwesomeIcon"/>
            Clermont-Ferrand, Auvergne-Rhône-Alpes, France
          </p>
        </div>
      </div>
    </div>
  );
}
