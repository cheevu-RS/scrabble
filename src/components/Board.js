import React from 'react';
import { connect } from 'react-redux';

import {boardHeight, boardWidth, multipliers} from '../utils/constants'
import './Board.css';
import RowTiles from './RowTiles';

// Mapping the global state from redux to props
let mapStateToProps = (state) => {
    return {
        letters : state.gameState.boardLetters
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // Creating tiles for adding to the board    
        // Putting each row in a div and making the div an inline block div 
        let height = boardHeight;

        let rows = []

        for(let row = 0; row < height; ++row){
            let rowTile = <RowTiles row={row} key={row + 1}></RowTiles>;
            rows.push(rowTile)
        }

        return (<div className="Board">
            {rows}
        </div>);
    }
};

export default connect(mapStateToProps)(Board);
