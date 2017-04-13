import React from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import notification from 'antd/lib/notification';

// 列表头
const columns = [{
    title: '员工号',
    dataIndex: 'id_number',
    width: '10%'
}, {
    title: '姓名',
    dataIndex: 'staff_name',
    width: '10%'
}, {
    title: '性别',
    dataIndex: 'staff_sex',
    width: '10%'
}, {
    title: '年龄',
    dataIndex: 'staff_age',
    sorter: (a, b) => a.staff_age - b.staff_age,
    width: '10%'
}, {
    title: '联系方式',
    dataIndex: 'telephone',
    width: '15%'
}, {
    title: '职位',
    dataIndex: 'position',
    width: '10%'
}, {
    title: '地址',
    dataIndex: 'address',
    width: '35%'
}];

var StaffList = React.createClass({

    getInitialState() {
        return {
            data: [],
            pagination: {},
            loading: false,
        };
    },

    handleTableChange(pagination) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch(pagination.current);
    },
    // 获取员工信息
    fetch(page) {
        this.setState({ loading: true });
        const key = `open${Date.now()}`;
        const btnClick = function () {
            notification.close(key);
        };
        const btn = (
            <Button type="primary" size="small" onClick={btnClick}>
                知道了
            </Button>
        );
        $.get("/stafflist", function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                var dataTotal = Number(datas.totalCount[0].sum);
                var index = Number(datas.infoNull[0].infoNullNum)
                if (index > 0) {
                    notification.open({
                        message: '系统通知',
                        description: '当前有' + index + '个用户未填写个人资料',
                        icon: <Icon type="exclamation-circle" style={{ color: '#00BFFF' }} />,
                        btn, key, onClose: close,
                    });
                }
                const pagi = this.state.pagination;
                pagi.total = dataTotal;
                this.setState({
                    loading: false,
                    data: datas.results,
                    pagination: pagi
                })
            }
        }.bind(this));
    },

    freshen(pagination, loading) {
        this.fetch(pagination.current);
    },

    componentDidMount() {
        this.fetch(1);
    },

    render() {
        return (
            <QueueAnim delay={400} type="bottom" className="queue-simple">
                <div key="a">
                    <Card title="员工列表" extra={<Button type="ghost" onClick={this.freshen}><Icon type="reload" /></Button>}>
                        <Table columns={columns}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            onChange={this.handleTableChange}
                            bordered={true} />
                    </Card>
                </div>
                <div key="b">
                    <Footer />
                </div>
            </QueueAnim>
        )
    }
});

export default StaffList;