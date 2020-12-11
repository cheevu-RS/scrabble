import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Tile from './Tile'
import './RowTiles.css'

// Mapping the state to props
const mapStateToProps = (state, props) => {
    const { row } = props
    const letters = state.gameState.boardTiles[row]
    return {
        letters,
    }
}

class RowTiles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { letters } = this.props
        const tiles = []
        const { row } = this.props

        // Creating the row of letters
        for (let index = 0; index < letters.length; index += 1) {
            const tile = <Tile row={row} col={index} key={index + 1} boardTile />
            tiles.push(tile)
        }

        return <div className="RowTiles">{tiles}</div>
    }
}
RowTiles.propTypes = {
    row: PropTypes.number.isRequired,
    letters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
export default connect(mapStateToProps)(RowTiles)
