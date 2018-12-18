//action
const NAME_SPACE = 'orderList'
const INIT_DATA = NAME_SPACE +'INIT_DATA'

export default (state,action)=>{
    if(!state){
        state = [
            {'title':'全部',condition:{},'data':[]},
            {'title':'待付款',condition:{type:1},'data':[]},
            {'title':'待发货',condition:{type:2},'data':[]},
            {'title':'待收货',condition:{type:3},'data':[]},
            {'title':'待评价',condition:false,'data':[]},
        ]
    }

    switch (action.type) {
        case INIT_DATA:
            var {data=[]} = action
            data.map(function(value,index){
                state[action.index].data.push(value)
            })
            return [...state]
        default:
            return state
    }

}

//action creator
export const initData=(index,data)=>{
    return {type:INIT_DATA,index,data}
}