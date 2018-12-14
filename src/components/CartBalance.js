import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Button,Toast} from "antd-mobile";

class CartBalance extends Component {
    static propTypes = {
        onHandleRedirect:PropTypes.func,
    }
    static defaultProps = {
        total_price:0.00,
        total_num:0,
    }

    render() {
        return (
            <div className="info">
                <div className="name">全选</div>
                <div className="container">
                    <div className="name">合计:</div>
                    <div className="price">￥{this.props.total_price}</div>
                </div>
                <Button
                    type="warning"

                    onClick={this.props.onHandleRedirect}
                >去结算({this.props.total_num})</Button>
            </div>
        );
    }
}

export default CartBalance;