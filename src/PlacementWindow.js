import React from 'react';

import UnplacedShip from './UnplacedShip.js';

import './PlacementWindow.css';

class PlacementWindow extends React.Component {
  constructor(props) {
    super(props);;

    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  render() {
    const board = this.props.board;

    document.addEventListener('dragend', this.handleDragEnd);

    return (
      <div className="root">
        <div>hello to placement</div>
        {board.map((row, y) => {
          return (<div key={y} className="row">{
            row.map((square, x) => {
              //console.log(`square x=${x}, y=${y}`);
              if (board[y] && board[y][x].noShip) {
                //console.log(`noship here square x=${x}, y=${y}`);
                if (this.props.selectedSquares[y] && this.props.selectedSquares[y][x]) {
                  return <div key={x} data-x={x} data-y={y} className="no-ship-selected" onDragOver={this.handleDragOver}></div>
                }

                return <div key={x} data-x={x} data-y={y} className="no-ship" onDragOver={this.handleDragOver}></div>
              } else {
                return <div key={x} data-x={x} data-y={y} className="yes-ship" onDragOver={this.handleDragOver}></div>
              }
            })
          }</div>);
        })}

        <div className="unplaced-ships-container">
          {this.props.unplacedShipCount.map((shipCount, index) => <UnplacedShip shipCount={shipCount} shipType={index} setState={p => this.props.setState(p)} />)}
        </div>
      </div>
    );
  }

  handleDragOver(e) {
      e.preventDefault();
      const square = e.target;
      const dragInfo = this.props.dragInfo;
      const x = Number(square.dataset.x);
      const y = Number(square.dataset.y);
      const center = Math.round(dragInfo.shipSize / 2);
      const boardSize = this.props.boardSize;

      let canDrop = true;

      const selectedSquares = new Array(boardSize).fill(0).map(x => Array(boardSize).fill(0));

      selectedSquares[y][x] = true;


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
          canBeDropped: canDrop,
          shipSize: this.props.dragInfo.shipSize,
          rotation: this.props.dragInfo.rotation,
          shipType: this.props.dragInfo.shipType,
        }
      });
  }

  handleDragEnd(e) {
    e.preventDefault();
    const dragInfo = this.props.dragInfo;
    const selectedSquares = this.props.selectedSquares;

    const boardCopy = JSON.parse(JSON.stringify(this.props.board));
    const boardSize = this.props.boardSize;
    const shipCountClone = JSON.parse(JSON.stringify(this.props.unplacedShipCount));

    console.log('dragend-1');

    // ship cant be placed on board, selected squares are reset
    if (!dragInfo.canBeDropped) {
      this.props.setState({selectedSquares: new Array(boardSize).fill(0).map(x => Array(boardSize).fill(0))});
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
      });
    } else {
      this.props.setState({
        player2Board: boardCopy,
        selectedSquares: new Array(boardSize).fill(0).map(x => Array(boardSize).fill(0)),
        unplacedShipCount: shipCountClone,
      });
    }
  }
}

export default PlacementWindow;