let _state = {
    "list": []
}

export default function MSHelperReducer(state=_state,action){
    switch(action.type){
        case 'ADD':
            return state;
        case 'DELETE':
            return state;
        case 'UPDATE':
            return state;
        case 'RETRIVE':
            return Object.assign({}, action.data);
        default:
            return state;
    }
}