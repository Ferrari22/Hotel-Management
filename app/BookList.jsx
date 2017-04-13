import React from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';

var result = [];

var BookList = React.createClass({


    getInitialState() {
        return {
            filterDropdownVisible: false,
            searchText: '',
            data: [],
            pagination: {},
            loading: false,
        };
    },

    onInputChange(e) {
        this.setState({ searchText: e.target.value });
    },

    onSearch() {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            loading: true,
            filterDropdownVisible: false,
        });
        $.get("/booklistreg?Roomid=" + searchText, function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                const pagi = this.state.pagination;
                pagi.total = Number(datas.totalCount[0].sum);
                result = datas.results;
                this.setState({
                    loading: false,
                    data: datas.results,
                    pagination: pagi
                })
            }
        }.bind(this));
    },

    handleTableChange(pagination) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch(pagination.current);
    },
    // 获取订单信息
    fetch(page) {
        this.setState({ loading: true });
        $.get("/booklist?page=" + page, function (data, status) {
            if (status == 'success') {
                // 解析json数据
                var datas = eval('(' + data + ')');
                const pagi = this.state.pagination;
                pagi.total = Number(datas.totalCount[0].sum);
                result = datas.results;
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
            filterDropdown: (
                <div style={{ padding: 8, borderRadius: 6, background: '#fff', boxShadow: '0 1px 6px rgba(0, 0, 0, .2)' }}>
                    <Input style={{ width: 130, marginRight: 8 }}
                        placeholder="查找房间"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                        />
                    <Button type="primary" onClick={this.onSearch}>查找</Button>
                </div>
            ),
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
            width: '10%'
        }, {
            title: '预订天数',
            dataIndex: 'days',
            key: 'days',
            width: '10%'
        }, {
            title: '联系方式',
            dataIndex: 'telephone',
            key: 'telephone',
            width: '20%'
        }, {
            title: '预订时间',
            dataIndex: 'livetime',
            key: 'livetime',
            width: '20%'
        }, {
            title: '预付金额',
            dataIndex: 'amount',
            key: 'amount',
            width: '20%'
        }];

        return (
            <QueueAnim delay={400} type="bottom" className="queue-simple">
                <div key="a">
                    <Card title="订单列表" extra={<Button type="ghost" onClick={this.freshen}><Icon type="reload" /></Button>}>
                        <Table columns={columns}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            onChange={this.handleTableChange} />
                    </Card>
                </div>
                <div key="b">
                    <Footer />
                </div>
            </QueueAnim>
        )
    }
});

export default BookList;