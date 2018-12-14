//actions
const INIT_GOODS_DATA = 'goodsDetail/INIT_GOODS_DATA'
const CHOOSE_ATTR_ITEM = 'goodsDetail/CHOOSE_ATTR_ITEM'
const GOODS_COLL = 'goodsDetail/GOODS_COLL'
const Add_Cart = 'goodsDetail/Add_Cart'
// reducer
export default function (state, action) {
    if (!state) {
        state = {detail_data:{},is_coll:false,cart_num:false}
    }
    switch (action.type) {
        case INIT_GOODS_DATA:
            return {...state,
                detail_data:action.detail_data,
                is_coll:!!action.detail_data.is_coll,
                cart_num:action.detail_data.cart_num,
            }

        case GOODS_COLL:
            return {...state,is_coll:action.is_coll}

        case Add_Cart:
            return {...state,cart_num:action.cart_num}

        case CHOOSE_ATTR_ITEM:
            state.detail_data['sku'][action.index]['choose_item']=action.value


            return {detail_data:state.detail_data}

        default:
            return state
    }
}

// action creators
export const initGoodsData = (detail_data) => {
    return {type: INIT_GOODS_DATA, detail_data}
}

export const chooseAttrItem = (index,value)=>{
    return {type:CHOOSE_ATTR_ITEM,index,value}
}
//商品收藏
export const goodsColl = (is_coll)=>{
    return {type:GOODS_COLL,is_coll}
}
//加入购物车
export const addCart=(cart_num)=>{
    return {type:Add_Cart,cart_num}
}