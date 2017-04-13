import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import CheckInBookComponent from './CheckInBookComponent.jsx';

var CheckInBook = React.createClass({
    render() {

        return (
            <div>
                <QueueAnim delay={400} type={['bottom', 'top']} className="queue-simple">
                    <div key="a" ><CheckInBookComponent /></div>
                    <div key="b" ><Footer /></div>
                </QueueAnim>
            </div>
        )
    }
});

export default CheckInBook;