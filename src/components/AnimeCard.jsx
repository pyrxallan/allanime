import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function AnimeCard({ anime, isInWatchlist = false }) {
  const { currentUser } = useAuth();
  const [added, setAdded] = useState(isInWatchlist);
  const [loading, setLoading] = useState(false);

  const handleWatchlist = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please login to add to watchlist');
      return;
    }

    setLoading(true);
    try {
      const watchlistRef = doc(db, 'users', currentUser.uid, 'watchlist', anime.mal_id.toString());

      if (added) {
        await deleteDoc(watchlistRef);
        setAdded(false);
      } else {
        await setDoc(watchlistRef, {
          mal_id: anime.mal_id,
          title: anime.title,
          image: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
          score: anime.score,
          addedAt: new Date()
        });
        setAdded(true);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
      alert('Failed to update watchlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/anime/${anime.mal_id}`} className="group relative bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30">
      <div className="aspect-[3/4] overflow-hidden">
        <img src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url} alt={anime.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold mb-3 line-clamp-2">{anime.title}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-300">Score: {anime.score || 'N/A'}</span>
        </div>
        <button onClick={handleWatchlist} disabled={loading} className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
          {added ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
          {added ? 'In Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{anime.title}</h3>
        <p className="text-sm text-gray-400 mt-1">Score: {anime.score || 'N/A'}</p>
      </div>
    </Link>
  );
}