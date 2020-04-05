import React from 'react';
import Board from './Board';
import Slate from './Slate';
import ScoreBoard from './ScoreBoard';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <div className="slate">
          <h2> Letters </h2>
          <Slate></Slate>
          <h2> Score </h2>
          <ScoreBoard></ScoreBoard>
        </div>
        <div className="board">
          <h2> Scrabble app </h2>
          <Board></Board>
        </div>
        
      </div>
    );
  }
};

export default App;
