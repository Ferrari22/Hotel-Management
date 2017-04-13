import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import BookList from './BookList.jsx';
import BookAdd from './BookAdd.jsx';
import BookDelete from './BookDelete.jsx';
import BookRecordList from './BookRecordList.jsx';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import QueueAnim from 'rc-queue-anim';

var BookManage = React.createClass({

    getInitialState() {
        return {
            current: 'list',
        };
    },

    handleClick(e) {
        this.setState({
            current: e.key
        })
    },

    render() {
        var com = <BookList />
        if (this.state.current == 'add') {
            com = <BookAdd />
        }
        if (this.state.current == 'delete') {
            com = <BookDelete />
        }
        if (this.state.current == 'history') {
            com = <BookRecordList />
        }
        return (
            <div style={{ marginTop: 15, paddingLeft: 10, paddingRight: 30 }}>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a" style={{ marginTop: 15 }}>
                        <Row>
                            <Col span={4}>
                                <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} style={{ width: 160 }}>
                                    <Menu.Item key="list">
                                        <p style={{ fontSize: 15 }}><Icon type="exception" />订单列表</p>
                                    </Menu.Item>
                                    <Menu.Item key="add">
                                        <p style={{ fontSize: 15 }}><Icon type="plus-circle-o" />添加订单</p>
                                    </Menu.Item>
                                    <Menu.Item key="delete">
                                        <p style={{ fontSize: 15 }}><Icon type="delete" />取消订单</p>
                                    </Menu.Item>
                                    <Menu.Item key="history">
                                        <p style={{ fontSize: 15 }}><Icon type="exception" />历史订单</p>
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

export default BookManage;