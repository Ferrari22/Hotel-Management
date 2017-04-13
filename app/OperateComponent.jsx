import React from 'react';
import Menu from 'antd/lib/menu';
import Card from 'antd/lib/card';
import CheckIn from './CheckIn.jsx';
import CheckOut from './CheckOut.jsx';
import CheckInMember from './CheckInMember.jsx';
import CheckInBook from './CheckInBook.jsx';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

var OperateComponent = React.createClass({

    getInitialState() {
        return {
            current: 'checkin',
        };
    },

    handleClick(e) {
        this.setState({
            current: e.key
        })
    },

    render() {
        var com = <CheckIn />
        if (this.state.current == 'checkinmember') {
            com = <CheckInMember />
        }
        if (this.state.current == 'checkout') {
            com = <CheckOut />
        }
        if (this.state.current == 'checkinbook') {
            com = <CheckInBook />
        }
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} style={{ width: 200 }}>
                            <Menu.Item key="checkin">
                                <p style={{ fontSize: 15 }}>入&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;住</p>
                            </Menu.Item>
                            <Menu.Item key="checkinmember">
                                <p style={{ fontSize: 15 }}>会员入住</p>
                            </Menu.Item>
                            <Menu.Item key="checkinbook">
                                <p style={{ fontSize: 15 }}>订单入住</p>
                            </Menu.Item>
                            <Menu.Item key="checkout">
                                <p style={{ fontSize: 15 }}>退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;房</p>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={8} offset={1}>
                        {com}
                    </Col>
                </Row>
            </div>
        )
    }
});

export default OperateComponent;