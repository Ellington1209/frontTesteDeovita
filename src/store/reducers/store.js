import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

let middleware = [ReduxThunk]

const store = createStore( rootReducer,  applyMiddleware(...middleware)
);

export default store;