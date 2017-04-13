import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import ReviseMemberInfo from './ReviseMemberInfo.jsx';
import MemberRegister from './MemberRegister.jsx';
import MemberDelete from './MemberDelete.jsx';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

var MemberOperateComponent = React.createClass({

    getInitialState() {
        return {
            current: 'revise',
        };
    },

    handleClick(e) {
        this.setState({
            current: e.key
        })
    },

    render() {
        var com = <ReviseMemberInfo />
        if (this.state.current == 'plus') {
            com = <MemberRegister />
        }
        if (this.state.current == 'delete') {
            com = <MemberDelete />
        }
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} style={{ width: 200 }}>
                            <Menu.Item key="revise">
                                <p style={{ fontSize: 15 }}><Icon type="edit" />修改信息</p>
                            </Menu.Item>
                            <Menu.Item key="plus">
                                <p style={{ fontSize: 15 }}><Icon type="plus-square-o" />会员注册</p>
                            </Menu.Item>
                            <Menu.Item key="delete">
                                <p style={{ fontSize: 15 }}><Icon type="delete" />会员注销</p>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={8} offset={1}>
                        {com}
                    </Col>
                </Row>
            </div>
        )
    }
});

export default MemberOperateComponent;