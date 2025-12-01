import { useEffect, useState } from "react";
import AdCard from "../AdCard/AdCard";
import Loading from "../Loading/Loading";
import './AdList.css';

export default function AdList({ fetchAds }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAds = async () => {
      setLoading(true);
      const data = await fetchAds();
      setAds(data);
      setLoading(false);
    };

    loadAds();
  }, [fetchAds]);

  if (loading) return <Loading />;

  if (!ads.length)
    return <p className="no-ads-message">Nenhum anúncio encontrado.</p>;

  return (
    <div className="adlist-container">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}
