import React from 'react';
import Board from './Board';
import Slate from './Slate';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <div className="board">
          <h2> Scrabble app </h2>
          <Board></Board>
        </div>
        <div className="playerSlate">
          <h2> Player slate </h2>
          <Slate></Slate>
        </div>
      </div>
    );
  }
};

export default App;
