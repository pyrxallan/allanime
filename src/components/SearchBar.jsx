import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onSearch, placeholder = "Search anime..." }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-6 py-4 pl-14 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors" />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity">
          Search
        </button>
      </div>
    </form>
  );
}