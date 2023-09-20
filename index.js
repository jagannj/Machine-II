const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path")
const cookieParser = require("cookie-parser");
const dBconnected = require("./config/dbConnect")
const authRouters = require("./routes/authRoute")
const ImageModel = require("./models/image.model")
const {notFound,errorHandler} = require("./middlewares/errorHandler");
const {authMiddleware} = require("./middlewares/authMiddleware");

const multer = require("multer");
const PORT = process.env.PORT||4000;

dBconnected.dBconnect()
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'uploads')))
app.use("/hello",express.urlencoded({extended:true}))
//error handler Middleware
app.use('/api/user',authRouters.authRouter)


app.get('/file/:filename', authMiddleware,(req, res) => {
  const filename = req.params.filename; // Get the filename from the URL

  // Construct the file path where the uploaded file is stored
  const filePath = path.join(__dirname, 'uploads', filename);

  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'File not found' });
    }
  });
});





// const upload = multer({
//   storage:Storage
// }).single('file')
app.use(notFound)
app.use(errorHandler)



app.get('/',(req,res)=>{
  res.send("#######")
})
app.listen(PORT,(err)=>{
    console.log(`Server Running on ${PORT}`);
})







