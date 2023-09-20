const express = require("express");
const { GridFsStorage } = require("multer-gridfs-storage")
const {createUser,UserLogin,ReadFile,getallUser,getaUser,UpdateaUser,deleteaUser,Upload}= require("../controllers/userController")
const {authMiddleware} = require("../middlewares/authMiddleware")
const authRouter = express.Router()
authRouter.post("/register",createUser)
authRouter.post("/login",UserLogin)
authRouter.get("/all-user",authMiddleware,getallUser)
authRouter.get("/get",authMiddleware,getaUser)
authRouter.put("/edit-user",authMiddleware,UpdateaUser)
authRouter.delete("/delete-user",authMiddleware,deleteaUser)
// authRouter.get("/refreshToken",handleRefreshToken)

authRouter.post('/file',authMiddleware,Upload)
// authRouter.get('/file-fetch/:filename',authMiddleware,ReadFile)

module.exports= {authRouter};