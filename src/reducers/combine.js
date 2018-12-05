import {combineReducers} from 'redux'

import globalData from './globalData'
import cateGoods from './cateGoods'
import goodsDetail from './goodsDetail'

export default combineReducers({
    globalData,
    cateGoods,
    goodsDetail,
})