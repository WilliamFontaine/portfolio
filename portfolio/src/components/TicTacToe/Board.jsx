import React from "react";
import { Square } from "./Square";
import "./Board.css";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      columns: 3,
    };
  }
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let i = 0;
    return (
      <div>
        {Array.from(Array(this.state.rows).keys()).map((row) => {
          return (
            <div className="board-row" key={row}>
              {Array.from(Array(this.state.columns).keys()).map(() => {
                {
                  return this.renderSquare(i++);
                }
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
