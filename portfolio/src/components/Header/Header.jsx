import React from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";

export function Header() {
  const { t } = useTranslation();
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-content__title">
          <div className="lettre-anim">
            <span data-lettre="W">W</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="i">i</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="l">l</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="l">l</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="i">i</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="a">a</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="m">m</span>
          </div>
          <span> </span>
          <div className="lettre-anim">
            <span data-lettre="F">F</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="o">o</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="n">n</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="t">t</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="a">a</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="i">i</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="n">n</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre="e">e</span>
          </div>
          <div className="lettre-anim">
            <span data-lettre=",">,</span>
          </div>
        </div>
        <p className="header-content__desc">{t("title_desc")}</p>
      </div>
    </div>
  );
}
