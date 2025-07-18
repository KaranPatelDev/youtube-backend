# 🎥 YouTube Backend - Complete Development Journey

<div align="center">

![YouTube Backend](https://img.shields.io/badge/YouTube-Backend-red?style=for-the-badge&logo=youtube&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

*A professional-grade backend API for YouTube-like video streaming platform built with industry best practices* 🚀

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [🛠️ Development Flow & Architecture](#️-development-flow--architecture)
- [✨ Features Implemented](#-features-implemented)
- [🏗️ Technical Stack](#️-technical-stack)
- [📊 Database Design](#-database-design)
- [🔧 API Endpoints](#-api-endpoints)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🎯 Development Journey](#-development-journey)
- [🔒 Security Features](#-security-features)
- [📚 Key Learning Points](#-key-learning-points)
- [🤝 Contributing](#-contributing)

---

## 🎯 Project Overview

This project is a **full-featured YouTube backend clone** built with modern Node.js technologies. It demonstrates professional backend development practices including authentication, file uploads, database relationships, and scalable architecture patterns.

### 🎭 **What Makes This Project Special**
- **Professional Setup**: Industry-standard folder structure and configuration
- **Security First**: JWT authentication, bcrypt hashing, CORS protection
- **Media Management**: Cloudinary integration for file uploads and processing
- **Database Excellence**: MongoDB with complex aggregation pipelines
- **Error Handling**: Comprehensive error management and API responses
- **Documentation**: Extensive documentation and code comments

---

## 🛠️ Development Flow & Architecture

### **🏗️ Architecture Pattern**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   Server Side   │    │   Database      │
│                 │    │                 │    │                 │
│  React/Vue/     │◄──►│  Express.js     │◄──►│  MongoDB        │
│  Angular/Mobile │    │  Node.js        │    │  Atlas          │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   External      │
                    │   Services      │
                    │   - Cloudinary  │
                    │   - JWT Auth    │
                    └─────────────────┘
```

### **🔄 Request Lifecycle**
```
Client Request → Route Handler → Middleware Chain → Controller → Model → Database → Response
```

### **🧱 Layered Architecture**
1. **🌐 Presentation Layer**: Routes and API endpoints
2. **⚙️ Business Logic Layer**: Controllers and middleware
3. **🗄️ Data Access Layer**: Models and database operations
4. **☁️ External Services**: Cloudinary, JWT, MongoDB Atlas

---

## ✨ Features Implemented

### **🔐 Authentication & Authorization**
- User registration with file uploads (avatar, cover image)
- JWT-based authentication with access and refresh tokens
- Password hashing using bcrypt
- Protected routes with middleware
- Cookie-based token management

### **👤 User Management**
- User profile creation and updates
- Avatar and cover image upload
- Password change functionality
- User channel profile with aggregation
- Watch history tracking

### **📹 Video System (Structure Ready)**
- Video upload with thumbnail
- Video metadata management
- View tracking and analytics
- Publication status toggle
- User-based video queries

### **💬 Social Features (Structure Ready)**
- Comment system with CRUD operations
- Like/dislike functionality for videos, comments, and tweets
- Subscription system between users
- Playlist management
- Tweet-like short content

### **📊 Analytics & Dashboard**
- Channel statistics aggregation
- User engagement metrics
- Video performance tracking
- Subscription analytics

### **🔧 Technical Features**
- File upload with Multer and Cloudinary
- MongoDB aggregation pipelines
- Pagination support
- Error handling and logging
- CORS configuration
- Environment-based configuration

---

## 🏗️ Technical Stack

### **🚀 Backend Technologies**
| Technology | Version | Purpose | Usage |
|------------|---------|---------|-------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white) | v18+ | Runtime Environment | Server execution |
| ![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat&logo=express&logoColor=white) | v5.1.0 | Web Framework | API routes and middleware |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | v8.16.3 | Database | Data storage |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | v8.16.3 | ODM | Database modeling |

### **🔒 Security & Authentication**
| Technology | Purpose | Implementation |
|------------|---------|----------------|
| ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | Token Authentication | Access & refresh tokens |
| ![bcrypt](https://img.shields.io/badge/-bcrypt-blue?style=flat) | Password Hashing | 10-round salting |
| ![CORS](https://img.shields.io/badge/-CORS-orange?style=flat) | Cross-Origin Protection | Configured origins |

### **📁 File & Media Management**
| Technology | Purpose | Configuration |
|------------|---------|---------------|
| ![Multer](https://img.shields.io/badge/-Multer-orange?style=flat) | File Upload | Disk storage with cleanup |
| ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) | Cloud Media Storage | Auto-resource detection |

### **🛠️ Development Tools**
| Tool | Purpose |
|------|---------|
| ![Nodemon](https://img.shields.io/badge/-Nodemon-76D04B?style=flat&logo=nodemon&logoColor=white) | Auto-restart development server |
| ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?style=flat&logo=prettier&logoColor=white) | Code formatting |
| ![dotenv](https://img.shields.io/badge/-dotenv-ECD53F?style=flat) | Environment variables |

---

## 📊 Database Design

### **🗄️ Models & Relationships**

#### **👤 User Model**
```javascript
{
  username: String (unique, indexed),
  email: String (unique, indexed),
  fullName: String (indexed),
  avatar: String (Cloudinary URL),
  coverImage: String (Cloudinary URL),
  watchHistory: [ObjectId] (ref: Video),
  password: String (hashed),
  refreshToken: String
}
```

#### **📹 Video Model**
```javascript
{
  videoFile: String (Cloudinary URL),
  thumbnail: String (Cloudinary URL),
  title: String,
  description: String,
  duration: Number,
  views: Number,
  isPublished: Boolean,
  owner: ObjectId (ref: User)
}
```

#### **📝 Additional Models**
- **Comment Model**: Video comments with user references
- **Like Model**: Like/dislike tracking for videos, comments, tweets
- **Subscription Model**: User subscription relationships
- **Playlist Model**: User-created video playlists
- **Tweet Model**: Short-form content posts

### **🔗 Relationships**
- User → Videos (One-to-Many)
- User → Comments (One-to-Many)
- User → Subscriptions (Many-to-Many)
- Video → Comments (One-to-Many)
- User → Playlists (One-to-Many)

---

## 🔧 API Endpoints

### **🔐 Authentication Routes**
```bash
POST   /api/v1/users/register          # User registration with file upload
POST   /api/v1/users/login             # User login
POST   /api/v1/users/logout            # User logout (Protected)
POST   /api/v1/users/refresh-token     # Refresh JWT token
```

### **👤 User Management Routes**
```bash
GET    /api/v1/users/current-user      # Get current user details (Protected)
POST   /api/v1/users/change-password   # Change user password (Protected)
PATCH  /api/v1/users/update-account    # Update user details (Protected)
PATCH  /api/v1/users/avatar            # Update user avatar (Protected)
PATCH  /api/v1/users/cover-image       # Update cover image (Protected)
GET    /api/v1/users/c/:username       # Get user channel profile (Protected)
GET    /api/v1/users/history           # Get watch history (Protected)
```

### **📹 Video Routes (Structure Ready)**
```bash
GET    /api/v1/videos                  # Get all videos with pagination
POST   /api/v1/videos                  # Upload video with thumbnail
GET    /api/v1/videos/:videoId         # Get video by ID
PATCH  /api/v1/videos/:videoId         # Update video details
DELETE /api/v1/videos/:videoId         # Delete video
PATCH  /api/v1/videos/toggle/publish/:videoId  # Toggle publish status
```

### **💬 Social Features Routes (Structure Ready)**
```bash
# Comments
GET    /api/v1/comments/:videoId       # Get video comments
POST   /api/v1/comments/:videoId       # Add comment to video
PATCH  /api/v1/comments/c/:commentId   # Update comment
DELETE /api/v1/comments/c/:commentId   # Delete comment

# Likes
POST   /api/v1/likes/toggle/v/:videoId    # Toggle video like
POST   /api/v1/likes/toggle/c/:commentId  # Toggle comment like
GET    /api/v1/likes/videos               # Get liked videos

# Subscriptions
POST   /api/v1/subscriptions/c/:channelId # Toggle subscription
GET    /api/v1/subscriptions/u/:userId    # Get user subscriptions
GET    /api/v1/subscriptions/c/:channelId # Get channel subscribers
```

---

## 🚀 Getting Started

### **📋 Prerequisites**
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- Cloudinary account
- Git

### **⚙️ Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/KaranPatelDev/youtube-backend.git
   cd youtube-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file with these variables:
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=*
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### **🧪 Testing the API**
```bash
# Test server health
curl http://localhost:8000/api/v1/healthcheck

# Register a new user
curl -X POST http://localhost:8000/api/v1/users/register \
  -F "username=testuser" \
  -F "email=test@example.com" \
  -F "fullName=Test User" \
  -F "password=password123" \
  -F "avatar=@/path/to/avatar.jpg"
```

---

## 📁 Project Structure

```
youtube-backend/
├── 📂 public/
│   └── 📂 temp/                    # Temporary file storage
├── 📂 src/
│   ├── 📄 app.js                   # Express app configuration
│   ├── 📄 index.js                 # Application entry point
│   ├── 📄 constants.js             # Application constants
│   ├── 📂 controllers/             # Business logic
│   │   ├── 📄 user.controller.js   # User operations
│   │   ├── 📄 video.controller.js  # Video operations
│   │   ├── 📄 comment.controller.js # Comment operations
│   │   ├── 📄 like.controller.js   # Like operations
│   │   ├── 📄 playlist.controller.js # Playlist operations
│   │   ├── 📄 subscription.controller.js # Subscription operations
│   │   ├── 📄 tweet.controller.js  # Tweet operations
│   │   ├── 📄 dashboard.controller.js # Analytics
│   │   └── 📄 healthcheck.controller.js # Health check
│   ├── 📂 db/
│   │   └── 📄 index.js              # Database connection
│   ├── 📂 middlewares/
│   │   ├── 📄 auth.middleware.js    # JWT authentication
│   │   └── 📄 multer.middleware.js  # File upload handling
│   ├── 📂 models/
│   │   ├── 📄 user.models.js        # User schema
│   │   ├── 📄 video.models.js       # Video schema
│   │   ├── 📄 comment.models.js     # Comment schema
│   │   ├── 📄 like.models.js        # Like schema
│   │   ├── 📄 playlist.models.js    # Playlist schema
│   │   ├── 📄 subscription.models.js # Subscription schema
│   │   └── 📄 tweet.models.js       # Tweet schema
│   ├── 📂 routes/
│   │   ├── 📄 user.routes.js        # User routes
│   │   ├── 📄 video.routes.js       # Video routes
│   │   ├── 📄 comment.routes.js     # Comment routes
│   │   ├── 📄 like.routes.js        # Like routes
│   │   ├── 📄 playlist.routes.js    # Playlist routes
│   │   ├── 📄 subscription.routes.js # Subscription routes
│   │   ├── 📄 tweet.routes.js       # Tweet routes
│   │   ├── 📄 dashboard.routes.js   # Dashboard routes
│   │   └── 📄 healthcheck.routes.js # Health check routes
│   └── 📂 utils/
│       ├── 📄 ApiError.js           # Error handling class
│       ├── 📄 ApiResponse.js        # Response formatting
│       ├── 📄 asyncHandler.js       # Async wrapper
│       └── 📄 cloudinary.js         # Cloudinary utilities
├── 📂 docs/                        # Documentation
├── 📄 package.json                 # Dependencies and scripts
├── 📄 README.md                    # Project documentation
└── 📄 .env                         # Environment variables
```

---

## 🎯 Development Journey

### **📅 Development Timeline (Based on Git Commits)**

#### **Phase 1: Foundation Setup**
- ✅ **Initial commit** - Project initialization
- ✅ **Setup-2** - Basic project structure
- ✅ **Prettier configuration** - Code formatting setup
- ✅ **MongoDB Atlas connection** - Database setup
- ✅ **Utils code** - Helper functions and utilities

#### **Phase 2: Core Models & Authentication**
- ✅ **User and Video models** - Database schemas
- ✅ **Cloudinary file handling** - File upload system
- ✅ **Register controller** - User registration logic
- ✅ **Refresh token functionality** - JWT implementation
- ✅ **User routes with account management** - Complete user system

#### **Phase 3: Advanced Features**
- ✅ **User aggregation queries** - Complex database operations
- ✅ **Comments, likes, playlists, tweets models** - Social features
- ✅ **Controllers for all features** - Business logic implementation
- ✅ **Routes for all features** - API endpoints
- ✅ **Dashboard and analytics** - Channel statistics

#### **Phase 4: Documentation & Polish**
- ✅ **Project handbook** - Comprehensive documentation
- ✅ **Subscription schema explanation** - Database design docs
- ✅ **Middleware explanations** - Technical documentation
- ✅ **Complete project flow** - End-to-end documentation

### **🏆 Key Achievements**
- 🎯 **Professional Architecture**: Implemented industry-standard patterns
- 🔒 **Security Best Practices**: JWT, bcrypt, CORS, input validation
- 📊 **Complex Database Operations**: Aggregation pipelines, relationships
- 🚀 **Scalable Design**: Modular structure, middleware patterns
- 📚 **Comprehensive Documentation**: Code comments, technical docs

---

## 🔒 Security Features

### **🛡️ Authentication & Authorization**
- JWT access tokens (short-lived)
- JWT refresh tokens (long-lived)
- Password hashing with bcrypt (10 rounds)
- Cookie-based token storage
- Protected route middleware

### **🔐 Data Protection**
- Input validation and sanitization
- Password field exclusion in responses
- Secure file upload handling
- Environment variable protection
- CORS configuration

### **🚨 Error Handling**
- Custom error classes
- Async error handling
- Detailed error messages (development)
- Secure error responses (production)
- File cleanup on errors

---

## 📚 Key Learning Points

### **🎓 Technical Skills Developed**
1. **Backend Architecture**: MVC pattern, middleware chains
2. **Database Design**: MongoDB relationships, aggregation pipelines
3. **Authentication**: JWT implementation, token management
4. **File Handling**: Multer middleware, cloud storage integration
5. **Error Management**: Custom error classes, async handling
6. **API Design**: RESTful principles, response formatting

### **💡 Best Practices Learned**
1. **Security First**: Authentication, authorization, input validation
2. **Scalable Structure**: Modular design, separation of concerns
3. **Documentation**: Code comments, technical documentation
4. **Error Handling**: Comprehensive error management
5. **Testing**: API testing, error scenarios
6. **Performance**: Database optimization, file handling

### **🔧 Industry Standards**
1. **Code Organization**: Professional folder structure
2. **Environment Management**: Configuration best practices
3. **Version Control**: Meaningful commit messages
4. **Documentation**: Technical handbooks, API docs
5. **Security**: Industry-standard security practices

---

## 🤝 Contributing

We welcome contributions! This project is perfect for learning backend development.

### **🚀 How to Contribute**
1. 🍴 Fork the project
2. 🔀 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. ✅ Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

### **💡 Contribution Ideas**
- Complete video controller implementations
- Add email verification system
- Implement rate limiting
- Add comprehensive testing
- Create admin dashboard
- Add real-time notifications
- Implement video streaming
- Add social login (OAuth)

---

<div align="center">

### **🌟 Project Highlights**
*Professional-grade backend • Industry best practices • Comprehensive documentation • Scalable architecture*

**📊 Project Stats**
- 🔥 **7 Core Models** implemented
- 🚀 **25+ API Endpoints** designed
- 🔒 **JWT Authentication** with refresh tokens
- 📁 **Cloudinary Integration** for media management
- 📊 **MongoDB Aggregation** for analytics
- 📚 **1000+ lines** of documentation

---

**Made with ❤️ by [Karan Patel](https://github.com/KaranPatelDev)**

⭐ **Star this repo if you find it helpful!** ⭐

*This project represents a complete learning journey in backend development with Node.js, Express, and MongoDB*

</div>
