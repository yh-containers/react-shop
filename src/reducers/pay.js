//action
const NAMESPACE = 'pay/'
const INIT_DATA = NAMESPACE+'INIT_DATA'
const CHOOSE_PAY_WAY = NAMESPACE+'CHOOSE_PAY_WAY'

export default (state,action)=>{
    if(!state){
        state = {pay_money:0.00,pay_way:[],pay_id:0}
    }

    switch (action.type) {
        case INIT_DATA:
            var {pay_money=0.00,pay_way=[],pay_id=0}=action.data
            return {
                pay_money: pay_money,
                pay_way: pay_way,
                pay_id: pay_id,
            }
        case CHOOSE_PAY_WAY:
            var pay_id = state.pay_way[action.index]['id']
            return {...state,pay_id:pay_id}
        default:
            return state
    }
}

//action creators
export const initData=(data)=>{
    return {type:INIT_DATA,data}
}

export const choosePayWay=(index)=>{
    return {type:CHOOSE_PAY_WAY,index}
}