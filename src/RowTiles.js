import React from 'react';
import Tile from './Tile';
import './RowTiles.css'

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
            let tile = <Tile letter={letters[index]} key={index + 1}></Tile>;
            tiles.push(tile)
        }

        return (<div className="rowtiles">
            {tiles}
        </div>);        
    }
};

export default RowTiles;
