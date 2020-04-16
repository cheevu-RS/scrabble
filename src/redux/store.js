import { createStore } from 'redux'

import { SELECT_TILE, DESELECT_TILE, TRANSFER_LETTER, SET_USERNAME } from './actions';

// Creating the initial state
let createInitialState = () => {
  // Creating the board state
  const height = 15
  const width = 15

  let boardTiles = Array(height)

  for (let row = 0; row < height; ++row) {
    boardTiles[row] = Array(width)

    for (let col = 0; col < width; ++col) {
      // Initializing the board with empty characters
      let boardTile = {
        letter: ' ',
        draggable: false,
        overValidTarget: false
      }
      boardTiles[row][col] = boardTile;
    }
  }

  // Initializing all the multipliers
  // NOTE : Format used here is [word, letter]
  let multiplierArray = [
    [[3, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [3, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [3, 1]],
    [[1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1]],
    [[1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1]],
    [[1, 2], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 2]],
    [[1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
    [[1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1]],
    [[1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1]],
    [[3, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [3, 1]],
    [[1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1]],
    [[1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1]],
    [[1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
    [[1, 2], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 2]],
    [[1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1]],
    [[1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1]],
    [[3, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [3, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [3, 1]]
  ]

  // Mapping the above array to a list of objects
  let multipliers = Array(height)

  for (let row = 0; row < height; ++row) {
    multipliers[row] = Array(width)
    for (let col = 0; col < width; ++col) {
      multipliers[row][col] = {
        word: multiplierArray[row][col][0],
        letter: multiplierArray[row][col][1]
      }
    }
  }

  // Creating the slate state
  let slateTiles = []
  const slateSize = 7
  for (let count = 0; count < slateSize; ++count) {
    let letter = String.fromCharCode(65 + count)
    let slateTile = {
      letter: letter,
      draggable: true,
      overValidTarget: false
    }
    slateTiles.push(slateTile)
  }

  let gameState = {
    boardHeight: height,
    boardWidth: width,
    boardTiles: boardTiles,
    multipliers: multipliers,
    slateTiles: slateTiles,
    slateSize: slateSize,
    selectedTile: null,
    score: 0
  }

  let userState = {
    username: "",
    room: ""
  }

  let state = {
    gameState: gameState,
    userState: userState
  }

  return state
}

const initialState = createInitialState()

let reducer = (state = initialState, action) => {
  // Making a deep copy of the state
  let newState = JSON.parse(JSON.stringify(state))
  let selectedTile = newState.gameState.selectedTile

  switch (action.type) {
    case SELECT_TILE:
      // Selecting the letter
      selectedTile = {
        boardTile: action.boardTile,
        position: action.position,
        letter: action.letter,
        overValidTarget: false
      }

      newState.gameState.selectedTile = selectedTile
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
          newState.gameState.boardTiles[row][col].letter = ' '
          newState.gameState.boardTiles[row][col].draggable = false

          // Inserting the letter into the slate
          let slateTiles = newState.slateTiles
          for (let tile of slateTiles) {
            if (!tile.letter || tile.letter === ' ') {
              tile.letter = selectedLetter
              break
            }
          }
        }
        newState.gameState.selectedTile = null
      }
      break

    case TRANSFER_LETTER:
      // Saving the source letter
      let sourceLetter = selectedTile.letter

      // Erasing letter from source tile
      let sourcePosition = selectedTile.position
      if (selectedTile.boardTile) {
        let row = sourcePosition.row
        let col = sourcePosition.col
        let boardTile = newState.gameState.boardTiles[row][col]
        boardTile.letter = ' '
        boardTile.draggable = false
      } else {
        let slateTile = newState.slateTiles[sourcePosition]
        slateTile.letter = ' '
        slateTile.draggable = false
      }

      // Transferring the letter to the destination
      let row = action.position.row
      let col = action.position.col
      let destinationTile = newState.gameState.boardTiles[row][col]
      destinationTile.letter = sourceLetter
      destinationTile.draggable = true

      // Deselecting the selected letter
      newState.gameState.selectedTile = null
      break
    case SET_USERNAME:
      newState.userState.username = action.username
      break
  }

  return newState
}

const store = createStore(reducer)

export default store;
