import multer from "multer";

/*Multer simplifies the process of handling file uploads in Express.js applications by providing a convenient middleware layer 
for parsing and processing multipart/form-data request*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage, })