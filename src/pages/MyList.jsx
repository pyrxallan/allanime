import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import AnimeCard from '../components/AnimeCard';
import { useNavigate } from 'react-router-dom';

export default function MyList() {
    const { currentUser } = useAuth();
    const [animeList, setAnimeList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        fetchWatchList();
    }, [currentUser, navigate]);

    const fetchWatchList = async () => {
        try {
      const watchlistRef = collection(db, 'users', currentUser.uid, 'watchlist');
      const q = query(watchlistRef, orderBy('addedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const animeList = [];
      querySnapshot.forEach((doc) => {
        animeList.push({ ...doc.data(), id: doc.id });
      });
    
    };

    return 
      