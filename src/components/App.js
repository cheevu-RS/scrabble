import React from 'react';
import Board from './Board';
import Slate from './Slate';
import ScoreBoard from './ScoreBoard';
import Chatbox from './Chatbox';
import Room from './Room';
import Username from './Username';
import Pregame from './Pregame';
import env from './../utils/env'
import { connect } from 'react-redux';
import io from 'socket.io-client';
import './App.css';

let mapStateToProps = (state) => {
  return {
    userData: state.userState,
    gameData : state.gameState
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  socket = io(env.API_BASE_URL + ":" + env.SOCKET_PORT)

  checkValid = async() => {
    // Sending the updated game state
    const valid = await fetch(env.API_BASE_URL + ":" + env.SOCKET_PORT + "/checkValid", {
      method : "POST",
      body : this.props.gameData
    })

    if(valid){
      console.log("Valid")
    }else{
      console.log("Invalid word")
    }
  }

  render() {
    let username = this.props.userData.username
    let room = this.props.userData.room
    let pregame = this.props.gameData.pregame
    if (username === "") {
      return (<Username />);
    } else if (room === "") {
      return (<Room socket={this.socket} />)
    } else if(pregame) {
      return (<Pregame socket={this.socket} />)
    }else{
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
            <button className="confirm" onClick={this.checkValid}> Confirm </button> 
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
