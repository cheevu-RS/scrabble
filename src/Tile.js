import React from 'react';
import './Tile.css';

class Tile extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(<div className="tile">
            {this.props.letter}            
        </div>)
    }
};

export default Tile;
