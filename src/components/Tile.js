import React from 'react';
import { connect } from 'react-redux';
import { selectTile, deselectTile, transferLetter } from '../redux/actions';

import './Tile.css';
import {multipliers} from '../utils/constants'
let mapStateToProps = (state, props) => {
    if (props.boardTile) {
        let row = props.row
        let col = props.col
        return {
            tile : state.gameState.boardTiles[row][col],
        }
    } else {
        let index = props.col
        return {
            tile : state.gameState.slateTiles[index]
        }
    }
}

let mapDispatchToProps = {
    selectTile,
    deselectTile,
    transferLetter
}

class Tile extends React.Component {
    constructor(props) {
        super(props)     
        this.state = {
            highlight : false
        }
    }

    preventDefault = (event) => {
        event.preventDefault()
    }

    resetSelect = () => {
        // Deselecting the letter
        this.props.deselectTile({
            boardTile : this.props.boardTile
        })
    }

    setSelect = () => {
        // For board tiles
        if(this.props.boardTile){
            this.props.selectTile({
                boardTile : true,
                position : {
                    row : this.props.row,
                    col : this.props.col
                },
                letter : this.props.tile.letter
            }) 
        }else{ // For slate tiles
            this.props.selectTile({
                boardTile : false,
                position: this.props.col,
                letter : this.props.tile.letter
            })
        }
    }

    toggleValidTarget = () => {
        // Making the tile highlighted
        this.setState({
            highlight : !this.state.highlight
        })
    }

    transferLetter = () => {
        // Drop position
        let position = {
            row: this.props.row,
            col: this.props.col
        }

        // If the position isn't already occupied by a tile, then do this
        if(!this.props.tile.letter || this.props.tile.letter === ' '){
            // Transferring data from the selected letter to this board tile
            this.props.transferLetter({
                position : position
            })
        }

        // Turning off highlighting for the selected tile
        this.setState({
            highlight : !this.state.highlight
        })
    }

    render = () => {
        let className = ""
        let text = this.props.tile.letter

        // Rendering board tiles
        if (this.props.boardTile) {
            // Setting CSS classes on the basis of multipliers and state
            if (this.state.highlight) {
                className += "highlighted"
            }
            
            let multiplier = multipliers[this.props.row][this.props.col];
  
            // If the tile is occupied, then forcing the CSS class to the class
            if(this.props.tile.letter != " "){
                className += " occupied"
            }else{
                if(multiplier.word === 2){
                    className += " doubleWord"
                    text = " DOUBLE WORD"
                }else if(multiplier.word === 3){
                    className += " tripleWord"
                    text = " TRIPLE WORD"
                }else if(multiplier.letter === 2){
                    className += " doubleLetter"
                    text = " DOUBLE LETTER"
                }else if(multiplier.letter === 3){
                    className += " tripleLetter"
                    text = " TRIPLE LETTER"
                }else{
                    className += " letter";
                }
            }
            
            // Checking if the tile should be highlighted
            className += " boardTile"
            return (
                <div
                    className={className}
                    draggable={this.props.tile.draggable}
                    onDragStart={this.setSelect}
                    onDragEnd={this.resetSelect}
                    onDragOver={this.preventDefault}
                    onDragLeave={this.toggleValidTarget}
                    onDragEnter={this.toggleValidTarget}
                    onDrop={this.transferLetter}
                >
                    {text}
                </div>
            );
        } else { // Rendering player slate tiles
            let style = {}
            
            // Adding CSS class of slate
            className += " slateTile"
            
            // If the tile no longer has a letter, then make the tile hidden
            if(!this.props.tile.letter || this.props.tile.letter === ' '){
                style.visibility = "hidden" 
            }

            return (
                <div
                    className={className}
                    draggable={true}
                    onDragStart={this.setSelect}
                    onDragEnd={this.resetSelect}
                    style={style}
                >
                    {this.props.tile.letter}
                </div>
            );
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
