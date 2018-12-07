//actions
const INIT_GOODS_DATA = 'INIT_GOODS_DATA'
const CHOOSE_ATTR_ITEM = 'CHOOSE_ATTR_ITEM'

// reducer
export default function (state, action) {
    if (!state) {
        state = {detail_data:{}}
    }
    switch (action.type) {
        case INIT_GOODS_DATA:
            return {...state,detail_data:action.detail_data}

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