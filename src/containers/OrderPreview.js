import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import BaseContainer from "./Base";

import { NavBar, Icon,List,Card,InputItem,Button,Toast } from 'antd-mobile';
import  '../assets/css/OrderPreview.css'
import {initData,destroyData,addRemark} from "../reducers/orderPreview";
import {initData as addressInitData} from "../reducers/address";
import AddressChoose from "../components/AddressChoose";

class OrderPreviewContainer extends BaseContainer {
    static propTypes = {
        initData:PropTypes.func,
        addressInitData:PropTypes.func,
        addRemark:PropTypes.func,
    }

    componentWillMount(){
        var {match} = this.props

        var {info='',addr=''} = match.params
        var req_obj = {}
        if(info){//商品信息
            req_obj['num']=1
            let start = info.indexOf(this.DIRECTORY_SEPARATOR)+1
            req_obj['info'] = info.substring(start)
        }

        if(addr){ //收货地址
            let start = addr.indexOf(this.DIRECTORY_SEPARATOR)+1
            req_obj['addr_id'] = addr.substring(start)
        }

        //获取商品数据
        this.sendAjax('order-preview',req_obj,(data)=>{
            this.props.initData(data)
        })
        //获取地址信息
    }


    //组件销毁清空数据
    componentWillUnmount(){
        this.props.destroyData()
    }

    handleAddrRedirect(path){
        var {url} = this.props.match
        var cache_url = url.replace(/\/address\/[0-9]+/,'')
        localStorage.setItem('addr_redirect_info',cache_url);
        this.props.history.push(path)
    }
    //添加订单备注
    handleMchRemark(index,value){
        this.props.addRemark(index,value)
    }

    //生成订单
    handleCreateOrder(){
        if(!this.login_user_id){
            Toast.show('请先登录')
            this.props.history.push('/login')
            return;
        }

        var order={},invoice=this.props.invoice
        order['addr_id'] = this.props.addr_info.id
        order['invoice_type'] = this.props.invoice_type
        order['invoice'] = {}
        order['goods_info'] = []
        //商品数据

        this.props.data.map(function(value,index){
            var {mch_id=0,remark='',list=[]} = value
            var sku_info = []
            list.map(function(goods_value,goods_index){
                var {id,attr_id,number} = goods_value
                sku_info.push({gid:id,attr_id:attr_id,num:number})
            })
            order['goods_info'].push({mch_id:mch_id,remark:remark,sku_info:sku_info})
        })
        //发票数据
        invoice.map(function(invoice_value,index){
            var {info=[]} = invoice_value
            info.map(function(info_value,info_index){
                var {field='',value=''} = info_value
                order['invoice'][field] = value
            })
        })
        this.sendAjax('order-generator',order,(data)=>{
            this.props.history.push('/pay/'+data)
        })
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
                    <AddressChoose
                        {...this.props.addr_info}
                        is_login={!!this.login_user_id}
                        onHandleRedirect = {this.handleAddrRedirect.bind(this)}
                    />


                    {this.props.data.map(function(value,index){
                        var {merchant_info={},list=[]} = value
                        var {mch_id=0,name='',remark=''}=merchant_info
                        return (
                            <Card
                                key={"merchant-info"+index}
                                className="order-merchant"
                                full={true}
                            >
                                <Card.Header
                                    title={name}
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
                                            valur={remark}
                                            onChange={(value)=>{
                                                this.handleMchRemark(index,value)
                                            }}
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
                            extra={this.props.invoice.length>0 && this.props.invoice[this.props.invoice_type].name}
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
                    <Button type="warning" onClick={this.handleCreateOrder.bind(this)}>提交订单</Button>
                </div>
            </div>
        );
    }
}

const mapStateProps = (state)=>{
    return {
        data:state.orderPreview.data,
        addr_info:state.orderPreview.addr_info,
        invoice_type:state.orderPreview.invoice_type,
        invoice:state.orderPreview.invoice,
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
            dispatch(initData(data))
        },
        destroyData:()=>{
            dispatch(destroyData())
        },
        addressInitData:(data)=>{
            dispatch(addressInitData(data))
        },
        addRemark:(index,remark)=>{
            dispatch(addRemark(index,remark))
        }
    }
}


export default connect(mapStateProps,mapDispatchProps)(OrderPreviewContainer);