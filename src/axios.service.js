import axios from "axios";
import { Toast} from 'antd-mobile';

import config from './axios.config'
//引入api接口文档
const config_url = config.url

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8082/api.php/',
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 0,
    maxContentLength: 1,
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // 默认的
    // headers: { 'X-Custom-Header': 'foobar' }

    // `adapter` 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
    // adapter: function (config) {
    //     /* ... */
    //     console.log(config)
    // },
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        Toast.loading()
        return data;
    }],

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        Toast.hide()
        return data;
    }],
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    // data: {
    //     firstName: 'Fred'
    // },
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    paramsSerializer: function(params) {
        switch (typeof params) {
            case 'object':
                var req_str = '';
                for(let index in params) {
                    req_str+=index+'='+params[index]+'&'
                }
                return req_str.slice(0,-1);
            default:
                return params
        }

    },

});

/*
* 处理请求
* */
export const  axiosHandleRequest = (uri,req_data,handleData,is_handle_data=true)=>{
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    let req_info = config_url[uri]
    console.log(req_info)
    let method = req_info[1]
    let req_uri = req_info[0]
    let config={}
    config['cancelToken'] = source.token
    let req_key_name = method === 'get'?'params':'data'    //请求数据
    config[req_key_name] = req_data
    console.log(req_data)
    //发起请求
    axiosInstance[method](req_uri,config)
        .then(function(response){
            let data = response.data
            data = is_handle_data?data.data:data
            handleData(data)
        })
        .catch(function(error){
            if (axios.isCancel(error)) {

                Toast.show('已取消网络请求');
            } else {
                // 处理错误
                console.log('请求异常:', error.message);
            }
        })

    return {source}
}

