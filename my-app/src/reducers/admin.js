import constants from "../constants/constants";
import jwt_decode from "jwt-decode";
import {Authenticate} from "../auth/auth"

const initialState = {
  name: "sfsff",
  loading: false,
  data: [],
  users: [],
  list: [],
  login:{}
};
const showLoading = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const fetchAdmin = (state, action) => {
  const { payload } = action;
  return {
    ...state,
    loading: false,
    data: payload
  };
};
const getUser = (state, action) => {
  const { payload } = action;
  console.log(payload)
  // let arr = state.list;
  // arr.push(payload);
  //console.log(arr);
  return {
    ...state,
    loading: false,
    users: payload
  };
};

const getAllUsers = (state, action) => {
  const { payload } = action;
  console.log(payload)
  // let arr = state.list;
  // arr.push(payload);
  //console.log(arr);
  return {
    ...state,
    loading: false,
    users: payload
  };
};

const deleteUser = (state, action) => {
  const { payload } = action;
  //state.users.splice(action.payload, 1);
  return {
    ...state,
    loading: false,
    users: payload
  };
};
const registerUser = (state, action) => {
  const { payload } = action;
  //state.users.splice(action.payload, 1);
  return {
    ...state,
    loading: false,
    successMsg: payload.email,
    errMsg:""
  };
};
const registerUserFail = (state, action) => {
  const { payload } = action;
  //state.users.splice(action.payload, 1);
  return {
    ...state,
    loading: false,
    errMsg: payload.email,
    successMsg:""
  };
};

const updateUser = (state, action) => {
  state.users[action.payload.id] = action.payload;
  return {
    ...state
  };
};

const loginUser = (state, action) => {
  const { payload } = action;
  const decoded = jwt_decode(payload.token);
  console.log(decoded)
  
  localStorage.setItem('token',payload.token)
  //Authenticate(payload.token)
  //state.users.splice(action.payload, 1);
  return {
    ...state,
    loading: false,
    login:payload,
    token:payload.token,
    user:decoded
  };
};

const logoutUser = (state, action) => {
  console.log(state.token)
  return {
    ...state,
    token:""
  };
};
const loginUserFail = (state, action) => {
  const { payload } = action;
  //state.users.splice(action.payload, 1);
  return {
    ...state,
    loading: false,
    loginError:payload
  };
};
const handlers = {
  [constants.FETCH_ADMIN_REQUEST]: showLoading,
  [constants.FETCH_ADMIN_SUCCESS]: fetchAdmin,
  [constants.ADD_USER_RESPONSE]: getUser,
  [constants.UPDATE_USER_RESPONSE]: updateUser,
  [constants.DELETE_USER_RESPONSE]: deleteUser, 
  [constants.GET_USER_SUCCESS]: getAllUsers, 
  [constants.USER_REGISTER_RESPONSE]: registerUser, 
  [constants.USER_REGISTER_FAILED]: registerUserFail,
  [constants.USER_LOGIN_RESPONSE]: loginUser, 
  [constants.USER_LOGOUT_REQUEST]: logoutUser,
  [constants.USER_LOGIN_FAIL]: loginUserFail, 
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
