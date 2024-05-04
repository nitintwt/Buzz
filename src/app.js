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

export {app}