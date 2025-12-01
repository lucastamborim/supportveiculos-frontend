import api from "./api";

export const listPhotos = async (adId) => {
  const res = await api.get(`/anuncios/${adId}/listar_fotos/`);
  return res.data;
};

export const addPhoto = async (adId, file, ordem = 1) => {
  const formData = new FormData();
  formData.append("imagem", file);
  formData.append("ordem", ordem);

  const res = await api.post(`/anuncios/${adId}/adicionar_foto/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const deletePhoto = async (adId, photoId) => {
  const res = await api.delete(`/anuncios/${adId}/deletar-foto/${photoId}/`);
  return res.data;
};

export default {
  listPhotos,
  addPhoto,
  deletePhoto,
};
