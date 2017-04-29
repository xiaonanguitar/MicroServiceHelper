import { createStore,combineReducers, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ThunkMiddleware from 'redux-thunk';
import MSHelperReducer from '../reducer';
import APILoaderReducer from '../reducer/APILoader';
import ModalReducer from '../reducer/Modal';
import EditorReducer from '../reducer/Editor';
import CreatorReducer from '../reducer/Creator';

const finalCreateStore = compose(applyMiddleware(
    ThunkMiddleware,
    logger
))(createStore);
const reducer = combineReducers({
    MSHelperState:MSHelperReducer,
    APILoaderState: APILoaderReducer,
    ModalState: ModalReducer,
    EditorState: EditorReducer,
    CreatorState: CreatorReducer
})

export default function configureStore(initialState) {
    const store = finalCreateStore(reducer,initialState);
    return store;
}