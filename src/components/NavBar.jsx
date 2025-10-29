import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setProfileModalOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const getUserPhoto = () => {
    if (currentUser?.photoURL) {
      return currentUser.photoURL;
    }
    return null;
  };

  const getUserName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <>
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
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <button onClick={() => setProfileModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                  {getUserPhoto() ? (
                    <img src={getUserPhoto()} alt="Profile" className="w-6 h-6 rounded-full" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span className="text-sm">{getUserName()}</span>
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
                <>
                  <button onClick={() => setProfileModalOpen(true)} className="w-full text-left flex items-center gap-2 hover:text-purple-400 transition-colors">
                    {getUserPhoto() ? (
                      <img src={getUserPhoto()} alt="Profile" className="w-6 h-6 rounded-full" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                    Profile
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="block text-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:opacity-90 transition-opacity">
                  Login
                </Link>
              )}
            </div>
          )}
        </nav>
      </header>

      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setProfileModalOpen(false)}>
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center">
              {getUserPhoto() ? (
                <img src={getUserPhoto()} alt="Profile" className="w-24 h-24 rounded-full mb-4 border-4 border-purple-500" />
              ) : (
                <div className="w-24 h-24 rounded-full mb-4 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">{getUserName()}</h2>
              <p className="text-gray-400 mb-6">{currentUser?.email}</p>

              <div className="w-full space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Account Type</p>
                  <p className="font-semibold">
                    {currentUser?.providerData?.[0]?.providerId === 'google.com' ? 'Google Account' :
                     currentUser?.providerData?.[0]?.providerId === 'github.com' ? 'GitHub Account' :
                     'Email Account'}
                  </p>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Member Since</p>
                  <p className="font-semibold">
                    {new Date(currentUser?.metadata?.creationTime).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>

                <button onClick={() => setProfileModalOpen(false)} className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}