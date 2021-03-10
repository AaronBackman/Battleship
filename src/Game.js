import React from 'react';
import OptionsWindow from './OptionsWindow.js';
import PlacementWindow from './PlacementWindow.js';
import GameWindow from './GameWindow.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTurn: 0,
      beginningTurn: 0,
      reset: false,

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
      }
    };
  }

  componentDidUpdate() {
    // initializes the boards
    if (this.state.gameTurn === 0 && this.state.beginningTurn === 1) {
      if (this.state.player1Board.length === 0) {
        console.log('set board');
        this.setState({player1Board: initGameBoard(this.state.boardSize), unplacedShipCount: this.state.shipCount});
      }
    } else if (this.state.gameTurn === 0 && this.state.beginningTurn === 2) {
      if (this.state.player2Board.length === 0) {
        console.log('set board');
        this.setState({player2Board: initGameBoard(this.state.boardSize), unplacedShipCount: this.state.shipCount});
      }
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
        />
      );
    }

    return (
      <div>hello</div>
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
          fog: false,
          shot: false,
          noShip: true,
        }
      )
    }
  }

  console.log('init');
  console.log(board);

  return board;
}

export default Game;