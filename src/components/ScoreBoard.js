import React from 'react';
import { connect } from 'react-redux';
import './ScoreBoard.css'

let mapStateToProps = (state) => {
    return {
        score: state.gameState.score
    }
}

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <div className="ScoreBoard">
                {this.props.score}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ScoreBoard);
