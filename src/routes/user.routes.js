import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    getWatchHistory,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
); // This is the middleware that handles the file upload

router.route("/login").post(loginUser); // This route handles user login

//SECURED ROUTES
router.route("/logout").post(verifyJWT, logoutUser); // This route handles user logout

router.route("/refresh-token").post(refreshAccessToken); // This route handles refresh token generation

router.route("/change-password").post(verifyJWT, changeCurrentPassword); // This route handles changing the user's password

router.route("/current-user").get(verifyJWT, getCurrentUser); // This route retrieves the current user's details

router.route("/update-account").patch(verifyJWT, updateAccountDetails); // This route updates the user's account details

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar); // This route updates the user's avatar

router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage); // This route updates the user's cover image

router.route("/c/:username").get(verifyJWT, getUserChannelProfile); // This route retrieves the user's channel profile by username

router.route("/history").get(verifyJWT, getWatchHistory); // This route retrieves the user's watch history

export default router;
