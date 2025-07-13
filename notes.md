# 🎬 YouTube Backend Project Documentation

## 📖 Table of Contents
- [🚀 Project Overview](#-project-overview)
- [🏗️ Architecture & Structure](#️-architecture--structure)
- [📦 Dependencies Deep Dive](#-dependencies-deep-dive)
- [🛠️ Development Dependencies](#️-development-dependencies)
- [🔧 Middleware Concepts](#-middleware-concepts)
- [🌍 Environment Setup](#-environment-setup)
- [⭐ Key Features](#-key-features)
- [🔐 API Authentication](#-api-authentication)
- [🗄️ Database Schema](#️-database-schema)
- [📁 File Upload System](#-file-upload-system)
- [🚀 Getting Started](#-getting-started)
- [💡 Personal Development Notes](#-personal-development-notes)

---

## 🚀 Project Overview

A **YouTube-like backend application** built with modern Node.js technologies, featuring user authentication, video management, file uploads, and RESTful API design. This project follows industry best practices with proper error handling, middleware implementation, and scalable architecture.

### 🎯 **Core Features**
- User registration & authentication with JWT
- Video upload & management with Cloudinary
- File handling with Multer middleware
- MongoDB integration with Mongoose
- Standardized error handling & API responses
- CORS support for cross-origin requests
- Professional middleware architecture

---

## 🏗️ Architecture & Structure

```
youtube-backend/
├── 📁 src/
│   ├── 📄 app.js                    # Express app configuration
│   ├── 📄 index.js                  # Application entry point
│   ├── 📄 constants.js              # Application constants
│   ├── 📁 controllers/              # Route controllers (business logic)
│   ├── 📁 db/
│   │   └── 📄 index.js              # Database connection logic
│   ├── 📁 middlewares/
│   │   └── 📄 multer.middleware.js  # File upload middleware
│   ├── 📁 models/
│   │   ├── 📄 user.models.js        # User schema & methods
│   │   └── 📄 video.models.js       # Video schema & methods
│   ├── 📁 routes/                   # API route definitions
│   └── 📁 utils/
│       ├── 📄 ApiError.js           # Custom error class
│       ├── 📄 ApiResponse.js        # Standardized API responses
│       ├── 📄 asyncHandler.js       # Async error handling wrapper
│       └── 📄 cloudinary.js         # Cloud storage utility
├── 📁 public/
│   └── 📁 temp/                     # Temporary file storage
├── 📄 package.json                  # Project dependencies & scripts
├── 📄 .env                          # Environment variables
└── 📄 notes.md                      # Project documentation
```

---

## 📦 Dependencies Deep Dive

### 🔧 **Production Dependencies**

#### **🌐 Express.js** (`^5.1.0`)
```javascript
import express from 'express';
const app = express();
```
- **Purpose**: Fast, minimalist web framework for Node.js
- **Usage**: Core framework for building RESTful APIs
- **Key Features**:
  - Robust routing system
  - Middleware support
  - HTTP utility methods
  - Template engine support
  - Request/response handling

#### **🗄️ Mongoose** (`^8.16.3`)
```javascript
import mongoose from 'mongoose';
await mongoose.connect(connectionString);
```
- **Purpose**: MongoDB object modeling library
- **Usage**: Database ORM for MongoDB interactions
- **Key Features**:
  - Schema validation and type casting
  - Middleware (pre/post hooks)
  - Built-in query builders
  - Population (joins)
  - Connection management

#### **🔧 Mongoose Aggregate Paginate V2** (`^1.1.4`)
```javascript
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
userSchema.plugin(mongooseAggregatePaginate);
```
- **Purpose**: Advanced pagination for MongoDB aggregation queries
- **Usage**: Efficient data pagination in complex queries
- **Key Features**:
  - Aggregate pipeline support
  - Custom pagination options
  - Performance optimization
  - Flexible result formatting
  - Memory efficient for large datasets

#### **🔐 bcrypt** (`^6.0.0`)
```javascript
import bcrypt from 'bcrypt';
const hashedPassword = await bcrypt.hash(password, 10);
const isMatch = await bcrypt.compare(password, hashedPassword);
```
- **Purpose**: Password hashing library with salt
- **Usage**: Secure password storage and validation
- **Key Features**:
  - Salt-based hashing (prevents rainbow table attacks)
  - Configurable cost factor (difficulty)
  - Async/sync operations
  - Industry-standard security (used by major platforms)

#### **🎫 JSON Web Token** (`^9.0.2`)
```javascript
import jwt from 'jsonwebtoken';
const token = jwt.sign(payload, secret, { expiresIn: '24h' });
const decoded = jwt.verify(token, secret);
```
- **Purpose**: Stateless authentication tokens
- **Usage**: User authentication and authorization
- **Key Features**:
  - Stateless authentication (no server-side sessions)
  - Token expiration control
  - Digital signatures for security
  - Cross-service compatibility
  - Payload customization

#### **🌍 CORS** (`^2.8.5`)
```javascript
import cors from 'cors';
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
```
- **Purpose**: Cross-Origin Resource Sharing middleware
- **Usage**: Enable cross-origin requests from frontend
- **Key Features**:
  - Origin whitelisting for security
  - Credential support (cookies, headers)
  - Preflight request handling
  - Custom headers configuration

#### **🍪 Cookie Parser** (`^1.4.7`)
```javascript
import cookieParser from 'cookie-parser';
app.use(cookieParser());
```
- **Purpose**: Parse HTTP cookies from requests
- **Usage**: Handle authentication cookies and session management
- **Key Features**:
  - Cookie parsing and serialization
  - Signed cookies support
  - JSON cookie support
  - Secure cookie handling

#### **🔧 dotenv** (`^17.2.0`)
```javascript
import dotenv from 'dotenv';
dotenv.config({ path: './env' });
```
- **Purpose**: Environment variable management
- **Usage**: Load configuration from .env files
- **Key Features**:
  - Environment isolation
  - Configuration management
  - Security best practices
  - Multiple environment support

#### **📂 Multer** (`^1.4.5-lts.1`)
```javascript
import multer from 'multer';
const upload = multer({ storage: diskStorage });
```
- **Purpose**: Middleware for handling multipart/form-data (file uploads)
- **Usage**: Handle file uploads in Express applications
- **Key Features**:
  - Memory and disk storage options
  - File filtering and validation
  - Multiple file upload support
  - Custom filename and destination handling
  - File size limits and type restrictions

#### **☁️ Cloudinary** (`^1.41.3`)
```javascript
import { v2 as cloudinary } from 'cloudinary';
const response = await cloudinary.uploader.upload(filePath);
```
- **Purpose**: Cloud-based image and video management service
- **Usage**: Store, optimize, and deliver media files
- **Key Features**:
  - Auto-optimization of images/videos
  - CDN delivery for fast loading
  - Image/video transformations on-the-fly
  - Secure upload with automatic backups
  - Analytics and usage tracking

---

## 🛠️ Development Dependencies

#### **🔄 Nodemon** (`^3.1.10`)
```json
"scripts": {
  "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
}
```
- **Purpose**: Development server with auto-restart
- **Usage**: Automatic server restart on file changes
- **Key Features**:
  - File watching with customizable patterns
  - Process management
  - Configuration options
  - Development efficiency boost

#### **✨ Prettier** (`^3.6.2`)
```javascript
// Code formatting configuration
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```
- **Purpose**: Opinionated code formatter
- **Usage**: Consistent code styling across team
- **Key Features**:
  - Automatic formatting
  - Customizable rules
  - IDE integration
  - Team consistency enforcement

---

## 🔧 Middleware Concepts

### **🎭 What are Middlewares?**
> **Personal Note**: *"Middlewares be like jane se pehle mujhse milke jaana"* 
> 
> Translation: Middlewares are like saying "before you go, come meet me first!"

Middlewares are functions that execute **during the request-response cycle**. They have access to:
- `req` (request object)
- `res` (response object) 
- `next` (next middleware function)

### **🔄 Middleware Execution Flow**
```javascript
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

### **📂 Multer Middleware Deep Dive**

#### **File Upload Properties**
| Property    | Description                                 | Storage Type  |
|-------------|---------------------------------------------|---------------|
| destination | The folder to which the file has been saved | DiskStorage   |
| filename    | The name of the file within the destination | DiskStorage   |
| path        | The full path to the uploaded file          | DiskStorage   |
| buffer      | A Buffer of the entire file                 | MemoryStorage |

#### **Implementation Example**
```javascript
// Personal Note: upload.single('avatar') is the middleware that handles file upload
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file contains file information
    // req.body contains other form fields
});
```

### **🛡️ Middleware Stack in This Project**
1. **CORS** - Cross-origin resource sharing
2. **Body Parser** - JSON and URL-encoded data parsing
3. **Static Files** - Public folder serving
4. **Cookie Parser** - HTTP cookie handling
5. **Multer** - File upload handling
6. **Custom Auth** - JWT token verification
7. **Error Handling** - Centralized error processing

---

## 🌍 Environment Setup

### **📋 Required Environment Variables**

```bash
# Server Configuration
PORT=8000

# Database Configuration
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net"

# Security
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your-super-secret-key
JWT_EXPIRY=1d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Additional Configuration
DB_NAME=videotube
```

### **🔒 Security Notes**
- **JWT Secret**: Use a strong, randomly generated secret (min 32 characters)
- **Database URI**: URL-encode special characters (@ → %40)
- **CORS Origin**: Specify exact frontend domains in production
- **Cloudinary**: Keep API secrets secure and never expose in frontend
- **Environment**: Never commit .env files to version control

---

## ⭐ Key Features

### **🔐 Authentication System**
```javascript
// JWT Bearer Token Implementation
// Personal Note: JWT is bearer token - stateless authentication
Authorization: Bearer <jwt-token>
```

### **📊 Error Handling**
```javascript
class ApiError extends Error {
    constructor(statusCode, message, errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;
    }
}
```

### **📈 API Response Standardization**
```javascript
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}
```

### **🔄 Async Error Handling**
```javascript
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
               .catch((err) => next(err));
    }
}
```

---

## 📁 File Upload System

### **🔧 Multer Configuration**
```javascript
const storage = multer.diskStorage({
  destination: function (req, file, cb/* Callback */) {
    cb(null, "../../public/temp") // Temporary storage before cloud upload
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now()) // Original name + timestamp
  }
})
```

### **☁️ Cloudinary Integration**
```javascript
const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Auto-detect file type
        })
        console.log("File Uploaded Successfully:", response.url);
        return response;
    } catch (error) {
        // Remove local file if upload fails
        fs.unlinkSync(localFilePath);
        return null;
    }
}
```

### **📋 File Upload Workflow**
1. **Client uploads file** → Multer saves to local temp folder
2. **Server processes file** → Upload to Cloudinary
3. **Get Cloudinary URL** → Save URL to database
4. **Clean up** → Remove local temp file
5. **Return response** → Send success/error to client

---

## 🗄️ Database Schema

### **👤 User Model Features**
- Unique username and email with validation
- Password hashing with bcrypt (10 salt rounds)
- JWT token generation methods
- Index optimization for frequent queries
- Automatic timestamp tracking
- Profile picture and cover image URLs

### **🎥 Video Model Features**
- File metadata storage (title, description, duration)
- User association with ObjectId reference
- Cloudinary URLs for video and thumbnail
- View count and engagement metrics
- Aggregation pipeline support for analytics
- Pagination capabilities for video lists

---

## 🚀 Getting Started

### **1. Installation**
```bash
npm install
```

### **2. Environment Setup**
```bash
# Create .env file with required variables
cp .env.example .env
# Edit .env with your actual values
```

### **3. Development Server**
```bash
npm run dev
```

### **4. Production Build**
```bash
npm start
```

---

## 💡 Personal Development Notes

### **🎯 Best Practices Implemented**
- ✅ **Modular Architecture**: Separation of concerns with clear folder structure
- ✅ **Environment Configuration**: Secure config management with dotenv
- ✅ **Standardized Error Handling**: Custom ApiError class for consistent responses
- ✅ **Security Middleware**: JWT, CORS, bcrypt implementation
- ✅ **Database Optimization**: Mongoose with indexing and aggregation
- ✅ **RESTful API Design**: Following REST principles and HTTP standards
- ✅ **File Upload Strategy**: Local temp → Cloud storage → Cleanup workflow
- ✅ **Code Quality**: Prettier for formatting, meaningful variable names

### **🔄 Middleware Philosophy**
> *"Middlewares be like jane se pehle mujhse milke jaana"*

**Translation & Meaning**: Before any request reaches its final destination (route handler), it must pass through various checkpoints (middlewares). Each middleware has a specific job:

1. **Authentication**: "Are you who you say you are?"
2. **Authorization**: "Are you allowed to do this?"
3. **Validation**: "Is your data correct?"
4. **File Processing**: "Let me handle your files properly"
5. **Error Handling**: "If something goes wrong, I'll catch it"

### **🛡️ Security Implementation Notes**
- **Password Security**: Using bcrypt with 10 salt rounds for optimal security/performance balance
- **JWT Strategy**: Stateless tokens with expiration for scalability
- **File Security**: Temporary local storage before cloud upload prevents direct access
- **CORS Policy**: Restricting origins to prevent unauthorized cross-domain requests
- **Input Validation**: Mongoose schemas provide first line of defense

### **📊 Performance Considerations**
- **Database**: Indexes on frequently queried fields (email, username)
- **File Uploads**: Temporary storage prevents memory overflow on large files
- **Pagination**: Aggregate paginate for efficient large dataset handling
- **Error Handling**: Async wrapper prevents memory leaks from unhandled promises

### **🔧 Development Workflow**
1. **Route Definition**: Define URL patterns and HTTP methods
2. **Middleware Setup**: Add authentication, validation, file handling
3. **Controller Logic**: Implement business logic with error handling
4. **Database Operations**: Use Mongoose for data persistence
5. **Response Format**: Standardized ApiResponse for consistency
6. **Testing**: Manual testing with proper error scenarios

---

## 📁 Folder Structure & Usage Guide

### **🎯 Root Level Directories**

#### **📂 `src/` - Source Code Directory**
The heart of your application containing all the business logic and core functionality.

**Purpose**: Houses all application source code  
**Why Separate**: Keeps production code separate from configuration files and dependencies  
**Best Practice**: All your custom code should live here

#### **📂 `public/` - Static Assets Directory**
Contains publicly accessible files that don't require processing.

**Purpose**: Serve static files directly to clients  
**Usage**: Images, CSS, client-side JavaScript, temporary uploads  
**Access**: Files here are accessible via HTTP requests (e.g., `http://localhost:8000/temp/file.jpg`)

#### **📂 `node_modules/` - Dependencies Directory**
Auto-generated folder containing all installed npm packages.

**Purpose**: Stores all project dependencies  
**Management**: Automatically managed by npm/yarn  
**Note**: Never modify files here directly, always excluded from version control

---

### **🔧 Source Code Folders (`src/` breakdown)**

#### **📂 `controllers/` - Business Logic Layer**
```javascript
// Example: userController.js
export const getUserProfile = async (req, res) => {
    // Handle user profile logic here
}
```

**Purpose**: Contains the main business logic for each feature  
**What Goes Here**: Functions that process requests, interact with database, and return responses  
**Why Separate**: Keeps route definitions clean and business logic organized  
**Best Practice**: One controller file per major feature (users, videos, auth)

#### **📂 `models/` - Database Schema Layer**
```javascript
// Example: user.models.js
const userSchema = new mongoose.Schema({
    username: { type: String, required: true }
});
```

**Purpose**: Defines database schemas and data models  
**What Goes Here**: Mongoose schemas, model methods, database validations  
**Why Important**: Ensures data consistency and provides type safety  
**Best Practice**: One model file per database collection

#### **📂 `routes/` - API Endpoint Definitions**
```javascript
// Example: userRoutes.js
router.get('/profile', getUserProfile);
router.post('/register', registerUser);
```

**Purpose**: Defines API endpoints and HTTP methods  
**What Goes Here**: URL patterns, HTTP methods, middleware assignments  
**Why Separate**: Clean separation between "what URLs exist" and "what they do"  
**Best Practice**: Group related endpoints in same file

#### **📂 `middlewares/` - Request Processing Layer**
```javascript
// Example: auth.middleware.js
export const verifyJWT = (req, res, next) => {
    // Check if user is authenticated
    next();
}
```

**Purpose**: Functions that run between request and response  
**What Goes Here**: Authentication, validation, file upload, error handling  
**Why Useful**: Reusable code that multiple routes can share  
**Examples**: JWT verification, file upload handling, input validation

#### **📂 `utils/` - Helper Functions**
```javascript
// Example: ApiResponse.js
class ApiResponse {
    constructor(statusCode, data, message) {
        // Standardized response format
    }
}
```

**Purpose**: Reusable utility functions and classes  
**What Goes Here**: Helper functions, custom classes, common operations  
**Why Separate**: Prevents code duplication across the application  
**Examples**: API response formatting, error handling, data transformations

#### **📂 `db/` - Database Configuration**
```javascript
// Example: index.js
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
}
```

**Purpose**: Database connection setup and configuration  
**What Goes Here**: Connection logic, database initialization, connection pooling  
**Why Separate**: Centralizes database setup and makes it reusable  
**Best Practice**: Keep connection logic separate from business logic

---

### **📁 Special Purpose Folders**

#### **📂 `public/temp/` - Temporary File Storage**
**Purpose**: Temporary storage for uploaded files before cloud processing  
**Usage**: Multer saves files here before uploading to Cloudinary  
**Lifecycle**: Files are automatically cleaned up after cloud upload  
**Security**: Not directly accessible from outside, used only for processing

```javascript
// Workflow: Local Upload → Process → Cloud Upload → Delete Local
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../../public/temp") // Temporary storage
    }
});
```

---

### **🎯 Folder Organization Benefits**

#### **🔄 Separation of Concerns**
- Each folder has a single, clear responsibility
- Easy to locate specific functionality
- Reduces coupling between different parts of the application

#### **📈 Scalability**
- Easy to add new features without affecting existing code
- Team members can work on different folders simultaneously
- Clear boundaries make testing easier

#### **🛠️ Maintainability**
- Predictable file locations
- Consistent naming conventions
- Easy to onboard new developers

#### **🔍 Debugging & Development**
- Quick identification of where issues might be
- Logical flow: Routes → Middlewares → Controllers → Models
- Clear data flow makes debugging easier

---

### **📋 Folder Usage Examples**

#### **Creating a New Feature (e.g., Comments)**
1. **Model**: `src/models/comment.models.js` - Define comment schema
2. **Controller**: `src/controllers/commentController.js` - Business logic
3. **Routes**: `src/routes/commentRoutes.js` - API endpoints
4. **Middleware**: `src/middlewares/` - Reuse existing auth middleware
5. **Utils**: `src/utils/` - Reuse existing ApiResponse and ApiError

#### **Request Flow Through Folders**
```
1. Client Request → routes/ (URL matching)
2. routes/ → middlewares/ (authentication, validation)
3. middlewares/ → controllers/ (business logic)
4. controllers/ → models/ (database operations)
5. controllers/ → utils/ (response formatting)
6. Response sent back to client
```

---

### **🚫 What NOT to Put in Each Folder**

#### **❌ Controllers**
- Don't put route definitions here
- Don't put database schemas here
- Don't put utility functions here

#### **❌ Models**
- Don't put business logic here
- Don't put API response formatting here
- Keep it focused on data structure only

#### **❌ Routes**
- Don't put business logic here
- Keep them thin and focused on URL patterns
- Delegate actual work to controllers

#### **❌ Utils**
- Don't put business-specific logic here
- Keep functions generic and reusable
- Don't put database models here

---

### **💡 Personal Organization Tips**

> **Development Philosophy**: *"Each folder should have a single, clear purpose. If you're confused about where to put something, think about what it primarily does."*

- **When in doubt**: Ask yourself "What is the primary responsibility of this code?"
- **Naming convention**: Use descriptive names (userController.js, not controller.js)
- **File size**: If a file gets too large, consider splitting by feature
- **Dependencies**: Utils should not depend on controllers, models should not depend on controllers

---

**📅 Last Updated: July 13, 2025**  
**👨‍💻 Author: Karan Patel**  
**🎓 Learning Journey**: Building production-ready backend with modern Node.js stack