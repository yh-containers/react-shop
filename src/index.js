import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Routers} from 'react-router-dom';
import { renderRoutes } from 'react-router-config'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import {routes} from "./route/route";
import {loginInfo} from './middleWare'
import combine  from './reducers/combine'


import './index.css';
import 'antd-mobile/lib/icon/style/css'; //引入icon组件样式



const store = createStore(combine)
// const store = applyMiddleware(loginInfo)(createStore)(combine)
store.subscribe(()=>{
    console.log(store.getState())
})

ReactDOM.render(
    <Provider store={store}>
        <Routers>
            {/* kick it all off with the root route */}
            {renderRoutes(routes)}
        </Routers>
    </Provider>
        ,
    document.getElementById('root'));
