# Book Review Platform

A full-stack web application for book enthusiasts to discover, review, and share their thoughts about books. Built with React, Node.js, and MongoDB.

## Features

- 📚 Browse and search books
- ⭐ Rate and review books
- 👤 User authentication and profiles
- 📝 Create and manage book reviews
- 🔍 Filter books by genre and rating
- 💬 Interactive review system
- 📱 Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- Material-UI
- React Router
- Axios
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose ODM

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd book-review
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Create environment files:

For backend (server/.env):
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
NODE_ENV=development
```

For frontend (client/.env):
```
VITE_API_URL=http://localhost:5000
```

5. Start the development servers:

Backend:
```bash
cd server
npm start
```

Frontend:
```bash
cd client
npm run dev
```

## Deployment

The application is deployed on Vercel:

- Frontend: https://book-review-frontend.vercel.app
- Backend: https://book-review-backend.vercel.app

### Deployment Steps

1. Backend Deployment:
   - Install Vercel CLI: `npm install -g vercel`
   - Deploy: `vercel`
   - Set environment variables in Vercel dashboard

2. Frontend Deployment:
   - Install Vercel CLI: `npm install -g vercel`
   - Deploy: `vercel`
   - Set environment variables in Vercel dashboard

## API Endpoints

### Authentication
- POST /api/users/register - Register new user
- POST /api/users/login - User login
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

### Books
- GET /api/books - Get all books
- GET /api/books/:id - Get book details
- POST /api/books - Create new book (admin only)
- PUT /api/books/:id - Update book (admin only)
- DELETE /api/books/:id - Delete book (admin only)

### Reviews
- GET /api/reviews/book/:bookId - Get book reviews
- POST /api/reviews - Create new review
- PUT /api/reviews/:id - Update review
- DELETE /api/reviews/:id - Delete review

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/book-review](https://github.com/yourusername/book-review) 