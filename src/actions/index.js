const LOAD_ARTICLES_ERROR = 'LOAD_ARTICLES_ERROR';

export function loadApiData() {
    return (dispatch,getState)=>{
        return fetch('/api/api.json')
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
        })
    }
}