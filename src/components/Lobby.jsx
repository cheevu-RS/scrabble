import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => {
    return {
        userData: state.userState,
    }
}

class Lobby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomOwner: '',
            players: [],
            spectators: [],
        }
    }

    render() {
        const { roomOwner, players, spectators } = this.state
        const playerList = []
        players.forEach((player) => {
            playerList.push(<li>{player}</li>)
        })
        const spectatorList = []
        spectators.forEach((spectator) => {
            spectatorList.push(<li>{spectator}</li>)
        })
        return (
            <div>
                Owner: {roomOwner}
                <br />
                Players: <br />
                {playerList}
                Spectators: <br />
                {spectatorList}
            </div>
        )
    }
}
Lobby.propTypes = {
    userData: PropTypes.shape({
        room: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
}
export default connect(mapStateToProps)(Lobby)
