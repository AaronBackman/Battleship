import React from 'react';

import UnplacedShip from './UnplacedShip.js';
import DraggedShip from './DraggedShip.js';

import './PlacementWindow.css';
import './Squares.css';

const shipSquareWidth = 50; // pixels
const shipSquareHeight = 40; // pixels
const boardSquareSize = 56; // pixels

let selectedSquares;
let canBeDropped = false;

class PlacementWindow extends React.Component {
  constructor(props) {
    super(props);;

    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleRotation = this.handleRotation.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleTurnEnd = this.handleTurnEnd.bind(this);
  }

  render() {
    const board = this.props.board;
    const dragInfo = this.props.dragInfo;

    document.addEventListener('mouseup', this.handleDragEnd);
    document.addEventListener('keydown', this.handleRotation);
    document.addEventListener('mousemove', this.handleDragMove)
    document.addEventListener('mousedown', e => e.preventDefault());

    if (dragInfo.isDragged && dragInfo.boardSquareX !== -1 && dragInfo.boardSquareY !== -1) {
      const selectionObj = calculateSelection(board, dragInfo);
      selectedSquares = selectionObj.selectedSquares;
      canBeDropped = selectionObj.canBeDropped;

    } else {
      selectedSquares = new Array(board.length).fill(0).map(x => Array(board.length).fill(0));
    }

    return (
      <div className="placement-window">
        <div id="board">
          {board.map((row, y) => {
            return (<div key={y} className="row">{
              row.map((square, x) => {
                if (!board[y][x].ship && !selectedSquares[y][x].selected) {
                  return <div key={x} data-x={x} data-y={y} className="square" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                }
                else if (selectedSquares[y][x].selected) {
                  if (canBeDropped) {
                    if (selectedSquares[y][x].shipCenterPartHorizontal) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-center-horizontal-green" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipCenterPartVertical) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-center-vertical-green" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipTopPart) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-top-green" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipBottomPart) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-bottom-green" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipLeftPart) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-left-green" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipRightPart) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-right-green" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                  }
                  else {
                    if (selectedSquares[y][x].shipCenterPartHorizontal) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-center-horizontal-red" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipCenterPartVertical) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-center-vertical-red" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipTopPart) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-top-red" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipBottomPart) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-bottom-red" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipLeftPart) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-left-red" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                    else if (selectedSquares[y][x].shipRightPart) {
                      return (
                        <div key={x} data-x={x} data-y={y} className="ship-part-right-red" onMouseOver={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                      );
                    }
                  }
                }
                
                else if (board[y][x].ship.hasShip) {
                  if (board[y][x].ship.shipCenterPartHorizontal) {
                    return (
                      <div key={x} data-x={x} data-y={y} className="ship-part-center-horizontal" onMouseEnter={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                    );
                  }
                  else if (board[y][x].ship.shipCenterPartVertical) {
                    return (
                      <div key={x} data-x={x} data-y={y} className="ship-part-center-vertical" onMouseEnter={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                    );
                  }
                  else if (board[y][x].ship.shipTopPart) {
                    return (
                      <div key={x} data-x={x} data-y={y} className="ship-part-top" onMouseEnter={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                    );
                  }
                  else if (board[y][x].ship.shipBottomPart) {
                    return (
                      <div key={x} data-x={x} data-y={y} className="ship-part-bottom" onMouseEnter={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                    );
                  }
                  else if (board[y][x].ship.shipLeftPart) {
                    return (
                      <div key={x} data-x={x} data-y={y} className="ship-part-left" onMouseEnter={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                    );
                  }
                  else if (board[y][x].ship.shipRightPart) {
                    return (
                      <div key={x} data-x={x} data-y={y} className="ship-part-right" onMouseEnter={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                    );
                  }
                }
              })
            }</div>);
          })}
        </div>

        <div className="unplaced-ships-container">
          {this.props.unplacedShipCount.map((shipCount, index) => <UnplacedShip key={index} shipCount={shipCount} shipType={index} setState={p => this.props.setState(p)} />)}
        </div>
        <DraggedShip dragInfo={dragInfo} setState={p => this.props.setState(p)} />
        <div className="ready-button" onClick={this.handleTurnEnd}>Ready</div>
      </div>
    );
  }

  handleDragMove(e) {
    const dragInfo = this.props.dragInfo;
    const setState = this.props.setState;

    if (!dragInfo.isDragged) {
      return;
    }

    if (!dragInfo.showDraggedShip) {
      return;
    }

    if (dragInfo.x === e.clientX && dragInfo.y === e.clientY) {
      return;
    }

    const board = document.getElementById('board');
    const boardRect = board.getBoundingClientRect();
    const boardStartX = boardRect.left;
    const boardStartY = boardRect.top;
    const boardSize = this.props.boardSize;
    const boardEndX = boardStartX + boardSize * boardSquareSize;
    const boardEndY = boardStartY + boardSize * boardSquareSize;


    let showDraggedShip = true;

    const dragInfoCopy = JSON.parse(JSON.stringify(dragInfo));

    // drag has now entered the board
    if (e.clientX > boardStartX && e.clientX < boardEndX && e.clientY > boardStartY && e.clientY < boardEndY) {
      showDraggedShip = false;
      dragInfoCopy.showDraggedShip = showDraggedShip;
      setState({dragInfo: dragInfoCopy});

      return;
    }

    dragInfoCopy.x = e.clientX - Math.round(dragInfo.shipSize / 2 * shipSquareWidth);
    dragInfoCopy.y = e.clientY - Math.round(1/2 * shipSquareHeight);
    dragInfoCopy.showDraggedShip = showDraggedShip;
    setState({dragInfo: dragInfoCopy});
  }

  handleDragLeave(e) {
    e.preventDefault();
    const dragInfo = this.props.dragInfo;

    canBeDropped = false;

    if (!dragInfo.isDragged) {
      return;
    }

    const dragInfoCopy = JSON.parse(JSON.stringify(dragInfo));
    dragInfoCopy.showDraggedShip = true;
    dragInfoCopy.boardSquareX = -1;
    dragInfoCopy.boardSquareY = -1;

    this.props.setState({dragInfo: dragInfoCopy});
  }

  handleDragOver(e) {
    e.preventDefault();
    const dragInfo = this.props.dragInfo;
    const square = e.target;
    const x = Number(square.dataset.x);
    const y = Number(square.dataset.y);

    if (!dragInfo.isDragged) {
      return;
    }

    this.props.setState({
      dragInfo: {
        isDragged: true,
        showDraggedShip: false,
        shipSize: dragInfo.shipSize,
        rotation: dragInfo.rotation,
        shipType: dragInfo.shipType,
        x: -1,
        y: -1,
        boardSquareX: x,
        boardSquareY: y,
      }
    });
  }

  handleDragEnd(e) {
    e.preventDefault();
    const dragInfo = this.props.dragInfo;

    if (!dragInfo.isDragged) {
      return;
    }

    const boardCopy = JSON.parse(JSON.stringify(this.props.board));
    const shipCountClone = JSON.parse(JSON.stringify(this.props.unplacedShipCount));

    // ship cant be placed on board, selected squares are reset
    if (!canBeDropped) {
      this.props.setState({
        dragInfo: {
          isDragged: false,
          showDraggedShip: false,
          shipSize: 0,
          rotation: 0,
          shipType: -1,
          x: -1,
          y: -1,
          boardSquareX: -1,
          boardSquareY: -1,
        }
      });
      return;
    }

    for (let i = 0; i < selectedSquares.length; i++) {
      for (let j = 0; j < selectedSquares.length; j++) {
        if (selectedSquares[i][j].selected) {
          const selectedSquareCopy = JSON.parse(JSON.stringify(selectedSquares[i][j]));
          selectedSquareCopy.selected = undefined;
          selectedSquareCopy.hasShip = true;
          boardCopy[i][j] = {
            fog: false,
            shot: false,
            ship: selectedSquareCopy,
          };
        }
      }
    }

    shipCountClone[+dragInfo.shipType] = +shipCountClone[+dragInfo.shipType] - 1;

    if (this.props.player === 1) {
      this.props.setState({
        player1Board: boardCopy,
        unplacedShipCount: shipCountClone,
        dragInfo: {
          isDragged: false,
          showDraggedShip: false,
          shipSize: 0,
          rotation: 0,
          shipType: -1,
          x: -1,
          y: -1,
          boardSquareX: -1,
          boardSquareY: -1,
        },
      });
    } else {
      this.props.setState({
        player2Board: boardCopy,
        unplacedShipCount: shipCountClone,
        dragInfo: {
          isDragged: false,
          showDraggedShip: false,
          shipSize: 0,
          rotation: 0,
          shipType: -1,
          x: -1,
          y: -1,
          boardSquareX: -1,
          boardSquareY: -1,
        },
      });
    }
  }

  handleRotation(e) {
    const dragInfo = this.props.dragInfo;
    const setState = this.props.setState;

    // keycode for r is 82
    if (e.keyCode === 82 && dragInfo.isDragged) {
      const dragInfoCopy = JSON.parse(JSON.stringify(dragInfo));

      if (dragInfoCopy.rotation === 0) {
        dragInfoCopy.rotation = 90;
      } else {
        dragInfoCopy.rotation = 0;
      }

      setState({dragInfo: dragInfoCopy});
    }
  }

  handleTurnEnd(e) {
    const unplacedShipCountSum = this.props.unplacedShipCount.reduce((a, b) => a + b, 0);
    // all ships must be placed
    if (unplacedShipCountSum > 0) return;

    console.log('turn end');
    console.log(this.props.player);

    // player 1 want to end placement of ships, next is player 2
    if (this.props.player === 1) {
      this.props.setState({beginningTurn: 2, gameTurn: 0, showWaitingWindow: true});
    }
    // player 2 want to end placement of ships, game starts
    else if (this.props.player === 2) {
      this.props.setState({beginningTurn: 0, gameTurn: 1, showWaitingWindow: true});
    }
  }
}

function calculateSelection(board, dragInfo) {
  const x = Number(dragInfo.boardSquareX);
  const y = Number(dragInfo.boardSquareY);

  const rotation = dragInfo.rotation;
  const center = Math.round(dragInfo.shipSize / 2);

  let canDrop = true;

  const selectedSquares = new Array(board.length).fill(0).map(x => Array(board.length).fill(0));

  if (board[y][x].noShip) {
    if (rotation === 0) {
      selectedSquares[y][x] = {selected: true, shipCenterPartHorizontal: true};
    } else {
      selectedSquares[y][x] = {selected: true, shipCenterPartVertical: true};
    }

    // adjacent square has a ship -> ship cant be placed
    if (board[y] && board[y][x + 1] && !board[y][x + 1].noShip) {
      canDrop = false;
    }

    // adjacent square has a ship -> ship cant be placed
    if (board[y] && board[y][x - 1] && !board[y][x- 1].noShip) {
      canDrop = false;
    }

    // adjacent square has a ship -> ship cant be placed
    if (board[y + 1] && board[y + 1][x] && !board[y + 1][x].noShip) {
      canDrop = false;
    }

    // adjacent square has a ship -> ship cant be placed
    if (board[y - 1] && board[y - 1][x] && !board[y - 1][x].noShip) {
      canDrop = false;
    }
  } else {
    canDrop = false;
  }


  if (rotation === 0) {
    let i = 1;
    while (dragInfo.shipSize - center + i <= dragInfo.shipSize) {
      if (x + i < board.length && board[y][x + i].noShip) {
        if (dragInfo.shipSize - center + i === dragInfo.shipSize) {
          selectedSquares[y][x + i] = {selected: true, shipRightPart: true};
        } else {
          selectedSquares[y][x + i] = {selected: true, shipCenterPartHorizontal: true};
        }
      } else {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y] && board[y][x + i + 1] && !board[y][x + i + 1].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y] && board[y][x + i - 1] && !board[y][x + i - 1].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y + 1] && board[y + 1][x + i] && !board[y + 1][x + i].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y - 1] && board[y - 1][x + i] && !board[y - 1][x + i].noShip) {
        canDrop = false;
      }

