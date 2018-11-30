import React, {Component} from 'react';
import { TabBar,Icon } from 'antd-mobile';
import {Link} from 'react-router-dom'
import {CustomIcon} from "../assets/fonts/iconfont/CustomIcon";





class Foot extends Component {

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

    render() {
        return (
            <TabBar>
                {this.state.page.map(function(value,index){
                    return (
                        <TabBar.Item key={'foot-tab-bar'+index}
                                     icon = {
                                         <Link to={value.href}>
                                             <CustomIcon type={value.icon}/>
                                         </Link>
                                     }
                                     selectedIcon ={<Icon type='check' />}
                                     title={value.title}
                                     selected={this.state.selectedTab === value.href}
                                     onPress={() => {
                                        this.setState({
                                            selectedTab:value.href
                                        })
                                     }}
                        />
                    )
                },this)}
            </TabBar>
        );
    }
}

export default Foot;