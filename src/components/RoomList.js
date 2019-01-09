import React, { Component } from 'react';

class RoomList extends Component {
    constructor (props) {
      super (props);
      this.state = {
        rooms: [],
        newRoomName: ''
      };

      this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount () {
      this.roomsRef.on('child_added', snapshot => {
      /*  console.log(snapshot);  to see what the snapshot object for each room */
        const room = snapshot.val();
        room.key = snapshot.key;

      /*  this.setState({ rooms: this.state.rooms.concat( snapshot.val() ) }); */
        this.setState({ rooms: this.state.rooms.concat( room ) })
      });
    }
/* .concat(): either add items to an array or merge arrays, returns a new array without changing the existing array */

    createRoom(newRoomName) {
      if (!newRoomName) { return }
      this.roomsRef.push({
        name: newRoomName
      });
      this.setState({ newRoomName: '' });
    }

    handleChange(e) {
      this.setState({ newRoomName: e.target.value });
    }

render() {
    return (
      <section>
        <h1> Bloc Chat </h1>
          <section className="room-list">
            {this.state.rooms.map( room =>
                <li key={room.key} >
                  <button className="room-name">{room.name}</button>
                </li>
            )}
          </section>
          <form id='create-room'
            onSubmit={(e) => {e.preventDefault();
            this.createRoom(this.state.newRoomName)}} >
            <label>
              New Room:
              <input type='text'
                     name='newRoomName'
                     value={ this.state.newRoomName }
                     onChange={this.handleChange.bind(this)}
                     placeholder='Create a new room' />
            </label>
            <button type='submit' value='Submit'> Submit </button>
          </form>
       </section>
      );
     }
   }

export default RoomList;
