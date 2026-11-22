import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

api.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem('ownerToken')
  if (token) config.headers.Authorization = 'Bearer ' + token
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.sessionStorage.getItem('ownerToken') &&
      !error.config?.url?.includes('/auth/login')
    ) {
      window.sessionStorage.removeItem('ownerToken')
      if (!window.location.pathname.startsWith('/share/')) {
        window.location.assign('/')
      }
    }
    return Promise.reject(error)
  }
)

export default api
