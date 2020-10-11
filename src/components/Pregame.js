import './Pregame.css';
import Chatbox from './Chatbox'
const React = require("react")
const { connect } = require("react-redux")
const env = require("./../utils/env")
const { startGame } = require("./../redux/actions")


let key = 1;
const mapStateToProps = (state) => {
    return {
        username : state.userState.username,
        room : state.userState.room
    }
}

const mapDispatchToProps = {
    startGame : startGame
}

function create_user(user){
    key += 1
    return (<div key={key} className="user"> {user} </div>);
}

class Pregame extends React.Component{
    constructor(props){
        super(props)

        this.state = {players : []}
    }

    startGame = () => {
        this.props.startGame()
    }

    addUsers = (usersData) => {
        let players = JSON.parse(JSON.stringify(this.state.players))
        for(let username of usersData){
            players.push(username)
        }
        
        this.setState({
            players : players
        })
    }

    componentDidMount = () => {
        // Listening for new users to be added
        this.props.socket.on('addUser', (userData) => {
            this.addUsers([userData])
        })

        // Listening for the game to start
        this.props.socket.on('startGame', () => {
            this.props.startGame()
        })

        // Getting all the existing users in the lobby and adding all of them
        fetch(env.API_BASE_URL + ":" + env.SOCKET_PORT + "/getUsers", {
            method : "POST",
            body : JSON.stringify({room : this.props.room}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .then((res) => {
            this.addUsers(res.players)
        }).catch((err) => {
            console.log(err)
        })
    }

    startGame = () => {
        this.props.socket.emit('startGame', (this.props.room))
    }

    render = () => {
        let users = JSON.parse(JSON.stringify(this.state.players))
        let user_components = users.map(create_user)
        return(
            <div className="pregame">
                <div className="display">
                    <div className="players">
                        <h1 style={{margin: "auto"}}> Players in the lobby </h1>
                        {user_components}
                    </div>
                    <div className="start">
                        <button onClick={this.startGame}> Start Game </button>
                    </div>
                </div>
                
                <div className="chatbox">
                    <h2> Chatbox </h2>
                    <Chatbox socket={this.props.socket}></Chatbox>
                </div>
            </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pregame);
