import React from 'react';
import { connect } from 'react-redux';
import { setRoomname } from './../redux/actions'
import env from './../utils/env'
import './Room.css'

let mapStateToProps = () => {
    return {}
}

let mapDispatchToProps = {
    setRoomname: setRoomname
}

class Room extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            joinRoom: "",
            createRoom: "",
            joinHiddenText: "",
            createHiddenText: ""
        }
    }

    onChange = (event) => {
        let text = event.target.value
        let id = event.target.id

        if(id === "join"){
            this.setState({
                joinRoom: text
            })
        }else{
            this.setState({
                createRoom : text
            })
        }
    }

    createRoom = async () => {
        // Checking if the room name is already in use currently
        let room = this.state.createRoom
        let response = await fetch("http://localhost:" +  env.socketPort + "/roomExists?roomName=" + room)
        let exists = await response.json()

        // If the room doesn't exist, adding the room
        if (!exists) {
            this.props.socket.emit('createRoom', (room))

            // Setting this user's room name
            this.props.setRoomname(this.state.createRoom)
        } else {
            this.setState({
                createHiddenText: "Room with name " + room + " already exists"
            })
        }
    }

    joinRoom = async () => {
        // Checking if the room exists
        let room = this.state.joinRoom
        let response = await fetch("http://localhost:" +  env.socketPort + "/roomExists?roomName=" + room)
        let exists = await response.json()

        // If the room exists, joining the room
        if (exists) {
            // Setting the room name of the user
            this.props.setRoomname(room)
        } else {
            this.setState({
                joinHiddenText: "Room with name " + room + " doesn't exist"
            })
        }
    }

    onKeyDownJoin = (event) => {
        if (event.keyCode == 13) {
            this.joinRoom()
        }
    }

    onKeyDownCreate = (event) => {
        if (event.keyCode == 13) {
            this.createRoom()
        }
    }

    render = () => {
        return (
            <div className="Room">
                <h1> Join Room </h1>
                <div className="Input">
                    <button onClick={this.joinRoom}> Join </button>
                    <input id="join" type="text" ref={this.joinRoomRef} value={this.state.joinRoom} onChange={this.onChange} onKeyDown={this.onKeyDownJoin} />
                </div>
                <span className="hiddenText">{this.state.joinHiddenText}</span>

                <h1> Create Room </h1>
                <div className="Input">
                    <button onClick={this.createRoom}> Create Room </button>
                    <input id="create" type="text" ref={this.createRoomRef} value={this.state.createRoom} onChange={this.onChange} onKeyDown={this.onKeyDownCreate} />
                </div>
                <span className="hiddenText">{this.state.createHiddenText}</span>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
