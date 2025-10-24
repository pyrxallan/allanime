import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-20 top-0 left-0 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-purple-400">
              AllAnime
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/search" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Search
              </Link>
              {currentUser && (
                <Link to="/my-list" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  My List
                </Link>
              )}
              {!currentUser ? (
                <>
                  <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    Login
                  </Link>
                  <Link to="/signup" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
                >
                  <LogOut className="mr-1" size={16} /> Logout
                </button>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/search" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            Search
          </Link>
          {currentUser && (
            <Link to="/my-list" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              My List
            </Link>
          )}
          {!currentUser ? (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                Login
              </Link>
              <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              <LogOut className="mr-1" size={16} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}