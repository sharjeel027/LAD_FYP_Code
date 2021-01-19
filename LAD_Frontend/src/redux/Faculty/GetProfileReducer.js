import {
    GET_FACULTY_PROFILE_REQ,
    GET_FACULTY_PROFILE_SUCCESS,
    GET_FACULTY_PROFILE_FAIL
} from './FacultyType';

const initialState={
    loading:false,
    faculty:[],
    error:''
}

const profile = (state = initialState, action) => {
    switch (action.type) {
      case GET_FACULTY_PROFILE_REQ:
        return {
          ...state,
          loading: true
        }
      case GET_FACULTY_PROFILE_SUCCESS:
        return {
          loading: false,
          faculty: action.payload.data,
          error: ''
        }
      case GET_FACULTY_PROFILE_FAIL:
        return {
          loading: false,
          faculty: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default profile;