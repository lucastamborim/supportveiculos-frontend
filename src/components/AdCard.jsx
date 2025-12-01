import { Link } from "react-router-dom";
import "./AdCard.css";

export default function AdCard({ ad }) {
  return (
    <div className="ad-card">
      <Link to={`/anuncio/${ad.id}`} className="ad-link">
        <div className="ad-photo-container">
          {ad.fotos && ad.fotos.length > 0 ? (
            <img
              src={ad.fotos[0].imagem}
              alt={ad.titulo || `${ad.marca} ${ad.modelo}`}
              className="ad-photo"
            />
          ) : (
            <div className="ad-no-photo">Sem foto</div>
          )}
        </div>

        <div className="ad-info">
          <h2 className="ad-title">{ad.titulo || `${ad.marca} ${ad.modelo}`}</h2>
          <p className="ad-price">R$ {Number(ad.preco).toLocaleString()}</p>

          <div className="ad-details">
            <p><strong>Ano:</strong> {ad.ano} | <strong>KM:</strong> {ad.km}</p>
            <p><strong>Marca:</strong> {ad.marca} | <strong>Modelo:</strong> {ad.modelo}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
