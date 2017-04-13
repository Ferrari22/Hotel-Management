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

var CheckInComponent = React.createClass({

    // 房间号
    roomid: '',
    getInitialState() {
        return {
            visible: false,
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

    getHomeList() {
        $.get("/getroomid", function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                // json对象数组个数
                for (let i = 0; i < datas.idlist.length; i++) {
                    children.push(<Option key={datas.idlist[i].room_id}>{datas.idlist[i].room_id}</Option>);
                }
            }
        }.bind(this));
    },

    componentDidMount: function () {
        this.getHomeList()
    },

    handleChange(value) {
        this.roomid = value;
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
        var Name = this.refs.name.refs.input.value;
        var RoomId = this.roomid;
        var Telephone = this.refs.telephone.refs.input.value;
        var Days = this.refs.days.refs.input.value;
        var Balance = this.refs.balance.refs.input.value;
        var d = Number(Days);
        var b = Number(Balance);
        if (isNaN(d) || isNaN(b)) {
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
        if (d < 0 || b < 0) {
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
        $.get("/checkin?Name=" + Name + "&Roomid=" + RoomId + "&Telephone=" + Telephone + "&Days=" + Days + "&Balance=" + Balance, function (data, status) {
            if (status == 'success' && data == 'ok') {
                location.reload(true);
            } else {
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
                        <FormItem {...formItemLayout} label="姓名：">
                            <Input ref="name" autoFocus={true} />
                        </FormItem>

                        <FormItem {...formItemLayout} label="房间号：">
                            <Select style={{ width: '100%' }} size="large" onChange={this.handleChange}>
                                {children}
                            </Select>
                        </FormItem>

                        <FormItem {...formItemLayout} label="联系方式：">
                            <Input addonBefore="+86" ref="telephone" />
                        </FormItem>
                        <FormItem {...formItemLayout} label="居住天数：">
                            <Input ref="days" />
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

export default createForm()(CheckInComponent);