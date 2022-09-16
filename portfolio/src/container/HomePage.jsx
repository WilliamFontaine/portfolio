import { TicTacToe } from "components/TicTacToe/TicTacToe";
import React from "react";

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homePage">
        <TicTacToe />
      </div>
    );
  }
}
