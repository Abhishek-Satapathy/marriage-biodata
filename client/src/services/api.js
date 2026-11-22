import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
});

api.interceptors.request.use((config) => {
  const ownerKey = window.sessionStorage.getItem("ownerEditKey");

  if (ownerKey) {
    config.headers.Authorization = "Bearer " + ownerKey;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.sessionStorage.removeItem("ownerEditKey");
    }

    return Promise.reject(error);
  },
);

export default api;
