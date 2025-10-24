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
  