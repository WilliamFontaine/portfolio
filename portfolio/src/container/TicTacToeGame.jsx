import { StickyMenu } from "../components/StickyMenu";
import { TicTacToe } from "../components/TicTacToe/TicTacToe";

export function TicTacToeGame() {
  return (
    <div className="tictactoeGame">
      <StickyMenu />
      <TicTacToe />
    </div>
  );
}
