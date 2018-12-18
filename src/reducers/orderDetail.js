//action
const NAME_SPACE = 'orderDetail'
const INIT_DATA = NAME_SPACE+'INIt_DATA'

export default (state,action)=>{
    if(!state){
        state={data:{}}
    }
    switch (action.type) {
        case INIT_DATA:
            return {...state,data:action.data}
        default:
            return state
    }
}

//action creator
export const initData=(data)=>{
    return {type:INIT_DATA,data}
}