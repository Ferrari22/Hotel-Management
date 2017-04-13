import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Revise from './Revise.jsx';
import Plus from './Plus.jsx';
import DeleteRoom from './DeleteRoom.jsx';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

var ReviseRoomType = React.createClass({

    getInitialState() {
        return {
            current: 'revise',
        };
    },

    handleClick(e) {
        this.setState({
            current: e.key
        })
    },

    render() {
        var com = <Revise />
        if (this.state.current == 'plus') {
            com = <Plus />
        }
        if (this.state.current == 'delete') {
            com = <DeleteRoom />
        }
        return (
            <div style={{ marginTop: 15, paddingLeft: 10, paddingRight: 60 }}>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a" style={{ marginTop: 15 }}>
                        <Row>
                            <Col span={8}>
                                <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} style={{ width: 200 }}>
                                    <Menu.Item key="revise">
                                        <p style={{ fontSize: 15 }}><Icon type="edit" />修改信息</p>
                                    </Menu.Item>
                                    <Menu.Item key="plus">
                                        <p style={{ fontSize: 15 }}><Icon type="plus-square-o" />增加房间</p>
                                    </Menu.Item>
                                    <Menu.Item key="delete">
                                        <p style={{ fontSize: 15 }}><Icon type="delete" />删除房间</p>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col span={8} offset={1}>
                                {com}
                            </Col>
                        </Row>
                    </div>
                </QueueAnim>
            </div>
        )
    }
});

export default ReviseRoomType;