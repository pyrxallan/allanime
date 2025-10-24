import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import MyList from './pages/MyList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AnimeDetails from './pages/AnimeDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/anime/:id" element={<AnimeDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;