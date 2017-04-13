import React from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';

// 列表头
const columns = [{
    title: '客户号',
    dataIndex: 'customer_id',
    width: '15%'
}, {
    title: '姓名',
    dataIndex: 'customer_name',
    width: '15%'
}, {
    title: '房间号',
    dataIndex: 'room_id',
    width: '15%'
}, {
    title: '入住时间',
    dataIndex: 'livetime',
    sorter: (a, b) => a.staff_age - b.staff_age,
    width: '20%'
}, {
    title: '离开时间',
    dataIndex: 'leavetime',
    width: '20%'
}, {
    title: '消费金额',
    dataIndex: 'consume',
    sorter: (a, b) => a.consume - b.consume,
    width: '15%'
}];

var HistoryList = React.createClass({

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
        $.get("/recordlist", function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                const pagi = this.state.pagination;
                pagi.total = Number(datas.totalCount[0].sum);
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
                    <Card title="入住记录" extra={<Button type="ghost" onClick={this.freshen}><Icon type="reload" /></Button>}>
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

export default HistoryList;