
export const BASE_URL= 'http://127.0.0.1:8082/api.php/';
export default {
    url: {
        'goods-list-data'       : ['goods/listData','get'],
        'ad-flow-images'        : ['ad/flowImages','get'],
        'goods-cate'            : ['goods/cate','get'],
        'goods-detail'          : ['goods/detail','get'],
        'user-login'            : ['user/login','get'],
        'user-coll-goods'       : ['user/collGoods','post'],
        'user-goods-add-cart'   : ['user/goodsAddCart','post'],
        'user-cart'             : ['user/cart','get'],
        'user-cart-goods-change': ['user/cartGoodsChange','post'],
        'user-cart-goods-del'   : ['user/cartGoodsDel','post'],
    }
}