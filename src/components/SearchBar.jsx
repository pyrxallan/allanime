import react from 'react';

function SearchBar() {
  return (
    <div className="flex justify-center mt-4">
      <input
        type="text"
        placeholder="Search for anime..."
        className="w-1/2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;