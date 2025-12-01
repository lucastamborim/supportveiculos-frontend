import { Link } from "react-router-dom";
import './AdCard.css';

export default function AdCard({ ad }) {
  return (
    <div className="ad-card">
      <Link to={`/anuncios/${ad.id}`} className="ad-card-link">
        <div className="ad-card-image-wrapper">
          {ad.fotos && ad.fotos.length > 0 ? (
            <img
              src={ad.fotos[0].imagem}
              alt={ad.titulo || `${ad.marca} ${ad.modelo}`}
              className="ad-card-image"
            />
          ) : (
            <span className="ad-card-no-photo">Sem foto</span>
          )}
        </div>

        <div className="ad-card-content">
          <h2 className="ad-card-title">
            {ad.titulo || `${ad.marca} ${ad.modelo}`}
          </h2>
          <p className="ad-card-price">
            R$ {Number(ad.preco).toLocaleString()}
          </p>

          <div className="ad-card-details">
            <p>
              <strong>Ano:</strong> {ad.ano} | <strong>KM:</strong> {ad.km}
            </p>
            <p>
              <strong>Marca:</strong> {ad.marca} | <strong>Modelo:</strong> {ad.modelo}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
