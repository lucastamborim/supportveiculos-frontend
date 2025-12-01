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
  if (!payload.titulo || !payload.preco) {
    throw new Error("Título e preço são obrigatórios");
  }
  const res = await api.post("/anuncios/", payload);
  return res.data;
};

export const updateAd = async (id, payload) => {
  if (!id) {
    throw new Error("ID do anúncio é obrigatório");
  }
  if (!payload.titulo || !payload.preco) {
    throw new Error("Título e preço são obrigatórios");
  }
  const res = await api.patch(`/anuncios/${id}/`, payload);
  return res.data;
};

export const deleteAd = async (id) => {
  const res = await api.delete(`/anuncios/${id}/`);
  return res.data;
};

export const getMyAds = async (username) => {
  if (!username) {
    throw new Error("Username é obrigatório para buscar meus anúncios");
  }
  const res = await api.get("/anuncios/");
  return res.data.filter((ad) => ad.owner === username);
};

export default {
  listAds,
  getAd,
  createAd,
  updateAd,
  deleteAd,
  getMyAds,
};
