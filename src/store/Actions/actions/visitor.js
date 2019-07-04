import {
  VISITOR_LOGOUT_REQUEST,
  VISITOR_LOGOUT_SUCCESS,
  VISITOR_LOGOUT_FAILURE,
  UPDATE_PHONE,
  UPDATE_STATEID,
  UPDATE_COUNTRYID,
  UPDATE_EMAIL,
  UPDATE_NATIONALITYID,
  UPDATE_PASSWORD,
  UPDATE_PREFIX,
  UPDATE_NAME,
  VISITOR_REGISTRATION_SUCCESS,
  VISITOR_REGISTRATION_FAILURE,
  VISITOR_REGISTRATION_REQUEST,
  VISITOR_LOGIN_REQUEST,
  VISITOR_LOGIN_SUCCESS,
  VISITOR_LOGIN_FAILURE,
  UPDATE_VISITOR_REQUESTINFO,
  UPDATE_VISITOR_SUCCESSINFO,
  UPDATE_VISITOR_FAILUREINFO,
} from '../actionTypes/visitorTypes';

export const visitorRegistration = visitorData => ({
  type: VISITOR_REGISTRATION_REQUEST,
  visitorData,
});
export const visitorLogoutRequest = userData => ({
  type: VISITOR_LOGOUT_REQUEST,
  userData,
});
export const visitorLogoutSuccess = data => ({
  type: VISITOR_LOGOUT_SUCCESS,
  data,
});
export const visitorLogoutFailure = fail => ({
  type: VISITOR_LOGOUT_FAILURE,
  fail,
});
export const visitorLogin = visitorData => ({
  type: VISITOR_LOGIN_REQUEST,
  visitorData,
});
export const updatePhone = phone => ({
  type: UPDATE_PHONE,
  phone,
});

export const updateName = name => ({
  type: UPDATE_NAME,
  name,
});
export const updateEmail = email => ({
  type: UPDATE_EMAIL,
  email,
});
export const updatePassword = password => ({
  type: UPDATE_PASSWORD,
  password,
});
export const updatePrefix = prefix => ({
  type: UPDATE_PREFIX,
  prefix,
});
export const updateCountry = countryID => ({
  type: UPDATE_COUNTRYID,
  countryID,
});
export const updateState = stateID => ({
  type: UPDATE_STATEID,
  stateID,
});
export const updateNationality = nationalityID => ({
  type: UPDATE_NATIONALITYID,
  nationalityID,
});
export const visitorSuccessLogin = data => ({
  type: VISITOR_LOGIN_SUCCESS,
  data,
});
export const visitorFailLogin = data => ({
  type: VISITOR_LOGIN_FAILURE,
  data,
});
export const updateInfo = updateData => ({
  type: UPDATE_VISITOR_REQUESTINFO,
  updateData,
});
export const updateInfoSuccess = data => ({
  type: UPDATE_VISITOR_SUCCESSINFO,
  data,
});
export const RegisterVisitorRequest = visitorData => ({
  type: VISITOR_REGISTRATION_REQUEST,
  visitorData,
});
export const RegisterVisitorSuccess = data => ({
  type: VISITOR_REGISTRATION_SUCCESS,
  data,
});
export const RegisterVisitorFail = error => ({
  type: VISITOR_REGISTRATION_FAILURE,
  error,
});
