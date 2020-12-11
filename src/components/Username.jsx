import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setUsername as setUsernameConnect } from '../redux/actions'
import './Username.css'

const mapStateToProps = (state) => {
    return {
        room: state.userState.room,
    }
}

const mapDispatchToProps = {
    setUsername: setUsernameConnect,
}

class Username extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
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
        const { setUsername } = this.props
        const { username } = this.state
        setUsername(username)
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    render() {
        const { username } = this.state
        return (
            <div className="Username">
                <h1> Enter username</h1>
                <input
                    type="text"
                    value={username}
                    onChange={this.handleChange}
                    onKeyDown={this.onKeyDown}
                    className="InputBox"
                    ref={this.usernameRef}
                />
                <button
                    type="button"
                    onClick={this.onSubmit}
                    className="SubmitButton"
                >
                    {' '}
                    Submit{' '}
                </button>
            </div>
        )
    }
}
Username.propTypes = {
    setUsername: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(Username)
