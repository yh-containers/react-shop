//actions
const INIT_GOODS_DATA = 'INIT_GOODS_DATA'

// reducer
export default function (state, action) {
    if (!state) {
        state = {detail_data:{}}
    }
    switch (action.type) {
        case INIT_GOODS_DATA:
            return {...state,detail_data:action.detail_data}
        default:
            return state
    }
}

// action creators
export const initGoodsData = (detail_data) => {
    return {type: INIT_GOODS_DATA, detail_data}
}