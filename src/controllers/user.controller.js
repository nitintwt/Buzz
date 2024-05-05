import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req ,res)=>{
  // get user details from frontend
  // validation- check not empty
  // check if user already exist: using username or email
  // check for images , check for avatar
  // upload them to cloudinary , check if avatar uploaded on cloudinary
  // create user object (to send in mongodb)- create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const {fullName , email , username , password} = req.body
  console.log("email", email)

  // here we are checking if the input is not empty 

  /*if (fullName === ""){
    throw new ApiError(400 , "Full name is required")
  }*/

  if (
    [fullName , email , username , password].some((field)=> field?.trim() ==="")
  ) {
    throw new ApiError(400 , "All fields are required")
  }
  
  // User is made from mongoose , so it can directly contact with the db , findOne is a mongoose method to check 
  // if the particular input data exist or not
  // operator = $or :- is used for checking two data values , like either the email or username exist , we will send user a message that this username or email 
  // exist try another
  const existedUser = User.findOne({
    $or: [{username} , {email} ]
  })

  if (existedUser) {
    throw new ApiError(409 , "User with email or username exists")
  }
  
  // multer gives .files access , we are taking the path of the file, which has been uploaded locally ( till now not uploaded to cloudinary)
  // and after uploading , multer ne wapas se apne server pe le aaya hai
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if (!avatarLocalPath){
    throw new ApiError(400 , "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar){
    throw new ApiError(400 , "Avatar file is required")
  }

  // database mai entry
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })
  
  // findById is a method , with every entry in mongodb , it assigns an _id with it 
  // we will check here that is there any user._id created or not 
  // isska mtlb ki user ka data mongodb mai save hua ki nahi ye check karenge
  // if the id is found , we can remove some data entries from the response , using select method
  // select mai wo fields daalenge jo hum log ko nahi chahiye response mai
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500 , "Something went wrong while registering the user")
  }
  
  //
  return res.status(201).json(
    new ApiResponse(200, createdUser , "User registered Successfully")
  )

})

export  { registerUser}