//actions
const INIT_DATA = 'orderPreview/INIT_DATA'
const DESTROY_DATA = 'orderPreview/DESTROY_DATA'
const ADD_MECH_REMARK = 'orderPreview/ADD_MECH_REMARK'      //添加备注

const init_state = {data:[],addr_info:{},invoice:[],invoice_type:0,total_money:0.00,pay_money:0.00,dis_money:0.00,freight_money:0.00,number:0}

export default (state=init_state,action)=>{

    switch (action.type) {
        case INIT_DATA:
            var {
                list=[]
                ,number=0
                ,total_money=0.00
                ,pay_money=0.00
                ,dis_money=0.00
                ,freight_money=0.00
                ,addr_info={}
                ,model_invoice=[]
            } = action.data
            return {
                ...state,
                data:list,
                number:number,
                total_money:total_money,
                pay_money:pay_money,
                dis_money:dis_money,
                freight_money:freight_money,
                addr_info:addr_info,
                invoice:model_invoice,
            }


        case ADD_MECH_REMARK:
            var data=[...state.data]
            data[action.index]['remark']=action.remark
            return {...state,data:data}

        case DESTROY_DATA:
            return init_state

        default:
            return state
    }
}

//action creators
export const initData= (data)=>{
    return {type:INIT_DATA,data}
}

//销毁数据
export const addRemark = (index,remark)=>{
    return {type:ADD_MECH_REMARK,index,remark}
}
//销毁数据
export const destroyData = ()=>{
    return {type:DESTROY_DATA}
}