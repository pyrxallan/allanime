import { useState } from 'react';
import Header from './components/Home';
import Footer from './components/Footer';
import AnimeCard from './components/AnimeCard';
import Navbar from './components/NavBar';
import SearchBar from './components/SearchBar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Header />
      <SearchBar onSearch={handleSearch} />
      <main className="flex-grow container mx-auto p-4">
        <AnimeCard searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}

export default App;