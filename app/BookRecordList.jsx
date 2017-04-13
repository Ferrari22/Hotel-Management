import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import BookRecordListComponent from './BookRecordListComponent.jsx';

var BookRecordList = React.createClass({
    render() {
        return (
            <div>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a"><BookRecordListComponent /></div>
                    <div key="b"><Footer /></div>
                </QueueAnim>
            </div>
        )
    }
});

export default BookRecordList;