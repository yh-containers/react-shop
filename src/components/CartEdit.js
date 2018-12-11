import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Button} from "antd-mobile";

class CartEdit extends Component {
    static propTypes = {
        onHandleGoodsDel:PropTypes.func,
        onHandleGoodsColl:PropTypes.func,
    }

    handleGoodsDel()
    {
        this.props.onHandleGoodsDel()
    }
    handleGoodsColl()
    {
        this.props.onHandleGoodsColl()
    }
    render() {
        console.log(this.props)
        return (
            <div className="info btn-edit">
                <div className="name">全选</div>
                <div className="container">
                    <Button
                        type="primary"
                        size="small"
                        onClick={this.handleGoodsColl.bind(this)}
                    >
                        收藏</Button>
                    <Button
                        type="warning"
                        size="small"
                        onClick={this.handleGoodsDel.bind(this)}
                    >删除</Button>
                </div>
            </div>
        );
    }
}

export default CartEdit;