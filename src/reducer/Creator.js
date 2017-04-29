let _state = {}

export default function CreatorReducer(state=_state,action){
    switch(action.type){
        case 'CREATEEDITOR':
            return Object.assign({},action.record);
        default:
            return state;
    }
}