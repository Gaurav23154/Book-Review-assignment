import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Rating,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  Avatar,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [id, page]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/books/${id}`);
      setBook(response.data);
    } catch (error) {
      setError('Failed to fetch book details');
      console.error('Error fetching book details:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reviews/book/${id}`, {
        params: { page, limit: 5 }
      });
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError('Failed to fetch reviews');
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.rating) {
      setError('Please select a rating');
      return;
    }
    if (!newReview.comment.trim()) {
      setError('Please write a review comment');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reviews`,
        {
          bookId: id,
          rating: newReview.rating,
          comment: newReview.comment.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSuccess('Review submitted successfully!');
      setNewReview({ rating: 0, comment: '' });
      fetchBookDetails();
      fetchReviews();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit review');
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {book && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={book.coverImage}
              alt={book.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              by {book.author}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={book.averageRating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({book.totalReviews} reviews)
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Genre: {book.genre}
            </Typography>
            <Typography variant="subtitle1">
              Published: {book.publishedYear}
            </Typography>
          </Grid>
        </Grid>
      )}

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {user && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Write a Review
            </Typography>
            <form onSubmit={handleReviewSubmit}>
              <Box sx={{ mb: 2 }}>
                <Rating
                  value={newReview.rating}
                  onChange={(event, newValue) => {
                    setNewReview({ ...newReview, rating: newValue });
                    setError('');
                  }}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Review"
                value={newReview.comment}
                onChange={(e) => {
                  setNewReview({ ...newReview, comment: e.target.value });
                  setError('');
                }}
                sx={{ mb: 2 }}
                error={!!error && !newReview.comment.trim()}
                helperText={error && !newReview.comment.trim() ? 'Please write a review comment' : ''}
              />
              <Button 
                type="submit" 
                variant="contained"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </Paper>
        )}

        {reviews.map((review) => (
          <Card key={review._id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar src={review.user.profilePicture} sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1">
                    {review.user.username}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
              </Box>
              <Typography variant="body1">{review.comment}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && !loading && (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            No reviews yet. Be the first to review this book!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default BookDetails; 