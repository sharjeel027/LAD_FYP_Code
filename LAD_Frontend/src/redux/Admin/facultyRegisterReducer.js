import {
    GET_FACULTY_LIST,
    ADD_FACULTY,
    DELETE_FACULTY,
    RESGISTER_FACULTY_REQ,
    RESGISTER_FACULTY_SUCCESS,
    RESGISTER_FACULTY_FAILER,

} from './AdminType';


const initialState={
    list:[],
    message:'',
    registerReq:false,
    registrationfail:''
}

const facultyRegistration = (state = initialState, action) => {
    switch (action.type) {
      case GET_FACULTY_LIST:
        return {
            list:state.list
        }
      case ADD_FACULTY:
        return {
            ...state,
            list: [...state.list, action.payload]
        }
      case DELETE_FACULTY:
        return {
            ...state,
            list : state.list.filter( (item, index) => index !== action.payload)
        }
      case RESGISTER_FACULTY_REQ:
        return {
          ...state,
          registerReq:true
        }
      case RESGISTER_FACULTY_SUCCESS:
        return {
            ...state,
            message: action.payload
        }
      case RESGISTER_FACULTY_FAILER:
        return {
            ...state,
            registrationfail:action.payload.errormessage
        }
      default: return state
    }
  }
  
  export default facultyRegistration;