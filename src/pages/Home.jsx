import { useEffect, useState } from "react";
import api from "../services/api";
import AdCard from "../components/AdCard";
import Loading from "../components/Loading";
import './Home.css';

export default function Home() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const res = await api.get("/anuncios/");
        setAds(res.data);
      } catch (err) {
        console.error("Erro ao carregar anúncios:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAds();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="home-container">
      {ads.length > 0 ? (
        ads.map((ad) => <AdCard key={ad.id} ad={ad} />)
      ) : (
        <p className="no-ads-message">
          Nenhum anúncio disponível.
        </p>
      )}
    </div>
  );
}
