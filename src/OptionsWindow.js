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

        <div className="ship-selection-container">

          <div className="ship-selection">
            <div>Aircraft Carriers:</div>
            <input className="carrier-input"
              value={this.props.shipCount[0]}
              onChange={(e) => {
                const newValue = e.target.value;

                // cant have less than 0 ships
                if (newValue < 0) return;

                const copyArr = JSON.parse(JSON.stringify(this.props.shipCount));
                copyArr[0] = newValue;

                setState({shipCount: copyArr});
              }}
            />
          </div>

          <div className="ship-selection">
            <div>Battleships:</div>
            <input className="battleship-input"
              value={this.props.shipCount[1]}
              onChange={(e) => {
                const newValue = e.target.value;

                // cant have less than 0 ships
                if (newValue < 0) return;

                const copyArr = JSON.parse(JSON.stringify(this.props.shipCount));
                copyArr[1] = newValue;

                setState({shipCount: copyArr});
              }}
            />
          </div>

          <div className="ship-selection">
            <div>Cruisers:</div>
            <input className="cruiser-input"
              value={this.props.shipCount[2]}
              onChange={(e) => {
                const newValue = e.target.value;

                // cant have less than 0 ships
                if (newValue < 0) return;

                const copyArr = JSON.parse(JSON.stringify(this.props.shipCount));
                copyArr[2] = newValue;

                setState({shipCount: copyArr});
              }}
            />
          </div>

          <div className="ship-selection">
            <div>Submarines:</div>
            <input className="submarine-input"
              value={this.props.shipCount[3]}
              onChange={(e) => {
                const newValue = e.target.value;

                // cant have less than 0 ships
                if (newValue < 0) return;

                const copyArr = JSON.parse(JSON.stringify(this.props.shipCount));
                copyArr[3] = newValue;

                setState({shipCount: copyArr});
              }}
            />
          </div>

          <div className="ship-selection">
            <div>Destroyers:</div>
            <input className="destroyer-input"
              value={this.props.shipCount[4]}
              onChange={(e) => {
                const newValue = e.target.value;

                // cant have less than 0 ships
                if (newValue < 0) return;

                const copyArr = JSON.parse(JSON.stringify(this.props.shipCount));
                copyArr[4] = newValue;

                setState({shipCount: copyArr});
              }}
            />
          </div>

        </div>

        <div className="confirm-container">
          <div onClick={() => {
            const shipAreaSum = calculateShipSum(this.props.shipCount);

            if (this.props.boardSize * this.props.boardSize < 2 * shipAreaSum) return;

            this.props.setState({beginningTurn: 1});
          }}>
            Confirm
          </div>

          <div>{calculateShipSum(this.props.shipCount)}</div>
        </div>

      </div>
    );
  }
}

// calculates the total area taken by the selected ships
function calculateShipSum(shipArr) {
  return shipArr[0] * 5 + shipArr[1] * 4 + shipArr[2] * 3 + shipArr[3] * 3 + shipArr[4] * 2;
}

export default OptionsWindow;