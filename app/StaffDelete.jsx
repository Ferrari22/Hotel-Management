import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

const children = [];

var StaffDelete = React.createClass({

    // 房间号
    staffid: '',
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
    getStaffList() {
        $.get("/staffid", function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                // json对象数组个数
                for (let i = 0; i < datas.idlist.length; i++) {
                    children.push(<Option key={datas.idlist[i].id_number}>{datas.idlist[i].id_number}</Option>);
                }
            }
        }.bind(this));
    },

    componentDidMount: function () {
        this.getStaffList()
    },

    handleChange(value) {
        this.staffid = value;
    },

    handleSubmit() {
        this.setState({
            confirmLoading: true,
        });
        if (this.staffid == '') {
            message.error('删除失败');
            this.setState({
                confirmLoading: false,
                visible: false,
            });
            return;
        }
        $.get("/staffdelete?Idnumber=" + this.staffid, function (data, status) {
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
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a">
                        <Card title="员工信息" style={{ width: '40%', marginLeft: 270 }} >
                            <Form horizontal>
                                <FormItem {...formItemLayout} label="员工号：">
                                    <Select style={{ width: '100%' }} size="large" onChange={this.handleChange}>
                                        {children}
                                    </Select>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" style={{ width: '80%', marginLeft: 33 }} onClick={this.showModal}>确 定</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                    <div key="b">
                        <Footer />
                    </div>
                </QueueAnim>
                <Modal visible={this.state.visible}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    width='400' >
                    <p style={{ fontSize: 18 }}><Icon type="info-circle-o" style={{ color: '#02C874', fontSize: 24 }} />&nbsp;&nbsp;确定要删除此员工的所有信息吗？</p>
                </Modal>
            </div >
        )
    }
});

export default createForm()(StaffDelete);