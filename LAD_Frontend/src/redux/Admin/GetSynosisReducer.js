import {
    GET_SYNOPSIS_REQUEST,
    GET_SYNOPSIS_SUCCESS,
    GET_SYNOPSIS_FAILER
} from './AdminType';


const initialState={
    loading:false,
    synopsisList:[],
    error:''
}

const getstudent = (state = initialState, action) => {
    switch (action.type) {
      case GET_SYNOPSIS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case GET_SYNOPSIS_SUCCESS:
        return {
          loading: false,
          synopsisList: action.payload,
          error: ''
        }
      case GET_SYNOPSIS_FAILER:
        return {
          loading: false,
          synopsisList: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default getstudent;