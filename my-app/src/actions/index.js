import constants from "../constants/constants";

const fetchAdmin = () => ({
  type: constants.FETCH_ADMIN_REQUEST
});
const addUser = model => ({
  type: constants.ADD_USER_REQUEST,
  data: model
});
const updateUser = model => ({
  type: constants.UPDATE_USER_REQUEST,
  data: model
});

const onDelete = data => ({
  type: constants.DELETE_USER_REQUEST,
  data: data
});


const getUsers = (token) => ({
  type: constants.GET_USER_REQUEST,
  token:token
});
const register = (data) => ({
  type: constants.USER_REGISTER_REQUEST,
  data:data
});


const login = (data) => ({
  type: constants.USER_LOGIN_REQUEST,
  data:data
});


const logout = () => ({
  type: constants.USER_LOGOUT_REQUEST,
});


export { fetchAdmin, addUser, updateUser, onDelete,getUsers,register,login ,logout};
