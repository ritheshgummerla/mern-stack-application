import { takeEvery, call, put, all } from "redux-saga/effects";
import constants from "../constants/constants";
import Api from "../api";

function* findAdmin() {
  const response = yield call(Api.findAdmin);
  yield put({ type: constants.FETCH_ADMIN_SUCCESS, payload:response.data });
}
function* getUser(model) {
  console.log(model)
  const token = model.token
  const response = yield Api.findUser(token);
  yield put({ type: constants.GET_USER_SUCCESS, payload:response.data });
}
function* addUser(model) {
  const resp = yield Api.addUser(model.data)
  const response = yield call(Api.findUser);
  console.log(response.data)
  yield put({ type: constants.ADD_USER_RESPONSE, payload:response.data});
}
function* updateUser(model) {
  const resp = yield Api.updateUser(model.data)
  const response = yield call(Api.findUser);
  console.log(response)
  yield put({ type: constants.UPDATE_USER_RESPONSE, payload: response.data });
}

function* deleteUser(model) {
  const resp = yield Api.deleteUser(model.data)
  const response = yield call(Api.findUser);
  yield put({ type: constants.DELETE_USER_RESPONSE, payload: response.data });
}

function* userRegister(model) {
  console.log(model)
   const {error, data} = yield Api.registerUser(model.data)
   if(data){
    yield put({ type: constants.USER_REGISTER_RESPONSE, payload: data });

   }else{
     
    yield put({ type: constants.USER_REGISTER_FAILED, payload: error });
   }
}

function* userLogin(model) {
   const {error, data} = yield Api.userLogin(model.data)
   if(data){
    yield put({ type: constants.USER_LOGIN_RESPONSE, payload: data });
    return
   }
   if(error){
    yield put({ type: constants.USER_LOGIN_FAIL, payload: error });
   }
}

export default function* rootSaga() {
  yield all([
    takeEvery(constants.FETCH_ADMIN_REQUEST, findAdmin),
    takeEvery(constants.ADD_USER_REQUEST, addUser),
    takeEvery(constants.UPDATE_USER_REQUEST, updateUser),
    takeEvery(constants.DELETE_USER_REQUEST, deleteUser),
    takeEvery(constants.GET_USER_REQUEST, getUser),
    takeEvery(constants.USER_REGISTER_REQUEST, userRegister),
    
    takeEvery(constants.USER_LOGIN_REQUEST, userLogin),

  ]);
}

