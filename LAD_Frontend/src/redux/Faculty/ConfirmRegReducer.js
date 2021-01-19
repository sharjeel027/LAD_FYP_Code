import {
    CONFIRM_REGISTRATION_REQ,
    CONFIRM_REGISTRATION_SUCCESS,
    CONFIRM_REGISTRATION_FAIL,
} from './FacultyType';

const initialState={
    loading:false,
    faculty:[],
    error:''
}

const confirmRegistration = (state = initialState, action) => {
    switch (action.type) {
      case CONFIRM_REGISTRATION_REQ:
        return {
          ...state,
          loading: true
        }
      case CONFIRM_REGISTRATION_SUCCESS:
        return {
          loading: false,
          faculty: action.payload.user,
          error: ''
        }
      case CONFIRM_REGISTRATION_FAIL:
        return {
          loading: false,
          faculty: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default confirmRegistration;