import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import Board from './Board'
import Slate from './Slate'
import ScoreBoard from './ScoreBoard'
import Chatbox from './Chatbox'
import Room from './Room'
import Username from './Username'
import env from '../utils/env'
import Rules from './Rules'
import './App.css'

const mapStateToProps = (state) => {
    return {
        userData: state.userState,
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

    // eslint-disable-next-line consistent-return
    render() {
        const { userData } = this.props
        const { username, room } = userData
        const { isBoardVisible, isRulesVisible } = this.state
        if (username === '') {
            return <Username />
        }
        if (room === '') {
            return <Room socket={this.socket} />
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
}
export default connect(mapStateToProps)(App)
