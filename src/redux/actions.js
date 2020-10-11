export const TRANSFER_LETTER = "TRANSFER_LETTER"
export const SELECT_TILE = "SELECT_TILE"
export const DESELECT_TILE = "DESELECT_TILE"
export const SET_USERNAME = "SET_USERNAME"
export const SET_ROOMNAME = "SET_ROOMNAME"
export const START_GAME = "START_GAME"

// Action dispatcher
export const selectTile = (tile) => {
    return{
        type : SELECT_TILE,
        boardTile : tile.boardTile,
        position : tile.position,
        letter : tile.letter
    }
}

export const deselectTile = (tile) => {
    return{
        type : DESELECT_TILE,
        boardTile : tile.boardTile
    }
}

export const transferLetter = (tile) => {
    return {
        type : TRANSFER_LETTER,
        position : tile.position
    }
}

export const setUsername = (username) => {
    return{
        type : SET_USERNAME,
        username : username
    }
}

export const startGame = (roomname) => {
    return {
        type : START_GAME,
        roomname : roomname
    }
}

export const setRoomname = (roomname) => {
    return{
        type : SET_ROOMNAME,
        roomname : roomname
    }
}
