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
    <div className="group relative bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30">
      <Link to={`/anime/${anime.mal_id}`}>
        <div className="aspect-[2/3] overflow-hidden relative">
          <img src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url} alt={anime.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/anime/${anime.mal_id}`}>
          <h3 className="text-sm font-semibold line-clamp-1 mb-1 hover:text-purple-400 transition-colors">{anime.title}</h3>
        </Link>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span>⭐ {anime.score || 'N/A'}</span>
          {anime.episodes && <span>{anime.episodes} eps</span>}
        </div>
        <button onClick={handleWatchlist} disabled={loading} className="w-full px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 text-xs font-semibold disabled:opacity-50">
          {added ? <BookmarkCheck className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
          {added ? 'Saved' : 'Add'}
        </button>
      </div>
    </div>
  );
}