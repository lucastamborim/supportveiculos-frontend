import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import adService from "../../services/adService";
import AdCard from "../../components/AdCard/AdCard";
import Loading from "../../components/Loading/Loading";
import './MyAds.css';

export default function MyAds() {
  const { user } = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyAds = async () => {
      try {
        const data = await adService.listAds();
        const myAds = data.filter((ad) => ad.owner === user.username);
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
