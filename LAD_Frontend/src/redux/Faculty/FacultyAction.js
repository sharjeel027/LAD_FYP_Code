import axios from 'axios';
import {
    FACULTY_LOGIN_LODING,
    FACULTY_LOGIN_SUCCESS,
    FACULTY_LOGIN_FAILER,
    CONFIRM_REGISTRATION_REQ,
    CONFIRM_REGISTRATION_SUCCESS,
    CONFIRM_REGISTRATION_FAIL,
    UPDATE_PROFILE_REQ,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    GET_FACULTY_PROFILE_REQ,
    GET_FACULTY_PROFILE_SUCCESS,
    GET_FACULTY_PROFILE_FAIL,
    GET_STUDENT_REQ,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FAIL
} from './FacultyType';


export const facultyLogin = () => {
    return (dispatch) => {
      dispatch(facultyLoginRequest())
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          // response.data is the users
          const admin = response.data
          dispatch(facultyLoginSuccess(admin))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(facultyLoginFailure(error.message))
        })
    }
  }
  
  export const facultyLoginRequest = () => {
    return {
      type: FACULTY_LOGIN_LODING
    }
  }
  
  export const facultyLoginSuccess = users => {
    return {
      type: FACULTY_LOGIN_SUCCESS,
      payload: users
    }
  }
  
  export const facultyLoginFailure = error => {
    return {
      type: FACULTY_LOGIN_FAILER,
      payload: error
    }
  }


export const confrimRegistration = token => {
    return (dispatch) => {
      dispatch(confrimRegistrationRequest())
      axios
        .post('/api/faculty/confirmRegistrtion',{token:token})
        .then(response => {
          // response.data is the users
          const faculty = response.data
          dispatch(confrimRegistrationSuccess(faculty))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(confrimRegistrationFailure(error))
        })
    }
  }
  
  export const confrimRegistrationRequest = () => {
    return {
      type: CONFIRM_REGISTRATION_REQ
    }
  }
  
  export const confrimRegistrationSuccess = users => {
    return {
      type: CONFIRM_REGISTRATION_SUCCESS,
      payload: users
    }
  }
  
  export const confrimRegistrationFailure = error => {
    return {
      type: CONFIRM_REGISTRATION_FAIL,
      payload: error
    }
  }



  export const updateProfile = data => {

    let formData= new FormData();
 
    formData.append('fname',data.fname);
    formData.append('lname',data.lname);
    formData.append('phoneNumber',data.phoneNumber);
    formData.append('password',data.password);
    formData.append('areaofinterest',data.areaofinterest);
    formData.append('hecAppro',data.hecAppro);
    formData.append('url',data.url);
    formData.append('profilePicture',data.file);
    formData.append('email',data.email);
    formData.append('id',data.id);

    console.log(formData);

    return (dispatch) => {
      dispatch(updateProfileRequest())
      axios({
        url:'/api/faculty/updateProfile',
        method:'POST',
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      })
      .then(response => {
          // response.data is the users
          const data = response.data
          dispatch(updateProfileSuccess(data))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(updateProfileFailure(error))
        })
    }
  }
  
  export const updateProfileRequest = () => {
    return {
      type: UPDATE_PROFILE_REQ
    }
  }
  
  export const updateProfileSuccess = data => {
    return {
      type: UPDATE_PROFILE_SUCCESS,
      payload: data
    }
  }
  
  export const updateProfileFailure = error => {
    return {
      type: UPDATE_PROFILE_FAIL,
      payload: error
    }
  }

  export const getpProfile = id => {
    return (dispatch) => {
      dispatch(getpProfileRequest())
      axios
        .post('/api/faculty/getProfile',{id:id})
        .then(response => {
          // response.data is the users
          const faculty = response.data
          dispatch(getpProfileSuccess(faculty))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(getpProfileFailure(error.message))
        })
    }
  }
  
  export const getpProfileRequest = () => {
    return {
      type: GET_FACULTY_PROFILE_REQ
    }
  }
  
  export const getpProfileSuccess = users => {
    return {
      type: GET_FACULTY_PROFILE_SUCCESS,
      payload: users
    }
  }
  
  export const getpProfileFailure = error => {
    return {
      type: GET_FACULTY_PROFILE_FAIL,
      payload: error
    }
  }


  export const getStudent = id => {
    return (dispatch) => {
      dispatch(getStudentRequest())
      axios
        .post('/api/faculty/getStudents',{id:id})
        .then(response => {
          // response.data is the users
          const synopsis = response.data
          dispatch(getStudentSuccess(synopsis))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(getStudentFailure(error.message))
        })
    }
  }
  
  export const getStudentRequest = () => {
    return {
      type: GET_STUDENT_REQ
    }
  }
  
  export const getStudentSuccess = synopsis => {
    return {
      type: GET_STUDENT_SUCCESS,
      payload: synopsis
    }
  }
  
  export const getStudentFailure = error => {
    return {
      type: GET_STUDENT_FAIL,
      payload: error
    }
  }