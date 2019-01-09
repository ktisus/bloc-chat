import React, { Component } from 'react';

class RoomList extends Component {
    constructor (props) {
      super (props);
      this.state = {
        rooms: []
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


render() {
    return (
      <section className="room-list">
            {this.state.rooms.map( room =>
                <li key={room.key} >
                  <button className="room-name">{room.name}</button>
                </li>
            )}
       </section>
      );
     }
   }

export default RoomList;
