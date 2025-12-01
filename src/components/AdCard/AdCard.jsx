import { Link } from "react-router-dom";
import { getMediaUrl } from "@utils/media"; // usa alias @utils
import "./AdCard.css";

export default function AdCard({ ad }) {
    // 🚨 CORREÇÃO APLICADA: Usando ad.foto_principal (o campo correto da API de listagem)
    const mainPhoto = ad.foto_principal;

    return (
        <div className="ad-card">
            <Link to={`/anuncio/${ad.id}`} className="ad-link">
                <div className="ad-photo-container">
                    {mainPhoto ? (
                        <img
                            src={getMediaUrl(mainPhoto)}
                            alt={ad.titulo || `${ad.marca} ${ad.modelo}`}
                            className="ad-photo"
                            onError={(e) => {
                                e.target.onerror = null;
                                // 🚨 REMOVA QUALQUER CARACTERE OU NÚMERO EXTRANHO NESTA LINHA:
                                e.target.src = "/placeholder.png"; // ESTA DEVE SER A ÚNICA INSTRUÇÃO VÁLIDA
                            }}
                        />
                    ) : (
                        <div className="ad-no-photo">Sem foto</div>
                    )}
                </div>

                <div className="ad-info">
                    <h2 className="ad-title">{ad.titulo || `${ad.marca} ${ad.modelo}`}</h2>
                    <p className="ad-price">
                        R$ {Number(ad.preco).toLocaleString("pt-BR")}
                    </p>

                    <div className="ad-details">
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
