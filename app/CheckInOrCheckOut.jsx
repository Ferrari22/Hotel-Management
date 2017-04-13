import React from 'react';
import Button from 'antd/lib/button';
import CheckOutComp from './CheckOutComp.jsx';
import CheckInComp from './CheckInComp.jsx';

var CheckInOrCheckOut = React.createClass({

    roomid : '',
    getInitialState() {
        return {
            roomstate: 'full',
        };
    },

    componentWillMount() {
        this.roomid = this.props.roomid;
        $.get("/getroomstate?Roomid=" + this.roomid, function (data, status) {
            if (status == 'success' && data == 'empty') {
                this.setState({
                    roomstate : 'empty',
                });
            }
        }.bind(this));
    },

    render() {
        var com = <CheckOutComp room_id = {this.roomid} />
        if (this.state.roomstate == 'empty') {
            com = <CheckInComp room_id = {this.roomid} />
        }
        return (
            <div>
                {com}
            </div>
        )
    }
});

export default CheckInOrCheckOut;