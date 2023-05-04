import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { signedCookie } from "cookie-parser";
import { sendCookie } from "../utilis/features.js";
import cookieParser from "cookie-parser";

export const login = async (req,res)=>{

    try {
        const {email,password}= req.body;

    const user= await User.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({
            success: true,
            message: "Invalid email or passsword"
        });
    }

    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(404).json({
            success: true,
            message: "Invalid email or passsword"
        });
    }

    sendCookie(user,res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}


export const Register= async (req,res)=>{
   try {
    const {name,email,password}= req.body;
    
    let user= await User.findOne({email});

    if(user) return res.status(404).json({
        success: false,
        message: "User Already Registered"
    })

   const hashedPassword= await bcrypt.hash(password,10);

   user= await User.create({
        name,email,password: hashedPassword
    });

    sendCookie(user,res,"Registered Successfully",201);
   } catch (error) {
    next(error);
   }

}


export const getMyProfile = async(req,res)=>{

    try {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        next(error);
    }

}


export const logout= (req,res)=>{
    try {
        res.status(200).cookie("token","",{expires: new Date(Date.now())}).json({
            success: true,
            message: "Loggedout Successfully",
            sameSite: process.env.Node_env === "Development"? "lax" : "none",
            secure:  process.env.Node_env === "Development"? false : true,
        });
    } catch (error) {
        next(error);
    }
}

