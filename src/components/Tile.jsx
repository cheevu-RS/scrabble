import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    selectTile as selectTileConnect,
    deselectTile as deselectTileConnect,
    transferLetter as transferLetterConnect,
} from '../redux/actions'

import './Tile.css'
import { multipliers } from '../utils/constants'

const mapStateToProps = (state, props) => {
    if (props.boardTile) {
        const { row } = props
        const { col } = props
        return {
            tile: state.gameState.boardTiles[row][col],
        }
    }
    const index = props.col
    return {
        tile: state.gameState.slateTiles[index],
    }
}

const mapDispatchToProps = {
    selectTile: selectTileConnect,
    deselectTile: deselectTileConnect,
    transferLetter: transferLetterConnect,
}

class Tile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            highlight: false,
        }
    }

    preventDefault = (event) => {
        event.preventDefault()
    }

    resetSelect = () => {
        // Deselecting the letter
        const { deselectTile, boardTile } = this.props
        deselectTile({
            boardTile,
        })
    }

    setSelect = () => {
        // For board tiles
        const { boardTile, selectTile, row, col, tile } = this.props
        if (boardTile) {
            selectTile({
                boardTile: true,
                position: {
                    row,
                    col,
                },
                letter: tile.letter,
            })
        } else {
            // For slate tiles
            selectTile({
                boardTile: false,
                position: col,
                letter: tile.letter,
            })
        }
    }

    toggleValidTarget = () => {
        // Making the tile highlighted

        this.setState((prevState) => ({
            highlight: !prevState.highlight,
        }))
    }

    transferLetter = () => {
        // Drop position

        const { transferLetter, row, col, tile } = this.props
        const position = {
            row,
            col,
        }

        // If the position isn't already occupied by a tile, then do this
        if (!tile.letter || tile.letter === ' ') {
            // Transferring data from the selected letter to this board tile
            transferLetter({
                position,
            })
        }

        // Turning off highlighting for the selected tile
        this.setState((prevState) => ({
            highlight: !prevState.highlight,
        }))
    }

    render = () => {
        let className = ''

        const { boardTile, row, col, tile } = this.props
        const { highlight } = this.state
        let text = tile.letter

        // Rendering board tiles
        if (boardTile) {
            // Setting CSS classes on the basis of multipliers and state
            if (highlight) {
                className += 'highlighted'
            }

            const multiplier = multipliers[row][col]

            // If the tile is occupied, then forcing the CSS class to the class
            if (tile.letter !== ' ') {
                className += ' occupied'
            } else if (multiplier.word === 2) {
                className += ' doubleWord'
                text = ' DOUBLE WORD'
            } else if (multiplier.word === 3) {
                className += ' tripleWord'
                text = ' TRIPLE WORD'
            } else if (multiplier.letter === 2) {
                className += ' doubleLetter'
                text = ' DOUBLE LETTER'
            } else if (multiplier.letter === 3) {
                className += ' tripleLetter'
                text = ' TRIPLE LETTER'
            } else {
                className += ' letter'
            }

            // Checking if the tile should be highlighted
            className += ' boardTile'
            return (
                <div
                    className={className}
                    draggable={tile.draggable}
                    onDragStart={this.setSelect}
                    onDragEnd={this.resetSelect}
                    onDragOver={this.preventDefault}
                    onDragLeave={this.toggleValidTarget}
                    onDragEnter={this.toggleValidTarget}
                    onDrop={this.transferLetter}
                >
                    {text}
                </div>
            )
        } // Rendering player slate tiles
        const style = {}

        // Adding CSS class of slate
        className += ' slateTile'

        // If the tile no longer has a letter, then make the tile hidden
        if (!tile.letter || tile.letter === ' ') {
            style.visibility = 'hidden'
        }

        return (
            <div
                className={className}
                draggable
                onDragStart={this.setSelect}
                onDragEnd={this.resetSelect}
                style={style}
            >
                {tile.letter}
            </div>
        )
    }
}
Tile.propTypes = {
    selectTile: PropTypes.func.isRequired,
    deselectTile: PropTypes.func.isRequired,
    transferLetter: PropTypes.func.isRequired,
    boardTile: PropTypes.bool.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    tile: PropTypes.shape({
        letter: PropTypes.string.isRequired,
        draggable: PropTypes.bool.isRequired,
    }).isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(Tile)
