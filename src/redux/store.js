import { createStore } from 'redux'

import { SELECT_TILE, DESELECT_TILE, TOGGLE_VALID_TARGET, TRANSFER_LETTER } from './actions';

// Creating the initial state
let createInitialState = () => {
  // Creating the board state
  let state = {}
  const height = 15
  const width = 15

  let boardLetters = Array(height)
  let multipliers = Array(height)

  for (let row = 0; row < height; ++row) {
    boardLetters[row] = Array(width)
    multipliers[row] = Array(width)

    for (let col = 0; col < width; ++col) {
      // Initializing the board with empty characters
      let boardLetter = {
        letter: ' ',
        draggable: false,
        overValidTarget: false
      }
      boardLetters[row][col] = boardLetter;

      // Initializing all multipliers as 1
      multipliers[row][col] = 1
    }
  }

  // Creating the slate state
  let slateLetters = []
  const slateSize = 7
  for (let count = 0; count < slateSize; ++count) {
    let letter = String.fromCharCode(65 + count)
    let slateLetter = {
      letter: letter,
      draggable: true,
      overValidTarget: false
    }
    slateLetters.push(slateLetter)
  }

  state = {
    boardHeight: height,
    boardWidth: width,
    boardLetters: boardLetters,
    multipliers: multipliers,
    slateLetters: slateLetters,
    slateSize: slateSize,
    selectedTile: null
  }

  return state
}

const initialState = createInitialState()

let reducer = (state = initialState, action) => {
  // Making a deep copy of the state
  let newState = JSON.parse(JSON.stringify(state))
  let selectedTile = newState.selectedTile

  switch (action.type) {
    case SELECT_TILE:
      // Selecting the letter
      selectedTile = {
        boardTile: action.boardTile,
        position: action.position,
        letter: action.letter,
        overValidTarget: false
      }

      newState.selectedTile = selectedTile
      break

    case DESELECT_TILE:
      // Deselect tile if not deselected
      // NOTE : This means that the tile was not dropped in a valid position
      if (selectedTile) {
        // If this tile is a board tile, this tile must be reset and put in the slate
        if (selectedTile.boardTile) {
          // Copying the letter from the selected tile and resetting selected tile
          let selectedLetter = selectedTile.letter
          let row = selectedTile.position.row
          let col = selectedTile.position.col
          newState.boardLetters[row][col].letter = ' '
          newState.boardLetters[row][col].draggable = false 
          newState.selectedTile = null

          // Inserting the letter into the slate
          let slateLetters = newState.slateLetters
          for (let tile of slateLetters) {
            if (!tile.letter || tile.letter === ' ') {
              tile.letter = selectedLetter
              break
            }
          }
        } else {
          // No change in position of the tile, simply reset selected tile
          selectedTile = null
        }
      }
      break

    case TOGGLE_VALID_TARGET:
      // Toggling the selected letter's valid target property
      selectedTile.overValidTarget = !selectedTile.overValidTarget
      break

    case TRANSFER_LETTER:
      // Saving the source letter
      let sourceLetter = selectedTile.letter

      // Erasing letter from source tile
      let sourcePosition = selectedTile.position
      if (selectedTile.boardTile) {
        let row = sourcePosition.row
        let col = sourcePosition.col
        let boardTile = newState.boardLetters[row][col]
        boardTile.letter = ' '
        boardTile.draggable = false
      } else {
        let slateTile = newState.slateLetters[sourcePosition]
        slateTile.letter = ' '
        slateTile.draggable = false
      }

      // Transferring the letter to the destination
      let row = action.position.row
      let col = action.position.col
      let destinationTile = newState.boardLetters[row][col]
      destinationTile.letter = sourceLetter
      destinationTile.draggable = true

      // Deselecting the selected letter
      newState.selectedTile = null
      break
  }

  return newState
}

const store = createStore(reducer)

export default store;
