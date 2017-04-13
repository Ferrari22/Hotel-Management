import React from 'react';
import Form from 'antd/lib/form';
import Footer from './Footer.jsx';
import WelcomeCard from './WelcomeCard.jsx';
import WelcomeCardNotification from './WelcomeCardNotification.jsx';
import QueueAnim from 'rc-queue-anim';
const createForm = Form.create;

var Welcome = React.createClass({

    getInitialState() {
        return {
            sum: 0,
        }
    },

    componentWillMount() {
        $.get("/bookdeletesum", function (data, status) {
            if (status == 'success') {
                this.setState({
                    sum: Number(data),
                });
            }
        }.bind(this));
    },

    render() {
        var com = <WelcomeCard />
        if (this.state.sum > 0) {
            com = <WelcomeCardNotification sum={this.state.sum} />
        }
        return (
            <QueueAnim delay={400} type={['bottom', 'top']} className="queue-simple">
                <div key="a" style={{ paddingLeft: 120, paddingRight: 120, marginTop: 40 }}>{com}</div>
                <div key="b" style={{ paddingLeft: 200, paddingRight: 200 }}><Footer /></div>
            </QueueAnim>
        )
    }
});

export default Welcome;