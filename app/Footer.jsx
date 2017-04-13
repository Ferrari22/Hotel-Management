import React from 'react';

var Footer = React.createClass({
    render: function () {

        var footerStyle = {
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
        }

        return (
            <div style={{ marginTop: 20, marginBottom: 20}}>
                <footer style={footerStyle}>
                    <p>HotelSystem @ 2016</p>
                </footer>
            </div>
        );
    },
});

export default Footer;