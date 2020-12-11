import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './ScoreBoard.css'

const mapStateToProps = (state) => {
    return {
        score: state.userState.score,
    }
}

class ScoreBoard extends React.PureComponent {
    render = () => {
        const { score } = this.props
        return <div className="ScoreBoard">{score}</div>
    }
}
ScoreBoard.propTypes = {
    score: PropTypes.number.isRequired,
}
export default connect(mapStateToProps)(ScoreBoard)
