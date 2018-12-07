import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'
import { Carousel,Card } from 'antd-mobile';
import {connect} from 'react-redux'

import IndexSlice from "./Index.slice";
import GoodsList from "../components/GoodsList";



import {initFlowImages,initHotGoods} from '../reducers/globalData'
import WrapWithAjaxData from "../components/WrapWithAjaxData";

class IndexContainer extends Component {
    static propTypes ={
        flow_images:PropTypes.array,    //轮播图
        hot_goods:PropTypes.array,    //热门商品
        initAdFlowImages:PropTypes.func,
        initHotGoods:PropTypes.func
    }


    render() {
        return (
            <Fragment>
                <div style={{minHeight:"200px"}}>
                    <Carousel
                        autoplay={true}
                        infinite={true}
                    >
                        {this.props.flow_images.map((val,index) => (

                            <img
                                key ={'flow-img'+index}
                                src={val.img}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        ))}
                    </Carousel>
                </div>

                <IndexSlice/>

                <Card>
                    <Card.Header
                        title="热门商品"
                    />
                    <Card.Body className="mod-card-padding">
                        <div className="goods-block hot-goods">
                            {this.props.hot_goods.map(function(value,index){
                                return (
                                    <GoodsList
                                        key={'index-goods-list'+index}
                                        id={value.id}
                                        img={value.cover_img}
                                        name={value.name}
                                        price={value.price}
                                        stock={value.stock}
                                        view={value.view}
                                    />

                                )
                            })}
                        </div>
                    </Card.Body>
                </Card>



            </Fragment>
        );
    }
}
//取出数据
const mapStateProps = (state)=>{
    return {
        flow_images:state.globalData.flow_images,
        hot_goods:state.globalData.hot_goods,
    }
}

//
const mapDispatchProps = (dispatch)=>{
    return {
        //初始化轮播图
        initAdFlowImages:(images)=>{
            dispatch(initFlowImages(images))
        },
        initHotGoods:(goods_list)=>{
            dispatch(initHotGoods(goods_list))
        }
    }
}

IndexContainer = WrapWithAjaxData(IndexContainer, [
    ['goods-list-data','initHotGoods',{},30],
    ['ad-flow-images','initAdFlowImages',{type:1},30],
])

// IndexContainer = WrapWithAjaxData(IndexContainer, 'goods-list-data','initHotGoods',{},30)
// IndexContainer = WrapWithAjaxData(IndexContainer, 'ad-flow-images','initAdFlowImages',{type:1},30)


export default connect(mapStateProps,mapDispatchProps)(IndexContainer);