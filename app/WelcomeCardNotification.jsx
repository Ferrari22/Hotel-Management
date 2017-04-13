import React from 'react';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';

var WelcomeCardNotification = React.createClass({

    getInitialState() {
        return {
            username: 'Admin',
        };
    },

    componentWillMount() {
        var booksum = this.props.sum;
        const key = `open${Date.now()}`;
        const btnClick = function () {
            notification.close(key);
        };
        const btn = (
            <Button type="primary" size="small" onClick={btnClick}>
                知道了
            </Button>
        );
        notification.open({
            message: '系统通知',
            description: '您有' + booksum + '个客户订单过期，已移至历史订单列表',
            icon: <Icon type="exclamation-circle" style={{ color: '#00BFFF' }} />,
            btn, key, onClose: close,
        });
        $.get("/getusername", function (data, status) {
            if (status == 'success') {
                this.name = data;
                this.setState({
                    username: data,
                });
            }
        }.bind(this));
    },

    render() {
        return (
            <Card style={{ height: 270, background: '#ECECEC' }}>
                <p style={{ fontSize: 30, color: '#778899' }}>宾馆管理系统.</p>
                <br />
                <p style={{ fontSize: 16, color: '#778899' }}>{this.state.username}, 您好.</p>
                <br />
                <p style={{ fontSize: 16, color: '#778899' }}><Icon type='smile-o' />&nbsp;如果您是新用户，请您一定记得去导航栏点击个人信息完善资料喔！</p>
            </Card >
        )
    }
});

export default WelcomeCardNotification;