import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import Home from './Home'
import Board from './Board'
import Slate from './Slate'
import ScoreBoard from './ScoreBoard'
import Chatbox from './Chatbox'
import env from '../utils/env'
import Rules from './Rules'
import './App.css'

const mapStateToProps = (state) => {
    return {
        userData: state.userState,
        gameData: state.gameState,
    }
}

class App extends React.Component {
    socket = io(`${env.API_BASE_URL}:${env.SOCKET_PORT}`)

    constructor(props) {
        super(props)
        this.state = {
            isBoardVisible: true,
            isRulesVisible: false,
        }
    }

    toggleGameRules = () => {
        this.setState((prevState) => ({
            isBoardVisible: !prevState.isBoardVisible,
            isRulesVisible: !prevState.isRulesVisible,
        }))
    }

    submitMove = async () => {
        const { userData, gameData } = this.props
        const { currentMove } = gameData
        const { username } = userData

        // add score calculation logic

        let score
        // const response =
        await fetch(`${env.API_BASE_URL}:${env.SOCKET_PORT}/game/id/submitMove`, {
            method: 'POST',
            body: JSON.stringify({ user: username, word: currentMove, score }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    // eslint-disable-next-line consistent-return
    render() {
        const { userData } = this.props
        const { username, room } = userData
        const { isBoardVisible, isRulesVisible } = this.state
        if (username === '' || room === '') {
            return <Home />
        }
        if (isBoardVisible) {
            return (
                <div className="App">
                    <div className="slate">
                        <h2> Score </h2>
                        <ScoreBoard />
                        <h2> Room Info </h2>
                        <p> Room ID : {room}</p>
                        <h2> Letters </h2>
                        <Slate />
                        <button type="button" onClick={this.submitMove}>
                            {' '}
                            Submit Move{' '}
                        </button>
                        <button
                            type="button"
                            value="Rules"
                            onClick={this.toggleGameRules}
                        >
                            {' '}
                            See Game Rules{' '}
                        </button>
                    </div>
                    <div className="board">
                        <h2> Board </h2>
                        <Board />
                    </div>
                    <div className="chat">
                        <h2> Chatbox </h2>
                        <Chatbox socket={this.socket} />
                    </div>
                </div>
            )
        }
        if (isRulesVisible) {
            return (
                <div className="rules">
                    <Rules />
                    <div className="Btn-div">
                        <button
                            type="button"
                            className="back"
                            onClick={this.toggleGameRules}
                        >
                            {' '}
                            Show Board{' '}
                        </button>
                    </div>
                </div>
            )
        }
    }
}
App.propTypes = {
    userData: PropTypes.shape({
        room: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
    gameData: PropTypes.shape({
        currentMove: PropTypes.arrayOf(
            PropTypes.shape({
                row: PropTypes.number.isRequired,
                col: PropTypes.number.isRequired,
                letter: PropTypes.string.isRequired,
            }).isRequired
        ).isRequired,
    }).isRequired,
}
export default connect(mapStateToProps)(App)
