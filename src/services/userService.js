import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const USERS_ENDPOINT = `${API_BASE}/users`;

// Each function returns a promise and lets callers handle errors.
export const getUsers = () => {
  return axios.get(USERS_ENDPOINT).then(res => res.data);
};

export const createUser = user => {
  return axios.post(USERS_ENDPOINT, user).then(res => res.data);
};

export const updateUser = (id, updates) => {
  return axios.put(`${USERS_ENDPOINT}/${id}`, updates).then(res => res.data);
};

export const deleteUser = id => {
  return axios.delete(`${USERS_ENDPOINT}/${id}`).then(res => res.data);
};
