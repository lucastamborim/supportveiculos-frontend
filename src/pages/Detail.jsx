import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      const res = await api.get(`/api/anuncios/${id}/`);
      setAd(res.data);
    } catch (err) {
      console.error("Erro ao carregar anúncio:", err);
    }
  };

  const fetchPhotos = async () => {
    try {
      const res = await api.get(`/api/anuncios/${id}/listar_fotos/`);
      setPhotos(res.data);
    } catch (err) {
      console.error("Erro ao carregar fotos:", err);
    }
  };

  if (loading) return <Loading />;
  if (!ad) return <p>Anúncio não encontrado.</p>;

  return (
    <div className="page-container p-4">
      <h1 className="text-2xl font-bold mb-4">{ad.titulo}</h1>

      {/* Carrossel simples */}
      {photos.length > 0 ? (
        <div className="carousel mb-4 flex overflow-x-auto space-x-2">
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.imagem}
              alt="Foto do anúncio"
              className="w-64 h-40 object-cover rounded"
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-4">
          Sem fotos
        </div>
      )}

      <p className="text-xl font-semibold text-blue-600 mb-2">
        R$ {ad.preco.toLocaleString()}
      </p>

      <div className="details-grid grid grid-cols-2 gap-2 mb-4">
        <p>
          <strong>Marca:</strong> {ad.marca}
        </p>
        <p>
          <strong>Modelo:</strong> {ad.modelo}
        </p>
        <p>
          <strong>Ano:</strong> {ad.ano}
        </p>
        <p>
          <strong>KM:</strong> {ad.km}
        </p>
      </div>

      <h3 className="font-semibold mb-1">Descrição</h3>
      <p className="mb-4">{ad.descricao}</p>

      <button
        className="btn-primary"
        onClick={() => alert(`Telefone: ${ad.telefone_contato}`)}
      >
        Mostrar telefone
      </button>

      {/* Botões do dono do anúncio */}
      {ad.is_owner && (
        <div className="mt-4 flex space-x-2">
          <button
            className="btn-secondary"
            onClick={() => navigate(`/edit/${ad.id}`)}
          >
            Editar anúncio
          </button>
          <button
            className="btn-danger"
            onClick={async () => {
              if (window.confirm("Deseja realmente excluir o anúncio?")) {
                try {
                  await api.delete(`/api/anuncios/${ad.id}/`);
                  navigate("/");
                } catch (err) {
                  console.error("Erro ao excluir:", err);
                }
              }
            }}
          >
            Excluir anúncio
          </button>
        </div>
      )}
    </div>
  );
}