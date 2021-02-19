import React from 'react';
import './PlacementWindow.css';

class PlacementWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unplacedShipCount: JSON.parse(JSON.stringify(props.shipCount))
    };
  }

  render() {
    let x = -1;
    let y = -1;

    const board = this.props.board;

    console.log(board);

    return (
      <div className="root">
        <div>hello to placement</div>
        {board.map(row => {
          y++;
          x = -1;
          return (<div key={y} className="row">{
            row.map(square => {
              x++;
              console.log(`square x=${x}, y=${y}`);
              if (board[y] && board[y][x].noShip) {
                console.log(`noship here square x=${x}, y=${y}`);
                return <div key={x} className="no-ship"></div>
              } else {
                return <div key={x} className="yes-ship"></div>
              }
            })
          }</div>);
        })}
      </div>
    );
  }
}

export default PlacementWindow;