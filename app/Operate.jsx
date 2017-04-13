import React from 'react';
import QueueAnim from 'rc-queue-anim';
import OperateComponent from './OperateComponent.jsx';

var Operate = React.createClass({
    render() {
        return (
            <div style={{ marginTop: 15, paddingLeft: 10, paddingRight: 60 }}>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a" style={{ marginTop: 15 }}><OperateComponent /></div>
                </QueueAnim>
            </div>
        )
    }
});

export default Operate;