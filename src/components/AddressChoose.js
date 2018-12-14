import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'
import {List} from "antd-mobile";

class AddressChoose extends Component {
    static defaultProps = {
        is_login:false,
        id:0,
        rec_name:'',
        rec_phone:'',
        province:'',
        city:'',
        area:'',
        addr:'',
    }

    static propTypes = {
        onHandleRedirect:PropTypes.func,
    }

    render() {
        console.log(this.props)
        return (
            <Fragment>
                <List>
                    {
                        this.props.is_login ?
                            (
                                this.props.id  ?
                                    <List.Item
                                        className="address"
                                        arrow="horizontal"
                                        multipleLine
                                        onClick={() => {this.props.onHandleRedirect('/address')}}
                                    >
                                        <span>{this.props.rec_name}</span>
                                        <span>{this.props.rec_phone}</span>
                                        <List.Item.Brief>{this.props.province}{this.props.city}{this.props.area}  {this.props.addr}</List.Item.Brief>
                                    </List.Item>
                                    :
                                    <List.Item
                                        className="address"
                                        arrow="horizontal"
                                        multipleLine
                                        onClick={() => {this.props.onHandleRedirect('/address-opt')}}
                                    >
                                        请添加收货地址
                                    </List.Item>
                            )
                            :
                        <List.Item
                            className="address"
                            onClick={()=>this.props.onHandleRedirect('/login')}
                        >
                            请先登录
                        </List.Item>
                    }

                </List>
            </Fragment>
        );
    }
}

export default AddressChoose;