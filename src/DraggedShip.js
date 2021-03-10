import React from 'react';
import './DraggedShip.css';

class DraggedShip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {dragInfo, setState} = this.props;

    if (!dragInfo.isDragged || !dragInfo.showDraggedShip) return <></>

    const style = {
      position: 'absolute',
      top: dragInfo.y,
      left: dragInfo.x,
      transform: `rotate(${dragInfo.rotation}deg)`,
    }

    switch(dragInfo.shipType) {
      case 0:
        // aircraft carrier
        return (
          <div className="aircraft-carrier-dragged" style={style}></div>
        );
      case 1:
        // battleship
        return (
          <div className="battleship-dragged" style={style}></div>
        );
      case 2:
        // cruiser
        return (
          <div className="cruiser-dragged" style={style}></div>
        );
      case 3:
      // submarine
      return (
        <div className="submarine-dragged" style={style}></div>
      );
    case 4:
      // destroyer
      return (
        <div className="destroyer-dragged" style={style}></div>
      );
    default:
      console.log('DraggedShip ship something went wrong');
      return <div></div>;
    }
  }
}

export default DraggedShip;