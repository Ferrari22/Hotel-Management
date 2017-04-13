import React from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import QueueAnim from 'rc-queue-anim';
import message from 'antd/lib/message';
import notification from 'antd/lib/notification';
const createForm = Form.create;
const FormItem = Form.Item;

var Login = React.createClass({

    handleSubmit: function (event) {
        // 提示框中的参数
        const key = `open${Date.now()}`;
        const btnClick = function () {
            notification.close(key);
        };
        const btn = (
            <Button type="primary" size="small" onClick={btnClick}>
                确定
            </Button>
        );
        var username = this.refs.username.refs.input.value;
        var password = this.refs.password.refs.input.value;
        if (username == '') {
            message.warning('请填写您的用户名')
            return
        }
        if (password == '') {
            message.warning('请填写您的密码')
            return
        }
        $.get("/login?Username=" + username + "&Password=" + password, function (data, status) {
            if (data == 'usererror') {
                notification.open({
                    message: '登录失败',
                    description: '用户名不存在',
                    icon: <Icon type="exclamation-circle" spin="true" style={{ color: '#FF0000' }} />,
                    btn, key, onClose: close,
                });
            } else {
                if (data == 'ok') {
                    window.location.href = "hotel.html";
                } else {
                    notification.open({
                        message: '登录失败',
                        description: '请再次确认您的用户名或密码',
                        icon: <Icon type="exclamation-circle" spin="true" style={{ color: '#FF0000' }} />,
                        btn, key, onClose: close,
                    });
                }
            }
        });
    },

    render: function () {

        return (
            <div>
                <Form horizontal>
                    <QueueAnim delay={400} type={['bottom']} className="queue-simple">
                        <div key="a" ><FormItem>
                            <Input addonBefore={<Icon type="user" />} type="text" size="large" placeholder="用户名" ref="username" autoFocus={true} />
                        </FormItem></div>
                        <div key="b"><FormItem>
                            <Input addonBefore={<Icon type="lock" />} type="password" autoComplete="off" placeholder="密码" ref="password" />
                        </FormItem></div>
                        <div key="c"><FormItem>
                            <Row>
                                <Col span={8} offset={2}>
                                    <Button style={{ width: 240 }} size="large" type="primary" onClick={this.handleSubmit}>登录</Button>
                                </Col>
                            </Row>
                        </FormItem></div>
                    </QueueAnim>
                </Form>
            </div>
        );
    }
});

export default createForm()(Login);