import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import './CreateEdit.css';

export default function CreateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    titulo: "",
    preco: "",
    marca: "",
    modelo: "",
    ano: "",
    km: "",
    telefone_contato: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const loadAd = async () => {
        try {
          const res = await api.get(`/anuncios/${id}/`);
          setForm(res.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEdit) {
        await api.patch(`/anuncios/${id}/`, form);
      } else {
        const res = await api.post("/anuncios/", form);
        navigate(`/detail/${res.data.id}`);
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
          "titulo",
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
    </div>
  );
}
