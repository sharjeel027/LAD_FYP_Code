import { combineReducers } from 'redux'
import adminLogin from './Admin/AdminReducer';
import facultyLogin from './Faculty/FacultyReducer';
import getstudent from './Admin/GetStudentReducer';
import facultyRegistration from './Admin/facultyRegisterReducer';
import getdept from './Admin/GetDeptReducer';
import confirmRegistration from './Faculty/ConfirmRegReducer';
import updateProfile from './Faculty/updateProfileReducer';
import profile from './Faculty/GetProfileReducer';
import student from './Faculty/getStudentReducer';
import getsynopsis from './Admin/GetSynosisReducer';
import getFaculty from './Admin/GetFacultyReducer';
import SynopsisPresentaion from './Admin/SynopsisPresentationReducer';

const rootReducer = combineReducers({
    admin:adminLogin,
    faculty:facultyLogin,
    student:getstudent,
    adminsynosis:getsynopsis,
    adminfaculty:getFaculty,
    facultyreg:facultyRegistration,
    depart:getdept,
    registFaculty:confirmRegistration,
    facultyProfileUpdate:updateProfile,
    fprofile:profile,
    fstudent:student,
    presentation:SynopsisPresentaion
})

export default rootReducer