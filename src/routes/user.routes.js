import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {registerUser , loginUser, logoutUser , refreshAccessToken} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// upload is a middleware , so it will just execute before user registration
// fields accepts array , multer helps in file upload, so here we will take avatar and cover image
router.route("/register").post(upload.fields([
  {
    name: "avatar",
    maxCount: 1
  },
  {
    name: "coverImage",
    maxCount: 1
  }
]) , registerUser)

router.route("/login").post(loginUser)

//secured routes
// yaha verifyJWT middleware hai, toh pehle ye execute hoga or firr logout hoga
// verifyJWT mai hum log ne jo request aaya tha uss mai end mai user ka data add kar diye hai , ab yahi same req logoutUser waale controller/ method k 
// pass jaayega or firr iss user k data ka use kar k hum log logout kar denge
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router