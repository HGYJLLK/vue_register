// src/api/auth.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// export const auth = {
//   register: (data) => api.post('/register', data),
//   login: (data) => api.post('/login', data),
//   //getSecurityQuestion: (username) => api.get(`/security-question/${username}`),
//   verifySecurityQuestion: (data) => api.post('/verify-security', data),
//   resetPassword: (data) => api.post('/reset-password', data)
// }

export const auth = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  verifySecurityQuestion: (data) => api.post('/verify-security', {
    username: data.username,
    security_answer: data.security_answer || '' // 添加默认空值
  }),
  resetPassword: (data) => api.post('/reset-password', data)
}

export default api