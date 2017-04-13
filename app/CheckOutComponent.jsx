import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Modal from 'antd/lib/modal';
import notification from 'antd/lib/notification';
import Icon from 'antd/lib/icon';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

const children = [];

var CheckOutComponent = React.createClass({

    // 房间号
    roomid: '',
    getInitialState() {
        return {
            ModalText: '此次共需退还：',
            visible: false,
        };
    },
    showModal() {
        this.setState({
            visible: true,
        });
        $.get("/checkoutsum?Roomid=" + this.roomid, function (data, status) {
            if (status == 'success') {
                this.setState({
                    ModalText: '此次共需退还：' + data + '元'
                })
            }
        }.bind(this));
    },
    handleCancel() {
        this.setState({
            visible: false,
        });
    },
    getHomeList() {
        $.get("/romeid", function (data, status) {
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
        if (RoomId == '') {
            notification.open({
                message: '退房失败',
                description: '请选择房间号',
                icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                btn, key, onClose: close,
            });
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            return;
        }
        $.get("/checkout?Roomid=" + RoomId, function (data, status) {
            if (status == 'success' && data == 'ok') {
                location.reload(true);
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
                <Card title="退房信息">
                    <Form horizontal>
                        <FormItem {...formItemLayout} label="房间号：">
                            <Select style={{ width: '100%' }} ref="roomid" size="large" onChange={this.handleChange}>
                                {children}
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style={{ width: '80%', marginLeft: 32 }} onClick={this.showModal}>退 房</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Modal visible={this.state.visible}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    width='400' >
                    <p style={{ fontSize: 16 }}>{this.state.ModalText}</p>
                </Modal>
            </div>
        )
    }
});

export default createForm()(CheckOutComponent);