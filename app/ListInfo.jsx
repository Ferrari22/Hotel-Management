import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import HomeList from './HomeList.jsx';
import CustomerList from './CustomerList.jsx';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';

var ListInfo = React.createClass({

    getInitialState() {
        return {
            current: 'room',
        };
    },

    handleClick(e) {
        this.setState({
            current: e.key
        })
    },

    render() {
        var com = <HomeList />
        if (this.state.current == 'customer') {
            com = <CustomerList />
        }
        return (
            <div style={{ marginTop: 15, paddingLeft: 10, paddingRight: 30 }}>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a" style={{ marginTop: 15 }}>
                        <Row>
                            <Col span={4}>
                                <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} style={{ width: 160 }}>
                                    <Menu.Item key="room">
                                        <p style={{ fontSize: 15 }}><Icon type="exception" />房间信息</p>
                                    </Menu.Item>
                                    <Menu.Item key="customer">
                                        <p style={{ fontSize: 15 }}><Icon type="exception" />客户信息</p>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col span={20}>
                                {com}
                            </Col>
                        </Row>
                    </div>
                </QueueAnim>
            </div>
        )
    }
});

export default ListInfo;