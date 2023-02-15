import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500';

export const signUpAPI = async body => {
  const { data } = await axios({
    url: `${API_URL}/v1/sign-up`,
    method: 'post',
    data: body
  });

  return data;
} 

export const signInAPI = async body => {
  const { data } = await axios({
    url: `${API_URL}/v1/sign-in`,
    method: 'post',
    data: body
  });

  return data;
} 

export const signOutAPI = async () => {
  const refreshToken = localStorage
  const { data } = await axios({
    url: `${API_URL}/v1/sign-out`,
    method: 'delete',
    data: { refreshToken: window.localStorage.getItem('refreshToken') }
  });

  return data;
} 

export const refreshTokenAPI = async () => {
  const { data } = await axios({
    url: `${API_URL}/v1/refresh-token`,
    method: 'post',
    data: { refreshToken: window.localStorage.getItem('refreshToken') }
  });

  return data;
} 

export const sendMessageAPI = async body => {
  const { data } = await axios({
    url: `${API_URL}/v1/message/send`,
    method: 'post',
    data: body, 
    headers: { 
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}` 
    }
  });

  return data;
} 

export const getMessagesAPI = async () => {
  const { data } = await axios({
    url: `${API_URL}/v1/message/read`,
    method: 'get',
    headers: { 
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}` 
    }
  });

  return data;
} 