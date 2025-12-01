import { useEffect, useState } from "react";
import adService from "../../services/adService";
import AdCard from "../../components/AdCard/AdCard";
import Loading from "../../components/Loading/Loading";
import './Home.css';

export default function Home() {
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        const loadAds = async () => {
            try {
                const data = await adService.listAds();
                setAds(data);
            } catch (err) {
                console.error("Erro ao carregar anúncios:", err);
            } finally {
                setLoading(false);
            }
        };
        loadAds();
    }, []);

    useEffect(() => {
        let filtered = ads;

        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(ad => 
                ad.marca.toLowerCase().includes(searchLower) ||
                ad.modelo.toLowerCase().includes(searchLower)
            );
        }

        if (priceMin) {
            filtered = filtered.filter(ad => ad.preco >= parseFloat(priceMin));
        }

        if (priceMax) {
            filtered = filtered.filter(ad => ad.preco <= parseFloat(priceMax));
        }

        if (year) {
            filtered = filtered.filter(ad => ad.ano === parseInt(year));
        }

        setFilteredAds(filtered);
    }, [ads, search, priceMin, priceMax, year]);

    const handleClearFilters = () => {
        setSearch("");
        setPriceMin("");
        setPriceMax("");
        setYear("");
    };

    if (loading) return <Loading />;

    return (
        <div className="home-wrapper">
            {/* Barra de busca no topo */}
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Buscar por marca ou modelo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-bar-input"
                />
                <button 
                    className="btn-filter-main"
                    onClick={() => setShowFilters(!showFilters)}
                    title="Abrir filtros avançados"
                >
                    ≡
                </button>
            </div>

            {/* Modal de Filtros Avançados */}
            {showFilters && (
                <>
                    <div className="filter-overlay" onClick={() => setShowFilters(false)}></div>
                    <div className="search-filters-modal">
                        <div className="modal-header">
                            <h2>Filtros Avançados</h2>
                            <button 
                                className="btn-close-modal"
                                onClick={() => setShowFilters(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="modal-content">
                            <div className="filter-group">
                                <label>Preço Mínimo (R$)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={priceMin}
                                    onChange={(e) => setPriceMin(e.target.value)}
                                    className="filter-input"
                                />
                            </div>

                            <div className="filter-group">
                                <label>Preço Máximo (R$)</label>
                                <input
                                    type="number"
                                    placeholder="999999"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(e.target.value)}
                                    className="filter-input"
                                />
                            </div>

                            <div className="filter-group">
                                <label>Ano</label>
                                <input
                                    type="number"
                                    placeholder="Ano"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="filter-input"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            {(search || priceMin || priceMax || year) && (
                                <button className="btn-clear-filters" onClick={handleClearFilters}>
                                    Limpar Filtros
                                </button>
                            )}
                            <button 
                                className="btn-close-filter"
                                onClick={() => setShowFilters(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </>
            )}

            <div className="home-container">
                {filteredAds.length > 0 ? (
                    filteredAds.map((ad) => <AdCard key={ad.id} ad={ad} />)
                ) : (
                    <p className="no-ads-message">
                        {ads.length > 0 ? "Nenhum anúncio encontrado com os filtros aplicados." : "Nenhum anúncio disponível."}
                    </p>
                )}
            </div>
        </div>
    );
}
