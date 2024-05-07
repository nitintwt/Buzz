import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req , res , next)=>{
try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" , "")
  
    if (!token){
      throw new ApiError(401 , "Unauthorized request")
    }
  
    const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
    // ab jo decoded token hai uss mai se , id nikal k humlog database mai search karenge 
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
    if (!user){
      throw new ApiError(401 , "Invalid Access Token")
    }
    
    // request k andar k anadar naya object add karde rahe hai , user
    req.user = user;
    next()
} catch (error) {
  throw new ApiError(401 , error?.message || "Invalid access Token")
}

})