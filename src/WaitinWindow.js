import React from 'react';
import './WaitingWindow.css';

// this window is show when other players turn to do something comes
class WaitingWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {setState, waitedPlayer, waitedPlayerName} = this.props;

    return (
      <div className="waiting-window">
        <div className="button-container">
        <div className="button-message">Waiting for {waitedPlayerName} (player: {waitedPlayer})</div>
        <div className="button"
          onClick={
            e => {
              setState({showWaitingWindow: false});
            }
          }
        >
          I am here
        </div>
        </div>
      </div>
    );
  }
}

export default WaitingWindow;