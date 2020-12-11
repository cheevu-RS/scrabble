export const TRANSFER_LETTER = 'TRANSFER_LETTER'
export const SELECT_TILE = 'SELECT_TILE'
export const DESELECT_TILE = 'DESELECT_TILE'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_ROOMNAME = 'SET_ROOMNAME'

// Action dispatcher
export const selectTile = (tile) => {
    if (tile.boardTile) {
        return {
            type: SELECT_TILE,
            boardTile: tile.boardTile,
            position: tile.position,
            letter: tile.letter,
        }
    }
    return {
        type: SELECT_TILE,
        boardTile: tile.boardTile,
        position: tile.position,
        letter: tile.letter,
    }
}

export const deselectTile = (tile) => {
    return {
        type: DESELECT_TILE,
        boardTile: tile.boardTile,
    }
}

export const transferLetter = (tile) => {
    return {
        type: TRANSFER_LETTER,
        position: tile.position,
    }
}

export const setUsername = (username) => {
    return {
        type: SET_USERNAME,
        username,
    }
}

export const setRoomname = (roomname) => {
    return {
        type: SET_ROOMNAME,
        roomname,
    }
}
