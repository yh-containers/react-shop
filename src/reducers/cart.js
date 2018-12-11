//action
const INIT_DATA = 'INIT_DATA'
const OPT_CHECKBOX = 'OPT_CHECKBOX'
const FULL_CHECKBOX = 'FULL_CHECKBOX'
const OPT_GOODS_INFO = 'OPT_GOODS_INFO'
const OPT_GOODS_NUM = 'OPT_GOODS_NUM'
const DEL_CART      = 'DEL_CART'

export default (state,action={})=>{
    if(!state){
        state={data:[],is_full:false,total_num:0,total_price:0.00}
    }
    switch (action.type) {
        case INIT_DATA:
            return {...state,data:action.data}

        case OPT_GOODS_INFO:
            var data = [...state.data]
            var total_num=0,total_price=0.00

            data.map(function(value,index){
                var {list} = value
                list.map(function(goods_data,goods_index){
                    var {is_choose,num,price} = goods_data
                    if(is_choose){
                        total_num +=num
                        total_price +=price*num
                    }
                })
            })
            return {...state,total_num:total_num,total_price:total_price}

        case OPT_GOODS_NUM:
            var data = [...state.data]
            data[action.index]['list'][action.goods_index].num = action.num
            return {...state,data:data}

        case OPT_CHECKBOX:
            var data = [...state.data]
            data[action.index]['list'][action.goods_index].is_choose = action.bool
            return {...state,data:data}

        case FULL_CHECKBOX:
            var data = [...state.data]
            data.map(function(value,index){
                var {list} = value
                list.map(function(goods_data,goods_index){
                    data[index]['list'][goods_index].is_choose = action.bool
                })
            })
            return {...state,data:data,is_full: action.bool}

        case DEL_CART:
            var data = [...state.data]
            var new_data = [],del_cart=action.del_cart
            data.map(function(value,index){
                var {merchant_info,list=[]} = value
                var new_list=[]
                list.map(function(goods_data,goods_index){
                    var {cart_id,is_choose} = goods_data
                    if(del_cart.indexOf(cart_id)===-1) {
                        new_list.push(goods_data)
                    }
                })
                 if(new_list.length>0){
                     new_data[index] = {}
                     new_data[index]['merchant_info'] = merchant_info
                     new_data[index]['list'] = new_list

                 }
            })

            return {...state,data:new_data}

        default:
            return state
    }
}

//action creators

export const initData=(data)=>{
    return {type:INIT_DATA,data}
}
//复选框操作
export const optCheckBox=(index,goods_index,bool)=>{
    return {type:OPT_CHECKBOX,index,goods_index,bool}
}
//全选动作
export const fullCheckBox=(bool)=>{
    return {type:FULL_CHECKBOX,bool}
}
//重新计算商品价格相关数据
export const optGoodsInfo=()=>{
    return {type:OPT_GOODS_INFO}
}
//调整商品购买数量
export const optGoodsNum=(index,goods_index,num)=>{
    return {type:OPT_GOODS_NUM,index,goods_index,num}
}
//删除购物车
export const delCart=(del_cart=[])=>{
    return {type:DEL_CART,del_cart}
}