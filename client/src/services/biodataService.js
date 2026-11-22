import api from './api'

export const getBiodata = async () => (await api.get('/biodata')).data
export const getPublicBiodata = async () => (await api.get('/biodata/public')).data
export const getSharedBiodata = async (shareId) =>
  (await api.get('/biodata/share/' + encodeURIComponent(shareId))).data
export const createBiodata = async (data) => (await api.post('/biodata', data)).data
export const updateBiodata = async (data) => (await api.put('/biodata', data)).data
export const deleteBiodata = async () => (await api.delete('/biodata')).data
