# YouTube Backend - Complete Project Handbook

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Project Structure](#project-structure)
4. [Dependencies Deep Dive](#dependencies-deep-dive)
5. [Configuration Files](#configuration-files)
6. [Source Code Architecture](#source-code-architecture)
7. [How Code Components Work Together](#how-code-components-work-together)
8. [Database Models](#database-models)
9. [API Endpoints](#api-endpoints)
10. [Authentication & Security](#authentication--security)
11. [File Upload System](#file-upload-system)
12. [Error Handling](#error-handling)
13. [Development Workflow](#development-workflow)

---

## Project Overview

This is a full-featured YouTube backend clone built with Node.js and Express.js. The project implements a complete video streaming platform backend with user authentication, video management, subscriptions, and social features.

### Key Features:
- User registration and authentication (JWT-based)
- Video upload and management
- User subscriptions system
- File upload handling (Cloudinary integration)
- Comprehensive error handling
- RESTful API design
- MongoDB with Mongoose ODM

---

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   Server Side   │    │   Database      │
│                 │    │                 │    │                 │
│  React/Vue/     │◄──►│  Express.js     │◄──►│  MongoDB        │
│  Angular        │    │  Node.js        │    │                 │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   External      │
                    │   Services      │
                    │                 │
                    │  • Cloudinary   │
                    │  • JWT          │
                    └─────────────────┘
```

### Architecture Layers:
1. **Presentation Layer**: API endpoints and routes
2. **Business Logic Layer**: Controllers and middleware
3. **Data Access Layer**: Models and database connection
4. **External Services**: Cloudinary for file storage

---

## Project Structure

```
youtube-backend/
├── .env                          # Environment variables
├── .env.sample                   # Environment template
├── package.json                  # Dependencies and scripts
├── README.md                     # Project documentation
├── public/                       # Static files and temp uploads
│   └── temp/                     # Temporary file storage
├── src/                          # Source code
│   ├── app.js                    # Express app configuration
│   ├── index.js                  # Entry point
│   ├── constants.js              # Application constants
│   ├── controller/               # Business logic
│   ├── db/                       # Database connection
│   ├── middlewares/              # Custom middleware
│   ├── models/                   # Database models
│   ├── routes/                   # API routes
│   └── utils/                    # Utility functions
└── node_modules/                 # Dependencies
```

---

## Dependencies Deep Dive

### Production Dependencies (`dependencies`)

#### **bcrypt (v6.0.0)**
- **Purpose**: Password hashing and comparison
- **Why Used**: Securely hash passwords before storing in database
- **Implementation**: Used in User model's pre-save hook and password comparison method
- **Security**: Uses salt rounds (10) for strong hashing

#### **cloudinary (v2.7.0)**
- **Purpose**: Cloud-based image and video storage
- **Why Used**: Store user avatars, cover images, and video files
- **Features**: 
  - Automatic optimization
  - Multiple format support
  - CDN delivery
  - Image transformations
- **Implementation**: Used in utils/cloudinary.js for file uploads

#### **cookie-parser (v1.4.7)**
- **Purpose**: Parse HTTP cookies
- **Why Used**: Extract JWT tokens from cookies for authentication
- **Implementation**: Middleware in app.js to parse cookies from requests

#### **cors (v2.8.5)**
- **Purpose**: Cross-Origin Resource Sharing
- **Why Used**: Allow frontend applications to access the API
- **Configuration**: Set specific origin and credentials support

#### **dotenv (v17.2.0)**
- **Purpose**: Load environment variables from .env file
- **Why Used**: Manage configuration securely
- **Implementation**: Loads environment variables at application startup

#### **express (v5.1.0)**
- **Purpose**: Web application framework
- **Why Used**: Core framework for building REST API
- **Features**:
  - Routing
  - Middleware support
  - HTTP utilities
  - Template engine support

#### **jsonwebtoken (v9.0.2)**
- **Purpose**: JWT token creation and verification
- **Why Used**: Implement stateless authentication
- **Implementation**: 
  - Generate access and refresh tokens
  - Verify tokens in middleware
  - Store user information in tokens

#### **mongoose (v8.16.3)**
- **Purpose**: MongoDB object modeling
- **Why Used**: 
  - Schema definition
  - Data validation
  - Query building
  - Middleware support
- **Features**: 
  - Pre/post hooks
  - Virtual properties
  - Population
  - Aggregation pipelines

#### **mongoose-aggregate-paginate-v2 (v1.1.4)**
- **Purpose**: Pagination for MongoDB aggregation queries
- **Why Used**: Implement pagination for video listings and search results
- **Implementation**: Plugin for Video model

#### **multer (v2.0.1)**
- **Purpose**: File upload handling
- **Why Used**: Handle multipart/form-data for file uploads
- **Implementation**: 
  - Temporary file storage
  - File validation
  - Multiple file support

### Development Dependencies (`devDependencies`)

#### **nodemon (v3.1.10)**
- **Purpose**: Development server with auto-restart
- **Why Used**: Automatically restart server on file changes during development
- **Configuration**: Watches for file changes and restarts with environment variables

#### **prettier (v3.6.2)**
- **Purpose**: Code formatting
- **Why Used**: Maintain consistent code style across the project
- **Configuration**: .prettierrc file for formatting rules

---

## Configuration Files

### **package.json**
```json
{
  "name": "youtube-backend",
  "version": "1.0.0",
  "type": "module",  // Enable ES6 modules
  "scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
  }
}
```

### **.env Configuration**
Required environment variables:
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=http://localhost:3000
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## Source Code Architecture

### **src/index.js** - Entry Point
```javascript
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({ path: './env' });

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB!!!!!", err);
});
```

**Purpose**: Application entry point that:
- Loads environment variables
- Establishes database connection
- Starts the Express server
- Handles startup errors

### **src/app.js** - Express App Configuration
```javascript
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();

// Middleware configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

export { app };
```

**Purpose**: Express application setup with:
- CORS configuration for cross-origin requests
- JSON and URL-encoded body parsing
- Static file serving
- Cookie parsing
- API versioning (`/api/v1/`)

### **src/constants.js** - Application Constants
```javascript
export const DB_NAME = "videotube";
```

**Purpose**: Centralized configuration constants

### **src/db/index.js** - Database Connection
```javascript
import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Connected to MongoDB successfully. DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;
```

**Purpose**: Database connection management with:
- Connection string construction
- Error handling
- Connection status logging
- Graceful failure handling

---

## How Code Components Work Together

### **Request Flow Architecture**

```
Client Request
     │
     ▼
┌─────────────────┐
│   app.js        │  ◄── Express app configuration
│   (Middleware)  │      • CORS, JSON parsing, cookies
└─────────────────┘
     │
     ▼
┌─────────────────┐
│   Routes        │  ◄── URL pattern matching
│   user.routes.js│      • /api/v1/users/*
└─────────────────┘
     │
     ▼
┌─────────────────┐
│   Middleware    │  ◄── Authentication & file handling
│   auth.middleware│      • JWT verification
│   multer.middleware│    • File upload processing
└─────────────────┘
     │
     ▼
┌─────────────────┐
│   Controllers   │  ◄── Business logic
│   user.controller│      • Process requests
└─────────────────┘      • Interact with models
     │
     ▼
┌─────────────────┐
│   Models        │  ◄── Database operations
│   user.models.js│      • Schema validation
└─────────────────┘      • Data persistence
     │
     ▼
┌─────────────────┐
│   Database      │  ◄── MongoDB
│   MongoDB       │      • Data storage
└─────────────────┘
     │
     ▼
Response to Client
```

### **Component Interaction Details**

#### **1. Routes → Controllers**
```javascript
// In user.routes.js
router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    registerUser  // Controller function
);
```

#### **2. Controllers → Models**
```javascript
// In user.controller.js
const existedUser = await User.findOne({ $or: [{ username }, { email }] });
const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
});
```

#### **3. Models → Database**
```javascript
// In user.models.js
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    // ... other fields
});

export const User = mongoose.model('User', userSchema);
```

### **Middleware Chain Execution**

```javascript
// Example: User registration with file upload
router.route("/register").post(
    upload.fields([...]),     // 1. Multer middleware (file handling)
    registerUser              // 2. Controller function
);

// Example: Protected route
router.route("/current-user").get(
    verifyJWT,               // 1. JWT verification middleware
    getCurrentUser           // 2. Controller function
);
```

---

## Database Models

### **User Model (src/models/user.models.js)**

```javascript
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,        // Database index for fast queries
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,       // Cloudinary URL
        required: true,
    },
    coverImage: {
        type: String,       // Cloudinary URL
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Video',       // Reference to Video model
    }],
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    },
}, {
    timestamps: true        // Automatic createdAt and updatedAt
});
```

#### **User Model Hooks & Methods**

```javascript
// Pre-save hook for password hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Instance method for password comparison
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Instance method for generating access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { 
            id: this._id,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

// Instance method for generating refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        { id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}
```

### **Video Model (src/models/video.models.js)**

```javascript
const videoSchema = new Schema({
    videoFile: {
        type: String,       // Cloudinary URL
        required: true,
    },
    thumbnail: {
        type: String,       // Cloudinary URL
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,       // Video duration in seconds
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',        // Reference to User model
    },
}, {
    timestamps: true
});

// Plugin for pagination support
videoSchema.plugin(mongooseAggregatePaginate);
```

### **Subscription Model (src/models/subscription.models.js)**

```javascript
const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,    // User who is subscribing
        ref: 'User',
    },
    channel: {
        type: Schema.Types.ObjectId,    // User being subscribed to
        ref: 'User',
    },
}, {
    timestamps: true
});
```

**Complex Relationship**: This model creates a many-to-many relationship between users, where:
- A user can subscribe to multiple channels
- A channel can have multiple subscribers
- Used in aggregation pipelines for subscriber counts

---

## Utility Functions

### **src/utils/ApiError.js** - Custom Error Class
```javascript
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
```

**Purpose**: 
- Standardized error handling
- HTTP status code management
- Error stack trace capture
- Consistent error response format

### **src/utils/ApiResponse.js** - Response Wrapper
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

**Purpose**:
- Consistent API response format
- Automatic success flag based on status code
- Standardized data structure

### **src/utils/asyncHandler.js** - Async Error Handler
```javascript
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    }
}
```

**Purpose**:
- Wraps async functions to handle errors
- Eliminates need for try-catch in every controller
- Passes errors to Express error handler

### **src/utils/cloudinary.js** - File Upload Service
```javascript
const uploadOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        
        fs.unlinkSync(localFilePath);  // Remove temporary file
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);  // Cleanup on error
        return null;
    }
}
```

**Purpose**:
- Upload files to Cloudinary
- Handle temporary file cleanup
- Return upload response or null

---

## Middleware System

### **src/middlewares/auth.middleware.js** - JWT Authentication
```javascript
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || 
                     req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
        
        if (!user) {
            throw new ApiError(401, "Invalid Access Token!");
        }
        
        req.user = user;  // Attach user to request
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
```

**Features**:
- Token extraction from cookies or headers
- JWT verification
- User lookup and attachment to request
- Error handling for invalid tokens

### **src/middlewares/multer.middleware.js** - File Upload
```javascript
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");  // Temporary storage
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());  // Unique filename
    }
});

export const upload = multer({ storage });
```

**Features**:
- Temporary file storage
- Unique filename generation
- Configurable destination

---

## Controllers Deep Dive

### **User Registration Flow**
```javascript
const registerUser = asyncHandler(async (req, res) => {
    // 1. Extract user data from request
    const { fullName, username, email, password } = req.body;
    
    // 2. Validate required fields
    if ([fullName, username, email, password].some(field => field?.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }
    
    // 3. Check if user already exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(409, 'Username or email already exists');
    }
    
    // 4. Handle file uploads
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar is required');
    }
    
    let coverImageLocalPath;
    if (req.files?.coverImage?.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    
    // 5. Upload to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    
    if (!avatar) {
        throw new ApiError(500, 'Avatar upload failed');
    }
    
    // 6. Create user in database
    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    });
    
    // 7. Remove sensitive data from response
    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    
    if (!createdUser) {
        throw new ApiError(500, 'User creation failed');
    }
    
    // 8. Send response
    return res.status(201).json(
        new ApiResponse(201, createdUser, 'User registered successfully')
    );
});
```

### **User Login Flow**
```javascript
const loginUser = asyncHandler(async (req, res) => {
    // 1. Extract credentials
    const { username, email, password } = req.body;
    
    // 2. Validate input
    if (!username && !email) {
        throw new ApiError(400, 'Username or email is required');
    }
    
    // 3. Find user
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    
    // 4. Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password');
    }
    
    // 5. Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    
    // 6. Get user without sensitive data
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
    
    // 7. Set cookie options
    const options = {
        httpOnly: true,
        secure: true,
    };
    
    // 8. Send response with cookies
    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(200, { 
            user: loggedInUser, 
            accessToken, 
            refreshToken 
        }, 'User logged in successfully'));
});
```

### **Complex Aggregation Pipeline Example**
```javascript
const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;
    
    if (!username?.trim()) {
        throw new ApiError(400, 'Username is required');
    }
    
    const channel = await User.aggregate([
        // Stage 1: Match user by username
        {
            $match: {
                username: username?.toLowerCase(),
            }
        },
        // Stage 2: Lookup subscribers
        {
            $lookup: {
                from: 'subscriptions',
                localField: '_id',
                foreignField: 'channel',
                as: 'subscribers'
            }
        },
        // Stage 3: Lookup subscribed channels
        {
            $lookup: {
                from: 'subscriptions',
                localField: '_id',
                foreignField: 'subscriber',
                as: 'subscribedTo'
            }
        },
        // Stage 4: Add calculated fields
        {
            $addFields: {
                subscribersCount: { $size: '$subscribers' },
                channelsSubscribedToCount: { $size: '$subscribedTo' },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, '$subscribers.subscriber'] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        // Stage 5: Project required fields
        {
            $project: {
                fullName: 1,
                username: 1,
                email: 1,
                avatar: 1,
                coverImage: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
            }
        }
    ]);
    
    if (!channel?.length) {
        throw new ApiError(404, 'Channel not found');
    }
    
    return res.status(200).json(
        new ApiResponse(200, channel[0], 'Channel profile fetched successfully')
    );
});
```

---

## Authentication & Security

### **JWT Token System**

#### **Token Generation**
```javascript
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, 'Error generating tokens');
    }
}
```

#### **Token Verification**
```javascript
const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || 
                 req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
    
    if (!user) {
        throw new ApiError(401, "Invalid Access Token");
    }
    
    req.user = user;
    next();
});
```

### **Password Security**
- **Hashing**: bcrypt with salt rounds of 10
- **Pre-save Hook**: Automatic password hashing before database save
- **Comparison**: Secure password comparison using bcrypt
- **Validation**: Required field validation with custom error messages

---

## API Endpoints

### **User Authentication Routes**
```javascript
// Public routes
router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    registerUser
);

router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// Protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
router.route("/history").get(verifyJWT, getWatchHistory);
```

### **API Documentation**

#### **POST /api/v1/users/register**
- **Purpose**: Register a new user
- **Body**: `multipart/form-data`
  - `fullName` (string, required)
  - `username` (string, required)
  - `email` (string, required)
  - `password` (string, required)
  - `avatar` (file, required)
  - `coverImage` (file, optional)
- **Response**: User object without password and refresh token

#### **POST /api/v1/users/login**
- **Purpose**: User login
- **Body**: `application/json`
  - `username` or `email` (string, required)
  - `password` (string, required)
- **Response**: User object with access and refresh tokens
- **Cookies**: Sets httpOnly cookies for tokens

#### **POST /api/v1/users/logout**
- **Purpose**: User logout
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message
- **Effect**: Clears refresh token from database and cookies

#### **GET /api/v1/users/current-user**
- **Purpose**: Get current user details
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Current user object

#### **POST /api/v1/users/change-password**
- **Purpose**: Change user password
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `application/json`
  - `oldPassword` (string, required)
  - `newPassword` (string, required)
- **Response**: Success message

#### **GET /api/v1/users/c/:username**
- **Purpose**: Get user channel profile
- **Headers**: `Authorization: Bearer <token>`
- **Params**: `username` (string, required)
- **Response**: Channel profile with subscriber count and subscription status

#### **GET /api/v1/users/history**
- **Purpose**: Get user watch history
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of watched videos with owner details

---

## File Upload System

### **Multer Configuration**
```javascript
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");  // Temporary storage
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());  // Unique filename
    }
});

export const upload = multer({ storage });
```

### **Cloudinary Integration**
```javascript
const uploadOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Upload to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"  // Auto-detect file type
        });
        
        // Clean up local file
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        // Clean up on error
        fs.unlinkSync(localFilePath);
        return null;
    }
}
```

### **File Upload Flow**
1. **Client uploads file** → Multer middleware
2. **Multer saves to temp folder** → Local storage
3. **Controller processes file** → Cloudinary upload
4. **Cloudinary returns URL** → Database storage
5. **Local temp file deleted** → Cleanup

---

## Error Handling

### **Custom Error Class**
```javascript
class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
```

### **Async Error Handler**
```javascript
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    }
}
```

### **Error Response Format**
```javascript
{
    "statusCode": 400,
    "data": null,
    "message": "All fields are required",
    "success": false,
    "errors": []
}
```

---

## Development Workflow

### **Environment Setup**
1. **Clone repository**
2. **Install dependencies**: `npm install`
3. **Configure environment**: Copy `.env.sample` to `.env`
4. **Start MongoDB**
5. **Run development server**: `npm run dev`

### **Development Commands**
```bash
# Development server with auto-reload
npm run dev

# Production build (if configured)
npm start

# Code formatting
npx prettier --write .
```

### **Project Development Flow**
1. **Database Design** → Model creation
2. **API Design** → Route planning
3. **Authentication** → JWT implementation
4. **File Upload** → Multer + Cloudinary
5. **Business Logic** → Controller implementation
6. **Testing** → API testing with Postman
7. **Error Handling** → Comprehensive error management

---

## Advanced Features

### **Aggregation Pipelines**
The project uses complex MongoDB aggregation pipelines for:
- **Subscriber Count**: Counting user subscribers
- **Channel Statistics**: Computing channel metrics
- **Watch History**: Fetching user watch history with populated data
- **Subscription Status**: Checking if current user is subscribed

### **Pagination Support**
- **mongoose-aggregate-paginate-v2**: For paginated results
- **Video Listings**: Paginated video queries
- **Search Results**: Paginated search functionality

### **Security Features**
- **JWT Authentication**: Stateless authentication
- **Password Hashing**: bcrypt encryption
- **CORS Configuration**: Cross-origin protection
- **Input Validation**: Data sanitization
- **Error Handling**: Secure error messages

### **File Management**
- **Temporary Storage**: Local temp folder
- **Cloud Storage**: Cloudinary integration
- **File Cleanup**: Automatic temp file deletion
- **Multiple File Support**: Avatar and cover image uploads

---

## Conclusion

This YouTube backend clone demonstrates a production-ready Node.js application with:

- **Scalable Architecture**: Modular design with separation of concerns
- **Security Best Practices**: JWT authentication, password hashing, CORS
- **Database Optimization**: Indexed fields, aggregation pipelines
- **File Upload System**: Multer + Cloudinary integration
- **Error Handling**: Comprehensive error management
- **API Design**: RESTful endpoints with proper HTTP methods
- **Code Quality**: ES6+ features, async/await, error handling

## References

### Official Documentation
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [JWT.io](https://jwt.io/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

### Best Practices
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Design](https://restfulapi.net/)
- [MongoDB Patterns](https://www.mongodb.com/blog/post/building-with-patterns-a-summary)

### Security Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

The project serves as an excellent foundation for building complex backend applications with modern web technologies and best practices.
