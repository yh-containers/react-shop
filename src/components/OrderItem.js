import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Button} from "antd-mobile";
import OrderOptBtn from "./OrderOptBtn";

class OrderItem extends Component {

    static defaultProps = {
        id:0,
        total_num:0,
        total_money:0,
        mch_name:'商户名',
        order_status_info:['待支付','已发货'],
        link_goods:[],
        order_opt_btn:[]
    }

    render() {
        return (
            <div className="item" style={item}>
                <div className="order-header" style={orderHeader}>
                    <div className="mch-info">
                        {this.props.mch_name}
                    </div>
                    <div className="pay-state">
                        {this.props.order_status_info.join('，')}
                    </div>
                </div>
                <div className="goods-info" style={goodsInfo.groupInfo}>
                    {this.props.link_goods.map(function(goods_value,goods_index){
                        var {
                            g_name='',
                            g_price=0.00,
                            g_number=1,
                            g_img='',
                            g_attr='',
                            total_price=0.00,
                        } = goods_value
                        return (
                            <div className="goods-item"  style={goodsInfo.groupItem}>
                                <Link to={"/order-detail/"+this.props.id}>
                                    <img style={goodsInfo.image} src={g_img} alt=""/>
                                </Link>
                                <div className="info" style={goodsInfo.info}>
                                    <Link to={"/order-detail/"+this.props.id}>
                                        <div className="name" style={goodsInfo.infoName}>
                                            {g_name}
                                        </div>
                                    </Link>
                                    <div className="attr" style={goodsInfo.infoAttr}>
                                        {g_attr}
                                    </div>
                                </div>
                                <div className="price"  style={goodsInfo.price}>
                                    <div className="money">￥{g_price}</div>
                                    <div className="num">x{g_number}</div>
                                </div>
                            </div>
                        )
                    },this)}

                </div>
                <div className="goods-result" style={goodsResult}>
                    共 {this.props.total_num} 件，合计: ￥{this.props.total_money}
                </div>

                <OrderOptBtn
                    order_opt_btn={this.props.order_opt_btn}
                />
            </div>
        );
    }
}

export default OrderItem;

const item = {
    display:'flex',
    flexDirection:'column',
    background: '#fff',
    marginBottom: '6px',
    borderTop:'1px solid #ccc',
    borderBottom:'1px solid #ccc',


}

const orderHeader = {
    display:'flex',
    justifyContent: 'space-between',
    padding:'10px 6px'
}

const goodsInfo = {
    groupInfo:{
        display:'flex',
        flexDirection:'column',
    },
    groupItem:{
        display:'flex',
        justifyContent: 'space-between',
        // alignItems:'center',
        borderTop:'1px solid #dcdcdc',
        padding:'5px 6px',
    },
    image:{
        width: '50px',
        height: '50px',
        padding:'5px',
    },
    info:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        // justifyContent: 'space-between',
    },
    infoName:{
        fontSize:'18px',
        fontWeight:'400',
        wordBreak: 'break-word',
        overflow: 'hidden',
        maxHeight:'40px',
    },
    infoAttr:{
        fontSize:'14px',
        wordBreak: 'break-word',
        overflow: 'hidden',
        maxHeight:'16px',
    },
    price:{
        width:'80px',
        display:'flex',
        flexDirection:'column',
        alignSelf: 'center',
        textAlign: 'right'
    }
}

const goodsResult = {
    textAlign:'right',
    padding: '10px 6px'
}

const orderBtn = {
    padding:'3px 0 12px 0',
    borderTop:'1px solid #dcdcdc',
    display: 'flex',
    justifyContent: 'flex-end'
}
const btnItem = {
    width: 'min-content',
}