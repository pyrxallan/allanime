import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onSearch, placeholder = "Search anime..." }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-4 pl-14 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
      />
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-r-md flex items-center"
      >
        <Search size={16} />
      </button>
    </form>
  );
}