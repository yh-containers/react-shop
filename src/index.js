import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Routers} from 'react-router-dom';
import { renderRoutes } from 'react-router-config'

import './index.css';
import 'antd-mobile/lib/icon/style/css'; //引入icon组件样式
import {routes} from "./route/route";



ReactDOM.render(
    <Routers>
        {/* kick it all off with the root route */}
        {renderRoutes(routes)}
    </Routers>,
    document.getElementById('root'));
