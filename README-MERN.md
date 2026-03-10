# Property Pulse - MERN Stack

A full-stack property rental application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication with JWT
- Property listing and management
- Property search and filtering
- Bookmarking properties
- Messaging between users
- Image upload with Cloudinary
- Responsive design with Tailwind CSS

## Project Structure

```
property-pulse/
├── frontend/              # React.js frontend
│   ├── public/
│   │   └── assets/        # Static assets (images, styles)
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions (Axios)
│   │   ├── context/       # React context for state management
│   │   ├── App.js         # Main App component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
├── backend/               # Node.js/Express backend
│   ├── controllers/       # Business logic controllers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route definitions
│   ├── middleware/       # Authentication middleware
│   ├── config/           # Configuration files
│   ├── uploads/          # Temporary file uploads
│   ├── server.js         # Express server entry point
│   ├── package.json
│   └── .env.example
├── package.json          # Root package.json for running both
└── README-MERN.md        # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image uploads)

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install all dependencies (root, backend, frontend)
npm run install-all
```

Or manually:
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend && npm install && cd ..

# Frontend dependencies
cd frontend && npm install && cd ..
```

### 2. Environment Variables

#### Backend (.env in backend/ directory)
```env
MONGODB_URI=mongodb://localhost:27017/property-pulse
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

#### Frontend (.env in frontend/ directory)
```env
REACT_APP_API_URL=http://localhost:5000
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Run the Application

#### Option 1: Run both frontend and backend together
```bash
npm run dev
```

#### Option 2: Run separately
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get authenticated user

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/search` - Search properties

### Bookmarks
- `GET /api/bookmarks` - Get user bookmarks
- `POST /api/bookmarks` - Add/remove bookmark
- `GET /api/bookmarks/check/:propertyId` - Check if property is bookmarked

### Messages
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id` - Mark message as read
- `DELETE /api/messages/:id` - Delete message
- `GET /api/messages/unread-count` - Get unread message count

## Technologies Used

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary
- CORS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.