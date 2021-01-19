import {
    GET_DEPT_REQUEST,
    GET_DEPT_SUCCESS,
    GET_DEPT_FAILER,
} from './AdminType';


const initialState={
    loading:false,
    list:[],
    error:''
}

const getdept = (state = initialState, action) => {
    switch (action.type) {
      case GET_DEPT_REQUEST:
        return {
          ...state,
          loading: true
        }
      case GET_DEPT_SUCCESS:
        return {
          loading: false,
          list: action.payload,
          error: ''
        }
      case GET_DEPT_FAILER:
        return {
          loading: false,
          list: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default getdept;