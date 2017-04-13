import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import CheckOutComponent from './CheckOutComponent.jsx';

var CheckOut = React.createClass({
    render() {

        return (
            <div>
                <QueueAnim delay={400} type={['bottom', 'top']} className="queue-simple">
                    <div key="a" ><CheckOutComponent /></div>
                    <div key="b" ><Footer /></div>
                </QueueAnim>
            </div>
        )
    }
});

export default CheckOut;