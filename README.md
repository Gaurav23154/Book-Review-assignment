# Book Review Platform

A full-stack web application for book enthusiasts to discover, review, and share their thoughts on books. Users can browse books, write reviews, manage their profiles, and interact with other readers.

## Features

### User Features
- User authentication (register, login, logout)
- User profile management
- Browse books with advanced filtering and search
- View detailed book information
- Write and submit book reviews
- Rate books (1-5 stars)
- View other users' reviews
- Track reading history

### Book Management
- Add new books to the platform
- View book details including:
  - Title, author, and description
  - Cover image
  - Genre and publication year
  - Average rating and total reviews
  - User reviews and ratings

### Search and Filter
- Search books by title or author
- Filter books by genre
- Sort books by:
  - Newest first
  - Oldest first
  - Highest rated
  - Title A-Z

### Responsive Design
- Mobile-friendly interface
- Responsive grid layout
- Optimized for all screen sizes

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI) for UI components
- React Router for navigation
- Axios for API requests
- Context API for state management
- Vite for build tooling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- RESTful API architecture

### Development Tools
- Git for version control
- npm for package management
- Environment variables for configuration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

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

4. Create a `.env` file in the server directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

3. Access the Deployed application:
- Frontend: `https://book-review-assignment-frontend.vercel.app/`
- Backend API: `https://book-review-assignment.vercel.app/`

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile

### Books
- GET /api/books - Get all books (with pagination, search, and filters)
- GET /api/books/:id - Get book details
- POST /api/books - Add a new book
- PUT /api/books/:id - Update a book
- DELETE /api/books/:id - Delete a book

### Reviews
- GET /api/reviews/book/:bookId - Get reviews for a book
- POST /api/reviews - Submit a new review
- PUT /api/reviews/:id - Update a review
- DELETE /api/reviews/:id - Delete a review

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- MongoDB for the database
- Express.js for the backend framework
- React.js for the frontend framework

## Contact

Your Name - gauravjaiswal1098@gmail.com

Project Link: [https://github.com/Gaurav23154/Book-Review-assignment.git] 
Deployed Link : [https://book-review-assignment-frontend.vercel.app/]
