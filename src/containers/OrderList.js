import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Icon, NavBar,Tabs,Button} from "antd-mobile";
import OrderItem from "../components/OrderItem";

import '../assets/css/orderList.css'
import BaseContainer from "./Base";
import {initData} from "../reducers/orderList";

const tabs = [
    { title: '全部', sub: '0' },
    { title: '待付款', sub: '1' },
    { title: '待发货', sub: '2' },
    { title: '待收货', sub: '3' },
    { title: '待评价', sub: '4' },
];

class OrderListContainer extends BaseContainer {

    static defaultProps = {
        initData:PropTypes.func,
    }

    constructor(props){
        super(props)
        this.state={
            initial_page :0,
        }
    }


    componentWillMount(){
        var {match} = this.props
        var {initial_page=0} = match.params
        this.setState({
            initial_page:parseInt(initial_page)
        })
        this._loadData(initial_page)
    }

    _loadData(index,condition={}){
        this.sendAjax('order-list',condition,(data)=>{
            this.props.initData(index,data)
        })
    }
    handleData(index,tab){
        var {condition={},data=[]} = tab
        condition && data.length===0 && this._loadData(index,condition)
    }
    renderContent = (tab,index) =>{
        var {condition={},data=[]} = tab
        return (
            <div className="order-info">
                {data.map(function(value,key){
                    return (
                        <OrderItem
                            key={'order-info'+index+key}
                            {...value}
                        />
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div id="order-list-page">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.historyAction()}
                >订单管理</NavBar>

                <Tabs tabs={this.props.data}
                      initialPage={this.state.initial_page}
                      prerenderingSiblingsNumber={false}
                      onChange={(tab, index) => {
                          console.log('onChange', index, tab);
                          this.handleData(index,tab)
                      }}
                      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                    {this.renderContent}
                </Tabs>
            </div>
        );
    }
}

const mapStateProps = (state)=>{
    return {
        data:state.orderList
    }
}

const mapDispatchProps = (dispatch)=>{
    return {
        initData:(index,data)=>{
            dispatch(initData(index,data))
        }
    }
}

export default connect(mapStateProps,mapDispatchProps)(OrderListContainer);