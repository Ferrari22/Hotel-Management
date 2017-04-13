import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import RoomTypeListComponent from './RoomTypeListComponent.jsx';

var RoomTypeList = React.createClass({
    render() {
        return (
            <div style={{ marginTop: 15, paddingLeft: 30, paddingRight: 30 }}>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a" style={{ marginTop: 10 }}><RoomTypeListComponent /></div>
                    <div key="b"><Footer /></div>
                </QueueAnim>
            </div>
        )
    }
});

export default RoomTypeList;