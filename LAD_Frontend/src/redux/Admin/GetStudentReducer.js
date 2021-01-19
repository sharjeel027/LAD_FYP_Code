import {
    GET_ASTUDENT_REQUEST,
    GET_ASTUDENT_SUCCESS,
    GET_ASTUDENT_FAILER,
} from './AdminType';


const initialState={
    loading:false,
    list:[],
    error:''
}

const getsynopsis = (state = initialState, action) => {
    switch (action.type) {
      case GET_ASTUDENT_REQUEST:
        return {
          ...state,
          loading: true
        }
      case GET_ASTUDENT_SUCCESS:
        return {
          loading: false,
          list: action.payload,
          error: ''
        }
      case GET_ASTUDENT_FAILER:
        return {
          loading: false,
          list: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default getsynopsis;