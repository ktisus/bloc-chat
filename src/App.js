import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

/*<script src="https://www.gstatic.com/firebasejs/5.7.2/firebase.js"></script>
*/
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUyuBiByfhaM3pTOeGMhkc2-Z_l0lYhFU",
    authDomain: "bloc-chat-f0c4c.firebaseapp.com",
    databaseURL: "https://bloc-chat-f0c4c.firebaseio.com",
    projectId: "bloc-chat-f0c4c",
    storageBucket: "bloc-chat-f0c4c.appspot.com",
    messagingSenderId: "937939382319"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
        <div className="App">
        <header>
          <h1> Bloc Chat </h1>
          <RoomList firebase={ firebase } />
        </header>
      </div>
    );
  }
}

export default App;
