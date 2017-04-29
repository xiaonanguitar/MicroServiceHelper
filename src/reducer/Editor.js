let _state = {}

export default function EditorReducer(state=_state,action){
    switch(action.type){
        case 'INITBODY':
            return Object.assign({},action.record);
        case 'MODIFY':
            return Object.assign({},action.record);
        default:
            return state;
    }
}