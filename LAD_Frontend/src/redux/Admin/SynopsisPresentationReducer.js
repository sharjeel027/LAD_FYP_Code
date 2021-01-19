import {
    GET_SYNOPSISTOPRESENT_REQUEST,
    GET_SYNOPSISTOPRESENT_SUCCESS,
    GET_SYNOPSISTOPRESENT_FAILER
} from './AdminType';


const initialState={
    loading:false,
    synopsisList:[],
    synopsisSelected:[],
    error:''
}

const SynopsisPresentaion = (state = initialState, action) => {
    switch (action.type) {
      case GET_SYNOPSISTOPRESENT_REQUEST:
        return {
          ...state,
          loading: true
        }
      case GET_SYNOPSISTOPRESENT_SUCCESS:
        return {
          loading: false,
          synopsisList: action.payload,
          synopsisSelected:[],
          error: ''
        }
      case GET_SYNOPSISTOPRESENT_FAILER:
        return {
          loading: false,
          synopsisList: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default SynopsisPresentaion;