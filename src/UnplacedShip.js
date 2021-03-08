import React from 'react';
import './UnplacedShip.css';

const shipSquareWidth = 40; // pixels
const shipSquareHeight = 30; // pixels

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
          <div>
            <div>{shipCount}</div>
            <div>aircraft carrier</div>
            <div className="aircraft-carrier" onMouseDown={handleDragStart(5, shipType)}></div>
            <div>size: 5 squares</div>
          </div>
        );
      case 1:
        // battleship
        return (
          <div>
            <div>{shipCount}</div>
            <div>battleship</div>
            <div className="battleship" onMouseDown={handleDragStart(4, shipType)}></div>
            <div>size: 4 squares</div>
          </div>
        );
      case 2:
        // cruiser
        return (
          <div>
            <div>{shipCount}</div>
            <div>cruiser</div>
            <div className="cruiser" onMouseDown={handleDragStart(3, shipType)}></div>
            <div>size: 3 squares</div>
          </div>
        );
      case 3:
      // submarine
      return (
        <div>
          <div>{shipCount}</div>
          <div>submarine</div>
          <div className="submarine" onMouseDown={handleDragStart(3, shipType)}></div>
          <div>size: 3 squares</div>
        </div>
      );
    case 4:
      // destroyer
      return (
        <div>
          <div>{shipCount}</div>
          <div>destroyer</div>
          <div className="destroyer" onMouseDown={handleDragStart(2, shipType)}></div>
          <div>size: 2 squares</div>
        </div>
      );
    default:
      console.log('unplaced ship something went wrong');
      return <div></div>;
    }

    function handleDragStart(shipSize, shipType) {
      return function(e) {
        if (shipCount === 0) {
          e.preventDefault();
          return;
        }

        console.log('drag start');
        console.log(shipSize);

        setState({
          dragInfo: {
            isDragged: true,
            canBeDropped: false,
            showDraggedShip: true,
            shipSize: shipSize,
            rotation: 0,
            shipType: shipType,
            x: e.clientX - Math.round(shipSize / 2 * shipSquareWidth),
            y: e.clientY - Math.round(1/2 * shipSquareHeight),
          }
        });
      }
    }
  }
}

export default UnplacedShip;