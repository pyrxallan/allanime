import { Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; {new Date().getFullYear()} AllAnime. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://github.com/pyrxallan"
            className="hover:text-purple-400"
          >
            <Github size={16} />
          </a>
          <a
            href="https://twitter.com/issallan._"
            className="hover:text-purple-400"
          >
            <Twitter size={16} />
          </a>
          <a
            href="https://instagram.com/yourusername"
            className="hover:text-purple-400"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}