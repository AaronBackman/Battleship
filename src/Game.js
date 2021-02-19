import React from 'react';
import OptionsWindow from './OptionsWindow.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTurn: 0,
      beginningTurn: 0,
      reset: false,
      gameState: {
        player1Board: [],
        player2Board: [],
        player1Ships: [],
        player2Ships: [],
      },
      boardSize: 5,
      player1Name: '',
      player2Name: '',
    }
  }

  render() {
    // first stage in a completely new game
    if (this.state.gameTurn === 0 && this.state.beginningTurn === 0) {
      return <OptionsWindow
        setState={p => this.setState(p)}
        player1Name={this.state.player1Name}
        player2Name={this.state.player2Name}
        boardSize={this.state.boardSize}
      />
    }

    return (
      <div>hello</div>
    );
  }
}

function initGameBoard(boardSize) {

}

export default Game;