import React from 'react';
import Board from './Board';
import Slate from './Slate';
import ScoreBoard from './ScoreBoard';
import Chatbox from './Chatbox';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
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
          <Chatbox></Chatbox>
        </div>
      </div>
    );
  }
};

export default App;
