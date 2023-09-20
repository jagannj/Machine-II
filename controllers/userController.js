const User = require("../models/userModel");
const path = require("path");
const multer = require("multer");
const ImageModel = require("../models/image.model")
const asynchandler = require("express-async-handler")
// const {refreshToken} = require("../config/refreshToken")
const { genToken } = require("../config/jwtToken")
const  {ReguxPassword,Emailvalidation,PhoneValidation} = require("../middlewares/validation")
const {validateMongodbId} = require("../utils/validate.MongodbId");
const {Storage} = require("../middlewares/multer")
exports.createUser = asynchandler(async (req, res) => {
const {email,password,mobile}= req.body;
  // const email = req.body.email;
const emailValidation = await Emailvalidation(email)
const passwordValidation =await  ReguxPassword(password);
const phoneNumberValidate =await  PhoneValidation(mobile);

  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // Create new User
    const newUser = await User.create(req.body);
    res.json(newUser);

  }
  else {
    // res.json({message:"user Already Exist"})
    throw new Error('User Already Exist')
  }

})

// user Login Controller

exports.UserLogin = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  // User  if user exists or Not 
  const findUser = await User.findOne({ email:email });
  // console.log({"findUser":findUser});

  if (findUser && await findUser.isPasswordMatched(password)) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      token: genToken(findUser?._id)
    })
  }
  else {
    throw new Error(`Invalid Credentials`)
  }

})


//Get all users

exports.getallUser = asynchandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser)
  } catch (error) {
    throw new Error(error)
  }
})

exports.getaUser = asynchandler(async (req, res) => {
  try {
    // res.json()
    const { _id } = req.user
    validateMongodbId(_id)
    const getUserbyId = await User.findById(_id);
    res.json(getUserbyId)

  } catch (error) {
    throw new Error(error)
  }
})

exports.deleteaUser = asynchandler(async (req, res) => {
  try {
    // res.json()
    const { _id } = req.user
  // validateMongodbId(id)
    const deleteUserbyId = await User.findByIdAndDelete(_id);
    res.json("Delete Sucessfully" )

  } catch (error) {
    throw new Error(error)
  }
})


exports.UpdateaUser = asynchandler(async (req, res) => {

  const { firstname, lastname, mobile, email } = req.body;
  try {
    // res.json()
    const { _id } = req.user
    // const{id}= req.params;
    const updateUser = await User.findByIdAndUpdate(_id, { firstname, lastname, mobile, email },
      { new: true },);
    res.json(updateUser)

  } catch (error) {
    throw new Error(error)
  }
})
const upload = multer({
  storage:Storage
}).single('file')

exports.Upload = asynchandler(async(req,res,err)=>{
  upload(req,res,(err)=>{
    if(err){
      console.log(err);
    }
    else{
      const newImage = new ImageModel({
                image:{
                  data: req.file.filename
                }
              })
              newImage.save()
              .then(()=>res.send("sucessfully Uploaded")).catch((err)=>res.send(err))
    }
  })

})

exports. ReadFile = asynchandler(async(req,res)=>{
  const filename = req.params.filename;

  const filePath = path.join(__dirname, './uploads', filename);

  res.download(filePath, (err) => {
    if (err) {
      // Handle errors, e.g., file not found
      res.status(404).json({ message: 'File not found' });
    }
  });
})



