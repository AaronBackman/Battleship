import React from 'react';
import './UnplacedShip.css';

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
            <div className="aircraft-carrier" onDragStart={handleDragStart(5)} draggable="true"></div>
            <div>size: 5 squares</div>
          </div>
        );
      case 1:
        // battleship
        return (
          <div>
            <div>{shipCount}</div>
            <div>battleship</div>
            <div className="battleship" onDragStart={handleDragStart(4)} draggable="true"></div>
            <div>size: 4 squares</div>
          </div>
        );
      case 2:
        // cruiser
        return (
          <div>
            <div>{shipCount}</div>
            <div>cruiser</div>
            <div className="cruiser" onDragStart={handleDragStart(3)} draggable="true"></div>
            <div>size: 3 squares</div>
          </div>
        );
      case 3:
      // submarine
      return (
        <div>
          <div>{shipCount}</div>
          <div>submarine</div>
          <div className="submarine" onDragStart={handleDragStart(3)} draggable="true"></div>
          <div>size: 3 squares</div>
        </div>
      );
    case 4:
      // destroyer
      return (
        <div>
          <div>{shipCount}</div>
          <div>destroyer</div>
          <div className="destroyer" onDragStart={handleDragStart(2)} draggable="true"></div>
          <div>size: 2 squares</div>
        </div>
      );
    default:
      console.log('unplaced ship something went wrong');
      return <div></div>;
    }

    function handleDragStart(shipSize) {
      return function(e) {
        console.log('drag start');
        console.log(shipSize);

        setState({
          dragInfo: {
            canBeDropped: false,
            shipSize: shipSize,
            rotation: 0,
          }
        });
      }
    }
  }
}

export default UnplacedShip;