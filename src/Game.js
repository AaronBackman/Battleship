import React from 'react';
import OptionsWindow from './OptionsWindow.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTurn: 0,
      beginningTurn: 0,
      reset: false,

      boards: {
        player1Board: [],
        player2Board: [],
      },

      ships: {
        player1Ships: [],
        player2Ships: [],
      },

      shipCount: [0, 0, 0, 0, 0],

      boardSize: 5,
      player1Name: '',
      player2Name: '',
    }
  }

  render() {
    // first stage in a new game
    if (this.state.gameTurn === 0 && this.state.beginningTurn === 0) {
      return <OptionsWindow
        setState={p => this.setState(p)}
        player1Name={this.state.player1Name}
        player2Name={this.state.player2Name}
        boardSize={this.state.boardSize}
        shipCount={this.state.shipCount}
      />
    }

    return (
      <div>hello</div>
    );
  }
}

// makes an initial board as 2d array consisting of default (empty) squares
function initGameBoard(boardSize) {
  return Array(boardSize).fill(0).map(x => Array(boardSize).fill(0).map(x => {
    return {
      fog: false,
      shot: false,
      noShip: true,
    }
  }));
}

export default Game;