let _state = {
    "visible": false
}

export default function ModalReducer(state=_state,action){
    switch(action.type){
        case 'SHOW':
            return {
                "visible": true,
                "record": null
            };
        case 'HIDDEN':
            return  {
                "visible": false
            };
        case 'EDIT': 
            return {
                "visible": true,
                "record": action.record
            }
        default:
            return state;
    }
}