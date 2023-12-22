import { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";

function Navbar() {
  const { t, i18n } = useTranslation();

  const hamburger = useRef<HTMLDivElement | null>(null);
  const hamburgerContainer = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleHamburger = () => {
    if (hamburger.current) {
      hamburger.current.classList.toggle("open");
    }
    if (hamburgerContainer.current) {
      hamburgerContainer.current.classList.toggle("open");
    }
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  return (
    <div className="header-container">
      <header>
        <h1>{t("header.title")}</h1>
        <nav>
          <div className="hamburger" ref={hamburger} onClick={toggleHamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="hamburger-container" ref={hamburgerContainer}>
            <ul>
              <li>
                <a href="#experience">{t("header.menu.experience")}</a>
              </li>
              <li>
                <a href="#study">{t("header.menu.study")}</a>
              </li>
              <li>
                <a href="#skills">{t("header.menu.skills")}</a>
              </li>
              <li>
                <a href="#projects">{t("header.menu.projects")}</a>
              </li>
              <li>
                <a href="#contact">{t("header.menu.contact")}</a>
              </li>
              <li className="language-selector">
                <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
                  <option value="fr">{t("header.lang.fr")}</option>
                  <option value="en">{t("header.lang.en")}</option>
                </select>
                <GrLanguage className="language-icon" />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
