import React from 'react';
import { SendOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './Chatbox.css'

// Creating a message for the chatbox
function createText(message) {
    // User has entered the chat
    if (message.text === "") {
        return (
            <div className="Message" key={message.id}>
                <strong> {message.user} </strong>
            </div>
        )
    } else {
        return (
            <div className="Message" key={message.id}>
                <strong> {message.user} </strong> : <span> {message.text} </span>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return state.userState
}

class Chatbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            message: ""
        }

        // Creating a ref to the messages div
        this.messageDiv = React.createRef()
    }

    componentDidMount = () => {
        // Adding the user to the chat
        this.props.socket.emit('addUser', {
            username: this.props.username,
            room: this.props.room
        })

        // Listening for other users to join the chat
        this.props.socket.on('addUser', (userData) => {
            let newUserData = {
                username: userData.username + " has joined the chat",
                message: ""
            }
            this.addMessage(newUserData, true)
        })

        // Listening for users who leave the chat
        this.props.socket.on('removeUser', (userData) => {
            let newUserData = {
                username: userData.username + " has left the chat",
                message: ""
            }
            this.addMessage(newUserData, true)
        })

        // Listening for messages on the chat
        this.props.socket.on('chat', (messageData) => {
            this.addMessage(messageData, true)
        })
    }

    componentDidUpdate = () => {
        this.updateScroll()
    }

    addMessage = (messageData, otherUser) => {
        // Appending the message to message and clearing message
        let messages = this.state.messages
        let messageCount = messages.length
        let message = messageData.message
        let username = messageData.username

        // If message from you
        if (!otherUser) {
            username = "You"
        }

        messages.push({
            text: message,
            user: username,
            id: messageCount + 1
        })

        // In case the message came from another user, then don't clear the user message
        if (otherUser) {
            this.setState({
                messages: messages,
            })
        } else {
            this.setState({
                messages: messages,
                message: ""
            })
        }
    }

    createMessage = () => {
        // If the message is not empty, add the message to the state
        if (this.state.message !== "") {
            // Adding the message to the current chat
            this.addMessage({
                message: this.state.message,
                username: this.props.username
            }, false)

            // Pushing the message to all other users
            this.props.socket.emit('chat', {
                username: this.props.username,
                message: this.state.message,
                room : this.props.room
            })
        }
    }

    updateScroll = () => {
        // Updates the scroll to the bottom
        let node = this.messageDiv.current
        node.scrollTop = node.scrollHeight
    }

    onChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    onEnter = (event) => {
        // If enter is clicked, the message should be appended to messages
        if (event.keyCode == 13) {
            this.createMessage()
        }
    }

    render = () => {
        let messages = [...this.state.messages]
        let messageElements = messages.map(createText)

        return (
            <div className="Chatbox">
                <div className="Messages" ref={this.messageDiv}>
                    {messageElements}
                </div>
                <div className="SendMessage">
                    <input className="MessageBox" type="text" onKeyUp={this.onEnter} value={this.state.message} placeholder=" Type a message " onChange={this.onChange} />
                    <div className="SendButton">
                        <SendOutlined onClick={this.createMessage} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Chatbox);
