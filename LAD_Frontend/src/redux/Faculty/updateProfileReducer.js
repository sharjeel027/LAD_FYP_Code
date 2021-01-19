import {
    UPDATE_PROFILE_REQ,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL
} from './FacultyType';

const initialState={
    loading:false,
    message:'',
    error:''
}

const updateProfile = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQ:
        return {
          ...state,
          loading: true,
          message:''
        }
      case UPDATE_PROFILE_SUCCESS:
        return {
          loading: false,
          message: action.payload.message,
          error: ''
        }
      case UPDATE_PROFILE_FAIL:
        return {
          loading: false,
          message: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default updateProfile;