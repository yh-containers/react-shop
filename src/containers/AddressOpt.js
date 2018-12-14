import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Icon, InputItem, List, NavBar,Button,Picker} from "antd-mobile";
import { createForm } from 'rc-form';

import {initDetailData} from "../reducers/address";
import {ignoreCacheDataTTL} from "../reducers/globalData";

import BaseContainer from "./Base";
import '../assets/css/addressOpt.css'
import WrapWithAjaxData from "../components/WrapWithAjaxData";

class AddressOptContainer extends BaseContainer {
    static propTypes = {
        initDetailData:PropTypes.func,
        ignoreCacheDataTTL:PropTypes.func,
        detail_data: PropTypes.object,
    }

    static defaultProps = {
        location_data:[
            {value:'广东省',label:'广东省',children:[
                    {value:'深圳',label:'深圳',children:[
                            {value:'福田',label:'福田'},
                            {value:'南山',label:'南山'},
                        ]},
                    {value:'广州',label:'广州'},
                ]},
            {value:'湖北省',label:'湖北省',children:[]},
        ],
        value:[]

    }
    constructor(props){
        super(props)
        this.state = {
            id:0,
            title:'新增地址',
            visible: false,
            pickerValue: [],
        }
    }
    componentWillMount(){
        var {id=0} = this.props.match.params
        if(id){
            this.setState({
                id:id,
                title:'编辑地址',
            })
        }
    }

    componentWillUpdate(nextProps,nextState){
        if(nextProps.detail_data.hasOwnProperty('id') && nextProps.detail_data.id>0){
            var {province='',city='',area=''}  = nextProps.detail_data
            nextState.pickerValue=[province,city,area]

        }
    }

    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
            return '';
        }

        return this.state.pickerValue.join(',');
    }
    submit = () => {

        this.props.form.validateFields((error, value) => {
            console.log(error)
            console.log(value)
            if(error){
                for(var i in error) {
                    alert(error[i].errors[0].message);
                    break;
                }
                return false;
            }
            //
            var data = this.props.form.getFieldsValue();
            var {district=[]} = data
            var [province='',city='',area='']  = district
            data = {...data,province,city,area,id:this.state.id}
            this.sendAjax('user-address-opt',data,(data)=>{
                this.props.ignoreCacheDataTTL()
                this.historyAction('/address')
            })
        });


    }

    render() {
        const { getFieldProps,setFieldsValue } = this.props.form;
        const {rec_name,rec_phone,addr}= this.props.detail_data

        return (
            <div id="address-opt">
                <NavBar
                    className="nav-block"
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.historyAction()}
                >
                    {this.state.title}
                </NavBar>
                <List>
                    <InputItem
                        {...getFieldProps('rec_name',{
                            validateFirst:true,
                            rules:[{required: true,message: "请输入联系人名称"}],
                            initialValue:rec_name

                        })}
                        placeholder="联系人"
                    >联系人</InputItem>
                </List>
                <List>
                    <InputItem
                        {...getFieldProps('rec_phone',{
                            validateFirst:true,
                            rules:[
                                {required: true,pattern:/^1[0-9]{10}$/,message: "请输入正确的手机号码"},
                                ],
                            initialValue:rec_phone
                            })}
                        placeholder="手机号码"
                        type="text"
                        pattern="[0-9]*"
                        maxLength={11}
                    >手机号码</InputItem>
                </List>
                <Picker
                    {...getFieldProps('district', {
                        initialValue:this.state.pickerValue,
                        validateFirst:true,
                        rules:[
                            {type:'array',required: true,message: "请选择地址"},
                        ],
                    })}
                    data={this.props.location_data}

                    onChange={v => {
                        this.setState({pickerValue: v})
                        setFieldsValue({district:v})
                    }}
                    onOk={() => this.setState({ visible: false })}
                    onDismiss={() => this.setState({ visible: false })}
                >
                    <List.Item
                        extra={this.getSel()}
                    >
                        选择地区
                    </List.Item>
                </Picker>
                <List>
                    <InputItem
                        {...getFieldProps('addr',{
                            rules:[
                                {required: true,message: "请输入详细地址"},
                            ],
                            initialValue:addr
                        })}
                        placeholder="详细地址"
                    >详细地址</InputItem>
                </List>

                <Button

                    type="warning"
                    onClick={this.submit}
                >保存</Button>
            </div>
        );
    }
}

const mapStateProps = (state)=>{
    return {
        detail_data:state.address.detail_data,
    }
}
const mapDispatchProps = (dispatch)=>{
    return {
        initDetailData:(data={})=>{
            dispatch(initDetailData(data))
        },
        ignoreCacheDataTTL:()=>{
            dispatch(ignoreCacheDataTTL('address_list'))
        }
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps)=>{
    let req_param = ownProps.match.params
    return Object.assign({}, {req_param:req_param},ownProps, stateProps, dispatchProps)
}

AddressOptContainer=WrapWithAjaxData(AddressOptContainer,[
    ['user-address-info','initDetailData','req_param']
])
AddressOptContainer = createForm()(AddressOptContainer);

export default connect(mapStateProps,mapDispatchProps,mergeProps)(AddressOptContainer);