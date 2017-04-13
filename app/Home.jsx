import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router';
import Head from './Head.jsx';
import Button from 'antd/lib/button';
const SubMenu = Menu.SubMenu;

var Home = React.createClass({

    getInitialState() {
        return {
            current: 'main',
        };
    },

    handleClick(e) {
        this.setState({
            current: e.key,
        });
    },
    render() {

        return (
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]}
                    mode="horizontal" theme="dark" style={{ paddingLeft: 85 }}>
                    <Menu.Item key="main">
                        <Link to="/welcome"><p style={{ fontSize: 24 }}>宾馆管理系统</p></Link>
                    </Menu.Item>

                    <Menu.Item key="work">
                        <Link to="/operation"><p style={{ fontSize: 16 }}><Icon type="laptop" />业务处理</p></Link>
                    </Menu.Item>

                    <Menu.Item key="room">
                        <Link to="/roommanage"><p style={{ fontSize: 16 }}><Icon type="home" />房间管理</p></Link>
                    </Menu.Item>

                    <Menu.Item key="member">
                        <Link to="/membermanage"><p style={{ fontSize: 16 }}><Icon type="solution" />会员管理</p></Link>
                    </Menu.Item>

                    <Menu.Item key="staff">
                        <Link to="/staffmanage"><p style={{ fontSize: 16 }}><Icon type="appstore-o" />经营管理</p></Link>
                    </Menu.Item>
                    <Menu.Item key="nbsp">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;</p>
                    </Menu.Item>

                    <SubMenu title={<Head />}>
                        <Menu.Item key="info">
                            <Link to="/staffinfo"><p style={{ fontSize: 14 }}><Icon type="edit" />&nbsp;个人信息</p></Link>
                        </Menu.Item>
                        <Menu.Item key="logout">
                            <Link to="/logout"><p style={{ fontSize: 14 }}><Icon type="logout" />&nbsp;退出</p></Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
                {this.props.children}
            </div>
        )
    }
});

export default Home;