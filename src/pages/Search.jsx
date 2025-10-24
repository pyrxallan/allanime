import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import { Filter } from 'lucide-react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
    { id: 4, name: 'Comedy' },
    { id: 8, name: 'Drama' },
    { id: 10, name: 'Fantasy' },
    { id: 22, name: 'Romance' },
    { id: 24, name: 'Sci-Fi' }
  ];

  const types = ['TV', 'Movie', 'OVA', 'Special', 'ONA'];

  useEffect(() => {
    fetchDefaultAnime();
  }, []);

  const fetchDefaultAnime = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=12');
      const data = await response.json();
      setAnimeList(data.data || []);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() && !selectedGenre && !selectedType) {
      fetchDefaultAnime();
      return;
    }

    setLoading(true);
    try {
      let url = 'https://api.jikan.moe/v4/anime?';
      if (searchQuery.trim()) url += `q=${searchQuery}&`;
      if (selectedGenre) url += `genres=${selectedGenre}&`;
      if (selectedType) url += `type=${selectedType}&`;
      url += 'limit=12';

      const response = await fetch(url);
      const data = await response.json();
      setAnimeList(data.data || []);
    } catch (error) {
      console.error('Error searching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Search Anime
        </h1>

        <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />

        <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">Filters:</span>
          </div>

          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:border-purple-500">
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>

          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:border-purple-500">
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <button onClick={handleSearch} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity">
            Apply Filters
          </button>
        </div>

        <div className="mt-12">
          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading...</div>
          ) : animeList.length === 0 ? (
            <div className="text-center text-gray-400 py-20">No anime found. Try different search terms.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}