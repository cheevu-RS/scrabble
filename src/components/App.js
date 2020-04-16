import React from 'react';
import Board from './Board';
import Slate from './Slate';
import ScoreBoard from './ScoreBoard';
import Chatbox from './Chatbox';
import Username from './Username';
import { connect } from 'react-redux';
import './App.css';

let mapStateToProps = (state) => {
  return {
    userData : state.userState
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let username = this.props.userData.username
    return (username != "" ? (
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
          <Chatbox></Chatbox>
        </div>
      </div>
    ) : (<Username />));
  }
};

export default connect(mapStateToProps)(App);
