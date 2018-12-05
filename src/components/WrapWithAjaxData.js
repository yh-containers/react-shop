import React, {Component} from 'react';
import {axiosHandleRequest} from "../axios.service";
/*
* ajax请求服务器获取数据
* */
export default (WrappedComponent,req_data=[])=>{

    class WrapWithAjaxData extends Component {
        constructor (props) {
            super(props)
        }

        componentDidMount(){
            let uri = req_data[0]
            let handleData = req_data[1]
            axiosHandleRequest(uri,{id:28},(data)=>{

                this.props[handleData](data)
            })
        }

        render () {
            return <WrappedComponent  />
        }
    }
    return WrapWithAjaxData
}


