//actions
const INIT_DATA = 'orderPreview/INIT_DATA'

export default (state,action)=>{
    if(!state){
        state={data:[],addr:{},total_money:0.00,pay_money:0.00,dis_money:0.00,freight_money:0.00,number:0}
    }
    switch (action.type) {
        case INIT_DATA:
            var {
                list=[]
                ,number=0
                ,total_money=0.00
                ,pay_money=0.00
                ,dis_money=0.00
                ,freight_money=0.00
            } = action.data
            return {
                ...state,
                data:list,
                number:number,
                total_money:total_money,
                pay_money:pay_money,
                dis_money:dis_money,
                freight_money:freight_money,
            }
        default:
            return state
    }
}

//action creators
export const initData= (data)=>{
    console.log('order-preview-init-data')
    return {type:INIT_DATA,data}
}