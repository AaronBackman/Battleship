import React from 'react';

import UnplacedShip from './UnplacedShip.js';
import DraggedShip from './DraggedShip.js';

import './PlacementWindow.css';

const shipSquareWidth = 40; // pixels
const shipSquareHeight = 30; // pixels
const boardSquareSize = 46; // pixels

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
      <div className="root">
        <div>hello to placement</div>
        <div id="board">
          {board.map((row, y) => {
            return (<div key={y} className="row">{
              row.map((square, x) => {
                //console.log(`square x=${x}, y=${y}`);
                if (board[y] && board[y][x].noShip) {
                  //console.log(`noship here square x=${x}, y=${y}`);
                  if (selectedSquares[y] && selectedSquares[y][x]) {
                    return <div key={x} data-x={x} data-y={y} className="no-ship-selected" onMouseEnter={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                  }

                  return <div key={x} data-x={x} data-y={y} className="no-ship" onMouseEnter={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                } else {
                  return <div key={x} data-x={x} data-y={y} className="yes-ship" onMouseEnter={this.handleDragOver} onMouseLeave={this.handleDragLeave}></div>
                }
              })
            }</div>);
          })}
        </div>

        <div className="unplaced-ships-container">
          {this.props.unplacedShipCount.map((shipCount, index) => <UnplacedShip shipCount={shipCount} shipType={index} setState={p => this.props.setState(p)} />)}
        </div>
        <DraggedShip dragInfo={dragInfo} setState={p => this.props.setState(p)} />
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
      console.log('dont show ship');
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

    //console.log(board);

    console.log(boardStartX, boardEndX, boardStartY, boardEndY);

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

    if (!dragInfo.isDragged) {
      return;
    }

    const dragInfoCopy = JSON.parse(JSON.stringify(dragInfo));
    dragInfoCopy.showDraggedShip = true;
    dragInfoCopy.boardSquareX = -1;
    dragInfoCopy.boardSquareY = -1;

    console.log('drag leave');
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

    console.log('dragend-1');

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

    console.log('dragend-2');

    for (let i = 0; i < selectedSquares.length; i++) {
      for (let j = 0; j < selectedSquares.length; j++) {
        if (selectedSquares[i][j]) {
          console.log('ship part placed');
          boardCopy[i][j] = {
            fog: false,
            shot: false,
            noShip: false,
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
}

function calculateSelection(board, dragInfo) {
  const x = Number(dragInfo.boardSquareX);
  const y = Number(dragInfo.boardSquareY);

  const rotation = dragInfo.rotation;
  const center = Math.round(dragInfo.shipSize / 2);

  let canDrop = true;

  const selectedSquares = new Array(board.length).fill(0).map(x => Array(board.length).fill(0));

  if (board[y][x].noShip) {
    selectedSquares[y][x] = true;
  } else {
    canDrop = false;
  }


  if (rotation === 0) {
    let i = 1;
    while (dragInfo.shipSize - center + i <= dragInfo.shipSize) {
      if (x + i < board.length && board[y][x + i].noShip) {
        selectedSquares[y][x + i] = true;
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
        selectedSquares[y][x - i] = true;
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
        selectedSquares[y + i][x] = true;
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
        selectedSquares[y - i][x] = true;
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

  console.log(canDrop);

  return (
    {
      selectedSquares: selectedSquares,
      canBeDropped: canDrop,
    }
  );
}

export default PlacementWindow;