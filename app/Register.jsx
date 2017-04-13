import React from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import QueueAnim from 'rc-queue-anim';
import notification from 'antd/lib/notification';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}

var Register = React.createClass({

    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePasswd'], { force: true });
        }
        callback();
    },

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('passwd')) {
            callback('The two passwords you enter are inconsistent!');
        } else {
            callback();
        }
    },

    handleSubmit: function (event) {
        const { getFieldValue } = this.props.form;
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
        var username = getFieldValue('name');
        var password = getFieldValue('passwd');
        var repassword = getFieldValue('rePasswd');
        if (username == '') {
            message.warning('请填写您的用户名')
            return
        }
        if (password == '') {
            message.warning('请填写您的密码')
            return
        }
        if (repassword == '') {
            message.warning('请确认您的密码')
            return
        }
        if (password != repassword) {
            message.warning('密码错误')
            return
        }
        $.get("/register?Username=" + username + "&Password=" + password, function (data, status) {
            if (data == "ok") {
                window.location.href = "hotel.html";
            } else {
                notification.open({
                    message: '注册失败',
                    description: '请确认您的信息，稍后重试',
                    icon: <Icon type="exclamation-circle" spin="true" style={{ color: '#FF0000' }} />,
                    btn, key, onClose: close,
                });
            }
        });
    },

    render: function () {
        const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;

        return (
            <div>
                <Form horizontal>
                    <QueueAnim delay={400} type={['bottom']} className="queue-simple">
                        <div key='a'><FormItem hasFeedback
                            help={isFieldValidating('name') ? 'validating...' : (getFieldError('name') || []).join(', ')}>
                            {getFieldDecorator('name', {
                                rules: [
                                    { required: true, min: 6, message: 'User name for at least 6 characters' }
                                ],
                            })(
                                <Input addonBefore={<Icon type="user" />} size="large" placeholder="用户名" autoFocus={true} />
                                )}
                        </FormItem></div>
                        <div key='b'><FormItem hasFeedback>
                            {getFieldDecorator('passwd', {
                                rules: [
                                    { required: true, whitespace: true, message: 'Please enter your password' },
                                    { validator: this.checkPass },
                                ],
                            })(
                                <Input addonBefore={<Icon type="lock" />} type="password" autoComplete="off" placeholder="密码"
                                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                    />
                                )}
                        </FormItem></div>
                        <div key='c'><FormItem hasFeedback>
                            {getFieldDecorator('rePasswd', {
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: 'Please confirm your password',
                                }, {
                                    validator: this.checkPass2,
                                }],
                            })(
                                <Input addonBefore={<Icon type="lock" />} type="password" autoComplete="off" placeholder="确认密码"
                                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                    />
                                )}
                        </FormItem></div>

                        <div key='d'><FormItem>
                            <Row>
                                <Col span={8} offset={2}>
                                    <Button style={{ width: 240 }} size="large" type="primary" onClick={this.handleSubmit}>注册</Button>
                                </Col>
                            </Row>
                        </FormItem></div>
                    </ QueueAnim>
                </Form>
            </div>
        );
    }
});

export default createForm()(Register);