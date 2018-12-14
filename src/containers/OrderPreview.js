import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import BaseContainer from "./Base";

import { NavBar, Icon,List,Card,InputItem,Button } from 'antd-mobile';
import  '../assets/css/OrderPreview.css'
import {initData} from "../reducers/orderPreview";

class OrderPreviewContainer extends BaseContainer {
    static propTypes = {
        initData:PropTypes.func,
    }

    componentWillMount(){
        var {match} = this.props
        var {info=''} = match.params
        var req_obj = {}
        if(info){
            req_obj['num']=1
            req_obj['info'] = info
        }
        //获取商品数据
        this.sendAjax('order-preview',req_obj,(data)=>{
            console.log(this.props)

            this.props.initData(data)
        })
        //获取地址信息
    }

    //获取地址信息
    getAddr(addr_id=0) {
        if(this.login_user_id){
            if(addr_id){
                return (
                    <List.Item
                        className="address"
                        arrow="horizontal"
                        multipleLine
                        onClick={() => {}}
                    >
                        <span>用户名</span>
                        <span>18702783614</span>
                        <List.Item.Brief>广东省深圳市南山区  63xxxxx</List.Item.Brief>
                    </List.Item>
                )
            }else{
                return (
                    <List.Item
                        className="address"
                        arrow="horizontal"
                        multipleLine
                        onClick={() => {}}
                    >
                        请添加收货地址
                    </List.Item>
                )
            }

        }else{
            return (
                <List.Item
                    className="address"
                    onClick={()=>this.props.history.push('/login')}
                >
                    请先登录
                </List.Item>
            )
        }

    }

    render() {

        return (
            <div id="order-preview">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.historyAction()}


                >确认订单</NavBar>
                <div className="content">
                    <List>
                        {/*获取收货地址*/}
                        {this.getAddr()}
                    </List>


                    {this.props.data.map(function(value,index){
                        var {merchant_info={},list=[]} = value
                        return (
                            <Card
                                key={"merchant-info"+index}
                                className="order-merchant"
                                full={true}
                            >
                                <Card.Header
                                    title={merchant_info.name}
                                />
                                <Card.Body>
                                    <div className="order-goods">
                                        {list.map(function(goods_value,goods_index){
                                            var {id,attr_id,name,cover_img,number,total_price,price,attr_info_name=[]} = goods_value
                                            return (
                                                <div className="item" key={'goods-info'+goods_index}>
                                                    <Link to={'/goods-detail/'+id}>
                                                        <img src={cover_img} alt=""/>
                                                    </Link>
                                                    <div className="info">
                                                        <div className="name">{name}</div>
                                                        <div className="attr">
                                                            {attr_info_name.map(function(attr_value,attr_index){
                                                                return (
                                                                    <span key={'attr'+attr_index}>{attr_value},</span>
                                                                )
                                                            })}
                                                        </div>
                                                        <div className="price">
                                                            <div className="money">￥{price}</div>
                                                            <div className="num">x{number}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        },this)}
                                    </div>
                                </Card.Body>
                                <Card.Footer content={
                                    <List>
                                        <InputItem
                                            placeholder="订单备注:xxx"
                                        >买家留言</InputItem>
                                    </List>
                                }
                                />
                            </Card>
                        )
                    },this)}

                    <List className="choose-item">
                        <List.Item
                            extra="暂无优惠券"
                            arrow="horizontal"
                        >优惠券</List.Item>
                        <List.Item
                            extra="个人/明细"
                            arrow="horizontal"
                        >发票信息</List.Item>
                    </List>

                    <div className="result-block">
                        <div className="item">
                            <div className="field">商品金额</div>
                            <div className="result">￥{this.props.total_money}</div>
                        </div>
                        <div className="item">
                            <div className="field">运费</div>
                            <div className="result red">+ ￥{this.props.freight_money}</div>
                        </div>
                        <div className="item">
                            <div className="field">优惠</div>
                            <div className="result red">- ￥{this.props.dis_money}</div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="price">
                        <span>￥<em>{this.props.pay_money}</em></span>
                    </div>
                    <Button type="warning">提交订单</Button>
                </div>
            </div>
        );
    }
}

const mapStateProps = (state)=>{
    return {
        data:state.orderPreview.data,
        addr:state.orderPreview.addr,
        total_money:state.orderPreview.total_money,
        pay_money:state.orderPreview.pay_money,
        dis_money:state.orderPreview.dis_money,
        freight_money:state.orderPreview.freight_money,
        number:state.orderPreview.number,
    }
}
const mapDispatchProps = (dispatch)=>{
    return {
        initData:(data)=>{
            console.log('order-preview-initdata')
            dispatch(initData(data))
        }
    }
}

export default connect(mapStateProps,mapDispatchProps)(OrderPreviewContainer);