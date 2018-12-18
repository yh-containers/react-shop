import React, {Component} from 'react';
import {Button} from "antd-mobile";

class OrderOptBtn extends Component {
    static defaultProps = {
        order_opt_btn:[]
    }
    render() {
        return (
            <div className="order-btn">
                {this.props.order_opt_btn.indexOf('pay')>-1?<Button size="small">去支付</Button>:''}
                {this.props.order_opt_btn.indexOf('cancel')>-1?<Button size="small">取消订单</Button>:''}
                {this.props.order_opt_btn.indexOf('reminder')>-1?<Button size="small">催单</Button>:''}
                {this.props.order_opt_btn.indexOf('del')>-1?<Button size="small">删除订单</Button>:''}
                {this.props.order_opt_btn.indexOf('logistics')>-1?<Button size="small">查看物流</Button>:''}
                {this.props.order_opt_btn.indexOf('rec_log')>-1?<Button size="small">确认收货</Button>:''}
                {this.props.order_opt_btn.indexOf('back')>-1?<Button size="small">退货</Button>:''}
            </div>
        );
    }
}

export default OrderOptBtn;