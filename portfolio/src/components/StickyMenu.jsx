import React, { useState } from "react";
import "./StickyMenu.css";
import SvgGitHub from "../images/GitHub";
import SvgLinkedIn from "../images/LinkedIn";
import SvgFrenchFlag from "../images/FrenchFlag";
import SvgEnglishFlag from "../images/EnglishFlag";
import SvgSun from "../images/Sun";
import SvgMoon from "../images/Moon";

export function StickyMenu() {
  const [isFrench, setLang] = useState(true);
  const [isLightMode, setTheme] = useState(true);

  const handleChangeLang = () => {
    setLang(!isFrench);
  };

  const handleChangeTheme = () => {
    setTheme(!isLightMode);
  };
  return (
    <div className="stickymenu">
      {isLightMode ? (
        <SvgMoon
          className="stickymenu-icon__darkmode"
          onClick={handleChangeTheme}
        />
      ) : (
        <SvgSun
          className="stickymenu-icon__lightmode"
          onClick={handleChangeTheme}
        />
      )}
      {isFrench ? (
        <SvgEnglishFlag
          className="stickymenu-icon__englishFlag"
          onClick={handleChangeLang}
        />
      ) : (
        <SvgFrenchFlag
          className="stickymenu-icon__frenchFlag"
          onClick={handleChangeLang}
        />
      )}

      <SvgGitHub className="stickymenu-icon__github" />
      <SvgLinkedIn className="stickymenu-icon__linkedIn" />
    </div>
  );
}
