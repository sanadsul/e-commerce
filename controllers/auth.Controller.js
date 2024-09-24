import bcrypt from "bcrypt";
import User from "./../models/User.model.js";
import { creatToken } from "../configs/jwt.js";
import { validateUser, validateUserlogin } from "../middlewares/ValidatorJoi.js";
import mongoose from "mongoose";



/* Register Controller */
const Register = async (req, res) => {
  const validation = validateUser(req.body);
  
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data",
      errors: validation.message
    });
  }
  const { username, email, password, confirmPassword } = validation.data;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ success:false, message: "All field Required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ success:false, message: "password not match" });
  }

  try {

    // User email Match
    const existUser = await User.findOne({$or:[{email},{username}] }).select({password:false,confirmPassword:false}).exec();
    if (existUser) {
      return res.status(400).json({ message: "Email or username already exist" });
    }

    // Hached Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Hached confirmPassword
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);



    // Create User
    const user = new User({
      username,
      email,
      password: hashedPassword,
      confirmPassword:hashedConfirmPassword,
    });
    await user.save();

    // Create token
    const token = creatToken(user._id)

    return res
      .status(200)
      .json({ message: "User register sucessfuly", data: token });
  } catch (error) {
    res.status(500).json({ success:false, message: "Server error", error: error.message.trim() });
  }
};

/* Login Controller */
const Login = async (req, res) => {
  const validation = validateUserlogin(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data",
      errors: validation.message,
    });
  }
  const { email, password } = validation.data;

  try {
   if (!email || !password) {
     return res.status(400).json({ success:false, message: "All field Required" });
   }
     // User email Match
     const existUser = await User.findOne({ email });
     if (!existUser) {
       return res.status(400).json({ success:false, message: "User not found" });
     };
     // User password Match
     const matchPassword =  bcrypt.compare(password, existUser.password);
     if (!matchPassword) {
       return res.status(400).json({ message: "Invalid username or password" });
     }
     // Create Token
     const token = creatToken(existUser._id);

     res.cookie('token', token, {
      httpOnly: true, 
      maxAge: 3600000, 
  });
      return res.status(200).json({ success: true, message: "login sucessfuly" });
     
 } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    
 }

};

 /* Dashboard Controller */
const Dashboard = async (req, res) => {
  const userData = req.user;
  const paramsId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(paramsId)) {
    return res.status(400).json({ message: "invalid id" });
    
  }
 try {

  /* Notfound User Data */
   if (!userData || !req.user || req.user === null) {
     return  res.status(400).json({ message: "Notfound User Data" });
   }

   /* User id is not match */
   if ( !paramsId || paramsId && paramsId !== userData._id.toString() || paramsId.trim() === null ) {
     return res.status(400).json({ message: "not Authorized your this account" });
   }

   /* User Data */
   return res.status(200).json({ message: "User Data", data: userData });

 } catch (error) {
    res.status(500).json({message:'Problem User not Data'});
 }
}; 



export { Register, Login, Dashboard };
