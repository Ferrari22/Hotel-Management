import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import HomeListComponent from './HomeListComponent.jsx';

var HomeList = React.createClass({
    render() {
        return (
            <div>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a"><HomeListComponent /></div>
                    <div key="b"><Footer /></div>
                </QueueAnim>
            </div>
        )
    }
});

export default HomeList;