import { Board } from "components/TicTacToe/Board";
import React from "react";
import "./TicTacToe.css";

export class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          case: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
    this.baseState = this.state;
  }

  reset() {
    for (let i = 0; i < document.querySelectorAll(".square").length; i++) {
      document.querySelectorAll(".square")[i].classList.remove("win");
    }
    this.setState(this.baseState);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          case: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    for (let i = 0; i < document.querySelectorAll(".square").length; i++) {
      document.querySelectorAll(".square")[i].classList.remove("win");
    }
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }

  convertToPosition(pos) {
    switch (pos) {
      case 1:
        return "2, 1";
      case 2:
        return "3, 1";
      case 3:
        return "1, 2";
      case 4:
        return "2, 2";
      case 5:
        return "3, 2";
      case 6:
        return "1, 3";
      case 7:
        return "2, 3";
      case 8:
        return "3, 3";
      default:
        return "1, 1";
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move
        ? "Coup #" +
          move +
          " (position : " +
          this.convertToPosition(history[move].case) +
          ")"
        : "Début de la partie";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Gagnant: " + winner.winner;
      for (let i = 0; i < document.querySelectorAll(".square").length; i++) {
        if (winner.line.includes(i)) {
          document.querySelectorAll(".square")[i].classList.add("win");
        }
      }
    } else {
      status = "Joueur suivant: " + (this.state.xIsNext ? "X" : "O");
    }
    if (this.state.stepNumber === 9) {
      status = "Match nul !";
    }

    return (
      <div className="TicTacToe">
        <div className="TicTacToe-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="TicTacToe-info">
          <div>
            <button onClick={() => this.reset()}>Réintialiser la grille</button>
          </div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
