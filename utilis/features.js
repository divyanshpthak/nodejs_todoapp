import jwt from "jsonwebtoken";

export const sendCookie= async (user,res,message,statusCode=200)=>{
    const token= jwt.sign({_id:user._id},process.env.Secret_key);

    res.status(statusCode).cookie("token",token,{
        httpOnly: true,
        expires: new Date(Date.now()+ 60*1000),
        sameSite: process.env.Node_Env === "Development"? "lax" : "none",
        secure:  process.env.Node_Env === "Development"? false : true,
    }).
    json({
        success: true,
        message,
    })
}