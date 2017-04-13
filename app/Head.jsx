import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';

var Head = React.createClass({

    getInitialState() {
        return {
            username : 'Admin',
        };
    },
    
    componentWillMount() {
        $.get("/getusername", function (data, status) {
            if (status == 'success') {
                this.name = data;
                this.setState({
                    username : data,
                });
            }
        }.bind(this));
    },

    render() {
        return (
            <Row>
                <Col span={6}>
                    <p style={{ fontSize: 16}}><Icon type="user" /></p>
                </Col>
                <Col span={18}>
                    <p style={{ fontSize: 16, marginLeft:2}}>{this.state.username}</p>
                </Col>
            </Row>
        )
    }
});

export default Head;