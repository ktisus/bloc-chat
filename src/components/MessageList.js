import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super (props);
    this.state = {
      messages: [],
      newMessageName: ''
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message ) })
    });
  }

  createMessage(e) {
    e.preventDefault();
    if (!this.state.newMessageName) { return }
    this.messagesRef.push({
      content: this.state.newMessageName,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.username,

    });
    this.setState ({ newMessageName: e.target.value });
  }

  
  render() {
    return (
      (this.props.activeRoom !== '') ?
        <div className='message-list'>
        { this.state.messages.filter((message, index) =>
          this.props.activeRoom.key === message.roomId).map((message, index) =>
        <li className='messageId' key = {index}>
            {message.content}
        </li>
       )
      }
      </div>

      : <div> Select Your Room </div>
    );
  }
}

export default MessageList;
