import {createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga"
import adminReducer from "../reducers/admin";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "../sagas/adminSaga"

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    admin:adminReducer
}) 
const composeEnhancers = composeWithDevTools({});
const middlewares = applyMiddleware(sagaMiddleware);
const store = createStore(rootReducer, composeEnhancers(middlewares));
sagaMiddleware.run(rootSaga);
export default store;