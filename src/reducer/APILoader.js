let _state = {

}

export default function APILoaderReducer(state=_state,action){
    switch(action.type){
        case 'INIT':
            return Object.assign({},action.api);
        default:
            return state;
    }
}