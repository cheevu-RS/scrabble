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
import Rules from './Rules';

let mapStateToProps = (state) => {
  return {
    userData: state.userState
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isBoardVisible : true,
      isRulesVisible : false
    }
  }

  socket = io(env.API_BASE_URL + ":" + env.SOCKET_PORT)
  toggleGameRules = () => {
    this.setState({isBoardVisible : !(this.state.isBoardVisible),
                  isRulesVisible : !(this.state.isRulesVisible)})
  }

  render() {
     
    
    let username = this.props.userData.username
    let room = this.props.userData.room
    if (username === "") {
      return (<Username />);
    } else if (room === "") {
      return (<Room socket={this.socket} />)
    } else if(this.state.isBoardVisible){
      return (
        <div className="App">
          <div className="slate">
            <h2> Score </h2>
            <ScoreBoard></ScoreBoard>
            <h2> Room Info </h2>
            <p> Room ID : {room}</p>
            <h2> Letters </h2>
            <Slate></Slate>
            <button value = {"Rules"} onClick = { this.toggleGameRules }> See Game Rules </button>
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
    else if(this.state.isRulesVisible){ 
    return (<div className = "rules">
            <Rules />
            <div className = "Btn-div"> 
            <button className = "back" onClick = {this.toggleGameRules}> Show Board </button>
            </div>
          </div> 
 );
  }

} 
}

export default connect(mapStateToProps)(App);
