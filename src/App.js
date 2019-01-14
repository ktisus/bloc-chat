import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

/*<script src="https://www.gstatic.com/firebasejs/5.7.2/firebase.js"></script>
*/
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBUyuBiByfhaM3pTOeGMhkc2-Z_l0lYhFU",
    authDomain: "bloc-chat-f0c4c.firebaseapp.com",
    databaseURL: "https://bloc-chat-f0c4c.firebaseio.com",
    projectId: "bloc-chat-f0c4c",
    storageBucket: "bloc-chat-f0c4c.appspot.com",
    messagingSenderId: "937939382319"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeRoom: ''
    }
    this.setRoom = this.setRoom.bind(this);
  }

  setRoom(room) {
    this.setState({ activeRoom: room });
    console.log(this.state.activeRoom)
  }

  render() {
    return (
        <div className="App">
          <RoomList
          firebase={ firebase }
          setRoom = {(room) => this.setRoom(room) } />
          <MessageList
          firebase={ firebase }
          activeRoom = { this.state.activeRoom }
          username = '' />
      </div>
    );
  }
}

export default App;
