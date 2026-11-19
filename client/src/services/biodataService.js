
import api from './api'

export const getBiodata = async () => {
  const response = await api.get('/biodata')
  return response.data
}

export const createBiodata = async (data) => {
  const response = await api.post('/biodata', data)
  return response.data
}

export const updateBiodata = async (data) => {
  const response = await api.put('/biodata', data)
  return response.data
}

export const deleteBiodata = async () => {
  const response = await api.delete('/biodata')
  return response.data
}
