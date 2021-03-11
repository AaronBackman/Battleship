import React from 'react';
import './GameOverWindow.css';

// this window is shown after game is won by either player
class GameOverWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {setState, winnerName} = this.props;

    return (
      <div className="game-over-window">
        <div className="game-over-selection-container">
          <div className="winner-info"><div>winner: {winnerName}</div></div>
          <div className="restart-button"
            onClick={e => {
              setState({
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
              });
            }}
          >
            <div>Start a new game</div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameOverWindow;