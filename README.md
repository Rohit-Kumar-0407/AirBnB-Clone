# AirBnB Clone

A full-stack AirBnB-inspired web application built with Node.js, Express, MongoDB, and EJS templates. Features user authentication, home listings, favorites, host management, and booking functionality.

## Features

### User Authentication
- **User Registration** with comprehensive validation (first name, last name, email, password with complexity requirements, role selection, terms acceptance)
- **User Login/Logout** with session-based authentication using MongoDB session store
- **Password Security** - bcryptjs hashing (12 rounds)
- **Role-based Access** - Guest and Host roles with route protection

### Guest Features
- **Home Listings** - Browse all available homes with photos, pricing, ratings, and details
- **Home Details** - View detailed information for each property
- **Reservation System** - Reserve homes with booking functionality
- **Favorites/Wishlist** - Add/remove homes to personal favorites list
- **House Rules** - Download PDF house rules for properties
- **Booking Management** - View and manage personal bookings

### Host Features
- **Add New Listings** - Create home listings with photo upload (Multer), details (name, phone, type, location, rating, price, description)
- **Manage Listings** - View all hosted properties in dashboard
- **Edit Listings** - Update property details and photos
- **Delete Listings** - Remove properties with automatic image cleanup
- **Protected Routes** - Host-only access with authentication middleware

### Technical Features
- **Responsive UI** - Tailwind CSS for modern, mobile-first design
- **File Uploads** - Multer for image handling with type validation (PNG, JPEG, JPG)
- **Session Management** - MongoDB-backed sessions with connect-mongo
- **Input Validation** - express-validator for server-side validation
- **Error Handling** - Custom 404 page and error handling
- **Database Models** - Mongoose schemas for Users and Homes with relationships

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Templating** | EJS (Embedded JavaScript) |
| **Styling** | Tailwind CSS |
| **Authentication** | express-session + bcryptjs |
| **File Upload** | Multer |
| **Validation** | express-validator |
| **Session Store** | connect-mongo |
| **Environment** | dotenv |

## Project Structure

```
AirBnB-Clone/
├── controllers/
│   ├── AuthControllers.js      # Authentication logic
│   ├── HomeControllers.js      # Guest home browsing
│   ├── HostControllers.js      # Host property management
│   ├── FavControllers.js       # Favorites functionality
│   └── Page404Controllers.js   # 404 error handling
├── models/
│   ├── UserModel.js            # User schema with favorites
│   └── registeredHomesDataModel.js  # Home listing schema
├── routes/
│   ├── authRoute.js            # Auth routes (/login, /signup, /logout)
│   ├── hostRoute.js            # Host routes (/host/add-home, etc.)
│   ├── userRoute.js            # Guest routes (/, /home-listing, etc.)
│   ├── FavRoute.js             # Favorites routes
│   └── 404Page.js              # 404 handler
├── views/
│   ├── auth/                   # Login/Signup pages
│   ├── user/                   # Guest pages (home, listings, details, favorites, bookings)
│   ├── host/                   # Host pages (add, edit, listing)
│   └── partials/               # Reusable components (navbar, home-card, etc.)
├── public/                     # Static assets (CSS, PDF)
├── uploads/                    # User uploaded images
├── utils/
│   └── path.js                 # Path utilities
├── server.js                   # Application entry point
├── package.json
└── .env                        # Environment variables
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AirBnB-Clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URL=mongodb://localhost:27017/airbnb-clone
   # Or use MongoDB Atlas connection string
   ```

4. **Start MongoDB**
   Ensure MongoDB is running locally or use a cloud instance.

5. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Or standard start
   npm start
   
   # For Tailwind CSS development (separate terminal)
   npm run tailwind
   ```

6. **Access the application**
   Open http://localhost:8000 in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start server with nodemon |
| `npm run dev` | Alias for start |
| `npm run tailwind` | Watch and compile Tailwind CSS |

## Database Schema

### User Model
```javascript
{
  firstName: String (required, min 2 chars, letters only),
  lastName: String (required, min 2 chars, letters only),
  email: String (required, unique, valid email),
  hashedPassword: String (required, bcrypt hashed),
  role: Enum ['guest', 'host'] (default: 'guest'),
  favourites: [ObjectId] (refs Homes)
}
```

### Home Model
```javascript
{
  name: String (required),
  phoneNumber: Number (required),
  houseType: String (required),
  location: String (required),
  rating: Number (required),
  photo: String (required, path to uploaded image),
  price: Number (required),
  description: String (required)
}
```

## API Routes

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/login` | Login page |
| GET | `/signup` | Registration page |
| POST | `/login` | Process login |
| POST | `/signup` | Process registration |
| POST | `/logout` | Destroy session |

### Guest Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page with listings |
| GET | `/home-listing` | All homes list |
| GET | `/home/:homeId` | Home detail page |
| GET | `/reserve` | Reservation page |
| GET | `/bookings` | User bookings |
| GET | `/favourites` | Favorites list |
| GET | `/rules/:homeId` | Download house rules PDF |

### Host Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/host/add-home` | Add new property form |
| GET | `/host/home-listing` | Host's properties dashboard |
| GET | `/host/edit-home/:homeId` | Edit property form |
| POST | `/host/add-home` | Create new listing |
| POST | `/host/edit-home/:homeId` | Update listing |
| POST | `/host/delete-home/:homeId` | Delete listing |

### Favorites Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add-favourites` | Add home to favorites |
| POST | `/delete-favourite` | Remove from favorites |

## Key Implementation Details

### Session Configuration
- MongoDB-backed sessions via `connect-mongo`
- Secure session cookies with 24-hour expiry
- Session data includes user object and login status

### File Upload Handling
- Multer disk storage in `/uploads` directory
- Randomized filenames to prevent conflicts
- Image type validation (PNG, JPEG, JPG only)
- Static serving of uploads at `/uploads` route

### Route Protection
- Authentication middleware checks `req.session.isLoggedIn`
- Host routes require active session
- Favorites routes require active session
- Redirects to `/login` if unauthorized

### Validation Rules (Registration)
- First/Last name: 2+ chars, letters only
- Email: Valid format, normalized
- Password: 8+ chars, uppercase, lowercase, number, special char
- Confirm password: Must match
- Role: Required, 'guest' or 'host'
- Terms: Must be accepted

## Development Notes

- **Tailwind CSS**: Input file at `views/input.css`, output at `public/output.css`
- **Static Assets**: Served from `public/` directory
- **View Engine**: EJS with `views/` as template directory
- **Error Handling**: 404 page for unmatched routes
- **Database**: Mongoose connection with promise-based syntax

## Future Enhancements

- [ ] Payment integration for bookings
- [ ] Email notifications
- [ ] Image gallery for listings
- [ ] Search and filter functionality
- [ ] Review and rating system
- [ ] Host analytics dashboard
- [ ] Multi-language support
- [ ] API documentation (Swagger)
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## License

ISC License