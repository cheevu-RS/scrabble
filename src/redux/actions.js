export const TOGGLE_VALID_TARGET = "TOGGLE_VALID_TARGET"
export const TRANSFER_LETTER = "TRANSFER_LETTER"
export const SELECT_TILE = "SELECT_TILE"
export const DESELECT_TILE = "DESELECT_TILE"

// Action dispatcher
export const selectTile = (tile) => {
    if(tile.boardTile){
        return{
            type : SELECT_TILE,
            boardTile : tile.boardTile,
            position : tile.position,
            letter : tile.letter
        }
    }else{
        return {
            type : SELECT_TILE,
            boardTile : tile.boardTile,
            position : tile.position,
            letter : tile.letter
        }
    }
}

export const deselectTile = (tile) => {
    return{
        type : DESELECT_TILE,
        boardTile : tile.boardTile
    }
}

export const toggleValidTarget = () => {
    return {
        type : TOGGLE_VALID_TARGET
    }
}

export const transferLetter = (tile) => {
    return {
        type : TRANSFER_LETTER,
        position : tile.position
    }
}
