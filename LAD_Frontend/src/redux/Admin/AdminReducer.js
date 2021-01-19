import {
    ADMIN_LOGIN_LODING,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILER
} from './AdminType';

const initialState={
    loading:false,
    admin:[],
    error:''
}

const adminLogin = (state = initialState, action) => {
    switch (action.type) {
      case ADMIN_LOGIN_LODING:
        return {
          ...state,
          loading: true
        }
      case ADMIN_LOGIN_SUCCESS:
        return {
          loading: false,
          admin: action.payload,
          error: ''
        }
      case ADMIN_LOGIN_FAILER:
        return {
          loading: false,
          admin: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default adminLogin