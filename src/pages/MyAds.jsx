import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import AdCard from "../components/AdCard";
import Loading from "../components/Loading";
import './MyAds.css';

export default function MyAds() {
  const { user } = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyAds = async () => {
      try {
        const res = await api.get("/anuncios/");
        const myAds = res.data.filter((ad) => ad.owner === user.username);
        setAds(myAds);
      } catch (err) {
        console.error("Erro ao carregar MEUS anúncios:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMyAds();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="myads-container">
      {ads.length > 0 ? (
        ads.map((ad) => <AdCard key={ad.id} ad={ad} />)
      ) : (
        <p className="no-ads-message">
          Você ainda não possui anúncios.
        </p>
      )}
    </div>
  );
}
