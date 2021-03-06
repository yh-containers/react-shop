import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { List,Badge,Flex  } from 'antd-mobile';
import {CustomIcon} from "../assets/fonts/iconfont/CustomIcon";
import BaseContainer from "./Base";

class MineContainer extends BaseContainer {

    componentWillMount(){
        if(!this.login_user_id){
            this.props.history.replace('/login')
        }
    }

    render() {
        console.log(this.props)
        return (
            <div id="mine-page">
                <div className="header">
                    <div className="header-url">
                        <img src={require('../assets/images/flow-index1.png')} alt=""/>
                    </div>
                    <div className="name">xxxxx</div>
                    <div className="other">
                        <div>
                        <Badge
                            dot
                        >
                            <CustomIcon  type={require('../assets/fonts/iconfont/message.svg')}/>
                        </Badge>
                        </div>
                        <div className="level">xxxx</div>
                    </div>
                </div>

                <div className="list-block">
                    <List.Item arrow="horizontal" onClick={()=>this.props.history.push('/order-list')}>
                        我的订单
                    </List.Item>
                    <List className="order">
                        <Flex
                            align="center"
                        >
                            <Flex.Item>
                                <Link to="/order-list/1">
                                    <Badge
                                        text={99}
                                    >
                                <CustomIcon  type={require('../assets/fonts/iconfont/message.svg')}/>
                                    </Badge>
                                待支付
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link to="/order-list/2">
                                <CustomIcon  type={require('../assets/fonts/iconfont/message.svg')}/>
                                待发货
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link to="/order-list/3">
                                <CustomIcon  type={require('../assets/fonts/iconfont/message.svg')}/>
                                待收货
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link to="/goods-comments">
                                <CustomIcon  type={require('../assets/fonts/iconfont/message.svg')}/>
                                评价管理
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link to="/goods-after-sale">
                                <CustomIcon  type={require('../assets/fonts/iconfont/message.svg')}/>
                                退货/售后
                                </Link>
                            </Flex.Item>
                        </Flex>
                    </List>
                </div>

                <div className="list-block">

                    <Flex
                        align="center"
                        alignContent="center"
                        className="show-block"
                    >
                        <Flex.Item>
                            <Link to="wait-pay">
                                <div className="number">0</div>
                                <div className="name">我的收藏</div>

                            </Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link to="wait-pay">
                                <div className="number">0</div>
                                <div className="name">我的积分</div>

                            </Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link to="wait-pay">
                                <div className="number">0</div>
                                <div className="name">优惠券</div>
                            </Link>
                        </Flex.Item>
                    </Flex>
                </div>

                <div className="list-block">
                    <List>
                    <List.Item arrow="horizontal">帮助中心</List.Item>
                    <List.Item
                        arrow="horizontal"
                        onClick={()=>this.props.history.push('/address')}
                    >收货地址</List.Item>
                    <List.Item arrow="horizontal">设置</List.Item>
                    </List>
                </div>
            </div>
        );
    }
}

export default MineContainer;