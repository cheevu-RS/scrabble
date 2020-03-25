import React from 'react';
import Board from './Board'
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  
  render(){
    return (
      <div className="App">
        <h2>Scrabble app</h2>
        <Board></Board>
      </div>
    );
  }
};

export default App;
