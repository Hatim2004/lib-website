import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Grid, Container } from '@mui/material';
import BookCard from '../components/BookCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = () => {
    axios.get('https://api-05ii.onrender.com/favorites')
      .then(res => setFavorites(res.data))
      .catch(err => console.error('Error fetching favorites:', err));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <Container sx={{ mt: 10}}>
      <Typography variant="h4" gutterBottom textAlign="center">
        قائمة المفضلة
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {favorites.length === 0 ? (
          <Typography variant="body1" textAlign="center" mt={4}>
            لا توجد كتب مضافة إلى المفضلة حتى الآن.
          </Typography>
        ) : (
          favorites.map((book, index) => (
            <Grid item key={index}>
              <BookCard book={book} onUnfavorite={fetchFavorites} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
