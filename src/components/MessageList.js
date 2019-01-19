import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super (props);
    this.state = {
      messages: [],
      newMessageContent: ''
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

    if (!this.state.newMessageContent) { return }
    this.messagesRef.push({
      content: this.state.newMessageContent,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      userName: this.props.userName,

    });
    this.setState ({ newMessageContent: '' });
  }


  handleChange(e) {
    this.setState({ newMessageContent: e.target.value });
  }

  render() {
    return (
     <section>
      {
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
    }
      <form id='create-message'
      onSubmit={ (e) => {
        e.preventDefault(); this.createMessage(this.state.newMessageContent)
      }} >
      <label>
        Message: <input type='text'
                        name='newMessage'
                        value={this.state.newMessageContent}
                        onChange={this.handleChange.bind(this)}
                        placeholder='Create a new message' />
      </label>
      <input type='submit' value='Submit' />
      </form>
    </section>
    );
  }
}

export default MessageList;
