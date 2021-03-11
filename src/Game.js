import React from 'react';
import OptionsWindow from './OptionsWindow.js';
import PlacementWindow from './PlacementWindow.js';
import GameWindow from './GameWindow.js';
import WaitingWindow from './WaitinWindow.js';
import GameOverWindow from './GameOverWindow.js';

// this component basically co-ordinates switching windows in the application and decides which one is currently shown
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTurn: 0,
      beginningTurn: 0,

      player1Board: [],
      player2Board: [],

      player1Ships: [],
      player2Ships: [],

      shipCount: [0, 0, 0, 0, 0],

      boardSize: 5,
      player1Name: '',
      player2Name: '',


      unplacedShipCount: [],
      dragInfo: {
        isDragged: false,
        canBeDropped: false,
        showDraggedShip: false,
        shipSize: 0,
        rotation: 0,
        shipType: -1,
        x: -1,
        y: -1,
        boardSquareX: -1,
        boardSquareY: -1,
      },

      winner: '',
      turnOver: false,
      gameOver: false,
      message: '',
      showWaitingWindow: false,
      showGameOverWindow: false,
    };
  }

  componentDidUpdate() {
    // initializes the board for player 1
    if (this.state.gameTurn === 0 && this.state.beginningTurn === 1) {
      if (this.state.player1Board.length === 0) {
        this.setState({player1Board: initGameBoard(this.state.boardSize), unplacedShipCount: this.state.shipCount});
      }
    }
    // initializes the board for player 2
    else if (this.state.gameTurn === 0 && this.state.beginningTurn === 2) {
      if (this.state.player2Board.length === 0) {
        this.setState({player2Board: initGameBoard(this.state.boardSize), unplacedShipCount: this.state.shipCount});
      }
    }
  }

  render() {
    if (this.state.showWaitingWindow) {
      let waitedPlayer;
      if (this.state.beginningTurn === 0) {
        waitedPlayer = this.state.gameTurn;
      } else {
        waitedPlayer = this.state.beginningTurn;
      }

      let waitedPlayerName;
      if (waitedPlayer === 1) {
        waitedPlayerName = this.state.player1Name;
      } else {
        waitedPlayerName = this.state.player2Name;
      }

      return (
        <WaitingWindow
          setState={p => this.setState(p)}
          waitedPlayer={waitedPlayer}
          waitedPlayerName={waitedPlayerName}
        />
      );

    }

    if (this.state.showGameOverWindow) {
      if (this.state.winner === 1) {
        return (
          <GameOverWindow setState={p => this.setState(p)} winnerName={this.state.player1Name} />
        );
      } else {
        return (
          <GameOverWindow setState={p => this.setState(p)} winnerName={this.state.player2Name} />
        );
      }
    }

    // first stage in a new game
    if (this.state.gameTurn === 0 && this.state.beginningTurn === 0) {
      return <OptionsWindow
        setState={p => this.setState(p)}
        player1Name={this.state.player1Name}
        player2Name={this.state.player2Name}
        boardSize={this.state.boardSize}
        shipCount={this.state.shipCount}
        message={this.state.message}
      />
    }

    // player 1 places their ships now
    if (this.state.gameTurn === 0 && this.state.beginningTurn === 1) {
      return (
        <PlacementWindow
          setState={p => this.setState(p)}
          board={this.state.player1Board}
          ships={this.state.player1Ships}
          player={1}
          unplacedShipCount={this.state.unplacedShipCount}
          dragInfo={this.state.dragInfo}
          boardSize={this.state.boardSize}
        />
      );
    }

    // player 2 places their ships now
    if (this.state.gameTurn === 0 && this.state.beginningTurn === 2) {
      return (
        <PlacementWindow
          setState={p => this.setState(p)}
          board={this.state.player2Board}
          ships={this.state.player2Ships}
          player={2}
          unplacedShipCount={this.state.unplacedShipCount}
          dragInfo={this.state.dragInfo}
          boardSize={this.state.boardSize}
        />
      );
    }

    // player 1 turn
    if (this.state.gameTurn === 1 && this.state.beginningTurn === 0) {
      return (
        <GameWindow
          setState={p => this.setState(p)}
          ownBoard={this.state.player1Board}
          enemyBoard={this.state.player2Board}
          ownShips={this.state.player1Ships}
          enemyShips={this.state.player2Ships}
          player={1}
          boardSize={this.state.boardSize}
          turnOver={this.state.turnOver}
          gameOver={this.state.gameOver}
          message={this.state.message}
        />
      );
    }

    // player 2 turn
    if (this.state.gameTurn === 2 && this.state.beginningTurn === 0) {
      return (
        <GameWindow
          setState={p => this.setState(p)}
          ownBoard={this.state.player2Board}
          enemyBoard={this.state.player1Board}
          ownShips={this.state.player2Ships}
          enemyShips={this.state.player1Ships}
          player={2}
          boardSize={this.state.boardSize}
          turnOver={this.state.turnOver}
          gameOver={this.state.gameOver}
          message={this.state.message}
        />
      );
    }

    return (
      <div>error</div>
    );
  }
}

// makes an initial board as 2d array consisting of default (empty) squares
function initGameBoard(boardSize) {
  const board = [];

  for (let i = 0; i < boardSize; i++) {
    board.push([]);

    for (let j = 0; j < boardSize; j++) {
      board[i].push(
        {
          // fog has not been implemented yet (not required)
          fog: false,
          shot: false,
          noShip: true,
        }
      )
    }
  }

  return board;
}

export default Game;