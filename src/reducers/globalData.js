//action
// const GET_USER_LOGIN_INFO = 'GET_USER_LOGIN_INFO'   //用户登录信息

const INIT_FLOW_IMAGES = 'globalData/INIT_FLOW_IMAGES'   //轮播图
const INIT_CATE_DATA = 'globalData/INIT_CATE_DATA'         //初始化分类数据
const INIT_CATE_ADD_DATA = 'globalData/INIT_CATE_ADD_DATA'         //按分类保存数据
const INIT_HOT_GOODS = 'globalData/INIT_HOT_GOODS'         //初始热门数据--首页
const ADD_CACHE_DATA_TTL = 'globalData/ADD_CACHE_DATA_TTL'         //缓存网络请求数据
const IGNORE_CACHE_DATA_TTL = 'globalData/IGNORE_CACHE_DATA_TTL'         //忽略缓存网络请求数据


export default (state,action)=>{
    if(!state) {
        state = {
            login_user_info:{},
            flow_images:[],
            cate_data:[],
            hot_goods:[],
            cache_ttl_info:{}
        }
    }

    switch (action.type) {
        // case GET_USER_LOGIN_INFO:
        //     return {...state,login_user_info: action.user_info}
        case INIT_FLOW_IMAGES:
            return {...state,flow_images: action.flow_images}

        case INIT_CATE_DATA:
            return {...state,cate_data: action.cate_data}

        case INIT_CATE_ADD_DATA:
            return {...state,cate_data:[
                    ...state.cate_data.slice(0,action.index),
                    {...state.cate_data[action.index],data:action.cate_goods_data},
                    ...state.cate_data.slice(action.index+1)
                ]
            }

        case INIT_HOT_GOODS:
            return {...state,hot_goods: action.hot_goods}

        case ADD_CACHE_DATA_TTL:
            let cache_ttl_info = state.cache_ttl_info
            cache_ttl_info[action.name] = action.ttl*1000+(new Date()).getTime()
            return {...state,cache_ttl_info: cache_ttl_info}

        case IGNORE_CACHE_DATA_TTL:
            var ttl_info = state.cache_ttl_info
            if(ttl_info.hasOwnProperty(action.name)){
                ttl_info[action.name] =(new Date()).getTime()-100000
                return {...state,cache_ttl_info: ttl_info}
            }else {
                return state
            }


        default:
            return state
    }
}
//action creators
//初始化用户登录信息
// export const getUserLoginInfo = (user_info={})=>{
//     return {type:GET_USER_LOGIN_INFO,user_info}
// }

//轮播图
export const initFlowImages = (flow_images)=>{
    return {type:INIT_FLOW_IMAGES,flow_images}
}
//初始化分类
export const initCateData = (cate_data)=>{
    return{type:INIT_CATE_DATA,cate_data}
}
//分类添加数据
export const initCateAddDATA = (index,cate_goods_data)=>{
    return{type:INIT_CATE_ADD_DATA,index,cate_goods_data}
}
//初始热门数据
export const initHotGoods = (hot_goods)=>{
    return{type:INIT_HOT_GOODS,hot_goods}
}
//缓存数据-有效期
export const addCacheDataTTL = (name,ttl)=>{
    return{type:ADD_CACHE_DATA_TTL,name,ttl}
}
export const ignoreCacheDataTTL = (name)=>{
    return{type:IGNORE_CACHE_DATA_TTL,name}
}