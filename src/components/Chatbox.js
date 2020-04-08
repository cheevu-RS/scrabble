import React from 'react';
import { SendOutlined } from '@ant-design/icons';
import './Chatbox.css'

// Creating a message for the chatbox
function createText(message) {
    return (
        <div className="Message" key={message.id}>
            <strong> {message.user} </strong> : <span> {message.text} </span>
        </div>
    )
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

    componentDidUpdate = () => {
        this.updateScroll()
    }

    addMessage = () => {
        // If the message is not empty, add the message to the state
        if (this.state.message !== "") {
            // Appending the message to message and clearing message
            let messages = this.state.messages
            let messageCount = messages.length
            let message = this.state.message

            messages.push({
                text: message,
                user: "The chosen one",
                id: messageCount + 1
            })

            this.setState({
                messages: messages,
                message: ""
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
            this.addMessage()
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
                        <SendOutlined onClick={this.addMessage} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chatbox;
