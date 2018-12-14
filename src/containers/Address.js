import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Icon, NavBar,Toast} from "antd-mobile";
import BaseContainer from "./Base";

import '../assets/css/Address.css'
import WrapWithAjaxData from "../components/WrapWithAjaxData";
import {initData,delAddress} from "../reducers/address";
import {CustomIcon} from "../assets/fonts/iconfont/CustomIcon";

class AddressContainer extends BaseContainer {
    static propTypes = {
        initData:PropTypes.func,
        delAddress:PropTypes.func,
    }

    handleDel(id,index){
        this.props.delAddress(index)
        this.sendAjax('user-address-del',{id:id})
    }
    render() {
        return (
            <div id="address">
                <NavBar
                    className="nav-block"
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.historyAction()}
                    rightContent={[
                        <CustomIcon
                            key={'header'+0}
                            type={require('../assets/fonts/iconfont/plus.svg')}
                            onClick={()=>{this.props.history.push('/address-opt')}}
                        />,
                    ]}
                >
                    地址管理
                </NavBar>
                <div className="page-content">
                    {this.props.data.map(function(value,index){
                        var {id,rec_name='',rec_phone='',province='',city='',area='',addr='',is_default=0} = value
                        return (
                            <div key={'address'+index} className="address-item">
                                <div className="address-info">
                                    <div className="info">
                                        <span>{rec_name}</span>
                                        <span>{rec_phone}</span>
                                    </div>
                                    <div className="address">
                                        {province+city+area}  {addr}
                                    </div>
                                </div>
                                <div className="edit" onClick={()=>this.props.history.push('/address-opt/'+id)}>编辑</div>
                                <div className="del" onClick={this.handleDel.bind(this,id,index)}>删除</div>
                            </div>
                        )
                    },this)}

                </div>
            </div>
        );
    }
}

const mapStateProps = (state)=>{
    return {
        data:state.address.data
    }
}
const mapDispatchProps = (dispatch)=>{
    return {
        initData:(data)=>{
            dispatch(initData(data))
        },
        delAddress:(index)=>{
            dispatch(delAddress(index))
        }
    }
}
//加载数据
AddressContainer = WrapWithAjaxData(AddressContainer,[
    ['user-address','initData',{},60,'address_list']
])
export default connect(mapStateProps,mapDispatchProps)(AddressContainer);