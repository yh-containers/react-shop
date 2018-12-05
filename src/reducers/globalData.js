//action
const INIT_FLOW_IMAGES = 'INIT_FLOW_IMAGES'   //轮播图
const INIT_CATE_DATA = 'INIT_CATE_DATA'         //初始化分类数据
const INIT_CATE_ADD_DATA = 'INIT_CATE_ADD_DATA'         //按分类保存数据
const INIT_HOT_GOODS = 'INIT_HOT_GOODS'         //初始热门数据--首页


export default (state,action)=>{
    if(!state) {
        state = {
            flow_images:[],
            cate_data:[],
            hot_goods:[],
        }
    }

    switch (action.type) {
        case INIT_FLOW_IMAGES:
            return {...state,flow_images: action.flow_images}
        case INIT_CATE_DATA:
            return {...state,cate_data: action.cate_data}
        case INIT_CATE_ADD_DATA:
            // console.log(action.index)
            // let data= {...state.cate_data[action.index],data:action.cate_goods_data}
            // let cate_data = state.cate_data[action.index].push()
            // console.log({
            //     cate_data:[
            //         ...state.cate_data.slice(0,action.index),
            //         {...state.cate_data[action.index],data:action.cate_goods_data},
            //         ...state.cate_data.slice(action.index+1)
            //     ]
            //
            // })
            // state['cate_data'][action.cid]['id'] = action.cate_goods_data
            return {...state,cate_data:[
                    ...state.cate_data.slice(0,action.index),
                    {...state.cate_data[action.index],data:action.cate_goods_data},
                    ...state.cate_data.slice(action.index+1)
                ]
            }
        case INIT_HOT_GOODS:
            return {...state,hot_goods: action.hot_goods}
        default:
            return state
    }
}
//action creators
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