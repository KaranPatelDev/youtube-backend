import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';



const generateAccessAndRefreshTokens = async (userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false}); // We don't want to validate the user again, we just want to save the refresh token

        return { accessToken, refreshToken };
    }
    catch(error){
        throw new ApiError(500, 'Error generating tokens');
    }
}




const registerUser = asyncHandler(async (req, res) => {
    // Logic for registering a user
    // res.status(500).json({ message: 'User registered successfully' });
    // LOGIC: This logic is for registering a user in the system.It includes the following steps:
    // Step 1 : get user details from frontend
    // Step 2 : validate user details
    // Step 3 : check if user already exists : username and email
    // Step 4 : check for images and avatars
    // Step 5 : if they are present, upload them to cloudinary
    // Step 6 : create user object - create user entry in database
    // Step 7 : remove password and refresh token field from response
    // Step 8 : check for user creation
    // Step 9 : return response

    // Step 1 : get user details from frontend
    const { fullName, username, email, password } = req.body;
    console.log("email: ", email);

    //Begineer
    // if(fullName === ""){ 
    //     throw new ApiError(400, 'Full name is required');
    // }
    // Advance
    // Step 2 : validate user details
    if(
        [fullName, username, email, password].some((field => field?.trim() === ''))
    ){
        throw new ApiError(400, 'All fields are required');
    }

    // Step 3 : check if user already exists : username and email
    const existedUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existedUser) {
        throw new ApiError(409, 'Username or email already exists');
    }

    // console.log(req.files);


    // Step 4 : check for images and avatars
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    const avatarLocalPath = req.files && req.files.avatar && req.files.avatar[0] ? req.files.avatar[0].path : null;
    if(!avatarLocalPath){
        throw new ApiError(400, 'Avatar is required');
    }
// ====================================================
    // const coverImageLocalPath = req.files && req.files.coverImage && req.files.coverImage[0] ? req.files.coverImage[0].path : null;
// ----------------------OR----------------------------
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
// ====================================================


    // Step 5 : if they are present, upload them to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    
    if(!avatar){
        throw new ApiError(500, 'Avatar upload failed');
    }

    // Step 6 : create user object - create user entry in database
    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })


    // Step 7 : remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select('-password -refreshToken'); // Here we put the fields we don't want to return in the response because by default mongoose returns all fields
    // Step 8 : check for user creation
    if(!createdUser){
        throw new ApiError(500, 'User creation failed');
    }

    // Step 9 : return response
    return res.status(201).json(
        new ApiResponse(201, createdUser, 'User registered successfully')
    );
})



const loginUser = asyncHandler(async (req, res) => {
    // Logic for logging in a user
    //  Step 1 : get user details from frontend
    //  Step 2 : get username or email
    //  Step 3 : find the user
    //  Step 4 : check password
    //  Step 5 : generate access token and refresh token
    //  Step 6 : send cookie

    const { username, email, password } = req.body;

    if(!username || !email){
        throw new ApiError(400, 'Username or email is required');
    }

    const user = await User.findOne({ $or: [{ username }, { email }] })

    if(!user){
        throw new ApiError(404, 'User not found');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, 'Invalid password');
    }


    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken'); // Here we put the fields we don't want to return in the response because by default mongoose returns all fields

    const options ={
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, 'User logged in successfully')
        );
})


const logoutUser = asyncHandler(async (req, res) => {
    // Logic for logging out a user
    // Step 1 : get user from request
    // Step 2 : clear refresh token
    // Step 3 : send response
    
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined, // Setting refresh token to undefined
            }
        },
        {
            new: true // Return the updated user
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(
            new ApiResponse(200, {}, 'User logged out successfully')
        );
})

export {
    loginUser, logoutUser, registerUser
};

