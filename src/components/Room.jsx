import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// renaming the import to avoid eslint no-shadow
// when we map this with the same name when destructuring this.props
import { setRoomname as setRoomnameConnect } from '../redux/actions'
import env from '../utils/env'
import './Room.css'

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = {
    setRoomname: setRoomnameConnect,
}

class Room extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            joinRoom: '',
            createRoom: '',
            joinHiddenText: '',
            createHiddenText: '',
        }
    }

    onChange = (event) => {
        const text = event.target.value
        const { id } = event.target

        if (id === 'join') {
            this.setState({
                joinRoom: text,
            })
        } else {
            this.setState({
                createRoom: text,
            })
        }
    }

    createRoom = async () => {
        // Checking if the room name is already in use currently
        const { createRoom: room } = this.state
        const response = await fetch(
            `${env.API_BASE_URL}:${env.SOCKET_PORT}/roomExists?roomName=${room}`
        )
        const exists = await response.json()

        // If the room doesn't exist, adding the room
        const { socket, setRoomname } = this.props
        if (!exists) {
            socket.emit('createRoom', room)

            // Setting this user's room name
            setRoomname(room)
        } else {
            this.setState({
                createHiddenText: `Room with name ${room} already exists`,
            })
        }
    }

    joinRoom = async () => {
        // Checking if the room exists
        const { joinRoom: room } = this.state
        const response = await fetch(
            `${env.API_BASE_URL}:${env.SOCKET_PORT}/roomExists?roomName=${room}`
        )
        const exists = await response.json()
        const { setRoomname } = this.props
        // If the room exists, joining the room
        if (exists) {
            // Setting the room name of the user
            setRoomname(room)
        } else {
            this.setState({
                joinHiddenText: `Room with name ${room} doesn't exist`,
            })
        }
    }

    onKeyDownJoin = (event) => {
        if (event.keyCode === 13) {
            this.joinRoom()
        }
    }

    onKeyDownCreate = (event) => {
        if (event.keyCode === 13) {
            this.createRoom()
        }
    }

    render = () => {
        const { joinRoom, createRoom, joinHiddenText, createHiddenText } = this.state
        return (
            <div className="Room">
                <h1> Join Room </h1>
                <div className="Input">
                    <button type="button" onClick={this.joinRoom}>
                        {' '}
                        Join{' '}
                    </button>
                    <input
                        id="join"
                        type="text"
                        ref={this.joinRoomRef}
                        value={joinRoom}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDownJoin}
                    />
                </div>
                <span className="hiddenText">{joinHiddenText}</span>

                <h1> Create Room </h1>
                <div className="Input">
                    <button type="button" onClick={this.createRoom}>
                        {' '}
                        Create Room{' '}
                    </button>
                    <input
                        id="create"
                        type="text"
                        ref={this.createRoomRef}
                        value={createRoom}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDownCreate}
                    />
                </div>
                <span className="hiddenText">{createHiddenText}</span>
            </div>
        )
    }
}
Room.propTypes = {
    socket: PropTypes.shape({
        emit: PropTypes.func.isRequired,
    }).isRequired,
    setRoomname: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(Room)
