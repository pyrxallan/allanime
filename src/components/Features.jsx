import Reeact from 'react';

function Features() {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose AllAnime?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Vast Library</h3>
            <p>Access thousands of anime titles from various genres and eras.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">High Quality Streaming</h3>
            <p>Enjoy your favorite shows in HD with minimal buffering.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">User-Friendly Interface</h3>
            <p>Navigate easily with our intuitive design and personalized recommendations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;