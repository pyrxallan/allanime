import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import AnimeCard from '../components/AnimeCard';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MyList() {
  const { currentUser } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchWatchlist();
  }, [currentUser, navigate]);

  const fetchWatchlist = async () => {
    try {
      const watchlistRef = collection(db, 'users', currentUser.uid, 'watchlist');
      const q = query(watchlistRef, orderBy('addedAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const animeList = [];
      querySnapshot.forEach((doc) => {
        animeList.push({ ...doc.data(), id: doc.id });
      });

      setWatchlist(animeList);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(watchlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnime = watchlist.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          My Watchlist
        </h1>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading your watchlist...</div>
        ) : watchlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-6">Your watchlist is empty</p>
            <button onClick={() => navigate('/search')} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity">
              Browse Anime
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-400">{watchlist.length} anime in watchlist</p>
              {totalPages > 1 && (
                <div className="flex gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 bg-gray-800 rounded-full">{currentPage} / {totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {currentAnime.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={{
                  mal_id: anime.mal_id,
                  title: anime.title,
                  images: { jpg: { large_image_url: anime.image } },
                  score: anime.score
                }} isInWatchlist={true} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}