import React from 'react';
import Tabs from 'antd/lib/tabs';
import RoomTypeList from './RoomTypeList.jsx';
import ReviseRoomType from './ReviseRoomType.jsx';
const TabPane = Tabs.TabPane;

function callback(key) {

}

var RoomManage = React.createClass({
    render() {
        return (
            <div style={{marginTop: 15, paddingLeft: 100, paddingRight: 100}}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="房间信息" key="1"><RoomTypeList /></TabPane>
                    <TabPane tab="修改信息" key="2"><ReviseRoomType /></TabPane>                    
                </Tabs>
            </div>
        )
    }
});

export default RoomManage;