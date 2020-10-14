import React from 'react';
import { connect } from 'react-redux';

import Tile from './Tile';
import './Slate.css';
import {slateSize} from '../utils/constants'
let mapStateToProps = (state) => {
    return {}
}

class Slate extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let tiles = []

        // Creating tiles within the slate
        for(let index = 0; index < slateSize; ++index){
            let tile = <Tile col={index} key = {index + 1} boardTile={false}></Tile>;
            tiles.push(tile)
        }

        return (
            <div className="Slate">
                {tiles}
            </div>
    );
    }

};

export default connect(mapStateToProps)(Slate);
