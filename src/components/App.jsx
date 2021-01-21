import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import Home from './Home'
import Lobby from './Lobby'
import Game from './Game'

const mapStateToProps = (state) => {
    return {
        userData: state.userState,
    }
}

class App extends React.PureComponent {
    render() {
        const { userData } = this.props
        const { username, room } = userData
        return (
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/lobby" component={Lobby} />
                <Route exact path="/game" component={Game} />
                <Route
                    exact
                    path="/"
                    render={() =>
                        username === '' || room === '' ? (
                            <Redirect to="/home" />
                        ) : (
                            <Redirect to="/lobby" />
                        )
                    }
                />
                <Route
                    render={() => (
                        <div>
                            <h1>Error 404</h1>
                            <h2>Oops! Page Could Not Be Found</h2>
                            <p>
                                Sorry but the page you are looking for does not
                                exist, have been removed. name changed or is
                                temporarily unavailable
                            </p>
                            <Link to="/">Back to homepage</Link>
                        </div>
                    )}
                />
            </Switch>
        )
    }
}
App.propTypes = {
    userData: PropTypes.shape({
        room: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
}
export default connect(mapStateToProps)(App)
