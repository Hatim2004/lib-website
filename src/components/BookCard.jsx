import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { lightBlue } from '@mui/material/colors';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function BookCard({ name, description, image, label, book, price, onUnfavorite }) {
  const title = label || name || (book && (book.label || book.bookTitle));
  const img = image || (book && book.image);
  const desc = description || (book && book.description);
  const price1 = price || (book && book.price);
  const [liked, setLiked] = useState(false);
  const { fetchBasketCount, fetchFavoritesCount } = useOutletContext();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const isLiked = localStorage.getItem(`liked-${title}`);
    setLiked(isLiked === 'true');
  }, [title]);

  const handleToggleFavorite = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem(`liked-${title}`, newLiked);

    try {
      if (newLiked) {
        await axios.post('https://api-05ii.onrender.com/favorites/add', {
          bookTitle: title,
          image: img,
          description: desc,
          price: price1,
        });
        fetchFavoritesCount();
      } else {
        await axios.delete(`https://api-05ii.onrender.com/favorites/delete-by-title/${encodeURIComponent(title)}`);
        fetchFavoritesCount();
        if (onUnfavorite) onUnfavorite(); // notify parent to refresh
        window.location.reload();

      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const handleAddToLoan = async () => {
    try {
      setLoading(true);
      await axios.post('https://api-05ii.onrender.com/loans/add', {
        bookTitle: title,
        image: img,
        description: desc,
        price: price1,
      }
      );
      fetchBasketCount();

      setLiked(false);
      if (onUnfavorite) {
        await axios.delete(`https://api-05ii.onrender.com/favorites/delete-by-title/${encodeURIComponent(title)}`);
        fetchFavoritesCount();
        localStorage.setItem(`liked-${title}`, 'false');
        onUnfavorite();
      }
    }
    catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      sx={{
        maxWidth: 320,
        borderRadius: 4,
        boxShadow: 3,
        transition: '0.3s',
        "&:hover": { boxShadow: 6 },
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardActionArea disableRipple disableTouchRipple>
        <CardMedia
          component="img"
          image={img}
          alt={title}
          sx={{
            pt:'1em',
            height: 220,
            width: '100%',
            objectFit: 'contain',
            display: 'block',
            mx: 'auto',
            backgroundColor: '#fff',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ height: '3em', overflow: 'hidden' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ minHeight: '3.5em', overflow: 'hidden' }}>
            {desc}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              p: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'green',
            }}
          >
            السعر: {price1} ريال
            <Tooltip title={liked ? 'إزالة من المفضلة' : 'أضف إلى المفضلة'}>
              <IconButton
                onClick={handleToggleFavorite}
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}
              >
                {liked ? (
                  <FavoriteIcon sx={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: 'gray' }} />
                )}
              </IconButton>
            </Tooltip>
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={handleAddToLoan}
          disabled={loading}
          fullWidth
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1.1em',
            backgroundColor: loading ? '#4caf50' :  lightBlue[600],
            color: 'white',
            py: 1.2,
            px: 2,
            transition: '0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {loading ? (
            <>
              <CheckIcon sx={{ fontSize: 22 }} />
              تمت الإضافة
            </>
          ) : (
            <>
              <AddShoppingCartIcon sx={{ fontSize: 22 }} />
              إضافة للسلة
            </>
          )}
        </Button>

      </CardActions>

    </Card>
  );
}
