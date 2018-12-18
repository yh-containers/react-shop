import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Icon,  NavBar,Card,List} from "antd-mobile";
import {Link} from "react-router-dom";
import BaseContainer from "./Base";

import '../assets/css/orderInfo.css'
import WrapWithAjaxData from "../components/WrapWithAjaxData";
import OrderOptBtn from "../components/OrderOptBtn";

class OrderDetailContainer extends BaseContainer {
    static defaultProps = {
        initData:PropTypes.func,
    }

    render() {
        var {
            mch_id=0,
            mch_name='',
            no='',
            order_status_info=[],
            order_opt_btn=[],
            rec_name='',
            rec_phone='',
            province='',
            city='',
            area='',
            addr='',
            total_num=0,
            total_money=0.00,
            pay_money=0.00,
            dis_money=0.00,
            freight_money=0.00,
            invoice=[],//发票信息
            create_time='',
            link_goods=[],
        }=this.props.data
        return (
            <div id="order-info">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.historyAction()}


                >订单详情</NavBar>
                    <List.Item
                        extra={order_status_info.join(',')}
                    >
                        订单状态
                    </List.Item>
                    <List.Item
                        className="address"
                        multipleLine
                        onClick={() => {this.props.onHandleRedirect('/address')}}
                    >
                        <span>{rec_name}</span>
                        <span>{rec_phone}</span>
                        <List.Item.Brief>{province+city+area+'  '+addr} </List.Item.Brief>
                    </List.Item>
                    <Card
                        className="order-merchant"
                        full={true}
                    >
                        <Card.Header
                            title={mch_name}
                        />
                        <Card.Body>
                            <div className="order-info-goods">
                                {link_goods.map(function(goods_value,goods_index){
                                    var {id=0,g_name='',g_price=0.00,g_number=0,g_img='',g_attr=''}=goods_value
                                    return (
                                        <div className="item">
                                            <Link to={'/goods-detail/'+id}>
                                                <img src={g_img} alt=""/>
                                            </Link>
                                            <div className="info">
                                                <div className="name">{g_name}</div>
                                                <div className="attr">
                                                    {g_attr}
                                                </div>
                                                <div className="price">
                                                    <div className="money">￥{g_price}</div>
                                                    <div className="num">x{g_number}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </Card.Body>

                    </Card>


                    <div className="result-block">
                        <div className="item">
                            <div className="field">支付金额</div>
                            <div className="result">￥{pay_money}</div>
                        </div>
                        <div className="item">
                            <div className="field">运费</div>
                            <div className="result red">+ ￥{freight_money}</div>
                        </div>
                        <div className="item">
                            <div className="field">优惠</div>
                            <div className="result red">- ￥{dis_money}</div>
                        </div>
                    </div>

                    <div className="other-info">
                        <List.Item
                            extra='个人'
                        >
                            {invoice.length>0?invoice[0]['value']:''}
                        </List.Item>
                        <List.Item
                            extra='快递'
                        >
                            配送方式
                        </List.Item>
                        <List.Item
                            extra='支付宝支付'
                        >
                            支付方式
                        </List.Item>
                    </div>


                    <div className="result-block">
                        <div className="item">
                            <div className="field">订单号</div>
                            <div className="result">{no}</div>
                        </div>
                        <div className="item">
                            <div className="field">下单时间</div>
                            <div className="result">{create_time}</div>
                        </div>
                    </div>

                    <OrderOptBtn
                        order_opt_btn={order_opt_btn}
                    />

                </div>

        );
    }
}

const mapStateProps = (state)=>{
    return {
        data:state.orderDetail
    }
}
const mapDispatchProps = (dispatch)=>{
    return {
        initData:(data)=>{
            dispatch(data)
        }
    }
}
const mergeProps = (stateProps, dispatchProps, ownProps)=>{
    let req_param = ownProps.match.params
    return Object.assign({}, {req_param:req_param},ownProps, stateProps, dispatchProps)
}

OrderDetailContainer = WrapWithAjaxData(OrderDetailContainer, [
    ['order-detail','initGoodsData','req_param'],
])
export default connect(mapStateProps,mapDispatchProps,mergeProps)(OrderDetailContainer);