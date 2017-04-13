import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import notification from 'antd/lib/notification';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

const children = [];

var CheckInBookComponent = React.createClass({

    // 订单号
    memberid: '',
    getInitialState() {
        return {
            visible: false,
        };
    },
    getMemberList() {
        $.get("/bookid", function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                // json对象数组个数
                for (let i = 0; i < datas.idlist.length; i++) {
                    children.push(<Option key={datas.idlist[i].book_id}>{datas.idlist[i].book_id}</Option>);
                }
            }
        }.bind(this));
    },

    componentDidMount: function () {
        this.getMemberList()
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

    handleChange(value) {
        this.memberid = value;
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
        var Balance = this.refs.balance.refs.input.value;
        var b = Number(Balance);
        if (isNaN(b)) {
            notification.open({
                message: '入住失败',
                description: '请确认当前信息是否正确',
                icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                btn, key, onClose: close,
            });
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            return;
        }
        if (b < 0) {
            notification.open({
                message: '入住失败',
                description: '请确认当前信息是否正确',
                icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                btn, key, onClose: close,
            });
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            return;
        }
        if (Balance == '' || this.memberid == '') {
            notification.open({
                message: '入住失败',
                description: '请确认当前信息是否正确',
                icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                btn, key, onClose: close,
            });
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            return
        }
        $.get("/checkinbook?Bookid=" + this.memberid + "&Balance=" + Balance, function (data, status) {
            if (status == 'success' && data == 'ok') {
                location.reload(true);
            } else {
                notification.open({
                    message: '入住失败',
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
                <Card title="入住信息">
                    <Form horizontal>
                        <FormItem {...formItemLayout} label="订单号：">
                            <Select style={{ width: '100%' }} size="large" onChange={this.handleChange}>
                                {children}
                            </Select>
                        </FormItem>

                        <FormItem {...formItemLayout} label="预付金额：">
                            <Input ref="balance" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style={{ width: '80%', marginLeft: 32 }} onClick={this.showModal}>入 住</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Modal visible={this.state.visible}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    width='400' >
                    <p style={{ fontSize: 18 }}><Icon type="info-circle-o" style={{ color: '#02C874', fontSize: 24 }} />&nbsp;&nbsp;确定入住吗？</p>
                </Modal>
            </div>
        )
    }
});

export default createForm()(CheckInBookComponent);