import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [ad, setAd] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchAd();
      await fetchPhotos();
      setLoading(false);
    };
    load();
  }, [id]);

  const fetchAd = async () => {
    try {
      const res = await api.get(`/anuncios/${id}/`);
      setAd(res.data);
    } catch (err) {
      console.error("Erro ao carregar anúncio:", err);
    }
  };

  const fetchPhotos = async () => {
    try {
      const res = await api.get(`/anuncios/${id}/listar_fotos/`);
      setPhotos(res.data);
    } catch (err) {
      console.error("Erro ao carregar fotos:", err);
    }
  };

  if (loading) return <Loading />;
  if (!ad) return <p>Anúncio não encontrado.</p>;

  const isOwner = isAuthenticated && user && ad.owner === user.username;

  return (
    <div className="detail-container">
      <h1 className="detail-title">{ad.titulo}</h1>

      {/* Carrossel simples */}
      {photos.length > 0 ? (
        <div className="carousel">
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.imagem}
              alt="Foto do anúncio"
              className="carousel-img"
            />
          ))}
        </div>
      ) : (
        <div className="no-photos">Sem fotos</div>
      )}

      <p className="ad-price">R$ {ad.preco.toLocaleString()}</p>

      <div className="details-grid">
        <p><strong>Marca:</strong> {ad.marca}</p>
        <p><strong>Modelo:</strong> {ad.modelo}</p>
        <p><strong>Ano:</strong> {ad.ano}</p>
        <p><strong>KM:</strong> {ad.km}</p>
      </div>

      <button
        className="btn-primary"
        onClick={() => alert(`Telefone: ${ad.telefone_contato}`)}
      >
        Mostrar telefone
      </button>

      {/* Botões do dono do anúncio */}
      {isOwner && (
        <div className="mt-4 flex">
          <button
            className="btn-secondary"
            onClick={() => navigate(`/anuncio/${ad.id}/editar`)}
          >
            Editar anúncio
          </button>
        </div>
      )}
    </div>
  );
}
