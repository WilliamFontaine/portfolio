import React from "react";
import { Link } from "react-router-dom";
import SvgTicTacToe from "../images/tictactoe";
import "./Games.css";

export function Games() {
  return (
    <div className="games">
      <div className="games-header">
        <p>Une envie de mini-jeux ??</p>
      </div>
      <div className="games-content">
        <Link to={"tictactoe"}>
          <div className="games-content__tictactoe">
            <SvgTicTacToe className="games-content__tictactoe-icon" />
            <p>Morpion</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
