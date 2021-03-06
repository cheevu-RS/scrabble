import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col, Typography, Card, Input, Button } from 'antd'
import { UserOutlined, UsergroupAddOutlined } from '@ant-design/icons'

import env from '../utils/env'
import {
    setUsername as setUsernameConnect,
    setRoomname as setRoomnameConnect,
} from '../redux/actions'
import './Home.css'
import 'antd/dist/antd.css'

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = {
    setUsername: setUsernameConnect,
    setRoomname: setRoomnameConnect,
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            roomId: '',
            roomError: '',
        }
    }

    joinRoom = async () => {
        this.setState({ roomError: '' })
        const { username, roomId } = this.state
        const { setRoomname, setUsername } = this.props
        const response = await fetch(
            `${env.API_BASE_URL}:${env.SOCKET_PORT}/room/joinRoom`,
            {
                method: 'POST',
                body: JSON.stringify({ username, roomId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        const res = await response.json()
        if (res.code === 200) {
            setUsername(username)
            setRoomname(roomId)
        } else {
            this.setState({ roomError: res.message })
        }
    }

    createRoom = async () => {
        this.setState({ roomError: '' })
        const { username, roomId } = this.state
        const { setRoomname, setUsername } = this.props
        const response = await fetch(
            `${env.API_BASE_URL}:${env.SOCKET_PORT}/room/createRoom`,
            {
                method: 'POST',
                body: JSON.stringify({ username, roomId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        const res = await response.json()
        if (res.code === 200) {
            setUsername(username)
            setRoomname(roomId)
        } else {
            this.setState({ roomError: res.message })
        }
    }

    render() {
        const { username, roomId, roomError } = this.state
        const { Title, Text } = Typography

        return (
            <Row
                type="flex"
                align="center"
                justify="center"
                style={{ background: '#4361EE' }}
            >
                <Col span={24} className="title-container-col">
                    <Title align="center" className="title">
                        Scrabble
                    </Title>
                </Col>
                <Col span={24} className="body-container-col">
                    <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32, height: 150 }}
                        justify="center"
                        style={{ overflow: 'hidden', margin: '0' }}
                    >
                        <Col>
                            <Card
                                align="center"
                                style={{
                                    width: 400,
                                    background: '#F72585',
                                }}
                                hoverable
                            >
                                <Title level={2}>Play</Title>
                                <Row>
                                    <Col
                                        style={{
                                            height: 'auto',
                                            textAlign: 'left',
                                        }}
                                        span={24}
                                    >
                                        <Text strong style={{ fontSize: '1.5em' }}>
                                            Username:{' '}
                                        </Text>
                                        <Input
                                            value={username}
                                            onChange={(e) => {
                                                this.setState({
                                                    username: e.target.value,
                                                })
                                            }}
                                            placeholder="chandler bingo"
                                            prefix={<UserOutlined />}
                                        />
                                        <br />
                                        <br />
                                        <Text strong style={{ fontSize: '1.5em' }}>
                                            Room Id:{' '}
                                        </Text>
                                        <Input
                                            value={roomId}
                                            onChange={(e) => {
                                                this.setState({
                                                    roomId: e.target.value,
                                                })
                                            }}
                                            placeholder="217"
                                            prefix={<UsergroupAddOutlined />}
                                        />
                                        <Text>{roomError}</Text>
                                    </Col>
                                    <Col
                                        style={{
                                            height: 'auto',
                                        }}
                                        span={24}
                                    >
                                        <Button
                                            style={{ margin: '1%' }}
                                            size="large"
                                            type="primary"
                                            onClick={this.joinRoom}
                                        >
                                            Join Room
                                        </Button>
                                        <Button
                                            style={{ margin: '1%' }}
                                            size="large"
                                            type="primary"
                                            onClick={this.createRoom}
                                        >
                                            Create Room
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col>
                            <Card
                                align="center"
                                style={{ width: 400, background: '#F72585' }}
                                hoverable
                            >
                                <Title level={2}>Games</Title>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}
Home.propTypes = {
    setRoomname: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
