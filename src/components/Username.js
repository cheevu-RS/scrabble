import React from 'react'
import { connect } from 'react-redux';
import { setUsername } from './../redux/actions'
import './Username.css'

let mapStateToProps = (state) => {
    return {
        room : state.userState.room
    }
}

let mapDispatchToProps = {
    setUsername: setUsername
}

class Username extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
    }

    onKeyDown = (event) => {
        // If enter is pressed, called su
        if (event.keyCode === 13) {
            this.onSubmit()
        }
    }

    onSubmit = () => {
        // Need to set username in the main redux state
        this.props.setUsername(this.state.username)
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <div className="Username">
                <h1> Enter username</h1>
                <input type="text" value={this.state.username} onChange={this.handleChange} onKeyDown={this.onKeyDown} className="InputBox" ref={this.usernameRef} />
                <button onClick={this.onSubmit} className="SubmitButton"> Submit </button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Username)
