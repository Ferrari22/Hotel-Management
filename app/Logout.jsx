import React from 'react';
import Modal from 'antd/lib/modal';
import Icon from 'antd/lib/icon';

var Logout = React.createClass({

    getInitialState() {
        return {
            visible: true,
        };
    },

    handleCancel() {
        this.setState({
            visible: false,
        });
        window.location.href = "hotel.html";
    },

    clickOk() {
        this.setState({
            confirmLoading: true,
        });
        window.location.href = "login.html";
    },

    render() {
        return (
            <div>
                <Modal visible={this.state.visible}
                    onOk={this.clickOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    width='400'
                    okText='离开' cancelText='取消'>
                    <p style={{ fontSize: 18 }}><Icon type="exclamation-circle-o" style={{ color: '#00BFFF', fontSize: 24 }} />&nbsp;&nbsp;您即将离开本系统.</p>
                </Modal>
            </div>
        )
    }
});

export default Logout;