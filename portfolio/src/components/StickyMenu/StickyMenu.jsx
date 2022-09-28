import React, { useEffect, useState } from "react";
import "./StickyMenu.css";
import SvgGitHub from "../../images/GitHub";
import SvgLinkedIn from "../../images/LinkedIn";
import SvgFrenchFlag from "../../images/FrenchFlag";
import SvgEnglishFlag from "../../images/EnglishFlag";
import SvgSun from "../../images/Sun";
import SvgMoon from "../../images/Moon";
import i18n from "../../i18n";

export function StickyMenu() {
  const [isLightMode, setTheme] = useState(true);
  const [lang, setLang] = useState("fr");

  let toggler = null;
  let navLinksContainer = null;

  const toggleNav = () => {
    toggler.classList.toggle("open");

    navLinksContainer.classList.toggle("open");
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        toggler = document.querySelector(".hamburger");
        navLinksContainer = document.querySelector(".hamburger-container");
        toggler.addEventListener("click", toggleNav);
        let resizeObserver = new ResizeObserver((entries) => {
          if (entries[0].contentRect.width <= 900) {
            navLinksContainer.style.transition = "transform 0.3s ease-out";
          } else {
            navLinksContainer.style.transition = "none";
          }
          resizeObserver.observe(document.body);
        });
      } else {
        toggler = null;
        navLinksContainer = null;
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChangeLang = (e) => {
    if (lang === "fr") setLang("en");
    else setLang("fr");
    i18n.changeLanguage(lang);
  };

  const handleChangeTheme = () => {
    setTheme(!isLightMode);
  };

  return (
    <div className="stickymenu">
      <div className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="hamburger-container">
        {isLightMode ? (
          <SvgMoon
            className="stickymenu-icon__darkmode icon"
            onClick={handleChangeTheme}
          />
        ) : (
          <SvgSun
            className="stickymenu-icon__lightmode icon"
            onClick={handleChangeTheme}
          />
        )}
        {lang === "en" ? (
          <SvgEnglishFlag
            className="stickymenu-icon__englishFlag icon"
            onClick={handleChangeLang}
          />
        ) : (
          <SvgFrenchFlag
            className="stickymenu-icon__frenchFlag icon"
            onClick={handleChangeLang}
          />
        )}

        <SvgGitHub className="stickymenu-icon__github icon" />
        <SvgLinkedIn className="stickymenu-icon__linkedIn icon" />
      </div>
    </div>
  );
}
