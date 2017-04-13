import React from 'react';
import Tabs from 'antd/lib/tabs';
import Operate from './Operate.jsx';
import ListInfo from './ListInfo.jsx';
import BookManage from './BookManage.jsx';
const TabPane = Tabs.TabPane;

var Operation = React.createClass({

    render() {
        return (
            <div style={{ marginTop: 15, paddingLeft: 100, paddingRight: 100 }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="信 息" key="1"><ListInfo /></TabPane>
                    <TabPane tab="入住/退房" key="2"><Operate /></TabPane>
                    <TabPane tab="订单管理" key="3"><BookManage /></TabPane>
                </Tabs>
            </div>
        )
    }
});

export default Operation;