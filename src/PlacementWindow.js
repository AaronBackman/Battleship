import React from 'react';

import UnplacedShip from './UnplacedShip.js';
import DraggedShip from './DraggedShip.js';

import './PlacementWindow.css';

const shipSquareWidth = 40; // pixels
const shipSquareHeight = 30; // pixels
const boardSquareSize = 46; // pixels

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
                  if (this.props.selectedSquares[y] && this.props.selectedSquares[y][x]) {
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
    const boardStartX = board.clientLeft;
    const boardStartY = board.clientTop;
    const boardSize = this.props.boardSize;
    const boardEndX = boardStartX + boardSize * boardSquareSize;
    const boardEndY = boardStartY + boardSize * boardSquareSize;

    console.log(board);

    console.log(boardStartX);
    console.log(boardEndX);

    let showDraggedShip = true;

    // drag has now entered the board
    if (dragInfo.x > boardStartX && dragInfo.x < boardEndX && dragInfo.y > boardStartY && dragInfo.y < boardEndY) {
      showDraggedShip = false;
    }

    const dragInfoCopy = JSON.parse(JSON.stringify(dragInfo));
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

    console.log('drag leave');
    const boardSize = this.props.boardSize;
    const selectedSquares = new Array(boardSize).fill(0).map(x => Array(boardSize).fill(0));
    this.props.setState({selectedSquares: selectedSquares, dragInfo: dragInfoCopy});
  }

  handleDragOver(e) {
      e.preventDefault();
      const dragInfo = this.props.dragInfo;
      const square = e.target;
      const indexX = square.dataset.x;
      const indexY = square.dataset.y;

      console.log('drag over 1');

      if (!dragInfo.isDragged) {
        return;
      }

      console.log('dragEnter');
      const rotation = dragInfo.rotation;
      const x = Number(indexX);
      const y = Number(indexY);
      const center = Math.round(dragInfo.shipSize / 2);
      const boardSize = this.props.boardSize;

      let canDrop = true;

      if (!dragInfo.isDragged) {
        return;
      }

      const selectedSquares = new Array(boardSize).fill(0).map(x => Array(boardSize).fill(0));

      selectedSquares[y][x] = true;


      if (rotation === 0) {
        let i = 1;
        while (dragInfo.shipSize - center + i <= dragInfo.shipSize) {
          if (x + i < this.props.board.length && this.props.board[y][x].noShip) {
            selectedSquares[y][x + i] = true;
          } else {
            canDrop = false;
          }

          i++;
        }

        i = 1
        while (dragInfo.shipSize - center - i > 0) {
          if (x - i >= 0 && this.props.board[y][x].noShip) {
            selectedSquares[y][x - i] = true;
          } else {
            canDrop = false;
          }

          i++;
        }

        this.props.setState({
          selectedSquares: selectedSquares,
          dragInfo: {
            isDragged: true,
            canBeDropped: canDrop,
            showDraggedShip: false,
            shipSize: this.props.dragInfo.shipSize,
            rotation: this.props.dragInfo.rotation,
            shipType: this.props.dragInfo.shipType,
          }
        });
    } else if (rotation === 90) {
      let i = 1;
        while (dragInfo.shipSize - center + i <= dragInfo.shipSize) {
          if (y + i < this.props.board.length && this.props.board[y][x].noShip) {
            selectedSquares[y + i][x] = true;
          } else {
            canDrop = false;
          }

          i++;
        }

        i = 1
        while (dragInfo.shipSize - center - i > 0) {
          if (y - i >= 0 && this.props.board[y][x].noShip) {
            selectedSquares[y - i][x] = true;
          } else {
            canDrop = false;
          }

          i++;
        }

        this.props.setState({
          selectedSquares: selectedSquares,
          dragInfo: {
            isDragged: true,
            canBeDropped: canDrop,
            showDraggedShip: false,
            shipSize: this.props.dragInfo.shipSize,
            rotation: this.props.dragInfo.rotation,
            shipType: this.props.dragInfo.shipType,
          }
        });
    } else {
      console.log('invalid rotation!');
    }
  }

  handleDragEnd(e) {
    e.preventDefault();
    const dragInfo = this.props.dragInfo;

    if (!dragInfo.isDragged) {
      return;
    }
    
    const selectedSquares = this.props.selectedSquares;

    const boardCopy = JSON.parse(JSON.stringify(this.props.board));
    const boardSize = this.props.boardSize;
    const shipCountClone = JSON.parse(JSON.stringify(this.props.unplacedShipCount));

    console.log('dragend-1');

    // ship cant be placed on board, selected squares are reset
    if (!dragInfo.canBeDropped) {
      this.props.setState({
        selectedSquares: new Array(boardSize).fill(0).map(x => Array(boardSize).fill(0)),
        dragInfo: {
          isDragged: false,
          canBeDropped: false,
          showDraggedShip: false,
          shipSize: 0,
          rotation: 0,
          shipType: -1,
          x: -1,
          y: -1,
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
        selectedSquares: new Array(boardSize).fill(0).map(x => Array(boardSize).fill(0)),
        unplacedShipCount: shipCountClone,
        dragInfo: {
          isDragged: false,
          canBeDropped: false,
          showDraggedShip: false,
          shipSize: 0,
          rotation: 0,
          shipType: -1,
        },
      });
    } else {
      this.props.setState({
        player2Board: boardCopy,
        selectedSquares: new Array(boardSize).fill(0).map(x => Array(boardSize).fill(0)),
        unplacedShipCount: shipCountClone,
        dragInfo: {
          isDragged: false,
          canBeDropped: false,
          showDraggedShip: false,
          shipSize: 0,
          rotation: 0,
          shipType: -1,
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

export default PlacementWindow;