import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { NavBar,Checkbox,List,Stepper,Toast} from "antd-mobile";
import {Link} from "react-router-dom";
import BaseContainer from "./Base";

import  {initData,optCheckBox,fullCheckBox,optGoodsInfo, optGoodsNum,delCart,checkSubmitInfo} from '../reducers/cart'
import WrapWithAjaxData from "../components/WrapWithAjaxData";
import CartBalance from "../components/CartBalance";
import CartEdit from "../components/CartEdit";

const CheckboxItem = Checkbox.CheckboxItem;

class CartContainer extends BaseContainer {
    static propTypes = {
        data:PropTypes.array,
        initData:PropTypes.func,
        optCheckBox:PropTypes.func,
        fullCheckBox:PropTypes.func,
        optGoodsNum:PropTypes.func,
        delCart:PropTypes.func,
    }
    static defaultProps = {
        listOpt:['管理','完成'],

    }
    constructor(props) {
        super(props);
        this.state = {
            currentOptIndex:0,
        };
    }

    handleOptBtn(index)
    {
        this.setState({
            currentOptIndex:index?0:1,
        })
    }


    //复选框选择
    optCheckBox(cart_id,index,goods_index,bool)
    {
        this.props.optCheckBox(index,goods_index,!bool)
        //请求服务器动作
        this.sendAjax('user-cart-choose',{id:cart_id,state:bool?2:1},(data)=>{

        },true,false)
    }

    //全选
    fullCheckBox(bool)
    {
        this.props.fullCheckBox(!bool)
        //请求服务器动作
        this.sendAjax('user-cart-choose',{state:bool?2:1},(data)=>{

        },true,false)
    }

    //商品数量调整
    optGoodsInfo(id,index,goods_index,num)
    {
        this.props.optGoodsNum(index,goods_index,num)
        //请求服务器动作
        this.sendAjax('user-cart-goods-change',{num:num,id:id},(data)=>{

        },true,false)
    }

    //删除购物车数据
    handleCartDel()
    {
        var del_cart = []
        this.props.data.map(function(value,index){
            var {list=[]} = value
            list.map(function(goods_value,goods_index){
                var {cart_id,is_choose} = goods_value
                is_choose && del_cart.push(cart_id)
            })
        })
        this.props.delCart(del_cart)

        //请求服务器动作
        this.sendAjax('user-cart-goods-del',{id:del_cart},(data)=>{

        },true,false)
    }

    //商品收藏
    handleGoodsColl()
    {
        var coll_goods = []
        this.props.data.map(function(value,index){
            var {list=[]} = value
            list.map(function(goods_value,goods_index){
                var {id,is_choose} = goods_value
                is_choose && coll_goods.push(id)
            })
        })
        //请求服务器动作
        this.sendAjax('user-coll-goods',{goods_id:coll_goods,type:1},(data)=>{

        },true,false)
    }
    handleRedirect(){
        if(this.props.have_choose_info){
            this.props.history.push('/order-preview')
        }else{
            Toast.show('请选择需要购买的商品')
        }
    }

    render() {

        return (
            <div id="cart-page">
                <NavBar
                    className="nav-block"
                    mode="light"
                    rightContent={[
                        (<div key="0" onClick={this.handleOptBtn.bind(this,this.state.currentOptIndex)}>{this.props.listOpt[this.state.currentOptIndex]}</div>),
                    ]}
                >
                    购物车
                </NavBar>
                <div className="goods-cart-block">
                    {this.props.data.map(function(value,index){
                        var {merchant_info={},list=[]} = value
                        return (
                            <List
                                key={'cart'+index}
                                className="goods-slice"
                                arrow="horizontal"
                                renderHeader={() => (
                                    <CheckboxItem
                                        className="overlay-checkbox"
                                        arrow="horizontal"
                                    >
                                        {merchant_info.name}
                                    </CheckboxItem>
                                )}>
                                {list.map(function(goods_data,goods_index){
                                    var  {id,cart_id,name,cover_img,num,price,stock,attr_info_name=[],is_choose=1}= goods_data
                                    return (
                                        <CheckboxItem
                                            key={'cart-goods'+goods_index}
                                            className="overlay-checkbox"
                                            checked={is_choose}
                                            onChange={this.optCheckBox.bind(this,cart_id,index,goods_index,is_choose)}
                                        >
                                            <div className="goods-block">

                                                <Link to={"/goods-detail/"+id}>
                                                    <img src={cover_img} alt=""/>
                                                </Link>

                                                <div className="info">
                                                    <Link to={"/goods-detail/"+id}>
                                                        <div className="name">
                                                            {name}
                                                        </div>
                                                    </Link>

                                                    <div className="attr">
                                                        {attr_info_name.map(function(attr,attr_key){
                                                            return (
                                                            <span key={'attr-key'+attr_key}>{attr}</span>
                                                        )
                                                        })}
                                                    </div>
                                                    <div className="view">
                                                        <div className="price">￥{price}</div>
                                                        <Stepper
                                                            showNumber
                                                            max={stock}
                                                            min={1}
                                                            value={num}
                                                            onChange={(val)=>this.optGoodsInfo(cart_id,index,goods_index,val)}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </CheckboxItem>
                                    )
                                },this)}

                            </List>
                        )
                    },this)}

                </div>

                <CheckboxItem
                    className="handle-block"
                    onChange={this.fullCheckBox.bind(this,this.props.is_full)}
                >
                    {this.state.currentOptIndex===0?
                        <CartBalance
                            total_num = {this.props.total_num}
                            total_price = {this.props.total_price}
                            onHandleRedirect = {this.handleRedirect.bind(this)}
                        />:
                        <CartEdit
                            onHandleGoodsDel={this.handleCartDel.bind(this)}
                            onHandleGoodsColl={this.handleGoodsColl.bind(this)}
                        />
                    }
                </CheckboxItem>
            </div>
        );
    }
}

const mapStateProps = (state)=>{
    return {
        data:state.cart.data,
        is_full:state.cart.is_full,
        total_num:state.cart.total_num,
        total_price:state.cart.total_price,
        have_choose_info:state.cart.have_choose_info,
    }
}

const mapDispatchProps = (dispatch)=>{
    return {
        initData:(data)=>{
            dispatch(initData(data))
            dispatch(optGoodsInfo())
            dispatch(checkSubmitInfo())
        },
        optCheckBox:(index,goods_index,bool)=>{
            dispatch(optCheckBox(index,goods_index,bool))
            dispatch(optGoodsInfo())
            dispatch(checkSubmitInfo())
        },
        fullCheckBox:(bool)=>{
            dispatch(fullCheckBox(bool))
            dispatch(optGoodsInfo())
            dispatch(checkSubmitInfo())
        },
        optGoodsNum:(index,goods_index,num)=>{
            dispatch(optGoodsNum(index,goods_index,num))
            dispatch(optGoodsInfo())
        },
        delCart:(del_cart)=>{
            dispatch(delCart(del_cart))
            dispatch(optGoodsInfo())
            dispatch(checkSubmitInfo())
        }
    }
}

CartContainer = WrapWithAjaxData(CartContainer,[['user-cart','initData']])
export default connect(mapStateProps,mapDispatchProps)(CartContainer);