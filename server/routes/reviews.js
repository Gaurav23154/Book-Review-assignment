const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const { auth } = require('../middleware/auth');

// Get reviews for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'username profilePicture')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments({ book: req.params.bookId });

    res.json({
      reviews,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalReviews: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a new review
router.post('/', auth, async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    // Check if user has already reviewed this book
    const existingReview = await Review.findOne({
      book: bookId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      book: bookId,
      user: req.user._id,
      rating,
      comment
    });

    const savedReview = await review.save();

    // Update book's average rating and total reviews
    const book = await Book.findById(bookId);
    const allReviews = await Review.find({ book: bookId });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    
    book.averageRating = totalRating / allReviews.length;
    book.totalReviews = allReviews.length;
    await book.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a review
router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Update book's average rating
    const book = await Book.findById(review.book);
    const allReviews = await Review.find({ book: review.book });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    
    book.averageRating = totalRating / allReviews.length;
    await book.save();

    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.remove();

    // Update book's average rating and total reviews
    const book = await Book.findById(review.book);
    const allReviews = await Review.find({ book: review.book });
    
    if (allReviews.length > 0) {
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
      book.averageRating = totalRating / allReviews.length;
    } else {
      book.averageRating = 0;
    }
    
    book.totalReviews = allReviews.length;
    await book.save();

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 