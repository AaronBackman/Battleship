import React from 'react';
import './Message.css';

// used to show a message to the player, is at a fixed (absolute) location
class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const message = this.props.message;

    if (message) {
      return (
        <div className="message-container">
          <div>{message}</div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Message;