import React from 'react';
import Tabs from 'antd/lib/tabs';
import StaffManageComponent from './StaffManageComponent.jsx';
import FinanceManage from './FinanceManage.jsx';
const TabPane = Tabs.TabPane;

var StaffManage = React.createClass({
    render() {
        return (
            <div style={{marginTop: 15, paddingLeft: 100, paddingRight: 100}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="员工管理" key="1"><StaffManageComponent /></TabPane>
                    <TabPane tab="财务管理" key="2"><FinanceManage /></TabPane>                    
                </Tabs>
            </div>
        )
    }
});

export default StaffManage;