import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Footer from './Footer.jsx';
import CustomerListComponent from './CustomerListComponent.jsx';

var CustomerList = React.createClass({
    render() {
        return (
            <div>
                <QueueAnim delay={400} type="bottom" className="queue-simple">
                    <div key="a"><CustomerListComponent /></div>
                    <div key="b"><Footer /></div>
                </QueueAnim>
            </div>
        )
    }
});

export default CustomerList;