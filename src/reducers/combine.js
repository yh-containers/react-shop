import {combineReducers} from 'redux'

import globalData from './globalData'
import cateGoods from './cateGoods'
import goodsDetail from './goodsDetail'
import cart from './cart'
import orderPreview from './orderPreview'
import address from './address'
import pay from './pay'

export default combineReducers({
    globalData,
    cateGoods,
    goodsDetail,
    cart,
    orderPreview,
    address,
    pay,
})