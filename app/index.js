import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import Home from './Home.jsx';
import Welcome from './Welcome.jsx';
import RoomManage from './RoomManage.jsx';
import MemberManage from './MemberManage.jsx';
import StaffManage from './StaffManage.jsx';
import Operation from './Operation.jsx';
import StaffInfo from './StaffInfo.jsx';
import Logout from './Logout.jsx';

ReactDOM.render((
    <Router>
        <Route path="/" component={Home}>
            <IndexRoute component={Welcome} />
            <Route path="welcome" component={Welcome} />
            <Route path="operation" component={Operation} />
            <Route path="roommanage" component={RoomManage} />
            <Route path="membermanage" component={MemberManage} />
            <Route path="staffmanage" component={StaffManage} />
            <Route path="staffinfo" component={StaffInfo} />
            <Route path="logout" component={Logout} />
        </Route>
    </Router>
), document.getElementById('root'));