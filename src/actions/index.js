const LOAD_ARTICLES_ERROR = 'LOAD_ARTICLES_ERROR';

export function loadApiData() {
    return (dispatch,getState)=>{
        return fetch('/api/api.json')
        .then(res=>res.json())
        .then(res=>{
            dispatch(init(res));
            const state = getState();
            const api = state.APILoaderState;
            fetch(api.retrive.rest)
            .then(res=>res.json())
            .then(res=>{
               dispatch(loadData(res))
            })
        })
    }
}

export function deleteRecord(record) {
    return (dispatch,getState)=>{
        const state = getState();
        const api = state.APILoaderState;
        return fetch(api.delete.rest)
        .then(res=>{
            console.log(record.name);
            fetch(api.retrive.rest)
            .then(res=>res.json())
            .then(res=>{
               dispatch(loadData(res))
            })
        })
    }
}

export function init(api) {
    return {
        type: 'INIT',
        api
    }
}

export function loadData(data) {
    return {
        type: 'RETRIVE',
        data
    }
}

export function createShowModal() {
     return (dispatch,getState)=>{
         dispatch({type:"INITCREATOR"})
         dispatch({type:"SHOW"})
     }
}

export function editShowModal(record) {
     return (dispatch,getState)=>{
         dispatch({
             type:"EDIT",
             record
        })
        dispatch({
            type: "INITBODY",
            record
        })
     }
}

export function createHideModal() {
     return (dispatch,getState)=>{
         dispatch({type:"HIDDEN"})
     }
}

export function handleOk(body) {
    return (dispatch,getState)=>{
        const state = getState();
        const modalState = state.ModalState;
        const api = state.APILoaderState;
        if(modalState.mode === "create"){
            fetch(api.add.rest,{
                method: "POST",
                body: JSON.stringify(body)
            })
            .then(res=>{
               dispatch({type:"HIDDEN"})
            })
        }else{
            fetch(api.update.rest,{
                method: "PUT",
                body: JSON.stringify(body)
            })
            .then(res=>{
               dispatch({type:"HIDDEN"})
            })
        }
     }
}

export function modify(key,value) {
    return {
        type: "MODIFY",
        key: key,
        value: value
    }
}