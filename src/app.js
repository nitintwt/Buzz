import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))

app.use(express.json({limit:'16kb'}))   // setting a limit of json , like how much json data can be sent to backend throught url or direct 
app.use(express.urlencoded({extended: true , limit:"16kb"}))
app.use(express.static("public"))  //pubic folder to save files
app.use(cookieParser())

//routes import 

import userRouter from './routes/user.routes.js'

// routes declaration
//users route pe userRouter activate ho jaayega
// userRouter pe hum log different methods likh rahe hai , ab jaise user register kar raha hai toh
// usska url hoga : http://localhost:8000/api/v1/users/register
app.use("/api/v1/users" , userRouter)

export {app}