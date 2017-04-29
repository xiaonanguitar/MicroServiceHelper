let _state = {
    "visible": false,
    "record": null,
    "mode": 'create'
}

export default function ModalReducer(state=_state,action){
    switch(action.type){
        case 'SHOW':
            return {
                "visible": true,
                "record": {},
                "mode": 'create'
            };
        case 'HIDDEN':
            return  {
                "visible": false
            };
        case 'EDIT': 
            return {
                "visible": true,
                "record": action.record,
                "mode": 'edit'
            }
        default:
            return state;
    }
}