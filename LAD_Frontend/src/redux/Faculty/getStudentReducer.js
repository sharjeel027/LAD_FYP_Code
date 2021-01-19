import {
    GET_STUDENT_REQ,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FAIL
} from './FacultyType';

const initialState={
    loading:false,
    student:[],
    error:''
}

const student = (state = initialState, action) => {
    switch (action.type) {
      case GET_STUDENT_REQ:
        return {
          ...state,
          loading: true
        }
      case GET_STUDENT_SUCCESS:
        return {
          loading: false,
          student: action.payload.data[0],
          error: ''
        }
      case GET_STUDENT_FAIL:
        return {
          loading: false,
          student: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default student;