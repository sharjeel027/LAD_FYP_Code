import axios from 'axios';
import {
    ADMIN_LOGIN_LODING,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILER,
    GET_ASTUDENT_REQUEST,
    GET_ASTUDENT_SUCCESS,
    GET_ASTUDENT_FAILER,
    GET_FACULTY_LIST,
    ADD_FACULTY,
    DELETE_FACULTY,
    GET_DEPT_REQUEST,
    GET_DEPT_SUCCESS,
    GET_DEPT_FAILER,
    RESGISTER_FACULTY_REQ,
    RESGISTER_FACULTY_SUCCESS,
    RESGISTER_FACULTY_FAILER,
    GET_SYNOPSIS_REQUEST,
    GET_SYNOPSIS_SUCCESS,
    GET_SYNOPSIS_FAILER,
    GET_FACULTY_REQUEST,
    GET_FACULTY_SUCCESS,
    GET_FACULTY_FAILER,
    GET_SYNOPSISTOPRESENT_REQUEST,
    GET_SYNOPSISTOPRESENT_SUCCESS,
    GET_SYNOPSISTOPRESENT_FAILER
} from './AdminType';


export const adminLogin = () => {
    return (dispatch) => {
      dispatch(adminLoginRequest())
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          // response.data is the users
          const admin = response.data
          dispatch(adminLoginSuccess(admin))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(adminLoginFailure(error.message))
        })
    }
  }
  
  export const adminLoginRequest = () => {
    return {
      type: ADMIN_LOGIN_LODING
    }
  }
  
  export const adminLoginSuccess = users => {
    return {
      type: ADMIN_LOGIN_SUCCESS,
      payload: users
    }
  }
  
  export const adminLoginFailure = error => {
    return {
      type: ADMIN_LOGIN_FAILER,
      payload: error
    }
  }


  export const getStudent = () => {
    return (dispatch) => {
      dispatch(getStudentRequest())
      axios
        .get('/api/student/getAll')
        .then(response => {
          // response.data is the users
          const student = response.data.list
          dispatch(getStudentSuccess(student))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(getStudentFailure(error.err))
        })
    }
  }
  
  export const getStudentRequest = () => {
    return {
      type: GET_ASTUDENT_REQUEST
    }
  }
  
  export const getStudentSuccess = student => {
    return {
      type: GET_ASTUDENT_SUCCESS,
      payload: student
    }
  }
  
  export const getStudentFailure = error => {
    return {
      type: GET_ASTUDENT_FAILER,
      payload: error
    }
  }

  export const getFaculty = ()=>{
      return {
        type:GET_FACULTY_LIST
      }
  }

  export const addfaculty = faculty=>{
    return{
      type: ADD_FACULTY,
      payload: faculty
   }
  }

  export const deletefaculty = index=>{
    return{
      type: DELETE_FACULTY,
      payload: index
   }
  }


  export const getdept = () => {
    return (dispatch) => {
      dispatch(getdeptRequest())
      axios
        .get('/api/admin/getDepart')
        .then(response => {
          // response.data is the users
          const dept = response.data.list
          dispatch(getdeptSuccess(dept))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(getdeptFailure(error.err))
        })
    }
  }
  
  export const getdeptRequest = () => {
    return {
      type: GET_DEPT_REQUEST
    }
  }
  
  export const getdeptSuccess = dept => {
    return {
      type: GET_DEPT_SUCCESS,
      payload: dept
    }
  }
  
  export const getdeptFailure = error => {
    return {
      type: GET_DEPT_FAILER,
      payload: error
    }
  }



  export const registerFaculty = facultyList => {
    console.log('faculty list to action')
    console.log(facultyList);
    return (dispatch) => {
      dispatch(registerFacultyRequest())
      axios
        .post('/api/admin/registerFaculty',{facultyList:facultyList})
        .then(response => {
          // response.data is the users
          const message = response.data.message
          dispatch(registerFacultySuccess(message))
        })
        .catch(error => {
          // error.message is the error message
          console.log(error);
          dispatch(registerFacultyFailure(error.response.data))
        })
    }
  }
  
  export const registerFacultyRequest = () => {
    return {
      type: RESGISTER_FACULTY_REQ
    }
  }
  
  export const registerFacultySuccess = message => {
    return {
      type: RESGISTER_FACULTY_SUCCESS,
      payload: message
    }
  }
  
  export const registerFacultyFailure = error => {
    return {
      type: RESGISTER_FACULTY_FAILER,
      payload: error
    }
  }


  export const getSynopsis = () => {
    return (dispatch) => {
      dispatch(getSynopsisRequest())
      axios
        .get('/api/synopsis/getAll')
        .then(response => {
          // response.data is the users
          const synopsis = response.data.list
          dispatch(getSynopsisSuccess(synopsis))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(getSynopsisFailure(error.err))
        })
    }
  }
  
  export const getSynopsisRequest = () => {
    return {
      type: GET_SYNOPSIS_REQUEST,
    }
  }
  
  export const getSynopsisSuccess = synopsis => {
    return {
      type: GET_SYNOPSIS_SUCCESS,
      payload: synopsis
    }
  }
  
  export const getSynopsisFailure = error => {
    return {
      type: GET_SYNOPSIS_FAILER,
      payload: error
    }
  }


export const getFacultyList = () => {
  return (dispatch) => {
    dispatch(getFacultyRequest())
    axios
      .get('/api/faculty/getAll')
      .then(response => {
        // response.data is the users
        const faculty = response.data.list
        dispatch(getFacultySuccess(faculty))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(getFacultyFailure(error.err))
      })
  }
}

export const getFacultyRequest = () => {
  return {
    type: GET_FACULTY_REQUEST,
  }
}

export const getFacultySuccess = faculty => {
  return {
    type: GET_FACULTY_SUCCESS,
    payload: faculty
  }
}

export const getFacultyFailure = error => {
  return {
    type: GET_FACULTY_FAILER,
    payload: error
  }
}

export const getSynopsisToPresent = () => {
  return (dispatch) => {
    dispatch(getSynopsisToPresentRequest())
    axios
      .get('/api/admin/synopsisToPresente')
      .then(response => {
        // response.data is the users
        const synopsis = response.data.synopsislist
        dispatch(getSynopsisToPresentSuccess(synopsis))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(getSynopsisToPresentFailure(error.err))
      })
  }
}

export const getSynopsisToPresentRequest = () => {
  return {
    type: GET_SYNOPSISTOPRESENT_REQUEST,
  }
}

export const getSynopsisToPresentSuccess = synopsis => {
  return {
    type: GET_SYNOPSISTOPRESENT_SUCCESS,
    payload: synopsis
  }
}

export const getSynopsisToPresentFailure = error => {
  return {
    type: GET_SYNOPSISTOPRESENT_FAILER,
    payload: error
  }
}