import {createSlice} from '@reduxjs/toolkit';
import {Buffer} from 'buffer';
import axios from 'axios';

export const tokenSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    id: -1,
    email: '',
    role: '',
    name: '',
  },
  reducers: {
    init: (state) => {
      const jwt = window.localStorage.getItem('jwt');
      if (jwt) {
        const parsedJwt = JSON.parse(
            Buffer.from(jwt.split('.')[1], 'base64').toString().trim(),
        );
        state.email = parsedJwt.email;
        state.role = parsedJwt.role;
        state.id = parseInt(parsedJwt.id, 10);
        state.isLoggedIn = true;
      }

      if (jwt) {
        axios.interceptors.request.use(function(config) {
          config.headers = {
            ...config.headers,
            'Authorization': 'Bearer ' + jwt,
          };
          return config;
        }, function(error) {
          return Promise.reject(error);
        });
      }

      axios.interceptors.response.use(function(res) {
        return res;
      }, function(error) {
        return error.response;
      });
    },
    logout: (state) => {
      window.localStorage.removeItem('jwt');
      state.email = '';
      state.role = '';
      state.name = '';
      state.id = -1;
      state.isLoggedIn = false;
    },
    storeToken: (state, action) => {
      const jwt = action.payload.jwt;
      if (jwt) {
        window.localStorage.setItem('jwt', jwt);
      }
    },
  },
});

export const {init, logout, storeToken} = tokenSlice.actions;

export default tokenSlice.reducer;
