import React from 'react';
import './DraggedShip.css';

class DraggedShip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {shipSize, dragInfo, setState} = this.props;

    if (!dragInfo.dragOn) return <div>no drag</div>

    console.log(shipSize);

    switch(shipSize) {
      case 5:
        // aircraft carrier
        return (
          <div className="aircraft-carrier-dragged" draggable="true"></div>
        );
      case 4:
        // battleship
        return (
          <div className="battleship-dragged" draggable="true"></div>
        );
      case 3:
        // cruiser
        return (
          <div className="cruiser-dragged" draggable="true"></div>
        );
      case 2:
      // submarine
      return (
        <div className="submarine-dragged" draggable="true"></div>
      );
    case 1:
      // destroyer
      return (
        <div className="destroyer-dragged" draggable="true"></div>
      );
    default:
      console.log('DraggedShip ship something went wrong');
      return <div></div>;
    }
  }
}

export default DraggedShip;