import React, {Component} from 'react';
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {axiosHandleRequest} from "../axios.service";
import {addCacheDataTTL} from '../reducers/globalData'
/*
* ajax请求服务器获取数据
* */
// export default (WrappedComponent,uri,handle_func,req_data={},ttl=false,cache_name='')=>{
export default (WrappedComponent,req_info=[])=>{

    class WrapWithAjaxData extends Component {
        static propTypes = {
            cache_ttl_info:PropTypes.object,
            addCacheDataTTL:PropTypes.func,
        }

        componentDidMount(){
            let current_time = (new Date()).getTime()
            let is_req = true;
            for(let i=0;i<req_info.length;i++) {
                let [uri,handle_func,req_data='',ttl=false,cache_name='']= req_info[i];
                if(typeof req_data ==='string'){
                    req_data = req_data?this.props[req_data]:{}
                }
                //加载数据
                if(ttl!==false){
                    cache_name = cache_name?cache_name:this.getDisplayName(WrappedComponent).toString()+'-'+uri
                    if(this.props.cache_ttl_info.hasOwnProperty(cache_name)){
                        if(this.props.cache_ttl_info[cache_name]>current_time){
                            is_req=false
                        }else{
                            this.props.addCacheDataTTL(cache_name,ttl)
                        }
                    }else{
                        this.props.addCacheDataTTL(cache_name,ttl)
                    }
                }

                is_req && axiosHandleRequest(uri,req_data,(data)=>{
                    this.props[handle_func](data)
                })
            }


        }


        getDisplayName(WrappedComponent) {
            return WrappedComponent.displayName || WrappedComponent.name || "Component";

        }


        render () {
            return <WrappedComponent  {...this.props}/>
        }

    }

    const mapStateProps = (state)=>{
        return {
            cache_ttl_info:state.globalData.cache_ttl_info
        }
    }
    const mapDispatchProps = (dispatch)=>{
        return {
            addCacheDataTTL:(name,ttl)=>{
                dispatch(addCacheDataTTL(name,ttl))
            }
        }
    }



    return connect(mapStateProps,mapDispatchProps)(WrapWithAjaxData)
}


