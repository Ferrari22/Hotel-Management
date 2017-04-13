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

var DeleteRoomComponent = React.createClass({

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
        $.get("/roomtype", function (data, status) {
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
        var RoomId = this.roomid;
        $.get("/deleteroom?Roomid=" + RoomId, function (data, status) {
            if (status == 'success' && data == 'full') {
                notification.open({
                    message: '删除失败',
                    description: '当前房间正在使用',
                    icon: <Icon type="exclamation-circle" spin="true" style={{ color: '#FF0000' }} />,
                    btn, key, onClose: close,
                });
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
            } else {
                if (status == 'success' && data == 'ok') {
                    location.reload(true);
                } else {
                    notification.open({
                        message: '删除失败',
                        description: '请确认当前信息是否正确',
                        icon: <Icon type="exclamation-circle" spin="true" style={{ color: '#FF0000' }} />,
                        btn, key, onClose: close,
                    });
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                }
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
                <Card title="房间信息">
                    <Form horizontal>
                        <FormItem {...formItemLayout} label="房间号：">
                            <Select style={{ width: '100%' }} size="large" onChange={this.handleChange}>
                                {children}
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style={{ width: '80%', marginLeft: 32 }} onClick={this.showModal}>确 定</Button>
                        </FormItem>
                    </Form>
                    <p style={{ paddingTop: 16 }} ><Icon type="notification" />：正在使用的房间系统会阻止删除.</p>
                </Card>
                <Modal visible={this.state.visible}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    width='400' >
                    <p style={{ fontSize: 18 }}><Icon type="info-circle-o" style={{ color: '#02C874', fontSize: 24 }} />&nbsp;&nbsp;确定要删除此房间吗？</p>
                </Modal>
            </div>
        )
    }
});

export default createForm()(DeleteRoomComponent);