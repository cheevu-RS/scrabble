import React from 'react';
import { connect } from 'react-redux';

import './Board.css';
import RowTiles from './RowTiles';

// Mapping the global state from redux to props
let mapStateToProps = (state) => {
    return {
        width : state.gameState.boardWidth,
        height : state.gameState.boardHeight,
        letters : state.gameState.boardLetters,
        multipliers : state.gameState.multipliers
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // Creating tiles for adding to the board    
        // Putting each row in a div and making the div an inline block div 
        let height = this.props.height

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
