import React from 'react';
import './Squares.css';
import './GameWindow.css';

class GameWindow extends React.Component {
  constructor(props) {
    super(props);

    this.handleShooting = this.handleShooting.bind(this);
  }

  render() {
    const {setState, ownBoard, enemyBoard, ownShips, enemyShips, player, boardSize, turnOver} = this.props;

    console.log(enemyBoard);

    return (
      <div className="game-window">
        <div className="game-info"></div>
        <div className="boards">
          <div id="own-board">
            {ownBoard.map((row, y) => {
              return (
                <div key={y} className="row">
                  {row.map((square, x) => {
                    if (ownBoard[y][x].shot) {
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
                        console.log('destroyed');
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

                      else {
                        return <div key={x} data-x={x} data-y={y} className="ship-part-unknown-shot"></div>
                      }
                    }


                    else {
                      // location of enemy ships is unknown unless the square is shot

                      if (turnOver) {
                        // cant fire if turn is over
                        return <div key={x} data-x={x} data-y={y} className="square" onClick={this.handleShooting}></div>
                      } else {
                        return <div key={x} data-x={x} data-y={y} className="fireable-square" onClick={this.handleShooting}></div>
                      }
                    }
                  })}
                  <NextTurnButton turnOver={turnOver} setState={setState} player={player} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }

  handleShooting(e) {
    const square = e.target;

    const x = square.dataset.x;
    const y = square.dataset.y;

    // player has already shot once on this turn
    if (this.props.turnOver) return;

    // cant shoot if the square has already been shot at
    if (this.props.enemyBoard[y][x].shot) return;

    const enemyBoardCopy = JSON.parse(JSON.stringify(this.props.enemyBoard));
    enemyBoardCopy[y][x].shot = true;

    const enemyShipsCopy = JSON.parse(JSON.stringify(this.props.enemyShips));
    let shipIndex = -1;
    // find the ship that was just shot at (if any)
    outerLoop:
    for (let i = 0; i < enemyShipsCopy.length; i++) {
      for (let j = 0; j < enemyShipsCopy[i].squares.length; j++) {
        const square = enemyShipsCopy[i].squares[j];
        if (Number(square.x) === Number(x) && Number(square.y) === Number(y)) {
          shipIndex = i;
          break outerLoop;
        }
      }
    }

    // if a ship was shot at, find if it is now destroyed
    if (shipIndex !== -1) {
      let shipDestroyed = true;
      const shotShip = enemyShipsCopy[shipIndex];

      console.log(shotShip);
      console.log(shotShip.isDestroyed);

      for (const square of shotShip.squares) {
        console.log(enemyBoardCopy[square.y][square.x].shot);
        if (!enemyBoardCopy[square.y][square.x].shot) {
          shipDestroyed = false;
          break;
        }
      }

      enemyShipsCopy[shipIndex].isDestroyed = shipDestroyed;
      console.log(enemyShipsCopy[shipIndex].isDestroyed);
    }

    if (this.props.player === 1) {
      this.props.setState({player2Board: enemyBoardCopy, player2Ships: enemyShipsCopy, turnOver: true});
    } else {
      this.props.setState({player1Board: enemyBoardCopy, player1Ships: enemyShipsCopy, turnOver: true});
    }
  }
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

  console.log(destroyed);

  return destroyed;
}

function NextTurnButton(props) {
  const {turnOver, setState, player} = props;

  if (!turnOver) return <></>;

  return (
    <div className="ready-button"
      onClick={e => {
        if (player === 1) {
          setState({
            turnOver: false,
            gameTurn: 2,
            showWaitingWindow: true,
          });

          return;
        } else if (player === 2) {
          setState({
            turnOver: false,
            gameTurn: 1,
            showWaitingWindow: true,
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