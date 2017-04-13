import React from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

// 列表头
const columns = [{
    title: '客户名',
    dataIndex: 'client_name',
    width: '15%'
}, {
    title: '房间号',
    dataIndex: 'room_id',
    width: '15%'
}, {
    title: '居住天数',
    dataIndex: 'days',
    width: '15%'
}, {
    title: '联系方式',
    dataIndex: 'telephone',
    width: '15%'
}, {
    title: '入住时间',
    dataIndex: 'livetime',
    width: '25%'
}, {
    title: '余额',
    dataIndex: 'balance',
    width: '15%'
}];

var CustomerListComponent = React.createClass({

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
        $.get("/customerlist?page=" + page, function (data, status) {
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
            <Card title="客户列表" extra={<Button type="ghost" onClick={this.freshen}><Icon type="reload" /></Button>}>
                <Table columns={columns}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    bordered={true}  />
            </Card>
        )
    }
});

export default CustomerListComponent;