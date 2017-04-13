import React from 'react';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

var WelcomeCard = React.createClass({

    getInitialState() {
        return {
            username: 'Admin',
        };
    },

    componentWillMount() {
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

export default WelcomeCard;