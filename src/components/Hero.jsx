import React from "react";
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-pink-900/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
          Track Your Favorite Anime in One Place
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10">
          Discover trending, top-rated, and upcoming anime – personalized for you.
        </p>
        <Link
          to="/search"
          className="inline-block group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/50"
        >
          Get Started
          <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}