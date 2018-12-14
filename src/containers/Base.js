import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initUserLoginInfo} from '../reducers/globalData'
import {axiosHandleRequest} from "../axios.service";

class BaseContainer extends Component {
    login_user_id = 0
    login_token = ''

    constructor(props){
        super(props)
        this.login_user_id = this._loadUserLoginInfo('user_id')
        this.login_token = this._loadUserLoginInfo('token')
    }

    //获取登录信息
    _loadUserLoginInfo(field=''){
        var loginInfo = localStorage.getItem('loginInfo')
        loginInfo = loginInfo?JSON.parse(loginInfo):{}
        if(field){
            if(loginInfo.hasOwnProperty(field)){
                return loginInfo[field]
            }else{
                return null
            }
        }else {
            return loginInfo
        }
    }

    //返回动作
    historyAction() {
        console.log(this.props)
        if(this.props.history.length>2){
            this.props.history.goBack()
        }else{
            this.props.history.replace('/')
        }

    }

    //发送网络请求
    sendAjax($uri,req_data,handle,is_handle_data=true,is_show_msg=true){
        axiosHandleRequest($uri,req_data,handle,is_handle_data,is_show_msg)
    }

    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}



export default BaseContainer;