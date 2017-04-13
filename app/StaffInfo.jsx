import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Radio from 'antd/lib/radio';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import notification from 'antd/lib/notification';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

var StaffInfo = React.createClass({

    getInitialState() {
        return {
            visible: false,
            username: '',
            value: 'male',
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

    componentDidMount: function () {
        $.get("/getusername", function (data, status) {
            if (status == 'success') {
                this.name = data;
                this.setState({
                    username: data,
                });
            }
        }.bind(this));
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
        if (Name == '' || Sex == '' || Age == '' || Telephone == '' || Idnumber == '' || Address == '' || Positio) {
            notification.open({
                message: '提交失败',
                description: '请继续完善您的个人信息',
                icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                btn, key, onClose: close,
            });
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            return
        }
        var Name = this.refs.name.refs.input.value;
        var Sex = this.state.value;
        var Username = this.state.username;
        var Age = this.refs.age.refs.input.value;
        var Telephone = this.refs.telephone.refs.input.value;
        var Idnumber = this.refs.idnumber.refs.input.value;
        var Address = this.refs.address.refs.input.value;
        var Positio = this.refs.position.refs.input.value;
        if (Name == '' || Sex == '' || Age == '' || Telephone == '' || Idnumber == '' || Address == '' || Positio) {
            notification.open({
                message: '提交失败',
                description: '请继续完善您的个人信息',
                icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                btn, key, onClose: close,
            });
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }
        $.post("/updateinfo", {username:Username, name:Name, sex:Sex, age:Age, telephone:Telephone, idnumber:Idnumber, address:Address, position:Positio}, function (data, status) {
            if (status == 'success' && data == 'ok') {
                location.reload(true);                
            } else {
                notification.open({
                    message: '提交失败',
                    description: '请继续完善您的个人信息',
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
            <div style={{ marginTop: 30 }}>
                <QueueAnim delay={500} type="bottom" className="queue-simple">
                    <div key='a'>
                        <Row>
                            <Col span={14} offset={8}>
                                <Card title="个人信息" extra={<Icon type='ellipsis' spin='true' style={{ color: '#00EC00' }} />} style={{ width: 430, marginLeft: 10 }}>
                                    <Form horizontal>
                                        <FormItem {...formItemLayout} label="姓名：">
                                            <Input ref="name" autoFocus={true} />
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="性别：">
                                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                                <Radio value={'male'}>男</Radio>
                                                <Radio value={'female'}>女</Radio>
                                            </RadioGroup>
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="年龄：">
                                            <Input ref="age" />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="联系方式：">
                                            <Input addonBefore="+86" ref="telephone" />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="员工号：">
                                            <Input ref="idnumber" />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="地址：">
                                            <Input ref="address" />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="职位：">
                                            <Input ref="position" />
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" style={{ width: '80%', marginLeft: 37 }} onClick={this.showModal}>确 定</Button>
                                        </FormItem>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div key='b'>
                        <Footer />
                    </div>
                    <Modal visible={this.state.visible}
                        onOk={this.handleSubmit}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                        width='400' >
                        <p style={{ fontSize: 18 }}><Icon type="info-circle-o" style={{ color: '#02C874', fontSize: 24 }} />&nbsp;&nbsp;确定提交信息吗？</p>
                    </Modal>
                </QueueAnim>
            </div>
        )
    }
});

export default createForm()(StaffInfo);