      i++;
    }

    i = 1
    while (dragInfo.shipSize - center - i > 0) {
      if (x - i >= 0 && board[y][x - i].noShip) {
        if (dragInfo.shipSize - center - i === 1) {
          selectedSquares[y][x - i] = {selected: true, shipLeftPart: true};
        } else {
          selectedSquares[y][x - i] = {selected: true, shipCenterPartHorizontal: true};
        }
      } else {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y] && board[y][x - i + 1] && !board[y][x - i + 1].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y] && board[y][x - i - 1] && !board[y][x - i - 1].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y + 1] && board[y + 1][x - i] && !board[y + 1][x - i].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y - 1] && board[y - 1][x - i] && !board[y - 1][x - i].noShip) {
        canDrop = false;
      }

      i++;
    }
  } else if (rotation === 90) {
    let i = 1;
    while (dragInfo.shipSize - center + i <= dragInfo.shipSize) {
      if (y + i < board.length && board[y + i][x].noShip) {
        if (dragInfo.shipSize - center + i === dragInfo.shipSize) {
          selectedSquares[y + i][x] = {selected: true, shipBottomPart: true};
        } else {
          selectedSquares[y + i][x] = {selected: true, shipCenterPartVertical: true};
        }
      } else {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y + i] && board[y + i][x + 1] && !board[y + i][x + 1].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y + i] && board[y + i][x - 1] && !board[y + i][x - 1].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y + i + 1] && board[y + i + 1][x + i] && !board[y + i + 1][x].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y + i - 1] && board[y + i - 1][x + i] && !board[y + i - 1][x].noShip) {
        canDrop = false;
      }

      i++;
    }

    i = 1
    while (dragInfo.shipSize - center - i > 0) {
      if (y - i >= 0 && board[y - i][x].noShip) {
        if (dragInfo.shipSize - center - i === 1) {
          selectedSquares[y - i][x] = {selected: true, shipTopPart: true};
        } else {
          selectedSquares[y - i][x] = {selected: true, shipCenterPartVertical: true};
        }
      } else {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y - i] && board[y - i][x + 1] && !board[y - i][x + 1].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y - i] && board[y - i][x - 1] && !board[y - i][x - 1].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y - i + 1] && board[y - i + 1][x + i] && !board[y - i + 1][x].noShip) {
        canDrop = false;
      }

      // adjacent square has a ship -> ship cant be placed
      if (board[y - i - 1] && board[y - i - 1][x + i] && !board[y - i - 1][x].noShip) {
        canDrop = false;
      }

      i++;
    }
  }

  return (
    {
      selectedSquares: selectedSquares,
      canBeDropped: canDrop,
    }
  );
}

export default PlacementWindow;