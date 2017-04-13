import React from 'react';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/radio';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import Popconfirm from 'antd/lib/popconfirm';
import notification from 'antd/lib/notification';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

var ReviseMemberInfo = React.createClass({

    getInitialState() {
        return {
            value: 'VIP1',
        };
    },

    onChange(e) {
        this.setState({
            value: e.target.value,
        });

    },

    confirm() {
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
        var name = this.refs.name.refs.input.value;
        var telephone = this.refs.telephone.refs.input.value;
        var grade = this.state.value;
        if (name == '' || telephone == '') {
            notification.open({
                    message: '注册失败',
                    description: '请确认当前信息是否正确',
                    icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                    btn, key, onClose: close,
                });
            return;
        }
        $.get("/memberregister?Name=" + name + "&Grade=" + grade + "&Telephone=" + telephone, function (data, status) {
            if (status == 'success' && data == 'ok') {
                location.reload(true);
            } else {
                notification.open({
                    message: '注册失败',
                    description: '请确认当前信息是否正确',
                    icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                    btn, key, onClose: close,
                });
            }
        }.bind(this));
    },

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        return (
            <div>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a">
                        <Card title="会员信息">
                            <Form horizontal>
                                <FormItem {...formItemLayout} label="姓名：">
                                    <Input ref="name" autoFocus={true}/>
                                </FormItem>
                                <FormItem {...formItemLayout} label="会员等级：">
                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                        <Radio value={'VIP1'}>VIP1</Radio>
                                        <Radio value={'VIP2'}>VIP2</Radio>
                                        <Radio value={'VIP3'}>VIP3</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem {...formItemLayout} label="联系方式：">
                                    <Input ref="telephone" />
                                </FormItem>
                                <FormItem>
                                    <Popconfirm title="确定要注册吗？" onConfirm={this.confirm} placement="rightBottom">
                                        <Button type="primary" style={{ width: '80%', marginLeft: 32 }}>确定</Button>
                                    </Popconfirm>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                    <div key="b">
                        <Footer />
                    </div>
                </QueueAnim>
            </div>
        )
    }
});

export default Form.create()(ReviseMemberInfo);