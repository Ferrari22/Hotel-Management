import React from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

// 列表头
const columns = [{
    title: '会员号',
    dataIndex: 'member_id',
    width: '20%'
}, {
    title: '会员名',
    dataIndex: 'member_name',
    width: '20%'
}, {
    title: '会员等级',
    dataIndex: 'grade',
    width: '20%'
}, {
    title: '优惠率',
    dataIndex: 'rate',
    width: '20%'
}, {
    title: '联系方式',
    dataIndex: 'telephone',
    width: '20%'
}];

var MemberComponent = React.createClass({

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
        $.get("/memberlist?page=" + page, function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                const pagi = this.state.pagination;
                pagi.total = Number(datas.totalCount[0].sum);
                this.setState({
                    loading: false,
                    data: datas.results,
                    pagination: pagi,
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
            <Card title="会员信息" extra={<Button type="ghost" onClick={this.freshen}><Icon type="reload" /></Button>}>
                <Table
                    bordered="true"
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}  />
            </Card>
        )
    }
});

export default MemberComponent;