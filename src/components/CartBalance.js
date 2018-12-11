import React, {Component} from 'react';
import {Button} from "antd-mobile";

class CartBalance extends Component {
    static defaultProps = {
        total_price:0.00,
        total_num:0

    }
    render() {
        return (
            <div className="info">
                <div className="name">全选</div>
                <div className="container">
                    <div className="name">合计:</div>
                    <div className="price">￥{this.props.total_price}</div>
                </div>
                <Button type="warning">去结算({this.props.total_num})</Button>
            </div>
        );
    }
}

export default CartBalance;