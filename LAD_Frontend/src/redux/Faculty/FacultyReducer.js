import {
    FACULTY_LOGIN_LODING,
    FACULTY_LOGIN_SUCCESS,
    FACULTY_LOGIN_FAILER
} from './FacultyType';

const initialState={
    loading:false,
    faculty:[],
    error:''
}

const facultyLogin = (state = initialState, action) => {
    switch (action.type) {
      case FACULTY_LOGIN_LODING:
        return {
          ...state,
          loading: true
        }
      case FACULTY_LOGIN_SUCCESS:
        return {
          loading: false,
          faculty: action.payload,
          error: ''
        }
      case FACULTY_LOGIN_FAILER:
        return {
          loading: false,
          faculty: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default facultyLogin;