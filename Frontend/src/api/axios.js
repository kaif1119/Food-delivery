import axios from 'axios';

let store;

export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: '/api', // Matches Vite proxy path to route to http://localhost:3000/api
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple concurrent token refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error status is 401 (Unauthorized) and the request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Avoid refreshing token for auth routes: login, register, logout, or the refresh-token endpoint itself
      const excludeUrls = ['/auth/login', '/auth/register', '/auth/logout', '/auth/refresh-token'];
      if (excludeUrls.includes(originalRequest.url)) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        // Request a new access token using the refresh token
        await api.get('/auth/refresh-token');

        isRefreshing = false;
        processQueue(null);

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);

        // If refresh fails, user session is invalid; force logout Redux state
        if (store) {
          store.dispatch({ type: 'auth/forceLogout' });
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
