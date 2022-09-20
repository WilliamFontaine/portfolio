import {Return} from "../../components/Return/Return";
import {StickyMenu} from "../../components/StickyMenu/StickyMenu";
import {TicTacToe} from "../../components/TicTacToe/TicTacToe";
import "./TicTacToeGame.css";

export function TicTacToeGame() {
  return (
    <div className="tictactoeGame">
      <StickyMenu/>
      <Return/>
      <TicTacToe/>
    </div>
  );
}
