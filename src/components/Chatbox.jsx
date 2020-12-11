import React from 'react'
import { SendOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './Chatbox.css'

// Creating a message for the chatbox
function createText(message) {
    // User has entered the chat
    if (message.text === '') {
        return (
            <div className="Message" key={message.id}>
                <strong> {message.user} </strong>
            </div>
        )
    }
    return (
        <div className="Message" key={message.id}>
            <strong> {message.user} </strong> : <span> {message.text} </span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.userState
}

class Chatbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            message: '',
        }

        // Creating a ref to the messages div
        this.messageDiv = React.createRef()
    }

    componentDidMount = () => {
        // Adding the user to the chat
        const { socket, username, room } = this.props
        socket.emit('addUser', {
            username,
            room,
        })

        // Listening for other users to join the chat
        socket.on('addUser', (userData) => {
            const newUserData = {
                username: `${userData.username} has joined the chat`,
                message: '',
            }
            this.addMessage(newUserData, true)
        })

        // Listening for users who leave the chat
        socket.on('removeUser', (userData) => {
            const newUserData = {
                username: `${userData.username} has left the chat`,
                message: '',
            }
            this.addMessage(newUserData, true)
        })

        // Listening for messages on the chat
        socket.on('chat', (messageData) => {
            this.addMessage(messageData, true)
        })
    }

    componentDidUpdate = () => {
        this.updateScroll()
    }

    addMessage = (messageData, otherUser) => {
        // Appending the message to message and clearing message
        const { messages } = this.state
        const messageCount = messages.length
        const { message } = messageData
        let { username } = messageData

        // If message from you
        if (!otherUser) {
            username = 'You'
        }

        messages.push({
            text: message,
            user: username,
            id: messageCount + 1,
        })

        // In case the message came from another user, then don't clear the user message
        if (otherUser) {
            this.setState({
                messages,
            })
        } else {
            this.setState({
                messages,
                message: '',
            })
        }
    }

    createMessage = () => {
        // If the message is not empty, add the message to the state
        const { message } = this.state
        const { room, socket, username } = this.props
        if (message !== '') {
            // Adding the message to the current chat
            this.addMessage(
                {
                    message,
                    username,
                },
                false
            )

            // Pushing the message to all other users
            socket.emit('chat', {
                username,
                message,
                room,
            })
        }
    }

    updateScroll = () => {
        // Updates the scroll to the bottom
        const node = this.messageDiv.current
        node.scrollTop = node.scrollHeight
    }

    onChange = (event) => {
        this.setState({
            message: event.target.value,
        })
    }

    onEnter = (event) => {
        // If enter is clicked, the message should be appended to messages
        if (event.keyCode === 13) {
            this.createMessage()
        }
    }

    render = () => {
        const { message, messages } = this.state
        const messageElements = messages.map(createText)

        return (
            <div className="Chatbox">
                <div className="Messages" ref={this.messageDiv}>
                    {messageElements}
                </div>
                <div className="SendMessage">
                    <input
                        className="MessageBox"
                        type="text"
                        onKeyUp={this.onEnter}
                        value={message}
                        placeholder=" Type a message "
                        onChange={this.onChange}
                    />
                    <div className="SendButton">
                        <SendOutlined onClick={this.createMessage} />
                    </div>
                </div>
            </div>
        )
    }
}
Chatbox.propTypes = {
    socket: PropTypes.shape({
        emit: PropTypes.func.isRequired,
        on: PropTypes.func.isRequired,
    }).isRequired,
    username: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
}
export default connect(mapStateToProps)(Chatbox)
