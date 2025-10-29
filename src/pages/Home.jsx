import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import { Tv, BookmarkPlus, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [topLoading, setTopLoading] = useState(true);
  const [trendingPage, setTrendingPage] = useState(1);
  const [topPage, setTopPage] = useState(1);

  useEffect(() => {
    fetchTrendingAnime();
  }, [trendingPage]);

  useEffect(() => {
    fetchTopAnime();
  }, [topPage]);

  const fetchTrendingAnime = async () => {
    setTrendingLoading(true);
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=airing&page=${trendingPage}&limit=12`);
      const data = await response.json();
      setTrendingAnime(data.data || []);
    } catch (error) {
      console.error('Error fetching trending anime:', error);
    } finally {
      setTrendingLoading(false);
    }
  };

  const fetchTopAnime = async () => {
    setTopLoading(true);
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${topPage}&limit=12`);
      const data = await response.json();
      setTopAnime(data.data || []);
    } catch (error) {
      console.error('Error fetching top anime:', error);
    } finally {
      setTopLoading(false);
    }
  };

  const features = [
    {
      icon: <Tv className="w-12 h-12 text-purple-400" />,
      title: 'Live Anime Data',
      description: 'Real-time trending shows from Jikan API.'
    },
    {
      icon: <BookmarkPlus className="w-12 h-12 text-pink-400" />,
      title: 'Personal Watchlist',
      description: 'Track your favorites with Firebase.'
    },
    {
      icon: <Smartphone className="w-12 h-12 text-blue-400" />,
      title: 'Responsive Design',
      description: 'Seamless experience on any device.'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&q=80" 
            alt="Anime background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Discover & Track Anime
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
            Your personal anime companion. Browse trending shows, manage your watchlist, and never miss an episode.
          </p>
          <Link to="/search" className="inline-block group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/50">
            Start Exploring
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-white/50 rotate-90" />
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-800/50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why AllAnime?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900/80 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Trending Now
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setTrendingPage(p => Math.max(1, p - 1))} disabled={trendingPage === 1} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setTrendingPage(p => p + 1)} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          {trendingLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {trendingAnime.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              All Time Favorites
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setTopPage(p => Math.max(1, p - 1))} disabled={topPage === 1} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setTopPage(p => p + 1)} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          {topLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {topAnime.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}