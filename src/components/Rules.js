import React from 'react';
import { connect } from 'react-redux';
import './Rules.css'
import App from './App.js';

class Rules extends React.Component {
    constructor(props) {
        super(props)
      }

    render() {

        return (<div>
        <h1 className = "Heading">Scrabble Rules</h1>
        <div className = "rules">
        <p>The basic objective of Scrabble is to play tiles marked with letters on a 15x15 grid to form words. After the initial word is played, players take turns adding words to existing letters.</p>
        <p> Games only have two players. Each match has two games, one with each player playing first. </p>
        <p> Players initially draw 7 tiles each and place them on their rack. </p>
        <p> The first player combines two or more of his or her letters to form a word and places it on the board to read either across or down with one letter on the center square. (Diagonal words are not allowed.)</p>
        <p> After playing a word, the player receives replacement letters, one for each letter played. </p>
        <p> Following the first turn, players alternate. Each plays a series of tiles forming a word (possibly more than one word, as below) and then draws new tiles. Always keep 7 tiles on each rack, unless there are not enough tiles left. </p>
        <p> The letters placed in a single turn must all be in a single horizontal row or in a single vertical column, and the letters placed (plus letters already 
        on the board) must form a single word from the dictionary, with no gaps.
        Each new word must connect to the existing words, 
        in one of the following ways: 
        </p>
        <ul>
        <li>Adding one or more letters to a word or letters already on the board. </li>
        <li> Placing a word at right angles to a word already on the board. The new word must use one of the letters already on the board or must add a letter
        to one of the words on the board. </li>
        <li> Placing a complete word parallel to a word already played so that adjacent letters also form complete words.</li>
        </ul>
        <p> The game ends when: </p>
        <ul>
        <li> All of the letters are either in the player's racks or on the board, and one player uses his or her last letter or</li>
        <li> Both players exchange some number of tiles twice in a row (for a total of four exchanges).</li>
        </ul>
       
        </div>
        </div>);
      
    }
}

export default Rules;
