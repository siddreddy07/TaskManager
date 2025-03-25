import jwt from "jsonwebtoken"

export const generatetoken = (email,res)=>{

    const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie('token',token,{
        httpOnly: true,
        samesite:true,
        maxAge:24*60*60*1000
    })

    return true;

}