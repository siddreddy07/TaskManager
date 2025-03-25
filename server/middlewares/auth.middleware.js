import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


export const authRoute = async(req,res,next)=>{

    try {
        const {token} = req.cookies

        if(!token) return res.status(400).json({succes:false,message:'Not Authorized'})

        const decode = jwt.verify(token,process.env.JWT_SECRET)
        
        
        const user = await User.findOne({email:decode.email})

        req.userId = user._id;
        next()

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        }

    } catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Token verification failed. Try again.'
        });
    }



    

}