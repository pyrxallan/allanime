import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-pink-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Track Your Favorite Anime in One Place
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Discover trending, top-rated, and upcoming anime – personalized for you.
          </p>
          <Link
            to="/search"
            className="inline-block group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/50"
          >
            Get Started
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why Choose AllAnime?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-900/80 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Anime Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Trending Now
          </h2>
          {loading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingAnime.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}
        </div>
      </section>

      
    </div>
  );
}