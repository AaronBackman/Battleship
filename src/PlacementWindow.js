import React from 'react';

import UnplacedShip from './UnplacedShip.js';

import './PlacementWindow.css';

const maxBoardSize = 10;

class PlacementWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unplacedShipCount: JSON.parse(JSON.stringify(props.shipCount)),
      selectedSquares: new Array(maxBoardSize).fill(0).map(x => Array(maxBoardSize).fill(0)),
      dragInfo: {
        canBeDropped: false,
        shipSize: 0,
        rotation: 0,
      }
    };

    console.log("board")
    console.log(props.board.length);

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
                if (this.state.selectedSquares[y] && this.state.selectedSquares[y][x]) {
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
          {this.state.unplacedShipCount.map((shipCount, index) => <UnplacedShip shipCount={shipCount} shipType={index} setState={p => this.setState(p)} />)}
        </div>
      </div>
    );
  }

  handleDragOver(e) {
      e.preventDefault();
      const square = e.target;
      const dragInfo = this.state.dragInfo;
      const x = Number(square.dataset.x);
      const y = Number(square.dataset.y);
      const center = Math.round(dragInfo.shipSize / 2);

      let canDrop = true;

      const selectedSquares = new Array(maxBoardSize).fill(0).map(x => Array(maxBoardSize).fill(0));

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

      this.setState({
        selectedSquares: selectedSquares,
        dragInfo: {
          canBeDropped: canDrop,
          shipSize: this.state.dragInfo.shipSize,
          rotation: this.state.dragInfo.rotation,
        }
      });
  }

  handleDragEnd(e) {
    e.preventDefault();
    const dragInfo = this.state.dragInfo;
    const selectedSquares = this.state.selectedSquares;

    const boardCopy = JSON.parse(JSON.stringify(this.props.board));

    console.log('dragend-1');

    // ship cant be placed on board, selected squares are reset
    if (!dragInfo.canBeDropped) {
      this.setState({selectedSquares: new Array(maxBoardSize).fill(0).map(x => Array(maxBoardSize).fill(0))});
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

    if (this.props.player === 1) {
      console.log(this.props);
      this.props.setState({player1Board: boardCopy});
    } else {
      this.props.setState({player2Board: boardCopy});
    }
  }
}

export default PlacementWindow;