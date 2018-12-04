import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import {CustomIcon} from "../assets/fonts/iconfont/CustomIcon";


class Foot extends Component {
    static propTypes = {
        handleRedirect:PropTypes.func,
    }

    constructor(props){

        super(props)
        this.state={
            selectedTab:'/',
            page:[
                {
                    title:'首页',
                    href:'/',
                    icon:require('../assets/fonts/iconfont/home.svg'),
                },
                {
                    title:'分类',
                    href:'/cate',
                    icon:require('../assets/fonts/iconfont/filesearch.svg'),
                },
                {
                    title:'购物车',
                    href:'/cart',
                    icon:require('../assets/fonts/iconfont/shopping.svg'),
                },
                {
                    title:'我的',
                    href:'/mine',
                    icon:require('../assets/fonts/iconfont/user.svg'),
                },
            ]
        }
    }

    componentDidMount()
    {
        this.setState({
            selectedTab:window.location.pathname ? window.location.pathname : '/'
        })
    }


    render() {
        return (
            <TabBar
                tintColor={this.props.choose_color}
                unselectedTintColor={this.props.default_color}
            >
                {this.state.page.map(function(value,index){
                    return (
                        <TabBar.Item key={'foot-tab-bar'+index}
                                     icon = {
                                             <CustomIcon type={value.icon} color={this.props.default_color}/>
                                     }
                                     selectedIcon ={<CustomIcon type={value.icon}  color={this.props.choose_color}/>}
                                     title={value.title}
                                     selected={this.state.selectedTab === value.href}
                                     onPress={() => {
                                        this.setState({
                                            selectedTab:value.href
                                        })
                                         this.props.handleRedirect(value.href)
                                     }}
                        />
                    )
                },this)}
            </TabBar>
        );
    }
}

export default Foot;