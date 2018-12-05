//actions
const ADD_GOODS_LIST = 'ADD_GOODS_LIST'

// reducer
export default function (state, action) {
    if (!state) {
        state = {}
    }
    switch (action.type) {
        case ADD_GOODS_LIST:
            return {...state[action.cid]=action.goods_list}
        default:
            return state
    }
}

// action creators
export const addGoodsList = (cid,goods_list) => {
    return {type: ADD_GOODS_LIST, cid,goods_list}
}