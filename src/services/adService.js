import api from "./api";

export const listAds = async () => {
  const res = await api.get("/anuncios/");
  return res.data;
};

export const getAd = async (id) => {
  const res = await api.get(`/anuncios/${id}/`);
  return res.data;
};

export const createAd = async (payload) => {
  const res = await api.post("/anuncios/", payload);
  return res.data;
};

export const updateAd = async (id, payload) => {
  const res = await api.patch(`/anuncios/${id}/`, payload);
  return res.data;
};

export const deleteAd = async (id) => {
  const res = await api.delete(`/anuncios/${id}/`);
  return res.data;
};

export default {
  listAds,
  getAd,
  createAd,
  updateAd,
  deleteAd,
};
