import React from 'react';
import './UnplacedShip.css';

const shipSquareWidth = 40; // pixels
const shipSquareHeight = 30; // pixels

// represents ships that havent been placed on the board and can be dragged there
class UnplacedShip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {shipCount, shipType, setState} = this.props;

    switch(shipType) {
      case 0:
        // aircraft carrier
        return (
          <div className="unplaced-ship">
            <div>aircraft carriers: {shipCount}</div>
            <div className="aircraft-carrier" onMouseDown={handleDragStart(5, shipType)}></div>
          </div>
        );
      case 1:
        // battleship
        return (
          <div className="unplaced-ship">
            <div>battleships: {shipCount}</div>
            <div className="battleship" onMouseDown={handleDragStart(4, shipType)}></div>
          </div>
        );
      case 2:
        // cruiser
        return (
          <div className="unplaced-ship">
            <div>cruisers: {shipCount}</div>
            <div className="cruiser" onMouseDown={handleDragStart(3, shipType)}></div>
          </div>
        );
      case 3:
      // submarine
      return (
        <div className="unplaced-ship">
          <div>submarines: {shipCount}</div>
          <div className="submarine" onMouseDown={handleDragStart(3, shipType)}></div>
        </div>
      );
    case 4:
      // destroyer
      return (
        <div className="unplaced-ship">
          <div>destroyers: {shipCount}</div>
          <div className="destroyer" onMouseDown={handleDragStart(2, shipType)}></div>
        </div>
      );
    default:
      console.log('unplaced ship something went wrong');
      return <div></div>;
    }

    // player starts drag and drop of a ship
    function handleDragStart(shipSize, shipType) {
      return function(e) {
        if (shipCount === 0) {
          e.preventDefault();
          return;
        }

        setState({
          dragInfo: {
            isDragged: true,
            showDraggedShip: true,
            shipSize: shipSize,
            rotation: 0,
            shipType: shipType,
            x: e.clientX - Math.round(shipSize / 2 * shipSquareWidth),
            y: e.clientY - Math.round(1/2 * shipSquareHeight),
            boardSquareX: -1,
            boardSquareY: -1,
          }
        });
      }
    }
  }
}

export default UnplacedShip;