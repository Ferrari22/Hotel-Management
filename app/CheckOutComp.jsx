import React from 'react';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Popconfirm from 'antd/lib/popconfirm';


var CheckOutComp = React.createClass({

    // 房间号
    roomid: '',
    getInitialState() {
        return {
            ModalText: '此次共需退还：',
            visible: false,
        };
    },

    handleCancel() {
        this.setState({
            visible: false,
        });
    },

    confirm() {
        this.roomid = this.props.room_id;
        this.setState({
            visible: true,
        });
        $.get("/checkoutsum?Roomid=" + this.roomid, function (data, status){
            if (status == 'success') {
                this.setState({
                    ModalText: '此次共需退还：' + data + '元'
                })
            }
        }.bind(this));
    },

    cancel() {

    },

    handleSubmit() {
        this.setState({
            confirmLoading: true,
        });
        var RoomId = this.roomid;
        $.get("/checkout?Roomid=" + RoomId, function (data, status) {
            if (status == 'success' && data == 'ok') {
                location.reload(true);
            }
        }.bind(this));
    },

    render() {
        return (
            <div>
                <Popconfirm title="确定退房吗?" placement="topLeft" arrowPointAtCenter="true"
                    onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button type="dashed">退房</Button>
                </Popconfirm>
                <Modal visible={this.state.visible}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    width='400' >
                    <p style={{ fontSize: 14 }}>{this.state.ModalText}</p>
                </Modal>
            </div>
        )
    }
});

export default CheckOutComp;