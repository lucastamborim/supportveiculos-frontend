import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adService from "../../services/adService";
import photoService from "../../services/photoService";
import Loading from "../../components/Loading/Loading";
import { getMediaUrl } from "../../utils/media";
import './CreateEdit.css';

export default function CreateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    preco: "",
    marca: "",
    modelo: "",
    ano: "",
    km: "",
    telefone_contato: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const loadAd = async () => {
        try {
          const data = await adService.getAd(id);
          console.log("Dados carregados:", data);
          setForm({
            preco: data.preco || "",
            marca: data.marca || "",
            modelo: data.modelo || "",
            ano: data.ano || "",
            km: data.km || "",
            telefone_contato: data.telefone_contato || "",
          });
          
          // Carregar fotos do anúncio
          const photosRes = await photoService.listPhotos(id);
          setPhotos(photosRes);
        } catch (err) {
          console.error(err);
          setError("Erro ao carregar anúncio.");
        } finally {
          setLoading(false);
        }
      };
      loadAd();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      alert("Selecione uma foto para enviar.");
      return;
    }

    try {
      setUploading(true);
      await photoService.addPhoto(id, file);
      setFile(null);
      
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

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm("Deseja realmente excluir esta foto?")) return;
    
    try {
      await photoService.deletePhoto(id, photoId);
      setPhotos(photos.filter((p) => p.id !== photoId));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar foto.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
      try {
        if (isEdit) {
          await adService.updateAd(id, form);
        } else {
          const res = await adService.createAd(form);
          navigate(`/detail/${res.id}`);
          return;
        }
        navigate(`/detail/${id}`);
      } catch (err) {
        console.error(err);
        setError("Erro ao salvar anúncio. Verifique os dados.");
      }
  };

  if (loading) return <Loading />;

  return (
    <div className="form-container">
      <h1>{isEdit ? "Editar Anúncio" : "Criar Novo Anúncio"}</h1>

      <form className="form-fields" onSubmit={handleSubmit}>
        {[
          "preco",
          "marca",
          "modelo",
          "ano",
          "km",
          "telefone_contato",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={
              field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
            }
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">
          {isEdit ? "Salvar Alterações" : "Criar Anúncio"}
        </button>
      </form>

      {/* Seção de fotos (apenas ao editar) */}
      {isEdit && (
        <div className="photos-section">
          <h2>Fotos do Anúncio</h2>

          {/* Lista de fotos existentes */}
          {photos.length > 0 && (
            <div className="existing-photos">
              <h3>Fotos Atuais</h3>
              <div className="photos-grid">
                {photos.map((photo) => (
                  <div key={photo.id} className="photo-item">
                    <img
                      src={getMediaUrl(photo.imagem)}
                      alt="Foto do anúncio"
                      className="photo-thumbnail"
                    />
                    <button
                      type="button"
                      className="btn-delete-small"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      Deletar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload de nova foto */}
          <div className="upload-section">
            <h3>Adicionar Nova Foto</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <button
              type="button"
              className="btn-upload"
              onClick={handleUploadPhoto}
              disabled={uploading || !file}
            >
              {uploading ? "Enviando..." : "Enviar Foto"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
