import React from 'react';
import './OptionsWindow.css';

class OptionsWindow extends React.Component {
  render() {
    const setState = this.props.setState;

    return (
      <div className="root">
        <div className="row">
          <div className="player-names-container">

            <div className="player-names-selection">
              <div>Player 1 name:</div>
              <input className="player-1-name"
                value={this.props.player1Name}
                onChange={(e) => {
                  setState({player1Name: e.target.value});
                }}
              />
            </div>

            <div className="player-names-selection">
              <div>Player 2 name:</div>
              <input className="player-2-name"
                value={this.props.player2Name}
                onChange={(e) => {
                  setState({player2Name: e.target.value});
                }}
              />
            </div>

          </div>
        </div>

        <div className="board-size-container">
          <div className="board-size-display">
            <div className="board-size-number">{this.props.boardSize}</div>
            <div>X</div>
            <div className="board-size-number">{this.props.boardSize}</div>
          </div>

          <div className="board-size-selection">
            <div className="board-size-up"
              onClick={() => {
                if (this.props.boardSize === 10) return;
                setState({boardSize: this.props.boardSize + 1});
              }}
            >
              Increase
            </div>
            <div className="board-size-down"
              onClick={(e) => {
                if (this.props.boardSize === 5) return;
                setState({boardSize: this.props.boardSize - 1});
              }}
            >
              Decrease
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default OptionsWindow;