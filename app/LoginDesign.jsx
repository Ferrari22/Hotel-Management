import React from 'react';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router';

var LoginDesign = React.createClass({

    getInitialState: function () {
        return {
            current: 'login',
        };
    },

    handleClick: function (e) {
        this.setState({
            current: e.key,
        });
    },

    render: function () {

        var titleStyle = {
            fontSize: 50
        }

        var pStyle = {
            fontSize: 16
        }

        var divtitleStyle = {
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 40,
            marginBottom: 15
        }

        var divtabsStyle = {
            width: 145,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 15
        }

        var divChildStyle = {
            width: 280,
            marginLeft: 'auto',
            marginRight: 'auto',
        }

        return (
            <div>
                <div style={divtitleStyle}>
                    <p style={titleStyle}>宾 馆 管 理 系 统</p>
                </div>
                <div style={divtabsStyle}>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="login"><Link to="/login"><p style={pStyle}>登录</p></Link></Menu.Item>
                        <Menu.Item key="register"><Link to="/register"><p style={pStyle}>注册</p></Link></Menu.Item>
                    </Menu>
                </div>
                <div style={divChildStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});


export default LoginDesign;