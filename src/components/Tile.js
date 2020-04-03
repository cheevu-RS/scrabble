import React from 'react';
import { connect } from 'react-redux';
import { selectTile, deselectTile, toggleValidTarget, transferLetter } from '../redux/actions';

import './Tile.css';

let mapStateToProps = (state, props) => {
    if (props.boardTile) {
        let row = props.row
        let col = props.col
        return state.boardLetters[row][col]
    } else {
        let index = props.col
        return state.slateLetters[index]
    }
}

let mapDispatchToProps = {
    selectTile,
    deselectTile,
    toggleValidTarget,
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
                letter : this.props.letter
            }) 
        }else{ // For slate tiles
            this.props.selectTile({
                boardTile : false,
                position: this.props.col,
                letter : this.props.letter
            })
        }
    }

    toggleValidTarget = () => {
        // Marking the drop position as valid
        this.props.toggleValidTarget()
        
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
        if(!this.props.letter || this.props.letter === ' '){
            // Transferring data from the selected letter to the board tile
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

        // Rendering board tiles
        if (this.props.boardTile) {
            // Checking if the tile should be highlighted
            if (this.state.highlight) {
                className = "highlightedBoardTile"
            } else {
                className = "boardTile"
            }

            return (
                <div
                    className={className}
                    draggable={this.props.draggable}
                    onDragStart={this.setSelect}
                    onDragEnd={this.resetSelect}
                    onDragOver={this.preventDefault}
                    onDragLeave={this.toggleValidTarget}
                    onDragEnter={this.toggleValidTarget}
                    onDrop={this.transferLetter}
                >
                    {this.props.letter}
                </div>
            );
        } else { // Rendering player slate tiles
            let style = {}
            
            // If the tile no longer has a letter, then make the tile hidden
            if(!this.props.letter || this.props.letter === ' '){
                style.visibility = "hidden" 
            }

            // Checking if the tile should be highlighted
            if (this.state.highlight) {
                className = "highlightedSlateTile"
            } else {
                className = "slateTile"
            }

            return (
                <div
                    className={className}
                    draggable={true}
                    onDragStart={this.setSelect}
                    onDragEnd={this.resetSelect}
                    style={style}
                >
                    {this.props.letter}
                </div>
            );
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
