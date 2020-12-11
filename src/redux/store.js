import { createStore } from 'redux'

import {
    SELECT_TILE,
    DESELECT_TILE,
    TRANSFER_LETTER,
    SET_USERNAME,
    SET_ROOMNAME,
} from './actions'

import { boardHeight, boardWidth, slateSize } from '../utils/constants'
// Creating the initial state
const createInitialState = () => {
    // Creating the board state
    const boardTiles = Array(boardHeight)

    for (let row = 0; row < boardHeight; row += 1) {
        boardTiles[row] = Array(boardWidth)

        for (let col = 0; col < boardWidth; col += 1) {
            // Initializing the board with empty characters
            const boardTile = {
                letter: ' ',
                draggable: false,
                overValidTarget: false,
            }
            boardTiles[row][col] = boardTile
        }
    }
    const slateTiles = []
    for (let count = 0; count < slateSize; count += 1) {
        const letter = String.fromCharCode(65 + count)
        const slateTile = {
            letter,
            draggable: true,
            overValidTarget: false,
        }
        slateTiles.push(slateTile)
    }

    const gameState = {
        boardTiles,
        slateTiles,
        selectedTile: null,
    }

    const userState = {
        username: '',
        room: '',
        score: 0,
    }

    const state = {
        gameState,
        userState,
    }

    return state
}

const initialState = createInitialState()

const reducer = (state = initialState, action) => {
    // Making a deep copy of the state
    const newState = JSON.parse(JSON.stringify(state))
    let { selectedTile } = newState.gameState

    switch (action.type) {
        case SELECT_TILE: {
            // Selecting the letter
            selectedTile = {
                boardTile: action.boardTile,
                position: action.position,
                letter: action.letter,
                overValidTarget: false,
            }

            newState.gameState.selectedTile = selectedTile
            break
        }
        case DESELECT_TILE: {
            // Deselect tile if not deselected
            // NOTE : This means that the tile was not dropped in a valid position
            if (selectedTile) {
                // If this tile is a board tile, this tile must be reset and put in the slate
                if (selectedTile.boardTile) {
                    // Copying the letter from the selected tile and resetting selected tile
                    const selectedLetter = selectedTile.letter
                    const { row } = selectedTile.position
                    const { col } = selectedTile.position
                    newState.gameState.boardTiles[row][col].letter = ' '
                    newState.gameState.boardTiles[row][col].draggable = false

                    // Inserting the letter into the slate
                    const { slateTiles } = newState.gameState
                    slateTiles.every((tile) => {
                        if (!tile.letter || tile.letter === ' ') {
                            // eslint-disable-next-line no-param-reassign
                            tile.letter = selectedLetter
                            return false
                        }
                        return true
                    })
                }
                newState.gameState.selectedTile = null
            }
            break
        }
        case TRANSFER_LETTER: {
            // Saving the source letter
            const sourceLetter = selectedTile.letter

            // Erasing letter from source tile
            const sourcePosition = selectedTile.position
            if (selectedTile.boardTile) {
                const { row } = sourcePosition
                const { col } = sourcePosition
                const boardTile = newState.gameState.boardTiles[row][col]
                boardTile.letter = ' '
                boardTile.draggable = false
            } else {
                const slateTile = newState.gameState.slateTiles[sourcePosition]
                slateTile.letter = ' '
                slateTile.draggable = false
            }

            // Transferring the letter to the destination
            const { row } = action.position
            const { col } = action.position
            const destinationTile = newState.gameState.boardTiles[row][col]
            destinationTile.letter = sourceLetter
            destinationTile.draggable = true

            // Deselecting the selected letter
            newState.gameState.selectedTile = null
            break
        }
        case SET_USERNAME: {
            newState.userState.username = action.username
            break
        }
        case SET_ROOMNAME: {
            newState.userState.room = action.roomname
            break
        }
        default:
    }

    return newState
}

const store = createStore(reducer)

export default store
