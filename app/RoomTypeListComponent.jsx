import React from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

// 列表头
const columns = [{
    title: '房间号',
    dataIndex: 'room_id',
    width: '25%'
}, {
    title: '类型',
    dataIndex: 'type_name',
    width: '25%'
}, {
    title: '价格',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
    width: '25%'
}, {
    title: '预定价格',
    dataIndex: 'subsfee',
    sorter: (a, b) => a.price - b.price,
    width: '25%'
}];

var RoomTypeListComponent = React.createClass({

    getInitialState() {
        return {
            data: [],
            pagination: {},
            loading: false,
        };
    },

    handleTableChange(pagination, filters) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch(pagination.current);
    },

    fetch(page) {
        this.setState({ loading: true });
        $.get("/roomtypelist?page=" + page, function (data, status) {
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

export default RoomTypeListComponent;