import React from 'react';
import './Squares.css';
import './GameWindow.css';
import Message from './Message.js';
import './ReadyButton.css';

// handles playing the game after both players have placed their ships
class GameWindow extends React.Component {
  constructor(props) {
    super(props);

    this.handleShooting = this.handleShooting.bind(this);
  }

  render() {
    const {setState, ownBoard, enemyBoard, ownShips, enemyShips, player, boardSize, turnOver, gameOver, message} = this.props;

    return (
      <div className="game-window">
        <div className="game-info">
          <div className="game-info-player">
            <div className="info-header">own ships</div>
            <div className="info-piece">remaining aircraft carriers: {calculateRemainingShips(ownShips, 0)}</div>
            <div className="info-piece">remaining battleships: {calculateRemainingShips(ownShips, 1)}</div>
            <div className="info-piece">remaining cruisers: {calculateRemainingShips(ownShips, 2)}</div>
            <div className="info-piece">remaining submarines: {calculateRemainingShips(ownShips, 3)}</div>
            <div className="info-piece">remaining destroyers: {calculateRemainingShips(ownShips, 4)}</div>
            <div className="info-piece">total remaining: {calculateAllRemainingShips(ownShips)}</div>
          </div>
          <div className="game-info-player">
          <div className="info-header">enemy ships</div>
          <div className="info-piece">remaining aircraft carriers: {calculateRemainingShips(enemyShips, 0)}</div>
            <div className="info-piece">remaining battleships: {calculateRemainingShips(enemyShips, 1)}</div>
            <div className="info-piece">remaining cruisers: {calculateRemainingShips(enemyShips, 2)}</div>
            <div className="info-piece">remaining submarines: {calculateRemainingShips(enemyShips, 3)}</div>
            <div className="info-piece">remaining destroyers: {calculateRemainingShips(enemyShips, 4)}</div>
            <div className="info-piece">total remaining: {calculateAllRemainingShips(enemyShips)}</div>
          </div>
        </div>


        <div className="boards">
          <div id="own-board">
            {ownBoard.map((row, y) => {
              return (
                <div key={y} className="row">
                  {row.map((square, x) => {
                    // square has been shot
                    if (ownBoard[y][x].shot) {
                      // square doesnt have a ship
                      if (ownBoard[y][x].ship === undefined) {
                        return <div key={x} data-x={x} data-y={y} className="square-shot"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipCenterPartHorizontal) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-center-horizontal-shot"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipCenterPartVertical) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-center-vertical-shot"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipLeftPart) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-left-shot"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipTopPart) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-top-shot"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipRightPart) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-right-shot"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipBottomPart) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-bottom-shot"></div>
                      }
                    }

                    // otherwise the same as above but square has not been shot at
                    else {
                      if (!ownBoard[y][x].ship) {
                        return <div key={x} data-x={x} data-y={y} className="square"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipCenterPartHorizontal) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-center-horizontal"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipCenterPartVertical) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-center-vertical"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipLeftPart) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-left"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipTopPart) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-top"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipRightPart) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-right"></div>
                      }
  
                      if (ownBoard[y][x].ship.shipBottomPart) {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-bottom"></div>
                      }
                    }
                  })}
                </div>
              )
            })}
          </div>

          <div id="enemy-board">
            {enemyBoard.map((row, y) => {
              return (
                <div key={y} className="row">
                  {row.map((square, x) => {
                    if (enemyBoard[y][x].shot) {
                      if (enemyBoard[y][x].ship === undefined) {
                        return <div key={x} data-x={x} data-y={y} className="square-shot"></div>
                      }

                      // see enemy ship parts more specifically if and only if it is completely destroyed
                      if (isShipOnSquareDestroyed(enemyShips, x, y)) {
                        if (enemyBoard[y][x].ship.shipCenterPartHorizontal) {
                          return <div key={x} data-x={x} data-y={y} className="ship-part-center-horizontal-shot"></div>
                        }
    
                        if (enemyBoard[y][x].ship.shipCenterPartVertical) {
                          return <div key={x} data-x={x} data-y={y} className="ship-part-center-vertical-shot"></div>
                        }
    
                        if (enemyBoard[y][x].ship.shipLeftPart) {
                          return <div key={x} data-x={x} data-y={y} className="ship-part-left-shot"></div>
                        }
    
                        if (enemyBoard[y][x].ship.shipTopPart) {
                          return <div key={x} data-x={x} data-y={y} className="ship-part-top-shot"></div>
                        }
    
                        if (enemyBoard[y][x].ship.shipRightPart) {
                          return <div key={x} data-x={x} data-y={y} className="ship-part-right-shot"></div>
                        }
    
                        if (enemyBoard[y][x].ship.shipBottomPart) {
                          return <div key={x} data-x={x} data-y={y} className="ship-part-bottom-shot"></div>
                        }
                      }

                      // do not give extra info about the shape of the ship if it is only partially hit
                      else {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-unknown-shot"></div>
                      }
                    }


                    // square not shot at, location of enemy ships is unknown unless the square is shot
                    else {
                      if (turnOver) {
                        // cant fire if turn is over
                        return <div key={x} data-x={x} data-y={y} className="square" onClick={this.handleShooting}></div>
                      } else {
                        return <div key={x} data-x={x} data-y={y} className="fireable-square" onClick={this.handleShooting}></div>
                      }
                    }
                  })}
                  <NextTurnButton turnOver={turnOver} gameOver={gameOver} setState={setState} player={player} />
                  <Message message={message} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }

  // player clicks a square on the enemy board
  handleShooting(e) {
    const square = e.target;

    const x = square.dataset.x;
    const y = square.dataset.y;

    // player cant shoot anymore (eg. player missed)
    if (this.props.turnOver) {
      this.props.setState({message: 'You can\'t shoot anymore!'})
      return;
    }

    // cant shoot if the square has already been shot at
    if (this.props.enemyBoard[y][x].shot)  {
      this.props.setState({message: 'That square has already been shot at!'})
      return;
    }

    const enemyBoardCopy = JSON.parse(JSON.stringify(this.props.enemyBoard));
    enemyBoardCopy[y][x].shot = true;

    const enemyShipsCopy = JSON.parse(JSON.stringify(this.props.enemyShips));
    let hitEnemyShip = false;
    let shipIndex = -1;
    // find the ship that was just shot at (if any)
    outerLoop:
    for (let i = 0; i < enemyShipsCopy.length; i++) {
      for (let j = 0; j < enemyShipsCopy[i].squares.length; j++) {
        const square = enemyShipsCopy[i].squares[j];
        if (Number(square.x) === Number(x) && Number(square.y) === Number(y)) {
          shipIndex = i;
          hitEnemyShip = true;
          break outerLoop;
        }
      }
    }

    let shipDestroyed = true;
    // if a ship was shot at, find if it is now destroyed
    if (hitEnemyShip) {
      const shotShip = enemyShipsCopy[shipIndex];

      for (const square of shotShip.squares) {
        if (!enemyBoardCopy[square.y][square.x].shot) {
          shipDestroyed = false;
          break;
        }
      }

      enemyShipsCopy[shipIndex].isDestroyed = shipDestroyed;
    } else {
      shipDestroyed = false;
    }

    // this was enemys last ship, you have won the game
    if (calculateAllRemainingShips(enemyShipsCopy) === 0) {
      if (this.props.player === 1) {
        this.props.setState({player2Board: enemyBoardCopy, player2Ships: enemyShipsCopy, turnOver: true, gameOver: true, message: 'Sank the last enemy ship!'});
      } else {
        this.props.setState({player1Board: enemyBoardCopy, player1Ships: enemyShipsCopy, turnOver: true, gameOver: true, message: 'Sank the last enemy ship!'});
      }

      return;
    }

    // gives a different message if this shot sank an enemy ship
    if (shipDestroyed) {
      if (this.props.player === 1) {
        this.props.setState({player2Board: enemyBoardCopy, player2Ships: enemyShipsCopy, turnOver: false, message: 'Sank an enemy ship!'});
      } else {
        this.props.setState({player1Board: enemyBoardCopy, player1Ships: enemyShipsCopy, turnOver: false, message: 'Sank an enemy ship!'});
      }
    }
    else if (hitEnemyShip) {
      if (this.props.player === 1) {
        this.props.setState({player2Board: enemyBoardCopy, player2Ships: enemyShipsCopy, turnOver: false, message: 'Hit an enemy ship!'});
      } else {
        this.props.setState({player1Board: enemyBoardCopy, player1Ships: enemyShipsCopy, turnOver: false, message: 'Hit an enemy ship!'});
      }
    }
    else {
      if (this.props.player === 1) {
        this.props.setState({player2Board: enemyBoardCopy, player2Ships: enemyShipsCopy, turnOver: true, message: 'Missed!'});
      } else {
        this.props.setState({player1Board: enemyBoardCopy, player1Ships: enemyShipsCopy, turnOver: true, message: 'Missed!'});
      }
    }
  }
}

// calculates remaining ships of a certain type (eg. 5 destroyers)
function calculateRemainingShips(ships, shipType) {
  let count = 0;

  for (const ship of ships) {
    if (ship.shipType === shipType && !ship.isDestroyed) {
      count++;
    }
  }

  return count;
}

// sum of all remaining ships
function calculateAllRemainingShips(ships) {
  let count = 0;

  for (const ship of ships) {
    if (!ship.isDestroyed) {
      count++;
    }
  }

  return count;
}

// checks if the ship on square x, y on board is destroyed (all squares fired at)
function isShipOnSquareDestroyed(ships, x, y) {
  let destroyed = false;

  outerLoop:
  for (let ship of ships) {
    for (let square of ship.squares) {
      if (Number(square.x) === Number(x) && Number(square.y) === Number(y)) {
        if (ship.isDestroyed) {
          destroyed = true;
          break outerLoop;
        } else {
          destroyed = false;
          break outerLoop;
        }
      }
    }
  }

  return destroyed;
}

// give turn to the other player or end game if won already
function NextTurnButton(props) {
  const {turnOver, gameOver, setState, player} = props;

  if (gameOver) {
    return (
      <div className="ready-button"
      onClick={e => {
        setState({
          turnOver: false,
          gameTurn: 0,
          showGameOverWindow: true,
          message: '',
          winner: player,
        });
      }}
    >
      Ready
    </div>
    );
  }

  if (!turnOver) return <></>;

  return (
    <div className="ready-button"
      onClick={e => {
        if (player === 1) {
          setState({
            turnOver: false,
            gameTurn: 2,
            showWaitingWindow: true,
            message: '',
          });

          return;
        } else if (player === 2) {
          setState({
            turnOver: false,
            gameTurn: 1,
            showWaitingWindow: true,
            message: '',
          });

          return;
        }
      }}
    >
      Ready
    </div>
  );
}

export default GameWindow;