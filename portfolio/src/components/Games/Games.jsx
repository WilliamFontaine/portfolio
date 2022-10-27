import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SvgTicTacToe from "../../images/tictactoe";
import "./Games.css";

export function Games() {
  const { t } = useTranslation();
  return (
    <div className="games">
      <div className="games-header">
        <p>{t("games_title")}</p>
      </div>
      <div className="games-content">
        <Link to={"tictactoe"}>
          <div className="games-content__tictactoe">
            <SvgTicTacToe className="games-content__tictactoe-icon" />
            <p>{t("game_tictactoe")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
