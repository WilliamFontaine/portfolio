import React from "react";
import { TicTacToe } from "../components/TicTacToe/TicTacToe";

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
