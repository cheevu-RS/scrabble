import React from 'react';
import { connect } from 'react-redux';

import Tile from './Tile';
import './RowTiles.css';

// Mapping the state to props
let mapStateToProps = (state, props) => {
    let row = props.row
    let letters = state.boardTiles[row]
    return {
        letters : letters
    }
}

class RowTiles extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        let letters = this.props.letters;
        let tiles = []
        
        // Creating the row of letters
        for(let index = 0; index < letters.length; ++index){
            let tile = <Tile row={this.props.row} col={index} key={index + 1} boardTile={true}></Tile>;
            tiles.push(tile)
        }

        return (<div className="RowTiles">
            {tiles}
        </div>);        
    }
};

export default connect(mapStateToProps)(RowTiles);
