import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.props.setUser(user);
    });
  }

  signOut() {
  /*  this.props.firebase.auth().signOut().then(() => {
      this.props.setUser(null);
    });
  */
  this.props.firebase.auth().signOut();
  }

  render() {
    return (

        <div className='User'>
          <p>Username: {this.props.user ? this.props.user.displayName: 'Guest'} </p>
          <button onClick={this.props.user ? this.signOut : this.signIn}> {
            this.props.user ? 'Sign Out' : 'Sign In'
          } </button>
        </div>
    );
  }
}

export default User;
