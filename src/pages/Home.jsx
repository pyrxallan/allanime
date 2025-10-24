import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import { Tv, BookmarkPlus, Smartphone } from 'lucide-react';

export default function Home() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = async () => {
    try {
      const [trendingRes, topRes] = await Promise.all([
        fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=6'),
        fetch('https://api.jikan.moe/v4/top/anime?limit=6')
      ]);

      const trendingData = await trendingRes.json();
      const topData = await topRes.json();

      setTrendingAnime(trendingData.data || []);
      setTopAnime(topData.data || []);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Tv className="w-12 h-12 text-purple-400" />,
      title: 'Live Anime Data',
      description: 'Get real-time info on trending and top anime from Jikan API.'
    },
    {
      icon: <BookmarkPlus className="w-12 h-12 text-pink-400" />,
      title: 'Personal Watchlist',
      description: 'Save and track your favorite shows securely with Firebase.'
    },
    {
      icon: <Smartphone className="w-12 h-12 text-blue-400" />,
      title: 'Responsive Design',
      description: 'Enjoy a seamless experience on any device.'
    }
  ];

  return (
    <div className="min-h-screen">
      
    </div>
  );
}