import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import CheckInComponent from './CheckInComponent.jsx';

var CheckIn = React.createClass({
    render() {

        return (
            <div>
                <QueueAnim delay={400} type={['bottom', 'top']} className="queue-simple">
                    <div key="a" ><CheckInComponent /></div>
                    <div key="b" ><Footer /></div>
                </QueueAnim>
            </div>
        )
    }
});

export default CheckIn;