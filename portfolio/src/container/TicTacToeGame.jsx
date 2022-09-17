import { StickyMenu } from "../components/StickyMenu/StickyMenu";
import { TicTacToe } from "../components/TicTacToe/TicTacToe";

export function TicTacToeGame() {
  return (
    <div className="tictactoeGame">
      <StickyMenu />
      <TicTacToe />
    </div>
  );
}
