import React from 'react';
import Tabs from 'antd/lib/tabs';
import MemberList from './MemberList.jsx'
import MemberOperate from './MemberOperate.jsx';
const TabPane = Tabs.TabPane;

var MemberManage = React.createClass({
    render() {
        return (
            <div style={{marginTop: 15, paddingLeft: 100, paddingRight: 100}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="会员信息" key="1"><MemberList /></TabPane>
                    <TabPane tab="业务办理" key="2"><MemberOperate /></TabPane>                    
                </Tabs>
            </div>
        )
    }
});

export default MemberManage;