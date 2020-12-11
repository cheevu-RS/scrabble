import React from 'react'
import { connect } from 'react-redux'

import { boardHeight } from '../utils/constants'
import './Board.css'
import RowTiles from './RowTiles'

// Mapping the global state from redux to props
const mapStateToProps = (state) => {
    return {
        letters: state.gameState.boardLetters,
    }
}

class Board extends React.PureComponent {
    render() {
        // Creating tiles for adding to the board
        // Putting each row in a div and making the div an inline block div
        const height = boardHeight

        const rows = []

        for (let row = 0; row < height; row += 1) {
            const rowTile = <RowTiles row={row} key={row + 1} />
            rows.push(rowTile)
        }

        return <div className="Board">{rows}</div>
    }
}

export default connect(mapStateToProps)(Board)
