import React from "react";
import { useTranslation } from "react-i18next";
import "./Skills.css";

export function Skills() {
  const { t } = useTranslation();
  return (
    <div className="skills">
      <div className="skills-header">
        <p>{t("skills_title")}</p>
      </div>
      <div className="skills-list">
        <div className="skills-list__hexagonArea">
          <div className="skills-list__hexagonArea-javascript hexagon">
            <p>Javascript</p>
          </div>
          <div className="skills-list__hexagonArea-python hexagon">
            <p>Python</p>
          </div>
          <div className="skills-list__hexagonArea-php hexagon">
            <p>Php</p>
          </div>
          <div className="skills-list__hexagonArea-c# hexagon">
            <p>c#</p>
          </div>
        </div>
        <div className="skills-list__hexagonArea">
          <div className="skills-list__hexagonArea-java hexagon">
            <p>java</p>
          </div>
          <div className="skills-list__hexagonArea-react hexagon">
            <p>React.js</p>
          </div>
          <div className="skills-list__hexagonArea-vue hexagon">
            <p>Vue</p>
          </div>
          <div className="skills-list__hexagonArea-html hexagon">
            <p>HTML</p>
          </div>
          <div className="skills-list__hexagonArea-css hexagon">
            <p>CSS</p>
          </div>
        </div>
        <div className="skills-list__hexagonArea">
          <div className="skills-list__hexagonArea-django hexagon">
            <p>Django</p>
          </div>
          <div className="skills-list__hexagonArea-symfony hexagon">
            <p>Symfony</p>
          </div>
          <div className="skills-list__hexagonArea-docker hexagon">
            <p>Docker</p>
          </div>
          <div className="skills-list__hexagonArea-mysql hexagon">
            <p>MySQL</p>
          </div>
        </div>
        <div className="skills-list__hexagonArea">
          <div className="skills-list__hexagonArea-maraidb hexagon">
            <p>MariaDB</p>
          </div>
          <div className="skills-list__hexagonArea-mongodb hexagon">
            <p>MongoDB</p>
          </div>
          <div className="skills-list__hexagonArea-postgres hexagon">
            <p>Postgres</p>
          </div>
        </div>
      </div>
    </div>
  );
}
