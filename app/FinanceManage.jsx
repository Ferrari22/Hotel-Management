import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import HistoryList from './HistoryList.jsx';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import ReportForm from './ReportForm.jsx';

var FinanceManage = React.createClass({

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
        var com = <HistoryList />
        if (this.state.current == 'form') {
            com = <ReportForm />
        }
        return (
            <div style={{ marginTop: 15, paddingLeft: 10, paddingRight: 30 }}>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a" style={{ marginTop: 15 }}>
                        <Row>
                            <Col span={4}>
                                <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} style={{ width: 160 }}>
                                    <Menu.Item key="list">
                                        <p style={{ fontSize: 15 }}><Icon type="exception" />历史记录</p>
                                    </Menu.Item>
                                    <Menu.Item key="form">
                                        <p style={{ fontSize: 15 }}><Icon type="exception" />业绩详情</p>
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

export default FinanceManage;