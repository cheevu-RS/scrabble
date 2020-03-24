import React from 'react';
import './Board.css';
import RowTiles from './RowTiles';

class Board extends React.Component {
    constructor(props) {
        super(props)

        let width = 15
        let height = 15
        let letters = Array(height)
        let multipliers = Array(height)

        for (let row = 0; row < height; ++row) {
            letters[row] = Array(width)
            multipliers[row] = Array(width)

            for (let col = 0; col < width; ++col) {
                // Initializing the board with empty characters
                letters[row][col] = 'A';

                // Initializing all multipliers as 1
                multipliers[row][col] = 1
            }
        }

        this.state = {
            width: width,
            height: height,
            letters: letters,
            multipliers: multipliers
        }

    }

    render() {
        // Creating tiles for adding to the board    
        // Putting each row in a div and making the div an inline block div 
        let letters = this.state.letters
        let height = this.state.height

        let rows = []

        for(let row = 0; row < height; ++row){
            let rowTile = <RowTiles letters={letters[row]} key={row + 1}></RowTiles>;
            rows.push(rowTile)
        }

        return (<div className="Board">
            {rows}
        </div>);
    }
};

export default Board;
