import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Button, Icon, NavBar,List,Checkbox} from "antd-mobile";

import '../assets/css/pay.css'
import WrapWithAjaxData from "../components/WrapWithAjaxData";
import {initData,choosePayWay} from "../reducers/pay";
import BaseContainer from "./Base";

class PayContainer extends BaseContainer {
    static propTypes = {
        initData:PropTypes.func,
        choosePayWay:PropTypes.func,
    }

    handlePayWay(index){
        this.props.choosePayWay(index)
    }
    handlePay(){
        let req_param = this.props.match.params
        let {order_id=0} = req_param
        var req_object = {
            order_id:order_id,
            pay_id:this.props.pay_id,
            pay_mode:'JSAPI',
            open_id:'wx82644aa09da720bf',
        }
        this.sendAjax('order-pay-sign',req_object,(data)=>{
            console.log(data)
        })
    }
    render() {
        return (
            <div id='pay-page'>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push('/orders')}
                >订单支付</NavBar>
                <div className="pay-info">需支付:<span>￥{this.props.pay_money}</span></div>
                <div className="pay-content">
                    <h3>请选择支付方式:</h3>
                    {this.props.pay_way.map(function(value,index){
                        var {id=0,name='',img=''} = value
                        return (
                            <div key={'pay-way'+index} className="item">
                                <img src={img} alt=""/>
                                <div className="content">
                                    {name}
                                </div>
                                <Checkbox
                                    checked={this.props.pay_id===id}
                                    onChange={(e)=>this.handlePayWay(index)}
                                />
                            </div>
                        )
                    },this)}
                </div>
                <div className="pay-footer">
                    <Button
                        type="warning"
                        onClick={this.handlePay.bind(this)}
                    >确认支付（{this.props.pay_money}）</Button>
                </div>
            </div>
        );
    }
}

const mapStateProps =(state)=>{
    return {
        pay_money:state.pay.pay_money,
        pay_way:state.pay.pay_way,
        pay_id:state.pay.pay_id,
    }
}

const mapDispatchProps=(dispatch)=>{
    return {
        initData:(data)=>{
            dispatch(initData(data))
        },
        choosePayWay:(index)=>{
            dispatch(choosePayWay(index))
        },
    }
}

const mergeProps=(stateProps,dispatchProps,ownProps)=>{
    let req_param = ownProps.match.params
    return Object.assign({}, {req_param:req_param},ownProps, stateProps, dispatchProps)
}

PayContainer=WrapWithAjaxData(PayContainer,[
    ['order-pay','initData','req_param']
])
export default connect(mapStateProps,mapDispatchProps,mergeProps)(PayContainer);