import React, {Component} from 'react';
import {Link} from 'react-router-dom'
class GoodsList extends Component {
    static defaultProps = {
        id:99,
        img : require('../assets/images/flow-index3.png'),
        name: '我是商品名称',
        price: 199.99,
        stock: 999,
        view: 999,
        showView:true
    }
    render() {
        return (
            <div className="goods-list">
                <Link to={"/goods-detail/"+this.props.id}>
                <img src={this.props.img} alt=""/>
                <div className="name">{this.props.name}</div>
                <div className="info">
                    <div className="price">￥{this.props.price}</div>
                    {!this.props.showView?'':(
                        <div className="view">
                            <span className="stock">{this.props.stock}</span>
                            <span className="view">{this.props.view}</span>
                        </div>
                    )}

                </div>
                </Link>
            </div>
        );
    }
}

export default GoodsList;