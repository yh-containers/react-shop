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

    componentDidMount()
    {
        console.log('componentDidMount')
    }

    render() {

        return (
            <TabBar>
                <TabBar.Item
                     icon = {
                         <Link to='/'>
                             <CustomIcon type={require('../assets/fonts/iconfont/home.svg')}/>
                         </Link>
                     }
                     selectedIcon ={<Icon type='check' />}
                     title="首页"
                     selected={this.state.selectedTab === '/'}
                     onPress={() => {
                         this.setState({
                             selectedTab:'/'
                         })
                         console.log(this.state.selectedTab)
                     }}
                />
                <TabBar.Item
                     icon = {
                         <Link to='/cate'>
                             <CustomIcon type={require('../assets/fonts/iconfont/filesearch.svg')}/>
                         </Link>
                     }
                     selectedIcon ={<Icon type='check' />}
                     title="分类"
                     selected={this.state.selectedTab === '/cate'}
                     onPress={() => {
                         this.setState({
                             selectedTab:'/cate'
                         })
                         console.log(this.state.selectedTab)
                     }}
                />
                <TabBar.Item
                     icon = {
                         <Link to='/cart'>
                             <CustomIcon type={require('../assets/fonts/iconfont/shopping.svg')}/>
                         </Link>
                     }
                     selectedIcon ={<Icon type='check' />}
                     title="购物车"
                     selected={this.state.selectedTab === '/cart'}
                     onPress={() => {
                         this.setState({
                             selectedTab:'/cart'
                         })
                         console.log(this.state.selectedTab)
                     }}
                />
                <TabBar.Item
                     icon = {
                         <Link to='/mine'>
                             <CustomIcon type={require('../assets/fonts/iconfont/user.svg')}/>
                         </Link>
                     }
                     selectedIcon ={<Icon type='check' />}
                     title="我的"
                     selected={this.state.selectedTab === '/mine'}
                     onPress={() => {
                         this.setState({
                             selectedTab:'/mine'
                         })
                         console.log(this.state.selectedTab)
                     }}
                />
            </TabBar>
        );
    }
}

export default Foot;