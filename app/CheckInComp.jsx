import React from 'react';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Popconfirm from 'antd/lib/popconfirm';
import CheckInComponent from './CheckInComponent.jsx';
import CheckInMemberComponent from './CheckInMemberComponent.jsx';


var CheckInComp = React.createClass({

    roomid : '',
    getInitialState() {
        return {
            visible: false,
            type: 'client'
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
            type: 'member'
        });
    },

    cancel() {
        this.roomid = this.props.room_id;
        this.setState({
            visible: true,
            type: 'client'
        });
    },

    render() {
        var com = <CheckInComponent room_id = {this.roomid} />
        if (this.state.type == 'member') {
            com = <CheckInMemberComponent room_id = {this.roomid} />
        }
        return (
            <div>
                <Popconfirm title="是会员入住吗?" placement="topLeft" arrowPointAtCenter="true"
                    onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button type="dashed">入住</Button>
                </Popconfirm>
                <Modal title="入住信息"
                    visible={this.state.visible}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    width="400" >
                    {com}
                </Modal>
            </div>
        )
    }
});

export default CheckInComp;