import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controller/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route('/register').post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]),
    registerUser
); // This is the middleware that handles the file upload


router.route('/login').post(loginUser); // This route handles user login


//SECURED ROUTES
router.route('/logout').post(verifyJWT , logoutUser); // This route handles user logout


export default router;