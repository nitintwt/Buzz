// require('dotenv').config({path: './env'}) :- this will work , but we will write in a better way

import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
  path:'./.env'
})

/*
1st approach to connect db 

import express from 'express'

const app = express()

;(async () =>{
  try {
   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
   app.on("error" , (error)=>{
    console.loh(error)
    throw error
   })

   app.listen(process.env.PORT , ()=>{
     console.log(`App is listening on port ${process.env.PORT}`)
   })

  } catch (error) {
    console.error(error)
  }
})()
*/

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000 , ()=>{
    console.log(`Server is running at port : ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("MONGODB CONNECTION FAILED !!!" , err)
})