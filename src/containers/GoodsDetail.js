import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel,NavBar,Icon, Badge,List,Card,Modal,Button,Drawer} from "antd-mobile";
import {CustomIcon} from "../assets/fonts/iconfont/CustomIcon";

import WrapWithAjaxData from "../components/WrapWithAjaxData";
import {initGoodsData, chooseAttrItem, goodsColl, addCart} from '../reducers/goodsDetail'
import BaseContainer from "./Base";



class GoodsDetailContainer extends BaseContainer {
    static propTypes = {
        detail_data:PropTypes.object,
        getReqParam:PropTypes.func,
        initGoodsData:PropTypes.func,
        chooseAttrItem:PropTypes.func,
        goodsColl:PropTypes.func,
        addCart:PropTypes.func,

    }
    constructor(props) {
        super(props);
        this.state = {
            tagger_attr: false,
            spu_list_arrow:'up',
            spuOpen:false,
            sku_item:[],
            price:999.99,
            stock:999,
            attr_info:'',
            group_attr:[],
            attr_id:0,
            id:0,
        };
    }



    componentWillUpdate(nextProps,nextState){
        if(nextState.sku_item.length===0 && nextProps.detail_data.hasOwnProperty('id')){
            var {id=0,sku=[],price_info=[]} = nextProps.detail_data
            var sku_item=[]
            var current_attr=[],current_group_attr='',group_attr=[],attr_info=''
            //获取属性信息
            sku.map(function(value,index){
                let item = 0
                value['choose_item'] = item
                sku_item.push(value)
                current_attr.push(value.data[item].id)
                attr_info += '【'+value.data[item].name+'】'
            })
            current_group_attr = current_attr.splice('|')
            //获取商品基本信息
            price_info.map(function(value,index){
                group_attr[value.attr_info.splice('|')] = value
            })


            this.setState({
                id:id,
                sku_item:sku_item,
                group_attr:group_attr,
                attr_info:attr_info,
                attr_id:group_attr.hasOwnProperty(current_group_attr)?group_attr[current_group_attr].id:0,
                stock:group_attr.hasOwnProperty(current_group_attr)?group_attr[current_group_attr].stock:0,
                price:group_attr.hasOwnProperty(current_group_attr)?group_attr[current_group_attr].price:0,
            })
        }
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    /*
    * 选择商品属性
    * */
    handleSkuChoose(sku_index,index,value){
        var sku_item = this.state.sku_item
        var current_attr=[],current_group_attr='',group_attr=this.state.group_attr,attr_info=''
        sku_item[sku_index].choose_item=index
        sku_item.map(function (value,index) {
            let item = value.choose_item
            current_attr.push(value.data[item].id)
            attr_info += '【'+value.data[item].name+'】'
        })
        current_group_attr = current_attr.splice('|')
        this.setState({
            sku_item:sku_item,
            attr_info:attr_info,
            attr_id:group_attr.hasOwnProperty(current_group_attr)?group_attr[current_group_attr].id:0,
            stock:group_attr.hasOwnProperty(current_group_attr)?group_attr[current_group_attr].stock:0,
            price:group_attr.hasOwnProperty(current_group_attr)?group_attr[current_group_attr].price:0,
        })
    }
    //产品参数
    handleSpuList() {
        var current_spu_arrow = this.state.spu_list_arrow
        this.setState({
            spuOpen:current_spu_arrow==='up',
            spu_list_arrow:current_spu_arrow==='up'?'down':'up'
        })
    }

    //商品收藏
    handleGoodsColl() {
        this.sendAjax('user-coll-goods',{goods_id:this.state.id},(data)=>{
            this.props.goodsColl(!!data)
        })
    }

    //加入购物车
    handleAddCart() {
        this.sendAjax('user-goods-add-cart',{goods_id:this.state.id,attr_id:this.state.attr_id},(data)=>{
            this.props.addCart(data)
        })
    }
    render() {
        let {
            imgs=[],
            name='',
            subtitle='',
            view=999,
            spu=[]
        }
            = this.props.detail_data

        console.log(spu)
        return (

                <Fragment>
                <div  id="goods-detail">
                <NavBar
                    className="nav-block"
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.historyAction()}
                    rightContent={[
                        <Icon key={'header'+0}  type="ellipsis" />,
                    ]}
                >
                    <div className="item">商品</div>
                    <div className="item">详情</div>
                    <div className="item">评价</div>
                </NavBar>
                <div className="info-block">
                    <div className="goods-detail-Carousel">
                        <Carousel
                            autoplay={true}
                            infinite={true}
                        >
                            {imgs.map((val,index) => {
                                console.log(val)
                                return  (
                                        <img
                                            key ={'flow-img'+index}
                                            src={val}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top',height:'200px' }}

                                        />
                                    )
                            }
                            )}
                        </Carousel>
                    </div>

                    <div className="goods-info">
                        <div className="name">{name}</div>
                        <div className="intro">{subtitle}</div>
                        <div className="info-block">
                            <div className="price">
                                ￥ <span>{this.state.price}</span>
                            </div>
                            <div className="number">
                                <div className="stock">
                                    {this.state.stock}
                                </div>
                                <div className="view">
                                    {view}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="list-block">
                        <List onClick={this.showModal('tagger_attr')}>
                            <div className="attr-block">
                                <div className="name">已选</div>
                                <List.Item
                                    arrow="horizontal"
                                >{this.state.attr_info}</List.Item>
                            </div>

                        </List>
                    </div>

                    <div className="list-block">
                        <List.Item
                            arrow={this.state.spu_list_arrow}
                            onClick={this.handleSpuList.bind(this)}
                        >
                            产品参数
                        </List.Item>
                        <Card style={{display:(this.state.spuOpen?'block':'none')}}>
                            <Card.Body>
                                <ul className="spu">
                                    {spu.map(function(value,index){
                                        var {data=[]} = value
                                        return (
                                            <Fragment key={'spu-top'+index}>
                                            <li className="item item-top">{value.name}</li>
                                            {data.map(function(value,index){
                                                return (
                                                    <li  key={'spu-item'+index} className="item">
                                                        <div className="tip">
                                                            {value.name}
                                                        </div>
                                                        <div className="content">
                                                            {value.value}
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                            </Fragment>
                                        )
                                    })}
                                </ul>
                            </Card.Body>
                        </Card>

                    </div>

                    <div className="list-block">
                        <List>
                            <List.Item
                                arrow="horizontal"
                            >商品评价</List.Item>
                            <List.Item className="comment-list">
                                <Card>
                                    <Card.Header
                                        title="用户昵称"
                                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                        extra={<span>2018-12-1</span>}
                                    />
                                    <Card.Body>
                                        <div>This is content of `Card`</div>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header
                                        title="用户昵称"
                                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                        extra={<span>2018-12-1</span>}
                                    />
                                    <Card.Body>
                                        <div>This is content of `Card`</div>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header
                                        title="用户昵称"
                                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                        extra={<span>2018-12-1</span>}
                                    />
                                    <Card.Body>
                                        <div>This is content of `Card`</div>
                                    </Card.Body>
                                </Card>
                            </List.Item>
                        </List>
                    </div>

                </div>
                <div id="goods-foot">
                    <div className="item coll" onClick={this.handleGoodsColl.bind(this)}>
                        {this.props.is_coll
                            ?<CustomIcon type={require('../assets/fonts/iconfont/heart-fill.svg')} color="#FF0000"/>
                            :<CustomIcon type={require('../assets/fonts/iconfont/heart.svg')}  color="#FF0000"/>
                        }
                        收藏
                    </div>
                    <Link to="/cart" className="item cart">
                        {this.props.cart_num!==false ?
                                <Badge
                                    text={this.props.cart_num}
                                    >
                                    <CustomIcon type={require('../assets/fonts/iconfont/cart.svg')}/>
                                </Badge>:''
                        }

                        购物车
                    </Link>
                    <div className="item add-cart" onClick={this.handleAddCart.bind(this)}>
                        加入购物车
                    </div>
                    <Link to={'/order-preview/'+this.state.id+'-'+this.state.attr_id} className="item buy">
                        立即购买
                    </Link>
                </div>
            </div>
                    <Modal
                        popup
                        visible={this.state.tagger_attr}
                        onClose={this.onClose('tagger_attr')}
                        animationType="slide-up"
                    >
                        <div className="kv-block">
                            <div className="content">
                                {this.state.sku_item.map(function(sku_value,sku_index){
                                    let {name='',data=[]} = sku_value
                                    return (
                                        <div className="attr-item" key={'sku-item'+sku_index}>
                                            <div className="field-name">{name}</div>
                                            <div className="content">
                                                {data.map(function(value,index){
                                                    return (
                                                        <Button
                                                            className={"btn "+(this.state.sku_item[sku_index].choose_item===index?'active':'')}
                                                            size="small"
                                                            key={'sku-item-btn'+index}
                                                            onClick={this.handleSkuChoose.bind(this,sku_index,index,value)}
                                                        >{value.name}{this.state.sku_item[sku_index].choose_item}</Button>
                                                    )
                                                },this)}

                                            </div>
                                        </div>
                                    )
                                },this)}


                            </div>
                            <Button className="sure-btn" size="small" onClick={this.onClose('tagger_attr')}>确定</Button>
                        </div>
                    </Modal>
            </Fragment>
        );
    }
}

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}



const mapStateProps = (state)=>{
    return {
        detail_data:state.goodsDetail.detail_data,
        is_coll:state.goodsDetail.is_coll,
        cart_num:state.goodsDetail.cart_num
    }
}
const mapDispatchProps = (dispatch)=>{
    return {
        initGoodsData:(detail_data)=>{
            dispatch(initGoodsData(detail_data))
        },
        chooseAttrItem:(index,value)=>{
            dispatch(chooseAttrItem(index,value))
        },
        goodsColl:(is_coll)=>{
            dispatch(goodsColl(is_coll))
        },
        addCart:(card_num)=>{
            dispatch(addCart(card_num))
        }
    }
}
const mergeProps = (stateProps, dispatchProps, ownProps)=>{
    let req_param = ownProps.match.params
    return Object.assign({}, {req_param:req_param},ownProps, stateProps, dispatchProps)
}

GoodsDetailContainer = WrapWithAjaxData(GoodsDetailContainer, [
    ['goods-detail','initGoodsData','req_param'],
])

export default connect(mapStateProps,mapDispatchProps,mergeProps)(GoodsDetailContainer);