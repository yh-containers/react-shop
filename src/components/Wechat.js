import React, {Component, Fragment} from 'react';
import {axiosHandleRequest} from "../axios.service";

var wx = require('weixin-js-sdk');

class Wechat extends Component {

    static defaultProps = {
        url:'',
    }

    constructor(props){
        super(props)
        this.state={
            appId:'',
            timestamp:'',
            nonceStr:'',
            signature:'',
        }
    }

    componentWillMount()
    {
        axiosHandleRequest('third-wechat-jsapi-config',{
            url:this.props.url
        },(data)=>{
            console.log(data)
            this.setState({
                appId:data['appId'],
                timestamp:data['timestamp'],
                nonceStr:data['noncestr'],
                signature:data['sign'],
            })
        },true,false)

    }



    render() {
        var url = this.props.url
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: this.state.appId, // 必填，公众号的唯一标识
            timestamp: this.state.timestamp, // 必填，生成签名的时间戳
            nonceStr: this.state.nonceStr, // 必填，生成签名的随机串
            signature: this.state.signature,// 必填，签名
            jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
        })

        wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            console.log('wx.ready')
            wx.updateAppMessageShareData({
                title: 'xxxx', // 分享标题
                desc: 'desc', // 分享描述
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                // imgUrl: '', // 分享图标
                success: function () {
                    // 设置成功
                    console.log('updateAppMessageShareData success')
                }
            });

            wx.checkJsApi({
                jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    console.log(res)
                }
            });
        });
        wx.error(function(res){
            console.log(res)
        });

        return (
            <Fragment>
            </Fragment>
        );
    }
}

export default Wechat;