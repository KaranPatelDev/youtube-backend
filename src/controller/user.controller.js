import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

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
    const existedUser = User.findOne({ $or: [{ username }, { email }] })
    if (existedUser) {
        throw new ApiError(409, 'Username or email already exists');
    }


    // Step 4 : check for images and avatars
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, 'Avatar is required');
    }


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


export { registerUser };
