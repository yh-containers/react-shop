import React, {Component} from 'react';
import { TabBar } from 'antd-mobile';
import {Link} from 'react-router-dom'
import {CustomIcon} from "../assets/fonts/iconfont/CustomIcon";





class Foot extends Component {

    static defaultProps = {
        default_color:'#000000',
        choose_color:'#f44444'
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
                                         <Link to={value.href}>
                                             <CustomIcon type={value.icon} color={this.props.default_color}/>
                                         </Link>
                                     }
                                     selectedIcon ={<CustomIcon type={value.icon}  color={this.props.choose_color}/>}
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