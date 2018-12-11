import React, {Component} from 'react';
import { createForm } from 'rc-form';
import { NavBar,Icon,List,InputItem,Button,Toast } from 'antd-mobile';
import {axiosHandleRequest} from "../axios.service";

class LoginContainer extends Component {
    static defaultProps ={
        'redirect_url':'http%3a%2f%2f127.0.0.1%3a3000%2flogin',
        'third_login':{
            'url': 'http://127.0.0.1:8082/auth.php/login?appid=123',
        }
    }

    componentWillMount(){
        const paramsString = this.props.location.search.substring(1)
        const searchParams = new URLSearchParams(paramsString)
        const user_id=searchParams.get('user_id')
        const token=searchParams.get('token')
        console.log(user_id)
        if(user_id) {
            this.handleLogin({user_id:user_id,token:token})
        }
    }

    handleSubmit() {
        console.log(this.props.form.getFieldsValue())
        Toast.show('请使用第三方登录')
        axiosHandleRequest('user-login',this.props.form.getFieldsValue())
    }
    //第三方授权登录
    handleThirdRedirect(type){
        window.location.href=this.props.third_login.url+'&redirect_url='+this.props.redirect_url
    }

    //处理登录
    handleLogin(params){
        let {user_id} = params
        localStorage.setItem('loginInfo',JSON.stringify(params))
        // Toast.loading('登录中....',3)
        //登录成功跳转首页
        this.props.history.push('/')

    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="login-page">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push('/')}

                >用户登录</NavBar>
                <List>
                    <InputItem
                        {...getFieldProps('user_name')}
                        placeholder="用户名"
                    />
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="密码"
                    />
                </List>
                <List>
                    <List.Item>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button>
                    </List.Item>
                </List>

                <div className="third-block">
                    <div className="item" onClick={this.handleThirdRedirect.bind(this,'wechat')}>
                        <img src={require('../assets/images/flow-index1.png')} alt=""/>
                        授权登录
                    </div>

                </div>
            </div>
        );
    }
}

const LoginContainerWrapper = createForm()(LoginContainer);
export default LoginContainerWrapper;

