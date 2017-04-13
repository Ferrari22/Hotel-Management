import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import QueueAnim from 'rc-queue-anim';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

const children = [];

var BookDelete = React.createClass({

    // 订单号
    memberid: '',
    getMemberList() {
        $.get("/bookid", function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                // json对象数组个数
                for (let i = 0; i < datas.idlist.length; i++) {
                    children.push(<Option key={datas.idlist[i].book_id}>{datas.idlist[i].book_id}</Option>);
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

    handleSubmit() {
        if (this.memberid == '') {
            message.error('删除失败');
            return;
        }
        $.get("/bookdelete?Idnumber=" + this.memberid, function (data, status) {
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
                    <div key="a" style={{ marginLeft: 233 }}>
                        <Card title="订单信息" style={{ width: '55%' }}>
                            <Form horizontal>
                                <FormItem {...formItemLayout} label="订单号：">
                                    <Select style={{ width: '100%' }} size="large" onChange={this.handleChange}>
                                        {children}
                                    </Select>
                                </FormItem>
                                <FormItem>
                                    <Popconfirm title="确定要删除此订单吗？" onConfirm={this.handleSubmit} placement="rightBottom">
                                        <Button type="primary" style={{ width: '80%', marginLeft: 33 }}>确 定</Button>
                                    </Popconfirm>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                    <div key='b'>
                        <footer style={{ textAlign: 'center', marginTop: 20, marginBottom: 20, marginRight: 55 }}>
                            <p>HotelSystem @ 2016</p>
                        </footer>
                    </div>
                </QueueAnim>
            </div >
        )
    }
});

export default createForm()(BookDelete);