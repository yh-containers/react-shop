//action
const INIT_DATA = 'address/INIT_DATA'
const DETAIL_DATA = 'address/DETAIL_DATA'
const DEL_ADDRESS = 'address/DEL_ADDRESS'

export default (state,action)=>{
    if(!state){
        state={data:[],detail_data:{}}
    }
    switch (action.type) {
        case INIT_DATA:
            return {...state,data:action.data}
        case DETAIL_DATA:
            return {...state,detail_data:action.data}

        case DEL_ADDRESS:
            return {...state,data:[
                    ...state.data.slice(0,action.index),
                    ...state.data.slice(action.index+1),
                ]}
        default:
            return state

    }
}

//action creators
export const initData = (data)=>{
    return {type:INIT_DATA,data}
}
export const initDetailData = (data)=>{
    return {type:DETAIL_DATA,data}
}
//删除数据
export const delAddress = (index)=>{
    return {type:DEL_ADDRESS,index}
}