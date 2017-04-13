import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import ReviseComponent from './ReviseComponent.jsx';

var Revise = React.createClass({
    render() {

        return (
            <div>
                <QueueAnim delay={400} type={['bottom', 'top']} className="queue-simple">
                    <div key="a" ><ReviseComponent /></div>
                    <div key="b" ><Footer /></div>
                </QueueAnim>
            </div>
        )
    }
});

export default Revise;