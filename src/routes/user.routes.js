import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {registerUser} from "../controllers/user.controller.js"

const router = Router()


// upload is a middleware , so it will just execute before user registration
// fileds accepts array , multer helps in file upload, so here we will take avatar and cover image
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

export default router