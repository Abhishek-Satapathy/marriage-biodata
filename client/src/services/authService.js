import api from './api'

export const loginOwner = async (password) => {
  const response = await api.post('/auth/login', { password })
  return response.data
}
