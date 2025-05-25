import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Rating,
  Button,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`, {
        params: {
          limit: 4,
          sort: 'rating'
        }
      });
      setFeaturedBooks(response.data.books);
    } catch (error) {
      setError('Failed to fetch featured books');
      console.error('Error fetching featured books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Book Reviews
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Discover, review, and share your thoughts on your favorite books
        </Typography>
        <Button
          component={RouterLink}
          to="/books"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Browse Books
        </Button>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Books
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Grid container spacing={4}>
          {featuredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={3} key={book._id}>
              <Card 
                component={RouterLink} 
                to={`/books/${book._id}`}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={book.coverImage}
                  alt={book.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {book.author}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={book.averageRating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({book.totalReviews})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {book.genre}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Discover New Books
            </Typography>
            <Typography color="text.secondary">
              Find your next favorite book from our extensive collection of titles across various genres.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Share Your Thoughts
            </Typography>
            <Typography color="text.secondary">
              Write and read reviews from a community of book lovers. Your opinion matters!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Track Your Reading
            </Typography>
            <Typography color="text.secondary">
              Keep track of the books you've read and want to read. Build your personal reading list.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 