import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            AllAnime
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/search" className="hover:text-purple-400 transition-colors">Search</Link>
            {currentUser && (
              <Link to="/mylist" className="hover:text-purple-400 transition-colors">My List</Link>
            )}
            {currentUser ? (
              <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity">
                Login
              </Link>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link to="/" className="block hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/search" className="block hover:text-purple-400 transition-colors">Search</Link>
            {currentUser && (
              <Link to="/mylist" className="block hover:text-purple-400 transition-colors">My List</Link>
            )}
            {currentUser ? (
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link to="/login" className="block text-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity">
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}