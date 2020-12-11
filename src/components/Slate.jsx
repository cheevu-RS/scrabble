import React from 'react'
import { connect } from 'react-redux'

import Tile from './Tile'
import './Slate.css'
import { slateSize } from '../utils/constants'

const mapStateToProps = (state) => {
    return {
        slateTiles: state.gameState.slateTiles,
    }
}
class Slate extends React.PureComponent {
    render() {
        const tiles = []

        // Creating tiles within the slate
        for (let index = 0; index < slateSize; index += 1) {
            const tile = <Tile col={index} key={index + 1} boardTile={false} />
            tiles.push(tile)
        }

        return <div className="Slate">{tiles}</div>
    }
}

export default connect(mapStateToProps)(Slate)
