import React from 'react';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/radio';
import QueueAnim from 'rc-queue-anim';
import Select from 'antd/lib/select';
import Footer from './Footer.jsx';
import Popconfirm from 'antd/lib/popconfirm';
import notification from 'antd/lib/notification';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const children = [];

var ReviseMemberInfo = React.createClass({

    memberid: '',
    getMemberList() {
        $.get("/memberid", function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                // json对象数组个数
                for (let i = 0; i < datas.idlist.length; i++) {
                    children.push(<Option key={datas.idlist[i].member_id}>{datas.idlist[i].member_id}</Option>);
                }
            }
        }.bind(this));
    },

    componentDidMount: function () {
        this.getMemberList()
    },

    handleChange(value) {
        this.memberid = value;
    },
    getInitialState() {
        return {
            value: 'VIP1',
        };
    },

    onChange(e) {
        this.setState({
            value: e.target.value,
        });

    },

    confirm() {
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
        var memberId = this.memberid;
        var telephone = this.refs.telephone.refs.input.value;
        var grade = this.state.value;
        if (memberId == '') {
            notification.open({
                message: '修改失败',
                description: '请确认当前信息是否正确',
                icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                btn, key, onClose: close,
            });
            return;
        }
        $.get("/updatememberinfo?Memberid=" + memberId + "&Grade=" + grade + "&Telephone=" + telephone, function (data, status) {
            if (status == 'success' && data == 'ok') {
                location.reload(true);
            } else {
                notification.open({
                    message: '修改失败',
                    description: '请确认当前信息是否正确',
                    icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                    btn, key, onClose: close,
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
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a">
                        <Card title="会员信息">
                            <Form horizontal>
                                <FormItem {...formItemLayout} label="会员号：">
                                    <Select style={{ width: '100%' }} size="large" onChange={this.handleChange}>
                                        {children}
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="会员等级：">
                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                        <Radio value={'VIP1'}>VIP1</Radio>
                                        <Radio value={'VIP2'}>VIP2</Radio>
                                        <Radio value={'VIP3'}>VIP3</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem {...formItemLayout} label="联系方式：">
                                    <Input size="large" ref="telephone" />
                                </FormItem>
                                <FormItem>
                                    <Popconfirm title="确定要修改此条信息吗？" onConfirm={this.confirm} placement="rightBottom">
                                        <Button type="primary" size="large" style={{ width: '80%', marginLeft: 32 }}>确定</Button>
                                    </Popconfirm>
                                </FormItem>
                            </Form>
                            <p style={{ paddingTop: 16 }} ><Icon type="notification" />：联系方式可以为空不填.</p>
                        </Card>
                    </div>
                    <div key="b">
                        <Footer />
                    </div>
                </QueueAnim>
            </div>
        )
    }
});

export default Form.create()(ReviseMemberInfo);