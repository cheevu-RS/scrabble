import React from 'react';
import Board from './Board';
import Slate from './Slate';
import ScoreBoard from './ScoreBoard';
import Chatbox from './Chatbox';
import Room from './Room';
import Username from './Username';
import env from './../utils/env'
import { connect } from 'react-redux';
import io from 'socket.io-client';
import './App.css';

let mapStateToProps = (state) => {
  return {
    userData: state.userState
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  socket = io("localhost:" +  env.socketPort)

  render() {
    let username = this.props.userData.username
    let room = this.props.userData.room
    if (username === "") {
      return (<Username />);
    } else if (room === "") {
      return (<Room socket={this.socket} />)
    } else {
      return (
        <div className="App">
          <div className="slate">
            <h2> Score </h2>
            <ScoreBoard></ScoreBoard>
            <h2> Letters </h2>
            <Slate></Slate>
          </div>
          <div className="board">
            <h2> Board </h2>
            <Board></Board>
          </div>
          <div className="chat">
            <h2> Chatbox </h2>
            <Chatbox socket={this.socket}></Chatbox>
          </div>
        </div>
      );
    }
  }
};

export default connect(mapStateToProps)(App);
