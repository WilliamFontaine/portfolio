import React from "react";
import "./Introduction.css";

export function Introduction() {
  return (
    <div className="introduction">
      <div className="introduction-text">
        <div className="introduction-text__first">
          <p>
            Hello ! Je m'appelle William Fontaine, j'ai 20 ans et je suis
            développeur web junior.
          </p>
        </div>
        <div className="introduction-text__second">
          <p>
            Je suis passionné par l'informatique et très curieux, ce qui me
            permet de découvrir plein de nouvelles choses, notamment dans le
            domaine des nouvelles technologies et dans le monde de l'IT.
          </p>
        </div>
      </div>
    </div>
  );
}
