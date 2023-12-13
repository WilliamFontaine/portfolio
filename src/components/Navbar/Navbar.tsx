import { useRef } from "react";
import "./Navbar.scss";
function Navbar() {
  const hamburger = useRef<HTMLDivElement | null>(null);
  const hamburgerContainer = useRef<HTMLDivElement | null>(null);

  const toggleHamburger = () => {
    if (hamburger.current) {
      hamburger.current.classList.toggle("open");
    }
    if (hamburgerContainer.current) {
      hamburgerContainer.current.classList.toggle("open");
    }
  };

  return (
    <div className="header-container">
      <header>
        <h1>Portfolio</h1>
        <nav>
          <div className="hamburger" ref={hamburger} onClick={toggleHamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="hamburger-container" ref={hamburgerContainer}>
            <ul>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#studies">Etudes</a>
              </li>
              <li>
                <a href="#projects">Projets</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
