import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import AnimeCard from '../components/AnimeCard';
import { useNavigate } from 'react-router-dom';

export default function MyList() {
  const { currentUser } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="container mx-auto max-w-6xl">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {watchlist.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={{
                mal_id: anime.mal_id,
                title: anime.title,
                images: { jpg: { large_image_url: anime.image } },
                score: anime.score
              }} isInWatchlist={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}