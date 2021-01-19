import {
    GET_FACULTY_REQUEST,
    GET_FACULTY_SUCCESS,
    GET_FACULTY_FAILER
} from './AdminType';


const initialState={
    loading:false,
    facultyList:[],
    error:''
}

const getFaculty = (state = initialState, action) => {
    switch (action.type) {
      case GET_FACULTY_REQUEST:
        return {
          ...state,
          loading: true
        }
      case GET_FACULTY_SUCCESS:
        return {
          loading: false,
          facultyList: action.payload,
          error: ''
        }
      case GET_FACULTY_FAILER:
        return {
          loading: false,
          facultyList: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default getFaculty;