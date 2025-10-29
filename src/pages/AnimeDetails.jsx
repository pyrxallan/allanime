import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookmarkPlus, BookmarkCheck, Star, Calendar, Tv, ArrowLeft, PlayCircle, Users, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function AnimeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnimeDetails();
    fetchEpisodes();
    fetchCharacters();
    if (currentUser) {
      checkWatchlistStatus();
    }
  }, [id, currentUser]);

  const fetchAnimeDetails = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await response.json();
      setAnime(data.data);
    } catch (error) {
      console.error('Error fetching anime details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
      const data = await response.json();
      setEpisodes(data.data || []);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
      const data = await response.json();
      setCharacters(data.data?.slice(0, 12) || []);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const checkWatchlistStatus = async () => {
    try {
      const watchlistRef = doc(db, 'users', currentUser.uid, 'watchlist', id);
      const docSnap = await getDoc(watchlistRef);
      setIsInWatchlist(docSnap.exists());
    } catch (error) {
      console.error('Error checking watchlist:', error);
    }
  };

  const handleWatchlist = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setUpdating(true);
    try {
      const watchlistRef = doc(db, 'users', currentUser.uid, 'watchlist', id);

      if (isInWatchlist) {
        await deleteDoc(watchlistRef);
        setIsInWatchlist(false);
      } else {
        await setDoc(watchlistRef, {
          mal_id: anime.mal_id,
          title: anime.title,
          image: anime.images?.jpg?.large_image_url,
          score: anime.score,
          addedAt: new Date()
        });
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
      alert('Failed to update watchlist');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-gray-400 text-xl">Loading anime details...</div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-gray-400 text-xl">Anime not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center blur-sm scale-110" style={{ backgroundImage: `url(${anime.images?.jpg?.large_image_url})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 -mt-64 relative z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0">
            <img src={anime.images?.jpg?.large_image_url} alt={anime.title} className="w-64 rounded-2xl shadow-2xl border-2 border-gray-700" />
            <button onClick={handleWatchlist} disabled={updating} className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
              {isInWatchlist ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>

          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {anime.title}
            </h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-xl text-gray-400 mb-6">{anime.title_english}</p>
            )}

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-lg font-semibold">{anime.score || 'N/A'} / 10</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Ranked #{anime.rank || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-pink-400" />
                <span>{anime.members?.toLocaleString() || 'N/A'} members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>{anime.season ? `${anime.season} ${anime.year}` : anime.year || 'Unknown'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-pink-400" />
                <span>{anime.type} • {anime.episodes || '?'} episodes</span>
              </div>
            </div>

            <div className="flex gap-4 mb-6 border-b border-gray-700">
              <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'overview' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}>
                Overview
              </button>
              <button onClick={() => setActiveTab('episodes')} className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'episodes' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}>
                Episodes ({episodes.length})
              </button>
              <button onClick={() => setActiveTab('characters')} className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'characters' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}>
                Characters
              </button>
            </div>

            {activeTab === 'overview' && (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres?.map(genre => (
                      <span key={genre.mal_id} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm hover:border-purple-500 transition-colors">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
                  <p className="text-gray-300 leading-relaxed">{anime.synopsis || 'No synopsis available.'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-800/50 p-6 rounded-xl">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Status</p>
                    <p className="font-semibold">{anime.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Aired</p>
                    <p className="font-semibold">{anime.aired?.string || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Studios</p>
                    <p className="font-semibold">{anime.studios?.map(s => s.name).join(', ') || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Source</p>
                    <p className="font-semibold">{anime.source || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Duration</p>
                    <p className="font-semibold">{anime.duration || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Rating</p>
                    <p className="font-semibold">{anime.rating || 'Unknown'}</p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'episodes' && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {episodes.length > 0 ? (
                  episodes.map((episode) => (
                    <div key={episode.mal_id} className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-4">
                      <PlayCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <div className="flex-grow">
                        <p className="font-semibold">Episode {episode.mal_id}</p>
                        <p className="text-sm text-gray-400 line-clamp-1">{episode.title || 'No title available'}</p>
                      </div>
                      {episode.aired && (
                        <span className="text-xs text-gray-500">{new Date(episode.aired).toLocaleDateString()}</span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">No episode information available</p>
                )}
              </div>
            )}

            {activeTab === 'characters' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {characters.length > 0 ? (
                  characters.map((char) => (
                    <div key={char.character.mal_id} className="bg-gray-800/50 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all">
                      <img src={char.character.images?.jpg?.image_url} alt={char.character.name} className="w-full h-48 object-cover" />
                      <div className="p-3">
                        <p className="font-semibold text-sm line-clamp-1">{char.character.name}</p>
                        <p className="text-xs text-gray-400">{char.role}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-full text-center py-8">No character information available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}