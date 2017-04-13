import React from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

// 列表头
const columns = [{
    title: '订单号',
    dataIndex: 'book_id',
    key: 'book_id',
    width: '10%'
}, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: '10%'
}, {
    title: '房间号',
    dataIndex: 'room_id',
    key: 'room_id',
    width: '10%'
}, {
    title: '天数',
    dataIndex: 'days',
    key: 'days',
    width: '10%'
}, {
    title: '联系方式',
    dataIndex: 'telephone',
    key: 'telephone',
    width: '14%'
}, {
    title: '预订时间',
    dataIndex: 'livetime',
    key: 'livetime',
    width: '18%'
}, {
    title: '处理时间',
    dataIndex: 'createtime',
    key: 'createtime',
    width: '18%'
}, {
    title: '预付金额',
    dataIndex: 'amount',
    key: 'amount',
    width: '10%'
}];

var BookRecordListComponent = React.createClass({

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
    // 获取房间信息
    fetch(page) {
        this.setState({ loading: true });
        $.get("/bookrecordlist?page=" + page, function (data, status) {
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
            <Card title="房间列表" extra={<Button type="ghost" onClick={this.freshen}><Icon type="reload" /></Button>}>
                <Table columns={columns}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange} />
            </Card>
        )
    }
});

export default BookRecordListComponent;