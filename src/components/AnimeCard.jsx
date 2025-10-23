import React from "react";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">AllAnime</div>
        <div>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Home</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Browse</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Genres</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">My List</a>
        </div>
      </div>
    </nav>
  );
}