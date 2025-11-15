const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  GET_USER: `${API_BASE_URL}/auth/getuser`,

  // Notes
  GET_NOTES: `${API_BASE_URL}/notes`,
  CREATE_NOTE: `${API_BASE_URL}/notes/addnote`,
  UPDATE_NOTE: `${API_BASE_URL}/notes/updatenote`,
  DELETE_NOTE: `${API_BASE_URL}/notes/deletenote`,
};

export default API_ENDPOINTS;