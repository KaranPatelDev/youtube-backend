import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    // We can use (req, _, next) to ignore the res parameter if we don't need to send a response here.
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }
    
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token!");
        }
    
        req.user = user; // Attach the user to the request object for further use in the route handlers
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});