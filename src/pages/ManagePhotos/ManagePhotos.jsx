// src/pages/ManagePhotos/ManagePhotos.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import photoService from "../../services/photoService";
import { getMediaUrl } from "../../utils/media";
import Loading from "../../components/Loading/Loading";

export default function ManagePhotos() {
  const { id } = useParams(); // ID do anúncio
  const navigate = useNavigate();

  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [order, setOrder] = useState(1);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await photoService.listPhotos(id);
        setPhotos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [id]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("imagem", file);
    formData.append("ordem", order);

    try {
      setUploading(true);
      await photoService.addPhoto(id, file, order);
      setFile(null);
      setOrder(1);
      // Recarregar fotos
      const data = await photoService.listPhotos(id);
      setPhotos(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar foto.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId) => {
    if (!window.confirm("Deseja realmente excluir esta foto?")) return;
    try {
      await photoService.deletePhoto(id, photoId);
      setPhotos(photos.filter((p) => p.id !== photoId));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar foto.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="page-container p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Fotos do Anúncio</h1>

      <form onSubmit={handleUpload} className="flex flex-col gap-2 mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <input
          type="number"
          min="1"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="Ordem"
          className="input"
        />
        <button type="submit" className="btn-primary" disabled={uploading}>
          {uploading ? "Enviando..." : "Adicionar Foto"}
        </button>
      </form>

      <div className="photos-grid grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <img
              src={getMediaUrl(photo.imagem)}
              alt={`Foto ${photo.id}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              onClick={() => handleDelete(photo.id)}
              className="absolute top-1 right-1 bg-red-500 text-white px-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn-secondary mt-4"
        onClick={() => navigate(`/detail/${id}`)}
      >
        Voltar ao Anúncio
      </button>
    </div>
  );
}
