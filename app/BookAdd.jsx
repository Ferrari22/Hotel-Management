import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import QueueAnim from 'rc-queue-anim';
import Popconfirm from 'antd/lib/popconfirm';
import notification from 'antd/lib/notification';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
const createForm = Form.create;
const FormItem = Form.Item;

var BookAdd = React.createClass({

    handleSubmit(e) {
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
        var name = this.refs.name.refs.input.value;
        var roomid = this.refs.roomid.refs.input.value;
        var telephone = this.refs.telephone.refs.input.value;
        var year = this.refs.year.refs.input.value;
        var month = this.refs.month.refs.input.value;
        var day = this.refs.day.refs.input.value;
        var days = this.refs.days.refs.input.value;
        var amount = this.refs.amount.refs.input.value;
        var date = year + '-' + month + '-' + day;
        var d = Number(days);
        var b = Number(amount);
        var y = Number(year);
        var m = Number(month);
        var a = Number(day);
        if (isNaN(d) || isNaN(b) || isNaN(y) || isNaN(m) || isNaN(a)) {
            notification.open({
                message: '添加失败',
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
        if (d < 0 || b < 0 || m < 0 || m > 12 || a < 0 || a > 31) {
            notification.open({
                message: '添加失败',
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
        if (name == '' || roomid == '' || telephone == '' || year == '' || month == '' || day == '' || days == '' || amount == '') {
            notification.open({
                message: '添加失败',
                description: '请确认当前信息是否正确',
                icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
                btn, key, onClose: close,
            });
            return;
        }
        $.get("/bookadd?Name=" + name + "&Roomid=" + roomid + "&Telephone=" + telephone + "&Days=" + days + "&Amount=" + amount + "&Date=" + date, function (data, status) {
            if (status == 'success' && data == 'ok') {
                location.reload(true);
            } else {
                notification.open({
                    message: '添加失败',
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
                    <div key='a' style={{ marginLeft: 233 }}>
                        <Card title="订单信息" style={{ width: '55%' }} >
                            <Form horizontal>
                                <FormItem {...formItemLayout} label="姓名：">
                                    <Input ref="name" autoFocus={true} />
                                </FormItem>
                                <FormItem {...formItemLayout} label="房间号：">
                                    <Input ref="roomid" />
                                </FormItem>
                                <FormItem {...formItemLayout} label="联系方式：">
                                    <Input addonBefore="+86" ref="telephone" />
                                </FormItem>
                                <FormItem {...formItemLayout} label="预订时间：">
                                    <Row>
                                        <Col span={8}><Input ref="year" placeholder="年" ></Input></Col>
                                        <Col span={8}><Input ref="month" placeholder="月" ></Input></Col>
                                        <Col span={8}><Input ref="day" placeholder="日" ></Input></Col>
                                    </Row >
                                </FormItem>
                                <FormItem {...formItemLayout} label="预订天数：">
                                    <Input ref="days" />
                                </FormItem>
                                <FormItem {...formItemLayout} label="预订金额：">
                                    <Input ref="amount" />
                                </FormItem>
                                <FormItem>
                                    <Popconfirm title="确定要添加此订单吗？" onConfirm={this.handleSubmit} placement="rightBottom">
                                        <Button type="primary" style={{ width: '80%', marginLeft: 36 }}>确 定</Button>
                                    </Popconfirm>
                                </FormItem>
                            </Form>
                        </Card>
                    </div >
                    <div key='b'>
                        <footer style={{ textAlign: 'center', marginTop: 20, marginBottom: 20, marginRight: 55 }}>
                            <p>HotelSystem @ 2016</p>
                        </footer>
                    </div>
                </QueueAnim>
            </div>
        )
    }
});

export default createForm()(BookAdd);