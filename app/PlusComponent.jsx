import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Radio from 'antd/lib/radio';
import notification from 'antd/lib/notification';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

var PlusComponent = React.createClass({

    getInitialState() {
        return {
            visible: false,
            value: 'F',
        };
    },

    showModal() {
        this.setState({
            visible: true,
        });
    },

    handleCancel() {
        this.setState({
            visible: false,
        });
    },

    onChange(e) {
        this.setState({
            value: e.target.value,
        });
    },

    handleSubmit() {
        this.setState({
            confirmLoading: true,
        });
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
        var Roomid = this.refs.roomid.refs.input.value;
        var Type = this.state.value;
        $.get("/addroom?Roomid=" + Roomid + "&Type=" + Type, function (data, status) {
            if (status == 'success' && data == 'ok') {
                location.reload(true);
            } else {
                notification.open({
                    message: '添加失败',
                    description: '请确认当前信息是否正确',
                    icon: <Icon type="exclamation-circle" spin="true" style={{ color: '#FF0000' }} />,
                    btn, key, onClose: close,
                });
                this.setState({
                    visible: false,
                    confirmLoading: false,
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
                <Card title="添加信息">
                    <Form horizontal>
                        <FormItem {...formItemLayout} label="房间号：">
                            <Input ref="roomid" autoFocus={true} />
                        </FormItem>

                        <FormItem {...formItemLayout} label="房间类型：">
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio value={'F'}>单人间</Radio>
                                <Radio value={'E'}>大床房</Radio>
                                <Radio value={'C'}>标准间A</Radio>
                                <Radio value={'D'}>标准间B</Radio>
                                <Radio value={'B'}>商务房</Radio>
                                <Radio value={'A'}>总统套房</Radio>
                            </RadioGroup>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" style={{ width: '80%', marginLeft: 32 }} onClick={this.showModal}>确 定</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Modal visible={this.state.visible}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    width='400' >
                    <p style={{ fontSize: 18 }}><Icon type="info-circle-o" style={{ color: '#02C874', fontSize: 24 }} />&nbsp;&nbsp;确定添加此房间吗？</p>
                </Modal>
            </div>
        )
    }
});

export default createForm()(PlusComponent);